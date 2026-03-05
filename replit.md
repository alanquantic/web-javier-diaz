# Escuela de Vendedores Profesionales - Javier Díaz

## Overview
This is a professional sales training website for "Escuela de Vendedores Profesionales" (School of Professional Sellers) by Javier Díaz. The application is built as a full-stack web application featuring a React frontend with a Node.js/Express backend, designed to attract potential clients for sales training courses and services.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Email Service**: Mailgun integration for contact form notifications

### Key Components

#### Frontend Components
1. **Landing Page Sections**:
   - Hero section with call-to-action
   - Course catalog with detailed information
   - Services overview (coaching, workshops, consulting)
   - Benefits section highlighting value propositions
   - FAQ section addressing common objections
   - Testimonials carousel
   - Blog section with articles
   - Contact forms and newsletter signup

2. **Course Pages**: Individual pages for each training course with detailed descriptions

3. **Blog System**: Complete blog with article listings and individual post pages

4. **Interactive Elements**:
   - Contact form modals
   - WhatsApp integration button
   - Newsletter subscription
   - Social sharing buttons

#### Backend Components
1. **API Routes**:
   - `/api/contact` - Handle contact form submissions
   - `/api/newsletter` - Manage newsletter subscriptions

2. **Database Schema**:
   - `users` table for authentication (future use)
   - `contacts` table for contact form submissions
   - `newsletters` table for email subscriptions

3. **Email Integration**: Mailgun service for sending email notifications

### Data Flow
1. **Contact Forms**: Frontend collects user input → validates with Zod → sends to backend API → stores in database → sends email notification via Mailgun
2. **Newsletter**: User subscribes → frontend validates → backend stores subscription → confirmation handling
3. **Static Content**: Course information, blog posts, and testimonials are currently static but structured for future CMS integration

### External Dependencies
- **Neon Database**: Serverless PostgreSQL hosting
- **Mailgun**: Email delivery service for notifications
- **Google Analytics**: Website traffic and user behavior tracking
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter and Montserrat fonts for typography

### Deployment Strategy
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production Setup**: Single bundle deployment with static file serving
- **Environment Variables**: 
  - `DATABASE_URL` for database connection
  - `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` for email service
  - `VITE_GA_MEASUREMENT_ID` for Google Analytics
- **Static Assets**: Served directly by Express with proper MIME type handling
- **Development**: Hot reload with Vite dev server and backend auto-restart

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and optimized for both development experience and production performance. The system is designed to capture leads through multiple touchpoints (contact forms, newsletter, WhatsApp) while providing valuable content through the blog and course information.