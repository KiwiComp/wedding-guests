# Firebase Setup Guide

Complete step-by-step instructions to connect your Wedding Drink Order app to Firebase Firestore.

---

## Step 1: Create a Firebase Project

### 1.1 Go to Firebase Console
- Open https://console.firebase.google.com/
- Sign in with your Google account

### 1.2 Create a New Project
1. Click **"Add project"** button
2. Enter a project name (example: `wedding-drink-orders`)
3. Click **Continue**
4. Toggle **Enable Google Analytics** (optional, you can disable it)
5. Click **Create project**
6. Wait for the project to be created (this takes a minute)

### Result
You now have a Firebase project created.

---

## Step 2: Register Your Web App

### 2.1 Add a Web App to Your Project
1. In the Firebase Console, you should see your new project
2. Click the **Web icon** (looks like `</>`), OR look for **Project Settings** and add an app there
3. Give your app a name: `Wedding Guest App` (or similar)
4. **Do NOT check** "Also set up Firebase Hosting"
5. Click **Register app**

### 2.2 Copy Your Firebase Config
A code snippet will appear. It should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "wedding-drink-orders.firebaseapp.com",
  projectId: "wedding-drink-orders",
  storageBucket: "wedding-drink-orders.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890abcdef"
};
```

**Copy all these values** - you'll need them in the next step.

---

## Step 3: Add Firebase Credentials to Your App

### 3.1 Create the .env.local File

1. In VS Code, open your project root directory (where `package.json` is)
2. Right-click in the file explorer and select **New File**
3. Name it `.env.local` (note the dot at the beginning)
4. Copy and paste this template:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### 3.2 Fill in Your Credentials

Using the Firebase config from Step 2.2, fill in the values:

| Your Firebase Config | .env.local Variable |
|---|---|
| `apiKey` | `REACT_APP_FIREBASE_API_KEY` |
| `authDomain` | `REACT_APP_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `REACT_APP_FIREBASE_PROJECT_ID` |
| `storageBucket` | `REACT_APP_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `REACT_APP_FIREBASE_APP_ID` |

### Example .env.local (with fake values):

```
REACT_APP_FIREBASE_API_KEY=AIzaSy_ABC123xyz789DEF456
REACT_APP_FIREBASE_AUTH_DOMAIN=wedding-drink-orders.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=wedding-drink-orders
REACT_APP_FIREBASE_STORAGE_BUCKET=wedding-drink-orders.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abc123def456789ghi012
```

### 3.3 Important: Keep .env.local Secret

- **Never commit .env.local to Git** - it's already in .gitignore
- **Never share these credentials** with anyone
- These are your private Firebase keys

### 3.4 Save and Restart Your App

1. Save the `.env.local` file (Cmd+S or Ctrl+S)
2. Stop your dev server if it's running (Ctrl+C in terminal)
3. Restart it: `npm start`

Your app now has access to Firebase!

---

## Step 4: Create Firestore Database

### 4.1 Go to Firestore in Firebase Console

1. In Firebase Console, open your project
2. In the left menu, click **Build** → **Firestore Database**
3. Click **Create database**

### 4.2 Configure Firestore

1. **Location**: Select a region close to your location (example: `europe-west1` for Europe)
2. **Security Rules**: Select **Start in test mode**
   - This allows read/write access from anywhere (fine for development)
   - We'll set up proper security rules next
3. Click **Create**

### Result
Your Firestore database is now created and ready to receive data.

---

## Step 5: Set Up Firestore Security Rules

### 5.1 Open Security Rules

1. In Firestore Database page, click the **Rules** tab
2. You should see the default rules

### 5.2 Replace with Proper Rules

Delete all existing code and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write to orders collection
    // This is suitable for a wedding guest app with no authentication
    match /orders/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 5.3 Publish Rules

Click **Publish** button to save the new rules.

### Important Note on Security

- These rules allow **anyone** to read/write to the `orders` collection
- This is fine for a **private event** (wedding guests only)
- For a public app, you'd want to add restrictions
- Since you have no authentication, there's no way to limit access per-user anyway

---

## Step 6: Create the Orders Collection

### 6.1 Create Collection

1. In Firestore Database page, click **Start collection**
2. Collection ID: `orders` (exactly this name)
3. Click **Next**

### 6.2 Add a Document (Optional)

You can either:
- **Option A**: Add a dummy document now (any data is fine)
- **Option B**: Skip this - orders will be created automatically when guests submit

**Recommended**: Skip and let the app create documents automatically when needed.

Click **Auto ID** if you add a document, then add any placeholder data (example: `test: true`).

### Result
You now have an `orders` collection waiting to receive orders.

---

## Step 7: Test the Connection

### 7.1 Run Your App

```bash
npm start
```

The app should open at `http://localhost:3000`

### 7.2 Test the Workflow

1. **Select a table** (click any table 1-8)
2. **Add some drinks** (click the + buttons)
3. **Click "Send Order to Bar"**
4. **Check Firestore Console** for new data

### 7.3 Verify in Firebase Console

1. Go to Firebase Console
2. Open your project → **Firestore Database**
3. You should see the collection structure:
   ```
   orders/
   └── table-1/
       └── items/
           └── [random-id] {
               drinks: [...],
               timestamp: ...,
               status: "new"
             }
   ```

If you see your order data here, **the connection is working!** ✅

### 7.4 Troubleshooting

If you don't see your order:

1. **Check browser console for errors**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages

2. **Common errors**:
   - `FirebaseError: Missing or insufficient permissions` → Security rules not published
   - `Cannot find module '@firebase/app'` → Run `npm install firebase` again
   - Blank page → Check `.env.local` for typos

3. **Check .env.local**
   - Make sure all values are correct
   - No extra spaces or quotes
   - Restart `npm start` after changes

---

## Future: Adding Another App to the Same Firebase Project

When you create a second app (e.g., a bar management dashboard), **use the same Firebase project**:

### For the Second App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → Select **Web** icon
4. Register the new app with a different name (e.g., `Bar Management App`)
5. Copy the new config values
6. Create a new `.env.local` in your second app folder with these values

### Same Collections, Different Data

Both apps will share the same `orders` collection in Firestore:
- **Guest App** (this app): Guests create orders
- **Bar App** (future): Bartenders see and manage orders

They automatically share data because they both connect to the same Firebase project.

---

## Reference: Firebase Config Locations

You can get your Firebase config from several places:

### Method 1: Project Settings (Easiest)
1. Firebase Console → Your Project
2. Click **Settings icon** (gear) → **Project Settings**
3. Scroll down to **Your apps** section
4. Click on your app
5. Copy the config values

### Method 2: Firebase Console Code Snippet
1. Firebase Console → Firestore Database
2. Click the code snippet icon `</>`
3. Select **Web** tab
4. Copy the config

Both methods give you the same values.

---

## Checklist: Is Everything Connected?

✅ Firebase project created  
✅ Web app registered  
✅ `.env.local` file created with all credentials  
✅ Firestore database created  
✅ Security rules published  
✅ `orders` collection exists  
✅ Test order appears in Firestore  

If all are checked, you're good to go! 🎉

---

## Next Steps

1. **Develop your app** - guests can now place orders
2. **Create the bar management dashboard** - use the same Firebase project
3. **Add proper security** - once you understand your user flow better
4. **Deploy to production** - use Firebase Hosting for free

Good luck with your wedding app! 🍾
