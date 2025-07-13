# Deployment Guide

This guide covers multiple deployment options for the Milk Bottle Tracker application.

## Prerequisites

1. **Firebase Project Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Create a Firestore Database
   - Apply the security rules from `firebase-security-rules.txt`

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values

## Deployment Options

### 1. Vercel (Recommended for Full-Stack Apps)

**Setup:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
vercel --prod
```

**Configuration:**
- The `vercel.json` file is already configured
- Add environment variables in Vercel dashboard
- Automatic deployments on git push

**Benefits:**
- Automatic HTTPS
- Global CDN
- Serverless functions
- Easy custom domains

### 2. Netlify

**Setup:**
```bash
npm install -g netlify-cli
netlify login
```

**Deploy:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Configuration:**
- The `netlify.toml` file is already configured
- Add environment variables in Netlify dashboard
- Connect GitHub for automatic deployments

**Benefits:**
- Form handling
- Branch previews
- Built-in CDN
- Easy custom domains

### 3. Firebase Hosting

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

**Deploy:**
```bash
npm run build
firebase deploy
```

**Configuration:**
- The `firebase.json` file is already configured
- Uses the same Firebase project as your database
- Automatic HTTPS and CDN

**Benefits:**
- Integrated with Firebase services
- Global CDN
- Easy custom domains
- Built-in SSL

### 4. Railway

**Setup:**
```bash
npm install -g @railway/cli
railway login
```

**Deploy:**
```bash
railway up
```

**Configuration:**
- Add environment variables in Railway dashboard
- Automatic deployments from GitHub

**Benefits:**
- Full-stack support
- Database hosting
- Automatic HTTPS
- Easy scaling

### 5. Heroku

**Setup:**
```bash
npm install -g heroku
heroku login
heroku create your-app-name
```

**Deploy:**
```bash
git push heroku main
```

**Configuration:**
```bash
heroku config:set VITE_FIREBASE_API_KEY=your_api_key
heroku config:set VITE_FIREBASE_APP_ID=your_app_id
heroku config:set VITE_FIREBASE_PROJECT_ID=your_project_id
```

**Benefits:**
- Simple deployment
- Add-ons ecosystem
- Easy scaling
- Built-in monitoring

### 6. Docker Deployment

**Build Image:**
```bash
docker build -t milk-bottle-tracker .
```

**Run Container:**
```bash
docker run -p 5000:5000 \
  -e VITE_FIREBASE_API_KEY=your_api_key \
  -e VITE_FIREBASE_APP_ID=your_app_id \
  -e VITE_FIREBASE_PROJECT_ID=your_project_id \
  milk-bottle-tracker
```

**Benefits:**
- Consistent deployment
- Easy scaling
- Platform independent
- Container orchestration

## Environment Variables Setup

For all deployment platforms, you need to set these environment variables:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
```

**How to get these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. In the "General" tab, find "Your apps" section
5. Copy the values from the Firebase config object

## Post-Deployment Steps

1. **Update Firebase Auth Domains**
   - Go to Firebase Console → Authentication → Settings → Authorized domains
   - Add your deployment domain (e.g., `yourapp.vercel.app`)

2. **Test the Application**
   - Create a test account
   - Add some milk bottle entries
   - Test export functionality
   - Verify profile settings work

3. **Configure Custom Domain (Optional)**
   - Most platforms support custom domains
   - Update Firebase authorized domains accordingly

## Troubleshooting

### Common Issues

1. **Firebase Authentication Error**
   - Check if your domain is in authorized domains
   - Verify environment variables are set correctly

2. **Build Errors**
   - Make sure all dependencies are installed
   - Check Node.js version compatibility

3. **Database Access Issues**
   - Verify Firestore security rules are applied
   - Check if Firestore is enabled in Firebase Console

4. **Environment Variables Not Working**
   - Ensure variables start with `VITE_` prefix
   - Rebuild after changing environment variables

### Performance Optimization

1. **Enable Compression**
   - Most platforms enable gzip compression by default
   - Verify with browser dev tools

2. **CDN Configuration**
   - Static assets are automatically cached
   - Firebase Firestore has built-in caching

3. **Monitoring**
   - Use Firebase Analytics for user insights
   - Monitor Firebase usage in the console

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use platform-specific secret management

2. **Firebase Security Rules**
   - Regularly review and update security rules
   - Test rules with Firebase Rules Playground

3. **HTTPS**
   - All recommended platforms provide HTTPS by default
   - Ensure all API calls use HTTPS

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review Firebase Console for errors
3. Check browser console for client-side errors
4. Review server logs for backend issues

Choose the deployment option that best fits your needs and technical requirements. Vercel is recommended for its ease of use and excellent React/Node.js support.