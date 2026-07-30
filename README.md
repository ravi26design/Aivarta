# AI VARTA

A pixel-faithful, multi-page HTML/CSS prototype for **AI VARTA** — a platform to create and manage multiple **Chat** and **Voice** AI agents.

## What's inside
- **Marketing site** — Home, Pricing, Contact, Privacy / Refund / Terms
- **Auth** — Login → OTP (30s resend + 5-min validity) → Company → Account created
- **Onboarding** — Choose Plan & Pay → Upload Documents → Customize Chatbot → Generate Widget → Integrate
- **Multi-agent** — My Agents hub, Create Agent (Chat / Voice), Voice setup flow (Choose Plan → Assign Number → Upload Knowledge → Configure Voice → Go Live)
- **Dashboards** — Leads, Chat logs, Your Plan, Active Plans, Subscriptions, Profile, Change Password

## Run locally
Static site — just open `index.html`, or serve it:
```bash
python3 -m http.server
```

`index.html` is a hub linking every screen.
