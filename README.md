# 📚 SmartBook – AI-Powered Book Discovery Platform

SmartBook is an AI-powered book discovery platform that helps users discover books based on their personal reading preferences.

Instead of browsing through hundreds of books manually, users answer a short questionnaire about their reading goals, preferred genres, reading time, difficulty level, and preferred book length. SmartBook then uses AI to generate personalized book recommendations.

---

## Live Demo

**Frontend:**  
https://smartbook-ai-pearl.vercel.app/

**Backend API:**  
https://smartbook-ai-backend.onrender.com

---

## Features

### Authentication

- User registration with Gmail accounts
- Email verification using a 6-digit verification code
- Secure password hashing using bcrypt
- JWT-based authentication
- Login and logout functionality
- Protected routes
- Forgot password functionality
- Password reset using email verification code
- Verification and reset codes expire after 10 minutes

### Book Discovery

- Browse a collection of 130+ books
- Search books by title or author
- Filter books by:
  - Genre
  - Difficulty level
  - Maximum number of pages
- Pagination
- Individual book details page

### AI-Powered Recommendations

Users complete a personalized questionnaire based on:

- Reading goal
- Preferred genres
- Daily reading time
- Difficulty level
- Maximum preferred pages

SmartBook then uses Google's Gemini API to generate personalized recommendations.

### My Books

- Add books to favorites
- View saved books
- Remove books from favorites
- Favorites are stored separately for each logged-in user

### User Reading Profile

The user's reading preferences are stored in the database and can be used for personalized recommendations.

### Responsive UI

The application is designed to work across:

- Desktop
- Tablet
- Mobile

---

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer

## AI

- Google Gemini API
- `@google/genai`

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

# Project Architecture

```text
SmartBookAI
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seed/
│   │   └── seedBooks.js
│   ├── utils/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/SmartBookAI.git
cd SmartBookAI

### 2. Run the Backend
cd backend
npm install

Create a .env file inside the backend folder:

PORT=your_port_no
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
GEMINI_API_KEY=your_gemini_api_key

Start the backend:

npm start

Backend runs on:

http://localhost:5000

### 3. Run the Frontend

Open another terminal:

cd frontend
npm install

Create a .env file inside the frontend folder:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Frontend runs on:

http://localhost:5173