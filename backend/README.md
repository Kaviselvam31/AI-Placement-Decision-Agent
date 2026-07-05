# Placement Decision AI Agent - Backend (Express)

An optional Express backend that proxies requests to Google Gemini. The frontend is wired to call a Supabase Edge Function by default, but this Express server is provided as a deployment-ready alternative for environments where you want a standalone Node backend.

## Folder Structure

```
backend/
  config/         - Environment configuration
  controllers/    - Route controllers
  middleware/     - Express middleware (error handler)
  routes/         - Express routers
  services/       - Gemini API service
  server.js       - App entrypoint
  package.json
  .env.example
```

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Gemini API key:
   ```bash
   cp .env.example .env
   # then edit .env and set GEMINI_API_KEY=...
   ```

3. Start the server:
   ```bash
   npm start
   # or for auto-reload on file changes
   npm run dev
   ```

The server listens on `http://localhost:5000` by default.

## Endpoints

- `GET /health` - health check
- `POST /api/analyze` - analyze a student profile
  - Body: `{ "profile": { ...StudentProfile } }`
  - Response: `{ "report": { ...PlacementReport } }`

## Switching the frontend to use this backend

The frontend calls the Supabase Edge Function `analyze-placement` by default. To point it at this Express backend instead, edit `src/services/aiService.ts` and replace the `supabase.functions.invoke` call with a `fetch` to `http://localhost:5000/api/analyze`.
