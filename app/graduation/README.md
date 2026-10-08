# The Final Commit — Graduation 2026

Route: `/graduation`. Personalized example: `/graduation?to=Anh%20Tuấn`.

The sanitized `to` name appears with “Trân trọng kính mời” on both the opening cover and the hero after opening. Include honorifics directly in the name when appropriate (for example, `Thầy Nguyễn Văn An`). Without `to`, both views greet “Quý thầy cô, gia đình & bạn bè”.

The invitation uses a warm-white and champagne-gold palette, with charcoal text and light surfaces throughout. Palette tokens are scoped in `graduation.module.css`; its existing typography is preserved. The Open Graph preview follows the same palette.

This invitation is frontend-only. No backend, database, third-party form service, or response delivery is installed or required.

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

`services/invitation.ts` exposes a typed adapter with `submitRSVP` and `submitNote`. The initial implementation is a **demo**: no network request, persistence, or delivery to the host. This is stated in the forms and confirmation messages. Notes live in React state and disappear on reload.

To connect a backend, replace the adapter methods with your API or provider calls, return `{ mode: "live" }` only after a successful write, then change `responses.mode` to `live`. Changing the config alone deliberately fails closed. Validate on the server, add rate limits, and moderate public notes. Keep server secrets out of client modules. Fetch approved notes through your backend when adding persistent guestbook reading.

## Optional QR

`createInvitationUrl(baseUrl, name)` creates a sanitized share URL. `InvitationQR` accepts a `renderCode(url)` renderer from a local QR library when needed. No QR encoder dependency is installed and no guest names are sent to a remote QR service. The QR component is not mounted on the invitation.

## Check

`npm run lint`, `npm run build`. Utility checks can be run with:

```sh
node --experimental-strip-types --test app/graduation/tests/utils.test.mjs
```

UI checklist: open cover, keyboard focus, personalized long name, both RSVP responses, note validation, gallery dialog Escape/focus return, reduced motion, 375/390/430/768px and desktop.
