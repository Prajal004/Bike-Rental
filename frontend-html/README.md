# Prajal Frontend (HTML/CSS/JS)

Plain HTML/CSS/JS client for the Prajal motorbike rental app. Talks to a
REST + Socket.io backend (see `js/api.js` for the base URL).

## Run it

No build step needed. Just serve the folder statically, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `login.html` (or `index.html`, which redirects based on login state).

## Backend requirement

This frontend expects an API at `http://localhost:4000/api` (edit `API_BASE`
in `js/api.js` to change it) exposing:

- `POST /api/auth/register` `{name, phone, email?, password}`
- `POST /api/auth/verify-otp` `{phone, code}` → `{token, user}`
- `POST /api/auth/resend-otp` `{phone, purpose}`
- `POST /api/auth/login` `{emailOrPhone, password}` → `{token, user}`
- `GET /api/bikes`, `GET /api/bikes/:id`
- `POST /api/bookings`, `GET /api/bookings`, `GET /api/bookings/:id`, `POST /api/bookings/:id/cancel` (JWT)
- `POST /api/payments`, `POST /api/payments/:id/confirm` (JWT)
- `GET /api/chat/:bookingId`, `POST /api/chat/:bookingId` (JWT) + Socket.io event `chat:message`

All authenticated requests send `Authorization: Bearer <token>`.

## Pages

`login.html` → `register.html` → `otp.html` → `home.html` → `detail.html`
→ `location.html` (pickup/return + dates) → `payment.html` →
`order-confirmation.html` → `order-detail.html` / `orders.html` →
`chat.html`.

## Note

OTP flow expects the backend to return a `debug_otp` field during
development (no real SMS is sent) — the OTP screen will display it as a
hint automatically if present.
