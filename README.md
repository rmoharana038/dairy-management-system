# Milk Bottle Tracker

A modern, professional Progressive Web App (PWA) for tracking daily milk bottle usage, managing entries, and viewing analytics. Built with React, TypeScript, Express, and Firebase.

## Features

- 🔐 **Secure Authentication**: Firebase Authentication with email/password
- 📊 **Real-time Dashboard**: Track daily milk bottle usage with live updates
- 📈 **Analytics**: View usage statistics, revenue tracking, and data charts
- 📱 **Mobile-First Design**: Responsive design that works on all devices
- 💾 **Cloud Storage**: Secure data storage with Firebase Firestore
- 📋 **Data Export**: Export data to Excel and PDF formats
- 🔧 **Profile Management**: Change password and update profile settings
- 🔄 **Real-time Updates**: Live data synchronization across devices
- 🎨 **Professional UI**: Modern design with shadcn/ui components
- 🌐 **PWA Support**: Install on mobile devices and work offline

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Firebase SDK** for authentication and database

### Backend
- **Node.js** with Express
- **Firebase Admin** for server-side operations
- **TypeScript** for type safety

### Database & Authentication
- **Firebase Authentication** for user management
- **Firebase Firestore** for real-time data storage
- **Firebase Security Rules** for data protection

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/milk-bottle-tracker.git
cd milk-bottle-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication with Email/Password
4. Create a Firestore Database
5. Add your domain to authorized domains in Authentication settings

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
```

### 5. Apply Firebase Security Rules
Copy the rules from `firebase-security-rules.txt` to your Firebase Console:
1. Go to Firestore Database → Rules
2. Replace existing rules with the content from the file
3. Click "Publish"

### 6. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init`
3. Build and deploy: `npm run build && firebase deploy`

## Project Structure

```
milk-bottle-tracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and Firebase config
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
├── server/                # Backend Express server
├── shared/                # Shared types and schemas
├── firebase-security-rules.txt  # Firestore security rules
└── package.json           # Dependencies and scripts
```

## Key Features Explained

### Authentication System
- Firebase Authentication with email/password
- Secure user sessions with automatic token refresh
- Password reset functionality
- Profile management with password change option

### Data Management
- Real-time data synchronization with Firestore
- User-specific data isolation with security rules
- Automatic user profile creation
- Entry management (add, edit, delete)

### Analytics & Reporting
- Daily, weekly, and monthly statistics
- Revenue tracking and calculations
- Data visualization with charts
- Export functionality for Excel and PDF

### Mobile Experience
- Progressive Web App capabilities
- Responsive design for all screen sizes
- Touch-friendly interface
- Offline support with service worker

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the GitHub repository or contact the development team.

## Changelog

### v1.0.0 (January 2025)
- Initial release with full Firebase integration
- Complete authentication system
- Real-time data synchronization
- Professional UI with responsive design
- Data export functionality
- Profile management features
- PWA support with offline capabilities