# Milk Bottle Tracker

## Overview

This is a modern milk bottle tracking application built with React, Express, and Firebase. The app allows users to track daily milk bottle usage, manage entries, and view analytics. It's designed as a Progressive Web App (PWA) with offline capabilities and features a professional, responsive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **PWA**: Service worker implementation for offline functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: Currently using in-memory storage (MemStorage class) with plans for PostgreSQL via Drizzle ORM
- **Authentication**: Firebase Authentication
- **Data Storage**: Firebase Firestore for user data and entries
- **API**: RESTful API structure with Express routes

### Database Schema
The application uses Drizzle ORM with PostgreSQL dialect configured:
- **Users**: Basic user information (id, email, displayName, createdAt)
- **Entries**: Milk bottle entries (id, userId, bottles, amount, timestamp, status)
- **Statistics**: Aggregated data for analytics

## Key Components

### Authentication System
- Firebase Authentication integration
- Login, signup, and password reset flows
- Protected routes with authentication guards
- User session management

### Entry Management
- Add new milk bottle entries
- Edit existing entries
- Delete entries with confirmation
- Real-time updates using Firebase Firestore

### Analytics Dashboard
- Statistics cards showing total entries, bottles, revenue
- Chart visualization using Chart.js
- Export functionality for Excel and PDF
- Mobile-responsive design

### UI Components
- Comprehensive shadcn/ui component library
- Responsive design with mobile-first approach
- Toast notifications for user feedback
- Loading states and error handling

## Data Flow

1. **Authentication**: Users authenticate via Firebase Auth
2. **Data Sync**: Firestore provides real-time data synchronization
3. **State Management**: TanStack Query handles caching and synchronization
4. **UI Updates**: React hooks manage local state and trigger re-renders
5. **Offline Support**: Service worker caches resources for offline use

## External Dependencies

### Firebase Services
- **Authentication**: User management and security
- **Firestore**: Real-time database for user data
- **Hosting**: (Configured but not actively used)

### Third-party Libraries
- **Chart.js**: Data visualization
- **Radix UI**: Headless UI components
- **TanStack Query**: Server state management
- **Wouter**: Client-side routing
- **Tailwind CSS**: Utility-first styling

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **ESLint/Prettier**: Code quality
- **PostCSS**: CSS processing

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Single deployment artifact with both frontend and backend

### Environment Configuration
- Firebase configuration via environment variables
- Database connection via `DATABASE_URL`
- Production/development environment detection

### PWA Features
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices
- Optimized performance with caching strategies

### Current State
The application is fully configured to use Firebase for authentication and Firestore for data storage. Recent updates include:

#### Recent Changes (January 2025)
- **Firebase Integration**: Complete Firestore integration for user profiles and entries
- **Password Toggle**: Added show/hide password functionality to login and signup forms
- **Data Structure**: Updated schemas to support Firestore with proper user profiles
- **Security**: Implemented Firebase security rules for data protection
- **Real-time Updates**: Enhanced real-time data synchronization with Firestore

#### Firebase Configuration Required
- Firestore Database with security rules applied
- Authentication with Email/Password enabled
- Environment variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_PROJECT_ID