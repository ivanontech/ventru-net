# Ventru.net Registry Spec v0.1

This MVP treats the future agent-readable web as four layers:

1. **Discovery** — `robots.txt`, `/llms.txt`, `/.well-known/agent.json`, `/.well-known/agent-index.json`, `sitemap.xml`.
2. **Understanding** — normalized business profiles at `/api/businesses/{slug}/agent.json`.
3. **Action** — quote/book/pay/support endpoints at `/api/actions/{slug}/{action}`.
4. **Trust** — verified identity, license, insurance, reviews, response SLA, and eventually dispute history.

## Required Merchant Profile Fields

- `name`
- `category`
- `summary`
- `website`
- `serviceAreas[]`
- `services[]`
- `actions[]`
- `paymentMethods[]`
- `trust`
- `agentContact`

## Canonical Merchant URLs

- Human profile: `/profiles/{slug}`
- Agent profile: `/api/businesses/{slug}/agent.json`
- LLM summary: `/api/businesses/{slug}/llms.txt`
- Action endpoint: `/api/actions/{slug}/{action}`

## Import Flow

1. Human pastes current website URL.
2. `POST /api/import-url` fetches HTML.
3. Importer extracts title, meta description, JSON-LD/schema.org, service links, email, phone, and service areas.
4. Draft profile is prefilled for review.
5. Human publishes profile.
6. Registry exposes hosted `agent.json` and `llms.txt`.

## Monetizable Trust Fields

- verified business identity
- license verification
- insurance verification
- review count/rating
- response SLA
- uptime/API health
- dispute/refund history
- preferred-provider status
