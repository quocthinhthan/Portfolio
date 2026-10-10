import { test } from "node:test";
import assert from "node:assert/strict";
import { invitationSlug, invitationPath, lookupInvitation, parseInvitationRegistry } from "../utils/invitations.ts";
import { generateRegistry } from "../scripts/generate-invitations.mjs";

test("generator produces unique six-character alphanumeric tokens and preserves them on reruns", () => {
  const generated = generateRegistry({ version: 1, invitations: Array.from({ length: 100 }, () => ({ name: "Trần Khải Tấn" })) });
  assert.equal(new Set(generated.invitations.map(entry => entry.token)).size, 100);
  assert.equal(new Set(generated.invitations.map(entry => entry.id)).size, 100);
  for (const entry of generated.invitations) assert.match(entry.token, /^[A-Za-z0-9]{6}$/);
  assert.deepEqual(generateRegistry(generated), generated);
  const renamed = generateRegistry({ ...generated, invitations: [{ ...generated.invitations[0], name: "Thầy Đặng Văn An" }] });
  assert.equal(renamed.invitations[0].token, generated.invitations[0].token);
  assert.equal(renamed.invitations[0].id, generated.invitations[0].id);
  assert.equal(renamed.invitations[0].slug, "thay-dang-van-an");
});

test("registry rejects invalid/duplicate credentials before saving or serving links", () => {
  const registry = generateRegistry({ version: 1, invitations: [{ name: "Trần Khải Tấn" }] });
  const entry = registry.invitations[0];
  for (const changes of [{ token: "short" }, { id: "invalid" }, { name: "<script>" }, { name: "a".repeat(49) }, { active: "true" }, { slug: "../other" }]) {
    assert.throws(() => parseInvitationRegistry({ version: 1, invitations: [{ ...entry, ...changes }] }));
  }
  assert.throws(() => generateRegistry({ version: 1, invitations: [entry, { ...entry, id: "00000000-0000-4000-8000-000000000001" }] }));
});

test("token resolves canonical recipient, is case-sensitive and stops working after revocation", () => {
  const entry = generateRegistry({ version: 1, invitations: [{ name: "Trần Khải Tấn", token: "Ab12Cd" }] }).invitations[0];
  assert.equal(lookupInvitation([entry], "Ab12Cd").name, "Trần Khải Tấn");
  assert.equal(lookupInvitation([entry], "ab12cd"), undefined);
  assert.equal(lookupInvitation([{ ...entry, active: false }], "Ab12Cd"), undefined);
  assert.equal(invitationPath(entry), "/graduation/tran-khai-tan/Ab12Cd");
  assert.equal(invitationSlug("Thầy Đặng Văn An"), "thay-dang-van-an");
});
