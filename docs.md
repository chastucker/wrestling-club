You are helping me extend an existing Expo React Native app that uses Convex for backend. Do NOT replace my template or folder structure—only add/modify what’s needed. Use TypeScript everywhere.

## Goals

- Multi-tenant “wrestling club” app with 4 roles: admin, coach, wrestler, parent.
- Core features for MVP:

  1. Auth (role-aware)
  2. Calendar (list/week) with practice/competition events
  3. CRUD sessions + events (admin/coach)
  4. Payments for sessions (Stripe placeholder screens now, wire later)
  5. Sign-ups (enroll to a session)
  6. Attendance check-in (tap or QR) and roster view (admin/coach).

- Use `react-hook-form` for all forms (with `@hookform/resolvers` + `zod` for validation).
- Everything must be **club-scoped** via `clubId` (multi-tenant safe).

## Packages to add (only if missing)

- Frontend: `react-hook-form`, `@hookform/resolvers`, `zod`, `react-native-safe-area-context`, `react-native-reanimated`, `@expo/vector-icons`, `react-native-calendars` (or build a simple list/calendar), `expo-router` (if not already).
- Backend: `convex`, `zod`.

## Project structure (respect existing; create only if missing)

apps/mobile/

- app/
  - (auth)/login.tsx
  - (auth)/register.tsx
  - (tabs)/index.tsx // Home/Dashboard
  - (tabs)/calendar.tsx
  - (tabs)/sessions.tsx
  - (tabs)/profile.tsx
  - events/[id].tsx
  - sessions/[id].tsx
  - admin/ (only visible if role=admin/coach)
    - events.tsx
    - sessions.tsx
    - members.tsx
- components/
  - forms/Form.tsx // react-hook-form wrapper
  - forms/Field.tsx
  - ui/Button.tsx, Input.tsx, Select.tsx, Badge.tsx, Card.tsx
  - AttendanceQR.tsx
- lib/
  - theme.ts (can read remote theme JSON)
  - auth.ts (get current user + role + clubId)
  - convexClient.ts
  - validators.ts (zod schemas)
- state/
  - userStore.ts (role, clubId, profile)

convex/

- schema.ts
- auth.ts
- clubs.ts
- members.ts
- sessions.ts
- events.ts
- signups.ts
- attendance.ts

## Convex data model (create if missing)

- All tenant docs MUST include `clubId`.
- Tables & key indexes:
  - clubs: { id, name, slug, theme?: {primary,secondary,logoUrl}, stripe?: {connectedAccountId?, productIds?}, features?: Record<string, boolean> }
    - index: by_slug (slug)
  - users: { id, email }
  - clubMembers: { clubId, userId, role: 'admin'|'coach'|'wrestler'|'parent' }
    - index: by_club_user (clubId, userId)
  - sessions: { clubId, name, priceCents, scheduleJson, active }
    - index: by_club_name (clubId, name)
  - events: { clubId, type: 'practice'|'competition', startsAt, endsAt, title, location?, sessionId? }
    - index: by_club_startsAt (clubId, startsAt)
  - signups: { clubId, sessionId, userId, createdAt }
    - index: by_club_session (clubId, sessionId)
  - attendance: { clubId, eventId, userId, checkedInAt }
    - index: by_club_event (clubId, eventId)

## AuthZ middleware pattern

- Every query/mutation that reads/writes tenant data takes `{ clubId }`.
- Create a helper `requireRole(ctx, clubId, roles)` that:
  - Ensures user authenticated,
  - Confirms membership via `clubMembers by_club_user`,
  - Throws 403 if role not allowed.
- Reads (calendar, sessions list) require membership; writes require admin/coach.

## Minimal endpoints (build now)

- clubs.getTheme({ slug }) → { clubId, theme }
- members.me({ clubId }) → { role, user, club }
- sessions.list({ clubId }) → Session[]
- sessions.create/update/delete (admin/coach)
- signups.create({ clubId, sessionId }) (wrestler/parent)
- events.list({ clubId, from, to }) → Event[]
- events.create/update/delete (admin/coach)
- attendance.checkIn({ clubId, eventId }) (any member)
- attendance.listByEvent({ clubId, eventId }) (admin/coach)

## Multi-tenant Configuration (MVP)

- For MVP, use a local JSON configuration file with a constant to switch between club contexts
- Create `config/clubs.json` with club configurations:

```json
{
  "clubs": [
    {
      "id": "club-1",
      "slug": "eagle-wrestling",
      "name": "Eagle Wrestling Club",
      "theme": {
        "primary": "#1E40AF",
        "secondary": "#3B82F6",
        "logoUrl": "/images/eagle-logo.png"
      }
    },
    {
      "id": "club-2",
      "slug": "tiger-wrestling",
      "name": "Tiger Wrestling Club",
      "theme": {
        "primary": "#DC2626",
        "secondary": "#EF4444",
        "logoUrl": "/images/tiger-logo.png"
      }
    }
  ]
}
```

- Define current club with a constant: `const CLUB_INDEX = 0; // or 1, 2, etc.`
- App uses `club = clubsJson.clubs[CLUB_INDEX]` to determine current club context (name, colors, logo)
- Can be extended later to fetch from Convex database for dynamic multi-tenancy

## UI/flows

- On first launch, if this is a white-label build, app has a fixed `clubSlug` in env; fetch theme + clubId then store in state.
- For MVP: read club config from local JSON file using `CLUB_INDEX` constant to select which club configuration to use
- Role-aware tabs:
  - Wrestler/Parent: Home, Calendar, Sessions, Profile
  - Coach/Admin: Home, Calendar, Sessions, **Admin** (Events, Sessions, Members)
- Calendar screen: list upcoming events; optional `react-native-calendars` agenda.
- Session detail: enroll button → calls signups.create; show "Enrolled" state.
- Event detail: "Check in" button (enabled near start time); show roster if admin/coach.
- Admin Events & Sessions: use `react-hook-form` forms with Zod validation.

## react-hook-form conventions

- Build a `<Form>` wrapper that accepts `schema`, `defaultValues`, and `onSubmit`.
- Use controlled `<Field name="...">` components for Input/Select.
- Show inline errors from `formState.errors`.

## Example form (create session)

- Fields: name (string, required), priceCents (int, >=0), scheduleJson (stringified; keep simple), active (boolean).
- Zod schema with friendly messages.
- On submit: call `convex.mutation('sessions:create', { clubId, ...values })`.
- On success: toast + navigate back.

## DX constraints

- Keep diffs small, reuse existing components/styles.
- Add unit tests for validators and a couple of Convex functions.
- Annotate new files with brief JSDoc for future contributors.

## Deliverables

1. Convex schema & functions above + role guard helpers.
2. Mobile screens & navigation stubs for all flows.
3. Example `react-hook-form` implementation for Create Session and Create Event.
4. Feature-flag stub in `clubs.features` (e.g., { qrCheckIn: true }).
5. One seed script (or Convex script) to create a demo club + admin member.
