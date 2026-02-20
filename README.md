# Chronora

Intelligent study planning, powered by AI.

## Overview

Students consistently struggle to manage competing deadlines, estimate the time required for complex tasks, and maintain a balanced workload across multiple subjects. Ad-hoc scheduling leads to last-minute cramming, missed deadlines, and burnout.

Chronora addresses this by combining traditional task management with AI-driven study plan generation, deadline prediction, and workload analysis. Students receive personalized, data-informed schedules that adapt to their habits and upcoming commitments, all within a clean and responsive web interface.

## Core Features

- **Task Management** — Create, read, update, and delete study tasks with priorities, due dates, and subject labels.
- **AI-Generated Study Plans** — Leverage OpenAI to automatically generate optimized daily and weekly study schedules based on task load and deadlines.
- **Deadline Prediction** — AI-powered analysis of historical completion patterns to surface at-risk deadlines before they become problems.
- **Workload Balancing** — Automatic distribution of study sessions across available time slots to prevent overloading any single day.
- **Analytics Dashboard** — Visual insights into completed tasks, time allocation per subject, and productivity trends over time.
- **Authentication** — Secure sign-in via Google OAuth and email/password credentials, powered by NextAuth.js.
- **Subscription Billing** — Stripe-integrated subscription tiers unlocking advanced AI features and extended analytics history.
- **Dark / Light Mode** — System-aware theme switching with manual override, persisted across sessions.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| UI | React, TailwindCSS |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | NextAuth.js (OAuth + Credentials) |
| Data Fetching | TanStack Query |
| AI | OpenAI API |
| Payments | Stripe |
| Deployment | Vercel |

## Architecture Overview

**Frontend**
All UI is built with React Server Components and Client Components under the Next.js App Router. TailwindCSS handles styling. TanStack Query manages client-side cache and server-state synchronization for data-heavy dashboard views.

**Backend API Routes**
Next.js Route Handlers (`app/api/`) expose RESTful endpoints for tasks, study plans, user settings, and webhooks. Server Actions are used for mutations where progressive enhancement is beneficial.

**Database**
Prisma ORM connects to a PostgreSQL instance. The schema covers users, tasks, study sessions, subscription records, and AI-generated plan snapshots. Migrations are managed via `prisma migrate`.

**AI Integration**
When a user requests a study plan or deadline prediction, a server-side handler assembles a structured prompt from the user's task list, deadlines, and preferences, then calls the OpenAI Chat Completions API. The response is parsed, validated, and persisted before being returned to the client.

**Billing Flow**
Stripe Checkout sessions are created server-side when a user selects a subscription tier. A Stripe webhook endpoint (`/api/webhooks/stripe`) listens for `checkout.session.completed` and `customer.subscription.*` events to update subscription status in the database. Feature access is gated based on the stored subscription tier.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm
- PostgreSQL database (local instance or hosted, e.g. Supabase, Neon, Railway)
- OpenAI API key
- Stripe account (test mode is sufficient for local development)
- Google OAuth credentials (optional, required for Google sign-in)

### Installation

```bash
git clone https://github.com/ourhouchmohamed97/Chronora.git
cd Chronora
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

See the [Environment Variables](#environment-variables) section below for the full list of required variables.

### Database Setup

```bash
# Apply migrations to your database
npx prisma migrate dev

# (Optional) Seed initial data
npx prisma db seed
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chronora"

# NextAuth
# Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## Folder Structure

```
Chronora/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages (sign-in, sign-up)
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── tasks/          # Task management views
│   │   ├── plans/          # AI study plan views
│   │   └── analytics/      # Analytics dashboard
│   ├── api/                # Route Handlers
│   │   ├── auth/           # NextAuth.js handler
│   │   ├── tasks/          # Task CRUD endpoints
│   │   ├── plans/          # AI plan generation endpoints
│   │   └── webhooks/       # Stripe webhook handler
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable React components
├── lib/                    # Shared utilities (prisma client, auth config, stripe client)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Prisma migration history
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # Shared TypeScript type definitions
├── .env.local              # Local environment variables (not committed)
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## Roadmap

- Mobile-responsive native-like PWA experience
- Calendar integration (Google Calendar, Apple Calendar)
- Collaborative study groups with shared task boards
- Pomodoro timer with session tracking linked to tasks
- Spaced repetition reminders for revision scheduling
- Weekly digest email reports via Resend or SendGrid
- Fine-tuned AI model trained on student productivity patterns
- Multi-language support (i18n)

## License

This project is licensed under the MIT License.

---

## Authors

This project was developed by **Mohamed Ourhouch** and **Haytham Ezzahir**.