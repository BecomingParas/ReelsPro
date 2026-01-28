# 🚀 ReelsPro - Quick Start Guide (After Phase 1 Days 1-2)

## Prerequisites

- Node.js 18+ installed
- MongoDB database running (local or cloud)
- ImageKit account (for video storage)

## Environment Setup

1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your .env file**:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reelspro

   # NextAuth
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # ImageKit
   NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_URL_ENDPOINT=https://ik.imagekit.io/your_id
   ```

## Installation

```bash
# Install dependencies
npm install

# Build the application (optional, for production)
npm run build

# Start development server
npm run dev
```

## First Time Setup

### 1. Register a new user

Navigate to `http://localhost:3000/auth` and create an account:

- **Email**: your@email.com
- **Password**: minimum 8 characters
- **Name**: Your Full Name
- **Username**: unique_username (lowercase, no spaces)

### 2. Test Navigation

After registration, you'll be logged in. Test these routes:

- `/` - Home (Video Feed)
- `/explore` - Explore page
- `/profile` - Your profile
- `/upload` - Upload a video
- `/auth` - Login/Register

### 3. Upload Your First Video

1. Go to `/upload`
2. Click to upload a video file (MP4, MOV, AVI)
3. Wait for ImageKit upload to complete (progress bar)
4. Fill in:
   - Title (required)
   - Description (required)
   - Tags (optional)
   - Music (optional)
   - Location (optional)
5. Click "प्रकाशित गर्नुहोस्" (Publish)

## What's Working Now ✅

### Authentication
- ✅ User registration with email, password, name, username
- ✅ User login with email/password
- ✅ Session management with NextAuth
- ✅ Account lockout after 5 failed login attempts
- ✅ Auto-generated user avatars

### Routing
- ✅ Proper Next.js App Router (no more React Router conflicts!)
- ✅ Clean URLs for all pages
- ✅ Sidebar navigation (desktop)
- ✅ Bottom navigation (mobile)

### User Profiles
- ✅ Enhanced User model with all required fields
- ✅ Username uniqueness validation
- ✅ Followers/following arrays ready
- ✅ Profile page scaffolded

### Video Upload
- ✅ ImageKit integration
- ✅ Upload progress tracking
- ✅ Metadata form (title, description, tags)
- ✅ Video creation in database

## What's NOT Working Yet ⚠️

### Missing Features
- ❌ Video feed (still shows mock data)
- ❌ Like/unlike videos
- ❌ Comments on videos
- ❌ Follow/unfollow users
- ❌ Real-time notifications
- ❌ Video discovery/search
- ❌ User-specific video feeds

### Known Issues
1. **AuthContext still uses mock data** - Need to remove or sync with NextAuth
2. **Video model embeds user data** - Should reference User by ID instead
3. **No input validation with Zod** - Currently manual validation only
4. **Video feed shows hardcoded videos** - Not fetching from database

## Troubleshooting

### Build Errors

If you see TypeScript errors:
```bash
# Check type errors
npm run type-check

# If errors exist, they're usually in:
# - Old files using React Router
# - Missing type definitions
```

### MongoDB Connection Failed

```bash
# Check your MONGODB_URI in .env
# Make sure MongoDB is running
# Test connection: mongoose.connect(uri) should not throw
```

### NextAuth Session Not Working

```bash
# Make sure NEXTAUTH_SECRET is set
# Make sure NEXTAUTH_URL matches your dev URL
# Clear browser cookies and try again
```

### ImageKit Upload Fails

```bash
# Verify IMAGEKIT keys in .env
# Check NEXT_PUBLIC_PUBLIC_KEY (client-side)
# Check IMAGEKIT_PRIVATE_KEY (server-side)
# Check NEXT_PUBLIC_URL_ENDPOINT
```

## Development Workflow

### Running Dev Server
```bash
npm run dev
# App available at http://localhost:3000
```

### Checking for Errors
```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint
```

### Viewing Logs
- Server logs: Check terminal where `npm run dev` is running
- Client logs: Check browser console (F12)
- Database logs: Check MongoDB logs if using local instance

## Next Steps (Day 3-4)

The following features will be implemented next:

1. **API Versioning** (`/api/v1/*`)
2. **Zod Validation** for all inputs
3. **Auth Middleware** for protected routes
4. **Rate Limiting** for API endpoints

## Getting Help

If you encounter issues:

1. Check `.agent/workflows/progress-report-days-1-2.md` for detailed changes
2. Review console errors (both terminal and browser)
3. Verify all environment variables are correct
4. Check that MongoDB is accessible
5. Ensure ImageKit credentials are valid

---

**Last Updated**: 2026-01-04  
**Phase**: 1 - Days 1-2 Complete  
**Next**: Days 3-4 - API Foundation
