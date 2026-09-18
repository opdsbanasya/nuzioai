# Nuzio AI

Nuzio AI is a modern, responsive web application that delivers personalized, audio-narrated morning news briefs. With a beautiful glassmorphic UI, it curates the most important news based on your interests and delivers it at your preferred time.

## 🚀 Features

- **Personalized News Feed**: Categorized news (AI, Tech, Markets, Startups, Science, etc.) tailored to your interests.
- **Audio Narration (TTS)**: Listen to your morning briefs with integrated Text-to-Speech playback.
- **Watch-Style Time Picker**: Native-feeling 24-hour scrollable time picker to set exactly when you want your daily brief.
- **Authentication**: Seamless login and user management powered by Firebase Authentication.
- **Premium Subscriptions**: Integrated Razorpay payment gateway to upgrade to premium tiers.
- **Responsive Design**: Mobile-first design that seamlessly scales to tablet and desktop environments while preserving visual hierarchy.
- **Advanced Search**: Regex-powered unified search across news titles, summaries, categories, and sources.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js with Vite
- **Styling**: TailwindCSS (with Framer Motion for animations)
- **Routing**: React Router DOM
- **State Management**: Zustand (`useAppStore`)

### Backend

- **Server**: Node.js & Express.js
- **Database**: MongoDB with Mongoose
- **Payments**: Razorpay SDK
- **Audio Generation**: `google-tts-api`

## 📦 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB running locally or via MongoDB Atlas
- Firebase Project (for Auth credentials)
- Razorpay Account (for payment API keys)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nuzioai
   ```

2. **Setup the Backend:**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory and add your keys:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

   Start the backend development server:

   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_id
   VITE_API_URL=http://localhost:3000/api
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

Start the frontend development server:
```bash
npm run dev
```


## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route handlers (auth, news, payment, user)
│   │   ├── models/        # Mongoose database schemas
│   │   ├── routes/        # Express route definitions
│   │   └── app.js         # Express app configuration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components (Header, BottomNav, etc.)
    │   ├── pages/         # Page components (Home, Discover, Billing, Time, etc.)
    │   ├── services/      # Axios API configuration
    │   ├── store/         # Zustand global state management
    │   ├── App.jsx        # App router and layout
    │   └── main.jsx       # React entry point
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```
