# Archivio

A curated home for architecture enthusiasts and professionals discover, save, and talk about the buildings that stay with you.

Archivio is a full-stack MERN application where members explore a curated archive of architectural projects, organize what they love into personal collections, and (soon) connect with other people who care about buildings as much as they do.

## Features

- **Explore** — browse curated Projects, Collections, and Journal articles, or dive into a category (Houses, Interiors, Landscapes, Materials, and more)
- **Accounts** — signup, login, OTP-based email verification, forgot/reset password, and full profile management
- **Profile & Settings** — edit your name, avatar, bio, role, and interests; change your password (with current-password verification); delete your account
- **Notifications** — a dedicated space for replies and mentions
- **Team (preview)** — a first look at collaborative boards, coming to Archivio soon
- **Support center** — searchable help articles organized by category
- **Community** — coming soon
- **Toast notifications** — branded, consistent feedback for every action across the app
- **Offline detection** — a clear "you're offline" message instead of silently breaking or logging people out

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Zustand (state management)
- react-hot-toast
- lucide-react (icons)
- Fraunces & Inter (typography)

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JWT authentication (HTTP-only cookies)
- bcryptjs (password hashing)
- Joi (request validation)
- Multer (avatar uploads)


### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local instance or a MongoDB Atlas connection string)
