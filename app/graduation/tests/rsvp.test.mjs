import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { validateRSVP } from "../utils/rsvp.ts";
import { sanitizeGuestName } from "../utils/guestName.ts";
import { lookupInvitation } from "../utils/invitations.ts";

const invitationId = "00000000-0000-4000-8000-000000000001";
const responseId = `invite_${invitationId}`;
const invitation = { id: invitationId, name: "Trần Khải Tấn", slug: "tran-khai-tan", token: "Ab12Cd", active: true };
const input = { invitationToken: invitation.token, attendance: "maybe", name: "Anh Tuấn", message: "Hẹn gặp Thịnh 🤍", website: "" };
const acknowledgement = { ok: true, responseId, invitationId, schemaVersion: 2 };
const secret = "test-only-secret-000000000000000000000000";

test("RSVP validates all three statuses, preserves Vietnamese and rejects malformed or bot submissions", () => {
  for (const attendance of ["yes", "maybe", "no"]) {
    assert.equal(validateRSVP({ ...input, attendance }).attendance, attendance);
  }
  assert.equal(validateRSVP({ ...input, name: "  Anh Tuấn  " }).name, "Anh Tuấn");
  for (const invalid of [null, [], {}, { ...input, attendance: false }, { ...input, attendance: "pending" },
    { ...input, name: " " }, { ...input, name: "x".repeat(49) }, { ...input, message: "x".repeat(601) },
    { ...input, invitationToken: "Anh Tuấn" }, { ...input, invitationToken: undefined }, { ...input, website: "https://bot.example" }]) {
    assert.throws(() => validateRSVP(invalid));
  }
});

function createRoute(fetchImpl, env = { RSVP_SCRIPT_URL: "https://script.google.com/macros/s/test/exec", RSVP_SCRIPT_SECRET: secret }) {
  const source = readFileSync(new URL("../../api/graduation/rsvp/route.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  const context = vm.createContext({
    exports, Response, URL, Buffer, AbortSignal,
    process: { env }, fetch: fetchImpl,
    require: path => path.endsWith("/rsvp") ? { validateRSVP } : path.includes("/server/") ? { findInvitation: token => lookupInvitation([invitation, { ...invitation, token: "Off123", active: false }], token) } : { sanitizeGuestName },
  });
  vm.runInContext(compiled, context);
  return exports.POST;
}

function request(payload = input, headers = {}) {
  return new Request("https://invitation.example/api/graduation/rsvp", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://invitation.example", ...headers },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

test("server confirms only a matching successful write and never returns credentials", async () => {
  let sent;
  const POST = createRoute(async (url, options) => {
    assert.equal(url.hostname, "script.google.com");
    sent = JSON.parse(options.body);
    return Response.json(acknowledgement);
  });
  const result = await POST(request());
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { ok: true });
  assert.equal(sent.secret, secret);
  assert.equal(sent.attendance, "maybe");
  assert.equal(sent.invitationId, invitation.id);
  assert.equal(sent.invitedName, invitation.name);
  assert.equal("invitationToken" in sent, false);
});

test("server ignores spoofed recipient names/IDs and rejects unknown or revoked tokens before writing", async () => {
  let calls = 0;
  const POST = createRoute(async (_url, options) => {
    calls++;
    const sent = JSON.parse(options.body);
    assert.equal(sent.invitedName, invitation.name);
    assert.equal(sent.invitationId, invitationId);
    assert.equal(sent.responseId, responseId);
    return Response.json(acknowledgement);
  });
  assert.equal((await POST(request({ ...input, invitedName: "Other person", invitationId: "fake", responseId: "fake" }))).status, 200);
  for (const invitationToken of ["Bad123", "Off123", "ab12cd"]) assert.equal((await POST(request({ ...input, invitationToken }))).status, 403);
  assert.equal(calls, 1);
});

test("server fails closed for misconfiguration, foreign origin, invalid JSON and oversized bodies", async () => {
  let calls = 0;
  const fetchImpl = async () => { calls++; throw new Error("should not fetch"); };
  assert.equal((await createRoute(fetchImpl, {})(request())).status, 503);
  assert.equal((await createRoute(fetchImpl, { RSVP_SCRIPT_URL: "https://other.example/exec", RSVP_SCRIPT_SECRET: secret })(request())).status, 503);
  const POST = createRoute(fetchImpl);
  assert.equal((await POST(request(input, { Origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request("invalid json"))).status, 400);
  assert.equal((await POST(request({ ...input, attendance: true }))).status, 400);
  assert.equal((await POST(request({ ...input, name: "<script>" }))).status, 400);
  assert.equal((await POST(request("x".repeat(9000)))).status, 413);
  assert.equal(calls, 0);
});

test("server reports upstream errors, unexpected responses and timeouts without claiming success", async () => {
  for (const reply of [{ ...acknowledgement, ok: false }, { ...acknowledgement, responseId: "wrong" }, { ...acknowledgement, invitationId: "wrong" }]) {
    assert.equal((await createRoute(async () => Response.json(reply))(request())).status, 502);
  }
  assert.equal((await createRoute(async () => Response.json({ ok: true, responseId }))(request())).status, 503);
  assert.equal((await createRoute(async () => Response.json({ ok: false, code: "rate_limited" }))(request())).status, 429);
  assert.equal((await createRoute(async () => new Response("Google sign-in HTML"))(request())).status, 502);
  assert.equal((await createRoute(async () => { throw new Error("timed out"); })(request())).status, 502);
});

/** Minimal spreadsheet double used to exercise real Apps Script request handling. */
function createScript(initialRows) {
  const rows = initialRows || [["response_id", "created_at", "updated_at", "name", "attendance", "attendance_label", "message", "invitation_id", "invited_name"]];
  const values = new Map();
  const properties = new Map([["RSVP_SCRIPT_SECRET", secret], ["SPREADSHEET_ID", "test-sheet"]]);
  let acquired = false;
  const sheet = {
    getLastRow: () => rows.length,
    getMaxRows: () => 1000,
    insertColumnsAfter: (column, count) => rows.forEach(row => row.splice(column, 0, ...Array(count).fill(""))),
    getRange: (row, col, height = 1, width = 1) => ({
      getValues: () => rows.slice(row - 1, row - 1 + height).map(r => r.slice(col - 1, col - 1 + width)),
      getValue: () => rows[row - 1]?.[col - 1],
      setValues: data => { data.forEach((cells, i) => { rows[row - 1 + i] ||= []; cells.forEach((value, j) => { rows[row - 1 + i][col - 1 + j] = value; }); }); },
      setNumberFormat: () => {},
      createTextFinder: id => {
        const finder = { matchEntireCell: () => finder, useRegularExpression: () => finder, findNext: () => {
          const index = rows.findIndex((r, i) => i >= row - 1 && r[col - 1] === id);
          return index < 0 ? null : { getRow: () => index + 1 };
        } };
        return finder;
      },
    }),
  };
  const context = vm.createContext({
    console: { error: () => {} },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key) }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush: () => { assert.equal(acquired, true); } },
    LockService: { getScriptLock: () => ({ tryLock: () => { acquired = true; return true; }, releaseLock: () => { acquired = false; } }) },
    CacheService: { getScriptCache: () => ({ get: key => values.get(key), put: (key, value) => values.set(key, value) }) },
    ContentService: { MimeType: { JSON: "application/json" }, createTextOutput: data => ({ setMimeType: () => JSON.parse(data) }) },
  });
  vm.runInContext(readFileSync(new URL("../google-sheets/Code.gs", import.meta.url), "utf8"), context);
  return { rows, properties, send: payload => context.doPost({ postData: { contents: JSON.stringify({ ...input, secret, schemaVersion: 2, responseId, invitationId, invitedName: invitation.name, ...payload }) } }), locked: () => acquired, migrate: () => context.migrateHeaders_(sheet) };
}

test("Apps Script records maybe separately; retry and edit update one row, preserving created_at", () => {
  const script = createScript();
  assert.equal(script.send({}).ok, true);
  assert.equal(script.rows.length, 2);
  assert.equal(script.rows[1][4], "maybe");
  assert.equal(script.rows[1][5], "Sẽ báo lại");
  const created = script.rows[1][1];
  assert.equal(script.send({}).ok, true);
  assert.equal(script.send({ attendance: "yes", message: "Mình sẽ đến!" }).ok, true);
  assert.equal(script.rows.length, 2);
  assert.equal(script.rows[1][1], created);
  assert.equal(script.rows[1][4], "yes");
  assert.equal(script.rows[1][5], "Sẽ tham dự");
  assert.equal(script.rows[1][6], "Mình sẽ đến!");
  assert.equal(script.rows[1][7], invitationId);
  assert.equal(script.rows[1][8], invitation.name);
  assert.equal(script.locked(), false);
});

test("Apps Script rejects missing/wrong secret, malformed input and changed headers without writes", () => {
  const script = createScript();
  assert.equal(script.send({ secret: "wrong" }).code, "unauthorized");
  assert.equal(script.send({ attendance: "toString" }).code, "invalid");
  assert.equal(script.send({ website: "bot" }).code, "invalid");
  assert.equal(script.rows.length, 1);
  script.rows[0][4] = "renamed";
  assert.equal(script.send({}).code, "write_failed");
  assert.equal(script.locked(), false);
  assert.equal(script.rows.length, 1);
});

test("Apps Script writes formula-like guest content as text and limits repeated submissions", () => {
  const script = createScript();
  assert.equal(script.send({ name: "-Anh Tuấn", message: '=IMPORTXML("https://example.com")' }).ok, true);
  assert.equal(script.rows[1][3], "'-Anh Tuấn");
  assert.equal(script.rows[1][6], '\'=IMPORTXML("https://example.com")');
  for (let i = 0; i < 5; i++) assert.equal(script.send({}).ok, true);
  assert.equal(script.send({}).code, "rate_limited");
  assert.equal(script.rows.length, 2);
  assert.equal(script.locked(), false);
});

test("migration preserves old rows and owner notes, and does not add columns twice", () => {
  const oldHeaders = ["response_id", "created_at", "updated_at", "name", "attendance", "attendance_label", "message"];
  const oldData = ["old-id", "old-created", "old-updated", "Old guest", "yes", "Sẽ tham dự", "Old message"];
  const script = createScript([[...oldHeaders, "Ghi chú riêng"], [...oldData, "Keep me"]]);
  script.migrate();
  assert.deepEqual(script.rows[1].slice(0, 7), oldData);
  assert.deepEqual(script.rows[0].slice(7), ["invitation_id", "invited_name", "Ghi chú riêng"]);
  assert.equal(script.rows[1][9], "Keep me");
  script.migrate();
  assert.equal(script.rows[0].length, 10);
  assert.equal(script.locked(), false);
});

test("new Apps Script rejects legacy unverified requests instead of writing unsigned RSVP", () => {
  const script = createScript();
  assert.equal(script.send({ schemaVersion: 1 }).code, "invalid");
  assert.equal(script.send({ responseId: invitationId }).code, "invalid");
  assert.equal(script.rows.length, 1);
});
