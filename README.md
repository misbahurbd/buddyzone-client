# BuddyZone Client

A modern social media feed application built with Next.js 16, React 19, and TypeScript. This is the frontend application for BuddyZone, a platform for creating posts, interacting with content, and connecting with others.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Key Features Implementation](#key-features-implementation)
- [Architecture Decisions](#architecture-decisions)
- [Development](#development)

## 🎯 Overview

BuddyZone Client is a full-featured social media feed application that provides users with the ability to:
- Register and authenticate securely
- Create posts with text and images
- View a feed of posts from all users (newest first)
- React to posts, comments, and replies with multiple reaction types
- Comment on posts and reply to comments
- View who has reacted to content
- Control post visibility (Public/Private)

The application follows modern React patterns with server actions, client-side state management, and optimized data fetching.

## 🛠 Technology Stack

### Core Framework
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety

### State Management & Data Fetching
- **@tanstack/react-query 5.90.10** - Server state management and caching
- **Zustand 5.0.8** - Client state management (for current user)

### Form Handling & Validation
- **React Hook Form 7.66.1** - Form state management
- **Zod 4.1.13** - Schema validation
- **@hookform/resolvers 5.2.2** - Zod integration with React Hook Form

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React 0.554.0** - Icon library
- **@flaticon/flaticon-uicons 3.3.1** - Additional icons
- **Sonner 2.0.7** - Toast notifications
- **React Tooltip 5.30.0** - Tooltip component
- **React Spinners 0.17.0** - Loading indicators

### HTTP Client
- **Axios 1.13.2** - HTTP client for API requests

### Utilities
- **date-fns 4.1.0** - Date formatting utilities
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.4.0** - Merge Tailwind classes

## ✨ Features

### Authentication
- ✅ User registration with first name, last name, email, and password
- ✅ Secure login with session-based authentication
- ✅ Protected routes with automatic redirects
- ✅ Current user context provider
- ✅ Logout functionality

### Feed Page
- ✅ Protected route (requires authentication)
- ✅ Display posts from all users (newest first)
- ✅ Infinite scroll with cursor-based pagination
- ✅ Real-time post updates after mutations

### Post Management
- ✅ Create posts with text content
- ✅ Upload and attach images to posts
- ✅ Support for multiple images per post
- ✅ Post visibility control (Public/Private)
- ✅ Delete posts (author only)

### Interactions
- ✅ React to posts with multiple reaction types (Like, Love, Care, Haha, Wow, Sad, Angry)
- ✅ React to comments and replies
- ✅ View who has reacted to posts/comments
- ✅ Comment on posts
- ✅ Reply to comments (nested comments)
- ✅ View reaction counts and lists

### User Experience
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Optimistic UI updates
- ✅ Image optimization with Next.js Image component

## 📁 Project Structure

```
buddyzone-client/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (site)/                  # Main site routes
│   │   └── page.tsx             # Feed page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── assets/                       # Static assets
│   ├── icons/                   # Icon components
│   └── reactions/               # Reaction SVG assets
├── components/                   # Reusable components
│   ├── form/                   # Form components
│   ├── header/                  # Header and navigation
│   ├── providers/              # Context providers
│   └── shared/                 # Shared components
├── features/                     # Feature-based modules
│   ├── auth/                   # Authentication feature
│   │   ├── actions/            # Server actions
│   │   ├── components/         # Auth components
│   │   ├── queries/            # React Query hooks
│   │   └── validators/         # Validation schemas
│   └── feed/                   # Feed feature
│       ├── actions/            # Server actions
│       ├── components/         # Feed components
│       ├── mutations/          # React Query mutations
│       ├── queries/            # React Query queries
│       └── validators/         # Validation schemas
├── lib/                         # Utility libraries
│   ├── axios.ts                # Axios instance with interceptors
│   ├── axios-client.ts        # Client-side axios instance
│   └── utils.ts                # Utility functions
├── stores/                      # Zustand stores
│   └── current-user.ts         # Current user store
├── constants/                   # Application constants
├── interfaces/                  # TypeScript interfaces
└── proxy.ts                     # Middleware for route protection
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buddyzone-client
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Required Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., `http://localhost:3000`)

## 🏗 Key Features Implementation

### Authentication Flow

The application uses session-based authentication:
1. User logs in through `/login` page
2. Credentials are sent to backend via server action
3. Backend sets session cookie
4. Frontend stores user data in Zustand store
5. Protected routes check authentication via middleware

### Route Protection

The `proxy.ts` middleware handles route protection:
- Authenticated users are redirected from `/login` and `/register` to the feed
- Unauthenticated users are redirected to `/login` when accessing protected routes
- Original destination is preserved in query params for post-login redirect

### Data Fetching Strategy

- **Server Actions**: Used for mutations (create, update, delete) and authentication
- **React Query**: Used for data fetching with caching, refetching, and optimistic updates
- **Optimistic Updates**: Implemented for reactions and comments to provide instant feedback

### Post Feed

- Cursor-based pagination for efficient infinite scrolling
- Posts sorted by `createdAt` descending (newest first)
- Visibility filtering handled on backend
- Real-time updates after mutations using React Query cache invalidation

### Image Upload

- Images are uploaded to Cloudinary via backend
- Multiple images can be attached to a single post
- Next.js Image component used for optimization
- Loading states during upload process

## 🎨 Architecture Decisions

### Why Next.js App Router?

- Server Components for better performance
- Server Actions for secure mutations
- Built-in routing and layout system
- Optimized image handling

### Why React Query?

- Automatic caching and background refetching
- Optimistic updates support
- Built-in loading and error states
- Reduces boilerplate code

### Why Zustand for User State?

- Lightweight and simple API
- No provider nesting required
- Perfect for small, global state like current user
- Better performance than Context API for frequent updates

### Why Server Actions?

- Type-safe API calls
- Automatic CSRF protection
- Server-side execution for security
- Simplified error handling

### Form Validation Strategy

- Zod schemas for type-safe validation
- React Hook Form for form state management
- Validation on both client and server
- Clear error messages for users

## 🧪 Development

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent component structure
- Feature-based folder organization

### Component Patterns

- Server Components by default
- Client Components only when needed (interactivity, hooks)
- Reusable form components
- Compound components for complex UI

### State Management

- Server state: React Query
- Client state: Zustand (global), useState (local)
- Form state: React Hook Form
- URL state: Next.js router

## 📝 Notes

- The application is designed to handle millions of posts efficiently
- Cursor-based pagination ensures good performance with large datasets
- Image optimization reduces bandwidth and improves load times
- Session-based authentication provides secure user management
- All API calls include credentials for session management

## 🔗 Related Projects

- [BuddyZone Server](../buddyzone-server) - Backend API built with NestJS
