# Ventru Action Capsule v0.1

This is the proprietary wedge for Ventru.net.

Traditional websites expose pages. Early AI-ready sites expose `llms.txt`, `agent.json`, OpenAPI, and MCP tools. Ventru adds the layer agents will actually need when they stop browsing and start acting:

```txt
user intent → ranked trusted route → executable route body → commercial disclosure → receipt template → expiry → signature
```

## Why this matters

Search engines rank pages. Agents need signed, executable outcomes.

A future agent does not want ten tabs for "roof repair Palm Beach." It wants one machine-native object containing:

- the user intent
- ranked providers
- trust policy
- commercial disclosure
- executable quote/book/pay route bodies
- required fields the agent must collect
- receipt template
- expiry timestamp
- SHA-256 HMAC signature

## Endpoint

```txt
POST /api/capsule
```

Example:

```json
{
  "intent": "emergency roof repair palm beach"
}
```

## Output

Returns a `signed_action_capsule` object with:

- `id` — capsule id, e.g. `cap_...`.
- `issuer` — `Ventru.net`.
- `intent` — normalized user intent.
- `trust_policy` — routing constraints agents can inspect.
- `commercial_disclosure` — fees/attribution disclosure.
- `route_packet` — underlying ranked intent route.
- `executable_routes` — exact POST endpoints and body templates.
- `receipt_template` — proof object for the provider/action result.
- `issued_at` / `expires_at` — short-lived capsule window.
- `signature` — `sha256:<hmac>` seal.

## Relationship to Intent Packets

`POST /api/intent` is useful for routing/debugging. `POST /api/capsule` is the product primitive.

Intent Packet:

```txt
ranked route plan
```

Action Capsule:

```txt
signed, expiring action object an agent can execute and later prove
```

## Defensibility

The open standards are discovery files. The moat is route quality + trust + transaction attribution + signed execution receipts. If Ventru becomes the place agents ask "give me a safe, signed way to complete this task," the protocol becomes monetizable even if everyone copies `agent.json`.
