# Account Portal — Rough Idea

## 1. Account Portal

Rebuild the settings into an account portal. This would house all 3 pages:
- Dashboard
- Certificates
- Profile

Use a standard design that would be able to house all 3 in a consistent UI. Test that this UI looks good using Playwright and screenshots.

## 2. Admin Section

For certain users, add an admin section that would let admins see all users accessing the platform and their progress.

- Default only `roy@bodyspec.com` to admin for now
- Should be able to promote other `@bodyspec.com` users to admins
- Admins can promote other users to admins as well
- Admins can also delete other non-admin users
- Admins can demote other admins to non-admin status

## 3. Certificate PDF Fix

The certificates PDF download does not currently work. Need to:
- Add a test to verify functionality
- Both render and be able to download
- Verify via Playwright test that we're able to open the final PDF

## 4. Reset Progress

In the user settings area (once added), add a "Reset progress" feature:
- Wrap in lots of warnings saying this cannot be undone
- Require some verification, not just one button click

Once implemented, test via Playwright. This should reset the Playwright test account status and enable incremental feature testing to verify progress happens (completing modules, quizzes, etc).
