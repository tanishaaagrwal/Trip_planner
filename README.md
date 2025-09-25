🧳 AI Trip Planner

An AI-powered web app that helps users generate personalized travel itineraries. Enter your destination, budget, and trip duration, and the app will create a day-wise structured plan with hotels, attractions, and dining suggestions.

🚀 Features

🤖 AI-Powered Planning – Uses Gemini AI to generate itineraries.

🏨 Hotel Suggestions – Budget-friendly stay options.

📍 Destination Search – Google Places Autocomplete integration.

🔐 Authentication – Google OAuth login for secure access.

💾 Save Trips – Store and retrieve itineraries using Firebase Firestore.

⚡ Fast UI – Built with React + Vite for smooth performance.

🛠️ Tech Stack

Frontend: React, Vite, Tailwind CSS

AI: Gemini API (chatWithGemini)

Auth: Google OAuth (react-oauth/google)

Database: Firebase Firestore

Maps API: Google Places Autocomplete

📂 Project Structure
ai-trip-planner/
├── src/
│   ├── components/     # Reusable components  
│   ├── pages/          # Page-level views (Home, Planner, Saved Trips)  
│   ├── services/       # Firebase + Gemini integration  
│   └── App.jsx         # Main entry point  
├── public/             # Static files  
├── package.json  
└── README.md  

⚡ Getting Started
1. Clone Repository
git clone https://github.com/your-username/ai-trip-planner.git
cd ai-trip-planner

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the project root and add:

VITE_FIREBASE_API_KEY=your_firebase_key  
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com  
VITE_FIREBASE_PROJECT_ID=your_project_id  
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com  
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id  
VITE_FIREBASE_APP_ID=your_app_id  
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id  
VITE_GEMINI_API_KEY=your_gemini_api_key  

4. Run Development Server
npm run dev

5. Build for Production
npm run build
