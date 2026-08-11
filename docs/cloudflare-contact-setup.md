# Cloudflare contact form setup

The contact page is production-ready but intentionally remains in standby until Cloudflare bindings and secrets are configured.

## Turnstile

1. Create a Turnstile widget for `algotradecrypto.com` in Cloudflare.
2. Expose `TURNSTILE_SITE_KEY` as a Worker variable.
3. Store `TURNSTILE_SECRET_KEY` as an encrypted Worker secret.
4. Configure both values together. A partial configuration intentionally disables submission.

The Worker validates every token with Siteverify, including its `action` and `hostname`. Tokens are never trusted based on the browser result alone.

## Email binding

Onboard `algotradecrypto.com` in Cloudflare Email Service, verify the destination inbox, and add a restricted binding to the Worker configuration:

```json
{
  "send_email": [
    {
      "name": "EMAIL",
      "destination_address": "verified-destination@example.com",
      "allowed_sender_addresses": ["contact@algotradecrypto.com"]
    }
  ],
  "vars": {
    "CONTACT_DESTINATION_EMAIL": "verified-destination@example.com",
    "CONTACT_FROM_EMAIL": "contact@algotradecrypto.com",
    "TURNSTILE_SITE_KEY": "public-site-key"
  }
}
```

Set the secret separately:

```powershell
npx wrangler secret put TURNSTILE_SECRET_KEY
```

For local testing, copy `.dev.vars.example` to `.dev.vars`. Do not use production keys or a remote email binding unless a real test message is intended.
