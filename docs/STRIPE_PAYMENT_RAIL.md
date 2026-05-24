# Ventru.net Stripe Payment Rail

Ventru has two payment rails:

- **x402** — machine-native payments for autonomous agents and paid API calls.
- **Stripe** — familiar card/subscription/invoice checkout for humans, merchants, and enterprise buyers.

## Why Stripe belongs beside x402

x402 is strategically correct for agents, but Stripe is the adoption bridge. A local business, agency, clinic, or SaaS buyer already understands card checkout and monthly subscriptions. Ventru should not force those buyers into crypto rails before the network has trust.

The product rule:

```txt
agent pays API/micro-usage → x402
business claims/verifies/profile subscription → Stripe
enterprise buyer wants invoice/card → Stripe
crypto-native autonomous flow → x402
```

## Machine-readable endpoints

- `GET /.well-known/payment-rails.json` — dual rail manifest.
- `GET /.well-known/stripe.json` — Stripe checkout manifest.
- `GET /api/stripe/quote?plan=verified` — card checkout quote.
- `POST /api/stripe/checkout-session` — create a Stripe Checkout Session, or a safe demo checkout object if no `STRIPE_SECRET_KEY` is configured.
- `POST /api/stripe/webhook` — reserved webhook endpoint; production must verify `Stripe-Signature`.

## MVP behavior

Without `STRIPE_SECRET_KEY`, Ventru returns a demo checkout object:

```json
{
  "ok": true,
  "mode": "demo",
  "provider": "stripe",
  "checkout_url": "https://buy.stripe.com/ventru-demo-action-capsule?..."
}
```

With `STRIPE_SECRET_KEY`, Ventru calls Stripe Checkout directly using `application/x-www-form-urlencoded` and returns the real `checkout_url`.

## Production requirements

Before granting paid access in production:

1. Store the created Stripe Checkout Session ID.
2. Verify `checkout.session.completed` via signed Stripe webhook.
3. Match `client_reference_id` / metadata purpose to the requested Ventru resource.
4. Only then unlock claimed profile, verification review, Action Capsule eligibility, or paid API credits.
5. Never trust a client-side redirect alone as proof of payment.

## Strategic positioning

Stripe does not replace x402. It expands the market.

- **x402** is for the future agent economy.
- **Stripe** is for today's businesses that pay real invoices now.

Together they make Ventru credible to both autonomous agents and merchants.
