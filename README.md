# CinéMatch — Movie Tinder

A Tinder-like movie discovery app. Swipe right on movies you love, left on ones you don't — and build your perfect watchlist.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS        |
| Backend   | Node.js, Express                    |
| Database  | MongoDB with Mongoose               |
| Routing   | React Router v6                     |
| HTTP      | Axios                               |

---

## Features

- **Swipe left / right** on movie cards (drag gesture + buttons)
- **Like / Dislike / Super Like** action buttons
- **Card stack** effect showing the next movie behind the current
- **LIKE / NOPE stamps** that appear as you drag
- **Match animation** with confetti particles when you like a movie
- **Matches page** with your liked movies in a grid
- **Genre taste profile** bar chart on the Matches page
- **Dark Tinder-inspired UI** — `#1a1a2e` background, pink/red accent
- **25 pre-seeded movies** across Action, Drama, Sci-Fi, Horror, Comedy, and more
- **Reset** button to start swiping from scratch

---

## Prerequisites

- **Node.js** v18 or later — https://nodejs.org
- **MongoDB** running locally on `mongodb://localhost:27017`
  - Install: https://www.mongodb.com/try/download/community
  - Or use MongoDB Atlas (update `MONGODB_URI` in backend `.env`)

---

## Setup & Run

### 1. Clone / open the project

```bash
cd /Users/venkataraghunadhreddy/cypressfolder/movie-tinder
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. (Optional) Create a backend `.env` file

```bash
# backend/.env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/movie-tinder
```

If you skip this, the defaults above are used automatically.

### 4. Start the backend

```bash
# from the backend/ directory
npm run dev        # with nodemon (auto-restart)
# or
npm start          # plain node
```

You should see:
```
Movie Tinder server running on http://localhost:5001
Connected to MongoDB
Seeded 25 sample movies
```

### 5. Install frontend dependencies

Open a **new terminal tab**:

```bash
cd /Users/venkataraghunadhreddy/cypressfolder/movie-tinder/frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

---

## Project Structure

```
movie-tinder/
├── backend/
│   ├── models/
│   │   └── Movie.js          # Mongoose schema
│   ├── routes/
│   │   └── movies.js         # REST API endpoints
│   ├── server.js             # Express app + DB seeding
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Nav bar with match counter
│   │   │   ├── MovieCard.jsx     # Swipeable card with stamps
│   │   │   ├── SwipeButtons.jsx  # Like / Dislike / Super Like
│   │   │   └── MatchesList.jsx   # Grid of liked movies
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Swipe screen
│   │   │   └── Matches.jsx       # Liked movies + taste profile
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/api/movies`              | Get all unswiped movies        |
| GET    | `/api/movies/all`          | Get every movie                |
| GET    | `/api/movies/matches`      | Get liked movies               |
| GET    | `/api/movies/:id`          | Get a single movie             |
| POST   | `/api/movies/:id/like`     | Mark movie as liked            |
| POST   | `/api/movies/:id/dislike`  | Mark movie as disliked         |
| POST   | `/api/movies/reset`        | Reset all movies to unswiped   |
| GET    | `/api/health`              | Health check                   |

---

## How to Use

1. **Discover page** — cards are stacked. Drag the top card left or right, or use the buttons:
   - ❌ (red X) = Dislike / skip
   - ⭐ (blue star) = Super Like (same as Like)
   - ❤️ (green heart) = Like / match
2. When you like a movie a **match overlay** pops up with confetti.
3. Navigate to **Matches** to see all liked movies and your genre breakdown.
4. Hit **Reset All** on the Matches page (confirm twice) to start over.

---

## Customising Movies

Edit the `sampleMovies` array in `backend/server.js`.
After editing, drop the database and restart the backend:

```bash
# in mongo shell
use movie-tinder
db.movies.drop()
```

Then restart the backend — it will re-seed automatically.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Failed to load movies" | Make sure the backend is running on port 5001 |
| "MongoDB connection error" | Start `mongod` or check your Atlas URI |
| Blank poster images | The placeholder service may be rate-limiting; images degrade gracefully |
| Port 5173 in use | Change `server.port` in `frontend/vite.config.js` |
