# Account Portal — Requirements

## Questions & Answers

### Q1: Account Portal Layout

The three protected pages (Dashboard, Certificates, Profile) already exist as separate routes. When you say "rebuild into an account portal," what layout do you have in mind?

Options:
- **A) Sidebar navigation** — A left sidebar with links (Dashboard, Certificates, Profile, Admin) and the content area on the right, all under a single `/account` route prefix
- **B) Tab-based** — A horizontal tab bar at the top of the content area switching between the pages
- **C) Keep separate routes but unify the visual wrapper** — Same URLs, but each page gets a consistent card/panel layout with shared sub-navigation

**A1:** Sidebar navigation — left sidebar with links, content area on the right, all under `/account` route prefix.

---

### Q2: Sidebar Responsiveness

On mobile/small screens, how should the sidebar behave?

Options:
- **A) Collapse to a top horizontal nav** — Sidebar links become a horizontal bar or dropdown above the content
- **B) Hamburger toggle** — Sidebar hides behind a toggle button, slides in as an overlay
- **C) Bottom tab bar** — Common mobile pattern; sidebar links move to a fixed bottom bar

**A2:** Hamburger toggle — sidebar hides behind a toggle button, slides in as an overlay on mobile.

---

### Q3: Admin Role Storage

There's currently no admin concept in the user model. Where should the admin flag live?

Options:
- **A) Database column** — Add an `is_admin` boolean to the `users` table. Simple, queried directly. Default `roy@bodyspec.com` via a migration.
- **B) Keycloak roles** — Manage admin role in Keycloak and read it from the JWT token. Keeps authorization centralized in the identity provider but adds Keycloak configuration dependency.

**A3:** Database column — add `is_admin` boolean to the `users` table. Seed `roy@bodyspec.com` as admin via migration.

---

### Q4: Admin User Management — What Data to Show?

The admin section should show all users and their progress. What level of detail do you want in the user list?

Options:
- **A) Summary view** — Table with: name, email, role type, last login, overall progress (% complete), number of certificates. Click a user row to see detailed progress.
- **B) Detailed table** — Everything visible in the table itself: per-module progress, quiz scores, certificate status, all in expandable rows.
- **C) Summary table + export** — Summary view (like A) but with the ability to export/download a CSV of all user data for offline analysis.

**A4:** Summary view — table with name, email, role type, last login, overall progress, certificates count. Click a row for detailed user progress.

---

### Q5: Admin Promotion Restrictions

You mentioned only `@bodyspec.com` users can be promoted to admin. Should this email domain restriction be enforced?

- **A) Hard enforce** — Backend rejects promoting any non-`@bodyspec.com` user to admin. No exceptions.
- **B) Soft enforce** — UI only shows the promote option for `@bodyspec.com` users, but no backend restriction (flexibility for future).
- **C) No restriction** — Any user can be promoted to admin by an existing admin.

**A5:** Hard enforce — backend rejects promoting non-`@bodyspec.com` users. Frontend also hides the option for non-`@bodyspec.com` users.

---

### Q6: Reset Progress — Scope

When a user resets their progress, what should be cleared?

- **A) Everything** — Section progress, quiz attempts, AND certificates. Full clean slate.
- **B) Progress and quizzes only** — Clear section completions and quiz attempts, but keep earned certificates intact.
- **C) User chooses** — Present checkboxes letting the user pick what to reset (sections, quizzes, certificates independently).

**A6:** User chooses — checkboxes for sections, quizzes, and certificates independently.

---

### Q7: Reset Progress — Confirmation Flow

You mentioned requiring more than one click. What confirmation flow do you want?

- **A) Two-step modal** — First click opens a modal with warnings and checkboxes for what to reset. Second click ("Confirm Reset") executes it.
- **B) Type-to-confirm** — Modal with warnings, then user must type a confirmation phrase (e.g., "RESET") before the button becomes active. Similar to GitHub's repo deletion flow.
- **C) Two-step + cooldown** — Modal with warnings, then a countdown timer (e.g., 5 seconds) before the confirm button becomes clickable.

**A7:** Type-to-confirm — modal with warnings, checkboxes for what to reset, then user must type "RESET" before the confirm button becomes active.

---

### Q8: Certificate PDF — What's Broken?

Before I design the fix, I need to understand the issue. Do you know what specifically is broken about the PDF download?

- **A) Not sure** — Just know it doesn't work. Investigate during research phase.
- **B) Rendering issue** — The PDF generates but looks wrong or is corrupted.
- **C) Download issue** — The PDF never reaches the browser / download doesn't trigger.
- **D) WeasyPrint issue** — The server-side generation itself fails (500 error, dependency issue, etc.).

**A8:** Not sure — but it may be downloading a `pdf.json` instead of an actual PDF file. Suggests a content-type or response handling issue. Investigate during research phase.

---

### Q9: Admin — Delete User Behavior

When an admin deletes a non-admin user, what should happen?

- **A) Hard delete** — Remove the user and all their data (progress, quiz attempts, certificates) from the database entirely.
- **B) Soft delete** — Mark the user as deactivated/disabled but keep their data. They can't log in but records are preserved.
- **C) Delete with certificate preservation** — Remove the user record and progress, but keep issued certificates valid (they're public-facing verification links).

**A9:** Hard delete — remove the user and all their data (progress, quiz attempts, certificates) from the database. Cascade delete.

---

### Q10: Navigation Changes

Currently the top nav has a user dropdown with Dashboard, Certificates, Profile links. With the new `/account` portal, should the top nav simplify?

- **A) Single "Account" link** — Replace the three dropdown items with one "Account" link that goes to `/account/dashboard`. The sidebar handles sub-navigation from there.
- **B) Keep dropdown but link into portal** — Keep the dropdown items but have them link to `/account/dashboard`, `/account/certificates`, `/account/profile` respectively.

**A10:** Single "Account" link — replace the dropdown items with one "Account" link to `/account/dashboard`. Sidebar handles sub-navigation. Keep "Sign Out" accessible (either in sidebar or top nav).

---

### Q11: Admin Sidebar Visibility

Should the "Admin" link in the sidebar be visible to non-admin users?

- **A) Hidden** — Non-admins don't see the Admin link at all. Cleaner UX.
- **B) Visible but disabled** — Non-admins see it grayed out. Signals the feature exists (useful if you want people to know admins exist).

**A11:** Hidden — non-admins don't see the Admin link at all. Backend still enforces authorization.
