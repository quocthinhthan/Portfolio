# The Final Commit — Graduation 2026

Route: `/graduation`. Personalized example: `/graduation?to=Anh%20Tuấn`.

The sanitized `to` name appears with “Trân trọng kính mời” on both the opening cover and the hero after opening. Include honorifics directly in the name when appropriate (for example, `Thầy Nguyễn Văn An`). Without `to`, both views greet “Quý thầy cô, gia đình & bạn bè”.

The invitation uses a warm-white and champagne-gold palette, with charcoal text and light surfaces throughout. Palette tokens are scoped in `graduation.module.css`; its existing typography is preserved. The Open Graph preview follows the same palette.

The invitation has a Google Sheets RSVP backend through a Next.js API route. RSVP is configured as live after successful local write checks; every deployment requires its own server environment variables. See [Google Sheets setup](./GOOGLE_SHEETS_SETUP.md). Set `responses.mode` to `demo` for previews without response delivery.

## Update the invitation

Edit **graduation.config.ts** for name, class, dates, venue, map link, photos, and timeline.

- `sections.showMemories`: currently `false`, hiding the gallery while keeping its component intact. Set to `true` after adding gallery photos to show it again. `SectionLabel` automatically numbers visible sections in page order, so hiding or reordering sections never leaves gaps.

- `ceremony.date`: `YYYY-MM-DD`.
- `ceremony.startTime` / `endTime`: `HH:mm`, Vietnam time (UTC+7).
- An empty or invalid date/time disables calendar downloads. Empty end time defaults to two hours; an end before the start is interpreted as the next day.
- Countdown uses the Vietnam calendar day: the entire ceremony day says “Today is the day”, and following days say “A day to remember”. It does not depend on the visitor's time zone.
- Place photos in `public/images/graduation/` and set config paths. Empty or failed photos have a designed fallback. `position` controls the crop. Gallery supports up to six photos.
- The social preview is generated at `/graduation/opengraph-image`. Update `siteUrl` if the production domain changes.

## Responses

`services/invitation.ts` exposes a typed adapter with `submitRSVP` and `submitNote`. RSVP supports `yes`, `maybe`, and `no`. In **demo** mode no responses are sent or saved to the host, and the UI states this. A random response ID is kept in browser storage for future retries/edits, without storing the guest's name or message there. Guestbook notes always remain a separate demo in React state and disappear on reload.

To enable real RSVP, deploy `google-sheets/Code.gs`, configure `RSVP_SCRIPT_URL` and `RSVP_SCRIPT_SECRET` on the server, verify writes, then set `responses.mode` to `live`. The API validates input and bounds request size; the script verifies the secret, limits requests with a best-effort cache, and uses a lock to update/append by response ID. Changing the mode alone fails closed. Return `{ mode: "live" }` only after a confirmed write. Guestbook persistence and public note moderation are outside this integration.

## Optional QR

`createInvitationUrl(baseUrl, name)` creates a sanitized share URL. `InvitationQR` accepts a `renderCode(url)` renderer from a local QR library when needed. No QR encoder dependency is installed and no guest names are sent to a remote QR service. The QR component is not mounted on the invitation.

## Check

`npm run lint`, `npm run build`. Utility checks can be run with:

```sh
node --experimental-strip-types --test app/graduation/tests/*.test.mjs
```

UI checklist: open cover, keyboard focus, personalized long name, both RSVP responses, note validation, gallery dialog Escape/focus return, reduced motion, 375/390/430/768px and desktop.
