# Deployment Notes

## Local

```bash
npm test
PORT=8787 node src/server.js
```

Open:

```txt
http://localhost:8787
```

## LAN Demo

Find Mac LAN IP:

```bash
ipconfig getifaddr en0
```

From another machine on the same network:

```txt
http://<mac-lan-ip>:8787
```

## Production Later

Good cheap deployment options:

- Cloudflare Workers/Pages with D1 or KV
- Fly.io Node app
- Railway/Render for quick demo
- VPS + Caddy reverse proxy

## Production Checklist

- Replace JSON file DB with Postgres/SQLite/D1.
- Add auth/admin dashboard.
- Add rate limits to `/api/import-url`.
- Add SSRF protection for importer before public internet launch.
- Add queue/background job for imports.
- Add domain verification before verified badge.
- Add payment provider for verification/lead routing.
- Add email notifications for captured agent actions.
