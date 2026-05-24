# Merchant Onboarding Flow

## Pitch

Paste your current website. We convert it into the AI-agent-readable version of your business.

## 3-Step Flow

### 1. Import

Merchant enters website URL. Importer extracts:

- business name
- meta description / H1 summary
- JSON-LD/schema.org business data
- service links
- service areas
- email / phone
- category guess
- default agent actions

### 2. Preview

Merchant reviews:

- business summary
- services
- locations
- actions agents can take
- payment methods
- contact details
- trust/verification status

### 3. Publish

Registry hosts:

- `/api/businesses/{slug}/agent.json`
- `/api/businesses/{slug}/llms.txt`
- `/profiles/{slug}`

Future paid publish gates:

- free unverified hosted profile
- verified profile subscription
- pay-per-lead routing
- transaction fee for quote/book/pay
- API usage for agent platforms

## Lowest-Friction Install Options Later

- Hosted profile only: no website edit needed.
- Copy-paste `<link rel="alternate" type="application/json" href="...agent.json">` into website header.
- Add `/llms.txt` file to their site.
- Add `.well-known/agent.json` to their site.
- WordPress/Shopify plugin that syncs automatically.
