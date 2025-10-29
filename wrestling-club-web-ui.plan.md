<!-- 5cee668b-3af5-428f-b8de-f4716c11b04c 6970b0de-6ab3-4022-87bb-2c8a710682c3 -->
# Wrestling Club Web UI Implementation Plan

## Page Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION                          │
│  /sign-in  →  /sign-up (with role selection)  →  /dashboard   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MAIN APP LAYOUT                            │
│  [Sidebar Navigation] + [Topbar with Role Switcher + Avatar]   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────┐
│                    ROLE-BASED DASHBOARD                        │
│                                                                │
│  Parent/Wrestler View:                                         │
│  • /dashboard (Home) - Next Practice, My Sessions, Tournaments │
│  • /schedule - Calendar view of practices & tournaments        │
│  • /sessions - Browse & enroll in sessions                     │
│  • /sessions/[id] - Session detail & payment                   │
│  • /tournaments - Browse tournaments                           │
│  • /tournaments/[id] - Tournament detail & show interest       │
│  • /relationships - Manage parent/wrestler links               │
│  • /check-in - Check in to practices                           │
│  • /payments - View payment history                            │
│                                                                │
│  Coach View (all above +):                                     │
│  • /dashboard - Coach stats (attendance events)                │
│  • /events - Manage practices & competitions                   │
│  • /events/[id]/roster - View event roster & attendance        │
│  • /tournaments/[id]/interest - View interest by weight class  │
│                                                                │
│  Admin View (all above +):                                     │
│  • /admin/sessions - Create/edit sessions & practices          │
│  • /admin/tournaments - Create/edit tournaments & manage teams │
│  • /admin/members - Manage members & roles                     │
│  • /admin/payments - View all payment statuses & export        │
└────────────────────────────────────────────────────────────────┘
```

## Implementation Structure

### 1. Setup & Configuration

- Update `globals.css` with wrestling club color variables from ui.docs.md
- Configure Tailwind with custom colors matching design system
- Install additional Shadcn components needed

### 2. Shadcn Components to Install

Install these via `npx shadcn@latest add [component]`:

- `input` - for forms
- `label` - for form labels
- `select` - for dropdowns
- `badge` - for status chips (Paid/Unpaid/Practice/Tournament)
- `tabs` - for tabbed interfaces
- `table` - for data tables
- `dialog` - for modals/drawers
- `avatar` - for user avatars
- `separator` - for dividers
- `toast` - for notifications
- `calendar` - for date selection
- `form` - for form handling
- `dropdown-menu` - already exists, verify
- `sheet` - for side drawers

### 3. Configuration System

Create `/src/config/appConfig.json` with multi-club configuration:

```json
{
  "apps": [
    {
      "id": "club-1",
      "name": "Elite Wrestling Academy",
      "clubName": "Elite Wrestling",
      "primaryColor": "#0f52ba",
      "secondaryColor": "#ffffff",
      "logo": "/logos/elite.png"
    }
  ]
}
```

Create `/src/lib/config.ts` to load and manage configuration with theme application utilities.

### 4. Mock Data Structure

Create `/src/lib/mockData.ts` with:

- Users (with multiple roles)
- Sessions (with practices, pricing, enrollment)
- Tournaments (with weight classes, interest, rosters)
- Practices (with attendance, check-ins)
- Payments (with status, dates, amounts)
- Relationships (parent-wrestler links)

### 4. Shared Components

Create in `/src/components/shared/`:

- `AppLayout.tsx` - Main layout with sidebar + topbar
- `Sidebar.tsx` - Navigation with role-based menu items
- `Topbar.tsx` - Role switcher + avatar menu
- `RoleSwitcher.tsx` - Dropdown to switch between user roles
- `RoleBadge.tsx` - Display role chips
- `StatTile.tsx` - Dashboard stat cards
- `EmptyState.tsx` - Empty state placeholder
- `StatusBadge.tsx` - Status chips (Paid/Unpaid/etc)
- `EventCard.tsx` - Card for practices/tournaments
- `SessionCard.tsx` - Card for sessions
- `DataTable.tsx` - Reusable table component

### 5. Authentication Pages

- `/src/app/(auth)/sign-in/page.tsx` - Sign in form
- `/src/app/(auth)/sign-up/page.tsx` - Sign up with role selection
- `/src/app/(auth)/layout.tsx` - Auth layout (centered, no sidebar)

### 6. Main App Pages (Protected)

All under `/src/app/(app)/` with shared layout:

**Dashboard:**

- `/dashboard/page.tsx` - Role-based home view

**Schedule:**

- `/schedule/page.tsx` - Calendar with tabs (Practices | Tournaments)

**Sessions:**

- `/sessions/page.tsx` - Sessions list/table
- `/sessions/[id]/page.tsx` - Session detail with enrollment
- `/sessions/[id]/enroll/page.tsx` - Enrollment & payment flow

**Tournaments:**

- `/tournaments/page.tsx` - Tournaments list
- `/tournaments/[id]/page.tsx` - Tournament detail & show interest
- `/tournaments/[id]/interest/page.tsx` - Interest by weight (Coach view)

**Relationships:**

- `/relationships/page.tsx` - Manage parent/wrestler connections

**Check-In:**

- `/check-in/page.tsx` - Live practice check-in

**Payments:**

- `/payments/page.tsx` - Payment history/status

**Events (Coach):**

- `/events/page.tsx` - Manage practices & competitions
- `/events/[id]/roster/page.tsx` - Event roster & attendance

**Admin:**

- `/admin/sessions/page.tsx` - Create/edit sessions & practices
- `/admin/tournaments/page.tsx` - Create/edit tournaments
- `/admin/tournaments/[id]/manage/page.tsx` - Manage teams & roster
- `/admin/members/page.tsx` - Member & role management
- `/admin/payments/page.tsx` - All payment statuses & export

### 7. Utilities & Hooks

- `/src/lib/roleUtils.ts` - Role checking utilities
- `/src/hooks/useUserRole.ts` - Hook to get current user role
- `/src/hooks/useRoleAccess.ts` - Hook for role-based access control

### 8. Route Protection

- Update `/src/middleware.ts` - Add role-based route guards
- Create role checking logic for conditional rendering

### 9. Type Definitions

- `/src/types/index.ts` - TypeScript types for User, Session, Tournament, etc.

## Design System Implementation

### Colors (from ui.docs.md)

```css
--color-primary: #0f52ba (blue)
--color-primary-foreground: #ffffff
--color-secondary: #ffffff
--color-secondary-foreground: #0f172a
--color-bg: #f8fafc
--color-card: #ffffff
--color-border: #e2e8f0
--color-muted: #94a3b8
--color-success: #16a34a
--color-warning: #f59e0b
--color-danger: #dc2626
```

### Typography

- Font: Inter (system fallback)
- Display: 24px / 700
- H1: 20px / 700
- H2: 18px / 600
- Body: 16px / 500
- Caption: 12px / 500

### Spacing & Borders

- Radius: sm=6px, md=10px, lg=14px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32px
- Shadow: 0 1px 2px rgba(0,0,0,0.06)

## Key Features Per Page

**Dashboard:**

- Role-specific stat tiles
- Next practice card with check-in CTA
- My sessions section
- Upcoming tournaments section

**Schedule:**

- Tabs for Practices | Tournaments
- Table/list view grouped by date
- Filter by date range

**Sessions:**

- Table with name, date range, repeat, price, enrollment status
- Create/Edit drawer (admin only)
- Enroll buttons with payment flow

**Tournaments:**

- Table with name, date, location
- Show interest form with weight class selection
- Interest management (coach view)
- Team assignment (admin view)

**Relationships:**

- Current links display
- Pending invites
- Link existing user or send invite

**Check-In:**

- Live practice display
- Large check-in button
- Confirmation state

**Payments:**

- Filterable table (session/practice/member)
- Status badges (Paid/Unpaid)
- Export CSV (admin)

**Admin Sections:**

- Member management with role assignment
- Session/practice creation with repeat patterns
- Tournament creation with weight classes
- Payment oversight with export

## Navigation Structure

Sidebar menu items (role-based visibility):

**All Users:**

- Home (Dashboard)
- Schedule
- Sessions
- Tournaments
- Relationships
- Check-In
- Payments

**Coach+ Only:**

- Events

**Admin Only:**

- Admin (with submenu)
  - Sessions & Practices
  - Tournaments
  - Members & Roles
  - Payment Status

### To-dos

- [ ] Update globals.css with wrestling club color variables and install required Shadcn components
- [ ] Create comprehensive mock data file with users, sessions, tournaments, practices, payments, and relationships
- [ ] Define TypeScript types for all entities (User, Session, Tournament, Practice, Payment, Relationship)
- [ ] Build shared components (AppLayout, Sidebar, Topbar, RoleSwitcher, RoleBadge, StatTile, StatusBadge, DataTable, EmptyState)
- [ ] Create authentication pages (sign-in, sign-up with role selection) with auth layout
- [ ] Build role-based dashboard page with stat tiles and quick access cards
- [ ] Create schedule page with tabs for practices and tournaments
- [ ] Build sessions list, detail, and enrollment pages
- [ ] Create tournaments list, detail, and interest management pages
- [ ] Build relationships management page for parent/wrestler connections
- [ ] Create check-in page with live practice display and check-in button
- [ ] Build payments page with filterable table and status badges
- [ ] Create coach events pages (list and roster views)
- [ ] Build all admin pages (sessions, tournaments, members, payments management)