# The Final Commit — Graduation 2026

Public route: `/graduation`. Private invitations: `/graduation/<slug>/<six-character-token>`. See [private invitation setup](./INVITATIONS_SETUP.md) and the generated [links](./invitations/LINKS.md).

Only a valid, active token can personalize the cover/hero and enable RSVP. Names come from the server-only JSON registry; `?to` is ignored. A mismatched slug redirects to the canonical link. Include honorifics in the registry name. The public page greets “Quý thầy cô, gia đình & bạn bè” and cannot submit RSVP.

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

`services/invitation.ts` exposes a typed adapter with `submitRSVP` and `submitNote`. RSVP supports `yes`, `maybe`, and `no`. The API resolves the invitation token and adds canonical `invitation_id`/`invited_name`; it ignores client-supplied recipient names/IDs and does not forward tokens to Google. Deduplication uses the invitation ID across browsers/devices; no browser storage is required. Demo mode sends nothing. Guestbook notes remain a separate demo in React state.

Deploy the updated `google-sheets/Code.gs`, run `setupRSVP` to migrate old headers without deleting data, and keep `RSVP_SCRIPT_URL`/`RSVP_SCRIPT_SECRET` on the server. The website requires schema version 2 and confirms only successful writes. The script uses a lock and best-effort limits to update/append by invitation ID. Guestbook persistence and public note moderation are outside this integration.

## Optional QR

`createInvitationUrl(baseUrl, { slug, token })` builds a URL for an existing invitation. `InvitationQR` takes a selected invitation and a local `renderCode(url)` renderer. It never receives the full registry. No QR encoder dependency is installed; the QR component is not mounted.

## Check

`npm run lint`, `npm run build`. Utility checks can be run with:

```sh
node --experimental-strip-types --test app/graduation/tests/*.test.mjs
```

UI checklist: open cover, keyboard focus, all three RSVP states, invalid/revoked tokens, slug redirects, ignored `?to`, generic RSVP lock, reduced motion, mobile and desktop.
