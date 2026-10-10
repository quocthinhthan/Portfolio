/** Real smoke test: writes one synthetic RSVP, then retries/updates the same ID.
 * Run with the Next.js server running:
 *   node app/graduation/google-sheets/test-rsvp.mjs
 *   node app/graduation/google-sheets/test-rsvp.mjs https://your-domain.example
 * No Google credentials are read or printed by this script.
 */
import { randomUUID } from "node:crypto";

const base = new URL(process.argv[2] || "http://localhost:3000");
if (base.protocol !== "https:" && !(base.protocol === "http:" && ["localhost", "127.0.0.1"].includes(base.hostname))) {
  throw new Error("Use HTTPS for a public site, or HTTP for localhost.");
}
const endpoint = new URL("/api/graduation/rsvp", base);
const responseId = randomUUID();
const environment = ["localhost", "127.0.0.1"].includes(base.hostname) ? "local" : "production";
console.log(`Testing ${endpoint.origin}; test response_id: ${responseId}`);

const steps = [
  { label: "Create maybe", attendance: "maybe" },
  { label: "Retry same response", attendance: "maybe" },
  { label: "Update to yes", attendance: "yes" },
  { label: "Update to no", attendance: "no" },
];

try {
  for (const step of steps) {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: base.origin },
      body: JSON.stringify({
        responseId,
        name: `TEST RSVP ${environment}`,
        attendance: step.attendance,
        message: "Phản hồi thử kết nối. Không tính là khách mời thật.",
        website: "",
      }),
      signal: AbortSignal.timeout(35_000),
    });
    const data = await result.json().catch(() => null);
    if (!result.ok || data?.ok !== true) {
      console.error(`${step.label}: FAILED, HTTP ${result.status}. ${typeof data?.error === "string" ? data.error : "API did not confirm the write."}`);
      process.exitCode = 1;
      break;
    }
    console.log(`${step.label}: OK, HTTP ${result.status}`);
  }
  if (!process.exitCode) {
    console.log(`All four writes acknowledged. In Google Sheets, verify exactly ONE row with response_id ${responseId}, attendance=no, attendance_label=Không tham dự, and the original created_at.`);
    console.log("The marked test row is kept for inspection. Each new script run creates one new test ID.");
  }
} catch {
  console.error("Connection timed out or failed. Check the dev server/deployment; any acknowledged test row remains in the Sheet.");
  process.exitCode = 1;
}
