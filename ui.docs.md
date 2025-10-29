# 🏆 Wrestling Club App – Project Overview

This project is a **multi-tenant sports-management platform** built for wrestling clubs.  
It’s designed to serve three primary user types—**Admins, Coaches, and Wrestlers/Parents**—across both **mobile (Expo)** and **web (Next.js)** apps.  

The goal is to simplify club operations by providing:
- Centralized practice and tournament scheduling  
- Seamless session enrollment and payments  
- Transparent attendance and roster tracking  
- Relationship management between parents and wrestlers  
- Scalable, white-label architecture so new clubs can launch quickly  

## 🧱 Architecture
- **Frontend:** Expo (React Native) for mobile and Next.js for web  
- **Backend:** Convex for real-time data sync and role-based permissions  
- **Payments:** Stripe (per-practice and per-session)  
- **Design System:** shadcn-style component library with theming via CSS variables  
- **Theming:** `--color-primary` (#0f52ba) and `--color-secondary` (#ffffff) are global variables; change per club for white-label branding.

## 👥 Roles & Permissions
| Role | Capabilities |
|------|---------------|
| **Admin** | Full CRUD on sessions, practices, tournaments, pricing, and member roles. |
| **Coach** | Manage events, track attendance, view payments, and can also act as parent/wrestler. |
| **Parent/Wrestler** | Enroll and pay for sessions, check in to practices, view schedules, show interest in tournaments, and link to one another. |

## 🧭 Core Features
1. **Authentication & Role Management**  
   Sign up as coach/parent/wrestler. Admins approve coaches; admins are DB-assigned. Coaches can switch between roles.  

2. **Sessions & Practices**  
   Groups of practices with weekly repeats. Wrestlers/parents can enroll and pay per session or per practice. Coaches/admins view attendance and payment status.

3. **Tournaments**  
   Wrestlers/parents show interest (with weight class). Coaches/admins manage rosters, teams, and attendance.

4. **Payments**  
   Admins set pricing; parents/wrestlers pay via Stripe. Coaches/admins monitor paid/unpaid status.

5. **Relationships**  
   Parents/wrestlers can link or invite each other to manage connected profiles.

6. **Attendance & Check-In**  
   Live check-in for practices with rosters visible to coaches/admins.

## 💻 Platform Parity
Both mobile and web apps share the same core functionality, ensuring users can perform all tasks from either device.

---

# Wrestling Club App – Figma Make Import

## 🎨 Design System

### Color Variables
- --color-primary: #0f52ba
- --color-primary-foreground: #ffffff
- --color-secondary: #ffffff
- --color-secondary-foreground: #0f172a
- --color-bg: #f8fafc
- --color-card: #ffffff
- --color-border: #e2e8f0
- --color-muted: #94a3b8
- --color-success: #16a34a
- --color-warning: #f59e0b
- --color-danger: #dc2626

### Typography
- Inter, System
- Display 24 / 700
- H1 20 / 700
- H2 18 / 600
- Body 16 / 500
- Caption 12 / 500

### Radii & Shadows
- Radius: sm=6, md=10, lg=14
- Shadow: 0 1px 2px rgba(0,0,0,0.06)

### Spacing
- Scale: 4,8,12,16,20,24,32

---

## 🧩 Components
- Button (Primary, Secondary, Ghost, Destructive)
- Input (with Label + Error)
- Select
- DateTime Field
- Chip/Badge (Practice | Competition | Tournament | Paid | Unpaid)
- Tabs (Underline)
- Card (Header/Body/Footer)
- List Item
- Table (Web)
- Toast (Success/Error)
- RoleBadge
- RoleSwitcher
- QRPanel
- StatTile
- Empty State

---

## 📱 Mobile Screens (390×844)

### Auth / Sign Up
- Header “Create account”
- Choose Role: Coach, Parent, Wrestler
- Email / Password fields
- Continue button

### Auth / Relationship Link
- Tabs: Link Existing | Invite
- Link: Input email/phone, Send Link
- Invite: Input email/phone, Send Invite → Pending Chip

### Home / Overview
- Next Practice card (Check-in CTA)
- My Sessions section
- Upcoming Tournaments section

### Schedule / Calendar
- Tabs: Practices | Tournaments
- List grouped by date

### Session / Detail
- Title, Date Range, Repeat Badge
- Price per-session/per-practice
- Enroll Buttons

### Enroll & Pay
- Step 1: Choose Enroll Type
- Step 2: Payment Summary
- CTA Proceed to Payment

### Tournaments / Detail
- Info: Date, Location, Weight Classes
- CTA Show Interest
- Form: Weight Select + Notes

### Relationships / Hub
- Current Links
- Pending Invites
- Actions: Link Existing, Invite

### Check-In / Practice
- Live Practice Header
- Big Check-In Button
- Confirmation State

### Coach / Dashboard
- Stat Tiles: Today’s Practices, Checked-in, Unpaid, Tournaments
- Quick Links: Events, Attendance, Payments, Switch Role

### Coach / Events
- List of Practices / Competitions
- Event / Roster List with Status Chips

### Coach / Tournaments / Interest
- Table Grouped by Weight
- Elect to Attend Button

### Coach / Payments
- Filters: Session / Practice / Member
- Table: Name, Item, Status

### Admin / Sessions & Practices
- List Sessions
- Create/Edit Session Form (date, repeat, price)
- Edit Practice (per occurrence)

### Admin / Tournaments
- Create/Edit Tournament
- Manage: Teams, Accepted, Staff Attending

### Admin / Members & Roles
- Member List
- Invite Coach
- Edit Roles (Multi-role toggle)

### Admin / Payment Status
- Table: Paid / Unpaid
- Export CSV

---

## 💻 Web Screens (1440×900)

### Layout
- Sidebar: Home, Schedule, Sessions, Tournaments, Relationships, Payments, Admin
- Topbar: Role Switcher, Avatar Menu

### Home
- Stat Tiles Row
- Next Practice, My Sessions, Upcoming Tournaments

### Schedule
- Tabs: Practices | Tournaments
- Table: Date, Title, Location, Type, Actions

### Sessions
- Table: Name, Date Range, Repeat, Price, Status
- Drawer: Create/Edit Session

### Tournaments
- Table: Name, Date, Location, Interest
- Detail: Overview + Interest by Weight
- Assign Teams, Accept Roster, Staff Attending

### Relationships
- Columns: Current Links, Pending Invites
- Toolbar: Link Existing, Invite

### Check-In
- Table: Practices, Roster with Status

### Payments
- Filters: Session / Practice / Member
- Table: Member, Item, Status, Date
- Export

### Admin / Members & Roles
- Table: Name, Email, Roles, Actions
- Drawer: Role Checkboxes

---

## ⚙️ Variables & Theming
- Change --color-primary and --color-secondary for club-specific branding
- Apply tokens to components for white-label themes

## 🧭 Prototyping Notes
- Mobile Start → Auth → Home → Schedule → Session → Pay → Confirmation
- Web Start → Home → Sessions → Drawer → Tournaments → Members