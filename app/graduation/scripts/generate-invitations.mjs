import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { randomInt, randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { invitationSlug, invitationPath, parseInvitationRegistry } from "../utils/invitations.ts";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function generateRegistry(source) {
  if (source?.version !== 1 || !Array.isArray(source.invitations)) throw new Error("Registry must have version: 1 and an invitations array.");
  const usedTokens = new Set(source.invitations.filter(entry => entry?.token).map(entry => entry.token));
  const invitations = source.invitations.map(entry => {
    if (!entry || typeof entry.name !== "string") throw new Error("Every invitation needs a name.");
    const name = entry.name.normalize("NFC").trim().replace(/\s+/g, " ");
    let token = entry.token;
    if (token === undefined) {
      do { token = Array.from({ length: 6 }, () => alphabet[randomInt(alphabet.length)]).join(""); } while (usedTokens.has(token));
      usedTokens.add(token);
    }
    return { id: entry.id ?? randomUUID(), name, slug: invitationSlug(name), token, active: entry.active ?? true };
  });
  return { version: 1, invitations: parseInvitationRegistry({ version: 1, invitations }) };
}

async function atomicWrite(url, contents) {
  const temporary = new URL(url.href + ".tmp");
  try { await writeFile(temporary, contents, "utf8"); await rename(temporary, url); }
  finally { await unlink(temporary).catch(() => {}); }
}

export async function main() {
  const args = process.argv.slice(2);
  if (args.length && !(args.length === 2 && args[0] === "--base-url")) throw new Error("Usage: npm run invitations:generate -- --base-url https://your-domain.example");
  const base = new URL(args[1] || "https://thanquocthinh.id.vn");
  if (base.protocol !== "https:" && !(base.protocol === "http:" && ["localhost", "127.0.0.1"].includes(base.hostname))) throw new Error("Use HTTPS, or HTTP for localhost.");
  const file = new URL("../invitations/registry.json", import.meta.url);
  const registry = generateRegistry(JSON.parse(await readFile(file, "utf8")));
  // Validate everything before replacing the source file. Existing tokens/IDs survive reruns.
  await atomicWrite(file, JSON.stringify(registry, null, 2) + "\n");
  const rows = registry.invitations.map(entry => `| ${entry.name.replace(/\|/g, "\\|")} | ${entry.active ? "Đang hoạt động" : "Đã tắt"} | ${new URL(invitationPath(entry), base).href} |`);
  await atomicWrite(new URL("../invitations/LINKS.md", import.meta.url),
    "# Danh sách link thiệp riêng\n\nFile riêng tư; không đặt trong public hoặc chia sẻ cả danh sách cho khách.\n\n| Người được mời | Trạng thái | Link |\n|---|---|---|\n" + rows.join("\n") + "\n");
  console.log(`Generated ${registry.invitations.length} invitations. Existing IDs/tokens preserved. See app/graduation/invitations/LINKS.md.`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
