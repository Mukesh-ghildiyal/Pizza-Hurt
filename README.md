# Pizza Dashboard

A Next.js dashboard application with Google authentication, protected routes, and a responsive UI for managing pizza orders.

## Created by Mukesh Ghildiyal

## Overview

Pizza Dashboard is a modern web application built with Next.js that demonstrates a complete authentication flow using Google OAuth. The dashboard provides pizza shop owners with tools to manage orders, track deliveries, and analyze sales data.

Key features:

- Google OAuth authentication
- Protected dashboard routes
- Responsive UI with Tailwind CSS
- Pizza orders management with sorting and filtering
- Dark mode support

## Live Demo

[View the live application](https://your-vercel-deployment-url.vercel.app)

## Screenshots

![Dashboard Preview](/public/dashboard-screenshot.png)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Google OAuth for authentication

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Google OAuth credentials (instructions below)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mukesh-ghildiyal/Pizza-Hurt.git
cd pizza-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add "http://localhost:3000" to the Authorized JavaScript origins
7. Add "http://localhost:3000/api/auth/callback/google" to the Authorized redirect URIs
8. Click "Create" and note your Client ID
9. Add the Client ID to your `.env.local` file as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

For production deployment:

1. Add your production URL to the Authorized JavaScript origins
2. Add your production callback URL to the Authorized redirect URIs
3. Set the environment variable in your Vercel project settings

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `contexts/` - React context providers
- `lib/` - Utility functions, types, and data
- `public/` - Static assets

## Features

- **Google Authentication**: Secure sign-in with Google OAuth
- **Protected Routes**: Client-side route protection
- **Responsive Design**: Mobile-first responsive layout
- **Data Management**: Pizza orders with filtering and sorting
- **Modern UI**: Clean design with Tailwind CSS and shadcn/ui

## Challenges and Solutions

### Authentication Flow

Initially implemented with NextAuth.js but faced integration issues. Switched to a direct Google Identity Services API implementation for more control over the authentication flow.

### Environment Variables

Created a robust configuration system that works in both development and production environments, with fallbacks for development mode.

### Protected Routes

Implemented a custom ProtectedRoute component to handle authentication state and redirects.

## Third-Party Libraries

- `date-fns` - Date formatting
- `lucide-react` - Icons
- `class-variance-authority` - UI component variants
- `tailwindcss-animate` - Animations for Tailwind CSS
- `next-themes` - Dark mode support

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set up the required environment variables
4. Deploy
