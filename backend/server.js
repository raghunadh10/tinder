const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-tinder';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', movieRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Movie Tinder API is running' });
});

// Sample movie data
const sampleMovies = [
  {
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    description: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a2e/e94560?text=The+Dark+Knight',
    director: 'Christopher Nolan',
    duration: 152,
  },
  {
    title: 'Inception',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.8,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://via.placeholder.com/300x450/0f3460/e94560?text=Inception',
    director: 'Christopher Nolan',
    duration: 148,
  },
  {
    title: 'Interstellar',
    year: 2014,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces environmental collapse.",
    posterUrl: 'https://via.placeholder.com/300x450/16213e/e94560?text=Interstellar',
    director: 'Christopher Nolan',
    duration: 169,
  },
  {
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['Crime', 'Drama'],
    rating: 8.9,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl: 'https://via.placeholder.com/300x450/e94560/1a1a2e?text=Pulp+Fiction',
    director: 'Quentin Tarantino',
    duration: 154,
  },
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['Drama'],
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl: 'https://via.placeholder.com/300x450/533483/ffffff?text=Shawshank',
    director: 'Frank Darabont',
    duration: 142,
  },
  {
    title: 'The Godfather',
    year: 1972,
    genre: ['Crime', 'Drama'],
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    posterUrl: 'https://via.placeholder.com/300x450/2c2c54/e94560?text=The+Godfather',
    director: 'Francis Ford Coppola',
    duration: 175,
  },
  {
    title: 'Parasite',
    year: 2019,
    genre: ['Comedy', 'Drama', 'Thriller'],
    rating: 8.5,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://via.placeholder.com/300x450/218c74/ffffff?text=Parasite',
    director: 'Bong Joon-ho',
    duration: 132,
  },
  {
    title: 'Avengers: Endgame',
    year: 2019,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.4,
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions.",
    posterUrl: 'https://via.placeholder.com/300x450/1f4068/e94560?text=Endgame',
    director: 'Anthony Russo',
    duration: 181,
  },
  {
    title: 'Joker',
    year: 2019,
    genre: ['Crime', 'Drama', 'Thriller'],
    rating: 8.4,
    description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.',
    posterUrl: 'https://via.placeholder.com/300x450/7b2d00/ffffff?text=Joker',
    director: 'Todd Phillips',
    duration: 122,
  },
  {
    title: 'The Matrix',
    year: 1999,
    genre: ['Action', 'Sci-Fi'],
    rating: 8.7,
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://via.placeholder.com/300x450/003300/00ff00?text=The+Matrix',
    director: 'The Wachowskis',
    duration: 136,
  },
  {
    title: 'Fight Club',
    year: 1999,
    genre: ['Drama'],
    rating: 8.8,
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    posterUrl: 'https://via.placeholder.com/300x450/8b0000/ffffff?text=Fight+Club',
    director: 'David Fincher',
    duration: 139,
  },
  {
    title: 'Goodfellas',
    year: 1990,
    genre: ['Biography', 'Crime', 'Drama'],
    rating: 8.7,
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
    posterUrl: 'https://via.placeholder.com/300x450/1a0a0a/e94560?text=Goodfellas',
    director: 'Martin Scorsese',
    duration: 146,
  },
  {
    title: 'Forrest Gump',
    year: 1994,
    genre: ['Drama', 'Romance'],
    rating: 8.8,
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with a low IQ.',
    posterUrl: 'https://via.placeholder.com/300x450/4a90d9/ffffff?text=Forrest+Gump',
    director: 'Robert Zemeckis',
    duration: 142,
  },
  {
    title: 'The Silence of the Lambs',
    year: 1991,
    genre: ['Crime', 'Drama', 'Thriller'],
    rating: 8.6,
    description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    posterUrl: 'https://via.placeholder.com/300x450/2d2d2d/e94560?text=Silence+of+Lambs',
    director: 'Jonathan Demme',
    duration: 118,
  },
  {
    title: 'Schindler\'s List',
    year: 1993,
    genre: ['Biography', 'Drama', 'History'],
    rating: 9.0,
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    posterUrl: 'https://via.placeholder.com/300x450/1c1c1c/ffffff?text=Schindler+List',
    director: 'Steven Spielberg',
    duration: 195,
  },
  {
    title: 'Spirited Away',
    year: 2001,
    genre: ['Animation', 'Adventure', 'Family'],
    rating: 8.6,
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts.',
    posterUrl: 'https://via.placeholder.com/300x450/ff6b9d/ffffff?text=Spirited+Away',
    director: 'Hayao Miyazaki',
    duration: 125,
  },
  {
    title: 'Whiplash',
    year: 2014,
    genre: ['Drama', 'Music'],
    rating: 8.5,
    description: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    posterUrl: 'https://via.placeholder.com/300x450/c0392b/ffffff?text=Whiplash',
    director: 'Damien Chazelle',
    duration: 107,
  },
  {
    title: 'Get Out',
    year: 2017,
    genre: ['Horror', 'Mystery', 'Thriller'],
    rating: 7.7,
    description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his uneasiness about their reception of him eventually reaches a boiling point.',
    posterUrl: 'https://via.placeholder.com/300x450/1b5e20/ffffff?text=Get+Out',
    director: 'Jordan Peele',
    duration: 104,
  },
  {
    title: 'La La Land',
    year: 2016,
    genre: ['Comedy', 'Drama', 'Music'],
    rating: 8.0,
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    posterUrl: 'https://via.placeholder.com/300x450/9b59b6/ffffff?text=La+La+Land',
    director: 'Damien Chazelle',
    duration: 128,
  },
  {
    title: 'Mad Max: Fury Road',
    year: 2015,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.1,
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    posterUrl: 'https://via.placeholder.com/300x450/b7410e/ffffff?text=Fury+Road',
    director: 'George Miller',
    duration: 120,
  },
  {
    title: 'Parasite',
    year: 2019,
    genre: ['Comedy', 'Drama', 'Thriller'],
    rating: 8.5,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://via.placeholder.com/300x450/1abc9c/ffffff?text=Parasite+2',
    director: 'Bong Joon-ho',
    duration: 132,
  },
  {
    title: '1917',
    year: 2019,
    genre: ['Drama', 'War'],
    rating: 8.3,
    description: 'April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.',
    posterUrl: 'https://via.placeholder.com/300x450/556b2f/ffffff?text=1917',
    director: 'Sam Mendes',
    duration: 119,
  },
  {
    title: 'Knives Out',
    year: 2019,
    genre: ['Comedy', 'Crime', 'Drama'],
    rating: 7.9,
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    posterUrl: 'https://via.placeholder.com/300x450/2f4f4f/e94560?text=Knives+Out',
    director: 'Rian Johnson',
    duration: 130,
  },
  {
    title: 'Dune',
    year: 2021,
    genre: ['Action', 'Adventure', 'Drama'],
    rating: 8.0,
    description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
    posterUrl: 'https://via.placeholder.com/300x450/d4a017/1a1a2e?text=Dune',
    director: 'Denis Villeneuve',
    duration: 155,
  },
  {
    title: 'Everything Everywhere All at Once',
    year: 2022,
    genre: ['Action', 'Adventure', 'Comedy'],
    rating: 7.8,
    description: 'An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes connecting with the lives she could have led.',
    posterUrl: 'https://via.placeholder.com/300x450/ff1493/ffffff?text=EEAAO',
    director: 'The Daniels',
    duration: 139,
  },
];

// Connect to MongoDB and seed data
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed data if collection is empty
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany(sampleMovies);
      console.log(`Seeded ${sampleMovies.length} sample movies`);
    } else {
      console.log(`Database already has ${count} movies`);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Movie Tinder server running on http://localhost:${PORT}`);
});
