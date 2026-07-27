# Security notes — El Merkury Catering

Two very different things live in this repository:

- **`src/`** — a React demo. It has no backend, no auth and makes no network
  requests. Every button is simulated against `src/data/dummyData.js`.
- **`make-blueprints/`** — the Make.com automation that *does* touch real
  systems: it creates QuickBooks invoices, sends Square KDS tickets, writes
  HubSpot deals and emails customers.

Almost all real risk is in the second one. An unauthenticated request there
spends money and talks to clients; the worst case in the React app is that
someone sees fake data.

---

## Required setup — the blueprints will not work correctly without these

### 1. Generate the approval shared secret

Every state-changing route in `workflow-1b-approval-handler.json` is gated on a
shared secret. Generate one:

```bash
openssl rand -hex 32
```

Replace **`YOUR_APPROVAL_SHARED_SECRET`** with that value in *both* blueprints
(WF1a builds the link, WF1b validates it). They must match exactly.

### 2. Turn on the webhook's method and header parsing

In Make → Webhooks → `WF1b_Approval_Webhook` → **Show advanced settings**,
enable **Get request method**. The APPROVE / EDIT / REJECT routes filter on
`{{1.method}} = POST`; if this is off, `{{1.method}}` is empty and **every
action silently does nothing**. This fails closed rather than open, but it will
look like a broken scenario, so do it first.

### 3. Use a service-role key for Supabase, and enable RLS

The blueprints now send `YOUR_SUPABASE_SERVICE_ROLE_KEY`. The `anon` key is
public by design — it is safe only when RLS policies constrain it, and
`order_audit_log` holds customer names, emails, delivery addresses, order
totals and gross margin. Make.com runs server-side, so a service-role key is
appropriate there.

Enable RLS and grant nothing to anon:

```sql
alter table public.order_audit_log enable row level security;

-- No policies for anon/authenticated: with RLS on and no policy, both are
-- denied. service_role bypasses RLS, which is what Make.com uses.
revoke all on public.order_audit_log from anon, authenticated;
```

Verify it is actually closed — this must return an empty array or a permission
error, never rows:

```bash
curl -s "https://YOUR_PROJECT.supabase.co/rest/v1/order_audit_log?select=*" \
  -H "apikey: YOUR_ANON_KEY"
```

### 4. Protect the Vercel deployment

The demo bundle contains client organisation names and per-client margin
figures. `robots.txt`, the `noindex` meta tag and the `X-Robots-Tag` header
keep it out of search results, but none of those are access control. Turn on
**Vercel → Project → Settings → Deployment Protection** (Vercel Authentication
or a password) for all environments.

---

## What the blueprint changes defend against

| Risk | Control |
|---|---|
| Anyone with the webhook URL approving orders | Shared secret required on every route |
| Order-number enumeration (`EM-YYYYMMDD-NNN`) | Secret required; order must match `^EM-\d{8}-\d{3}$` |
| Mail scanners prefetching links and auto-approving | The emailed link is a read-only `action=review` page; approve/reject require a form POST |
| Replaying a link and double-billing | Every route requires `status = pending_review`, which the first run clears |
| Prompt injection from an inbound email | Body is delimited as untrusted data, HTML body dropped, model told it has no pricing authority |
| A customer claiming tax-exempt status | `is_penn_entity` computed from the verified sender domain, not from the model |
| Model-invented prices | Prices must be copied from the Square catalog; unmatched items are dropped and flagged |
| Forged buttons in the review email | Customer-controlled fields passed through `stripHTML()`; items rendered as text |
| `Location:` header injection via the order param | Redirect only runs after the order number passes the regex filter |

The review email now also shows a red banner when the parser detected an
instruction aimed at it, when gross margin is under 40%, or when requested
items had no catalog match.

---

## Known gaps, deliberately not addressed here

- **The shared secret is static.** A per-order nonce stored on the
  `Pending_Approvals` record would be better: leaking one email would then
  compromise one order rather than all of them. That needs an extra
  Set-variable module in WF1a, which is worth doing before go-live.
- **Workflow 5 (Square website order auto-processing) has no blueprint.** The
  Square paid-order webhook is unbuilt, so the Square integration is incomplete
  regardless of these fixes.
- **The React app is still entirely simulated.** Nothing in `src/` calls a real
  system. Do not read the green "Connected" states on the settings page as
  evidence of anything.
- **`react-scripts@5.0.1` is unmaintained** and drags in most of the 54
  `npm audit` findings. They are build-time transitive dependencies and are not
  reachable in the deployed static bundle. Do not run `npm audit fix --force`
  — it breaks the CRA build. Migrating to Vite is the real fix.
- **Client organisations and margins remain in `dummyData.js`**, and this
  GitHub repository is public. Personal contact names, emails and phone numbers
  have been replaced with `.example` equivalents, but if the org-level
  commercial data matters, make the repository private.
