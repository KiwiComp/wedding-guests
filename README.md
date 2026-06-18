# Wedding Drink Order App

A React webapp for wedding guests to order drinks from the bar using a mobile-friendly interface.

## Features

- **Table-based Ordering**: 8 table routes, each with its own subcollection in Firestore
- **Drink Menu**: Alcoholic cocktails, non-alcoholic cocktails, wines, and digestifs
- **Order Tracking**: Orders stored with timestamp and status (new, preparing, done)
- **HashRouter Navigation**: Client-side routing without server configuration
- **Mobile Responsive**: Optimized for mobile devices with QR code scanning
- **No Authentication**: Simple, open access for wedding guests
- **Real-time Database**: Firebase Firestore for order management

## Project Structure

```
src/
├── components/
│   ├── StartPage/          # Table selection / QR code page
│   │   ├── StartPage.jsx
│   │   └── StartPage.css
│   └── TableOrder/         # Order page for each table
│       ├── TableOrder.jsx
│       └── TableOrder.css
├── constants/
│   ├── drinks.js           # Drink menu data
│   └── orderStatus.js      # Order status enum
├── services/
│   ├── firebaseConfig.js   # Firebase initialization
│   └── firestoreService.js # Firestore operations
├── App.js                  # Main router setup
├── App.css                 # Global styles
└── index.js
```

## Setup Instructions

### Prerequisites

- Node.js 14+ and npm
- Firebase account and project

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

Get your Firebase config from your Firebase project settings:
- Go to Firebase Console
- Select your project
- Click Settings (gear icon)
- Copy your project credentials into `.env.local`

### 2. Install Dependencies

```bash
npm install
```

### 3. Firestore Setup

In your Firebase Console:

1. Create a new Firestore database (in test mode for development)
2. Create a collection named `orders`
3. No need to add documents manually - they'll be created when orders are submitted

**Collection Structure:**
```
orders/
└── table-1/
    └── items/ (subcollection for orders)
└── table-2/
    └── items/
... (and so on for tables 3-8)
```

### 4. Run the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### For Guests

1. Scan the QR code that points to `http://your-domain/#/`
2. Select their table (1-8)
3. Browse the drink menu by category:
   - Alcoholic Cocktails
   - Non-Alcoholic Cocktails
   - Wines
   - Digestifs
4. Use +/- buttons to select drink quantities
5. Click "Send Order to Bar" to submit
6. Get redirected back to table selection

### Order Format

Orders are stored in Firestore with the following structure:

```javascript
{
  drinks: [
    { id: "cocktail-1", name: "G&T", category: "Alcoholic Cocktails" },
    { id: "wine-1", name: "Husets Vita Vin", category: "Wine" }
  ],
  timestamp: Timestamp,
  status: "new" // Can be "new", "preparing", or "done"
}
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not reversible)

## Customization

### Add/Modify Drinks

Edit `src/constants/drinks.js` to add or modify drinks in the menu.

### Change Order Status Values

Edit `src/constants/orderStatus.js` to modify status options.

### Styling

All components have individual CSS files for easy customization. Global styles are in `src/App.css`.

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Deploy:
```bash
firebase deploy
```

## Firestore Security Rules

For production, set up proper security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** This allows public read/write. For production, consider adding proper security rules based on your requirements.

## Troubleshooting

### Firebase Connection Issues

- Verify `.env.local` has correct credentials
- Check Firebase Console for project status
- Ensure Firestore database is created and active

### Orders Not Appearing

- Check Firestore Console for new documents under `orders/table-X/items/`
- Verify Firestore security rules allow writes
- Check browser console for errors

### Navigation Issues

- HashRouter uses `#` in URLs (e.g., `/#/table/1`)
- Clear browser cache if routes aren't updating
- Verify React Router version compatibility

## Git Workflow

The project uses Git for version control:

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push to remote (if configured)
git push
```

## Notes

- The app uses no user authentication - guests can order from any table
- Timestamps are stored as Firebase Timestamps for accurate server-side times
- All drinks are pre-configured - modifications must be done in code
- Quantities are tracked client-side and sent as an array of drinks to Firestore
