import React, { useState } from 'react';

const GENRE_COLORS = {
  Action: 'bg-red-900/60 text-red-300',
  Adventure: 'bg-yellow-900/60 text-yellow-300',
  Animation: 'bg-pink-900/60 text-pink-300',
  Biography: 'bg-amber-900/60 text-amber-300',
  Comedy: 'bg-green-900/60 text-green-300',
  Crime: 'bg-gray-800/60 text-gray-300',
  Drama: 'bg-blue-900/60 text-blue-300',
  Family: 'bg-teal-900/60 text-teal-300',
  History: 'bg-stone-800/60 text-stone-300',
  Horror: 'bg-purple-900/60 text-purple-300',
  Music: 'bg-indigo-900/60 text-indigo-300',
  Mystery: 'bg-violet-900/60 text-violet-300',
  Romance: 'bg-rose-900/60 text-rose-300',
  'Sci-Fi': 'bg-cyan-900/60 text-cyan-300',
  Thriller: 'bg-orange-900/60 text-orange-300',
  War: 'bg-zinc-800/60 text-zinc-300',
};

function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < stars ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-app-text-muted ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

function MatchCard({ movie, index }) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];

  return (
    <div
      className="group relative bg-app-card rounded-2xl overflow-hidden border border-app-border hover:border-app-pink/50 transition-all duration-300 hover:shadow-glow-pink hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
    >
      {/* Poster */}
      <div className="relative h-64 overflow-hidden bg-app-darker">
        {!imgError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg, #1e2a4a 0%, #0f3460 100%)' }}
          >
            <span className="text-5xl opacity-40">🎬</span>
            <span className="text-app-text-muted text-xs text-center px-3">{movie.title}</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-app-card via-transparent to-transparent opacity-80" />

        {/* Heart badge */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-app-pink/90 rounded-full flex items-center justify-center shadow-glow-pink">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>

        {/* Year badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg">
            {movie.year}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-base leading-tight mb-1 line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <StarRating rating={movie.rating} />
          <span className="text-app-text-muted text-xs">{movie.director}</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                GENRE_COLORS[g] || 'bg-app-card-hover text-app-text-muted'
              }`}
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className={`text-app-text-muted text-xs leading-relaxed ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {movie.description}
        </p>
        {movie.description.length > 80 && (
          <button
            className="text-app-pink text-xs font-semibold mt-1 hover:text-app-pink-dark transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Less' : 'More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function MatchesList({ matches, onReset }) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="float-animation mb-6">
          <div className="w-28 h-28 rounded-full bg-app-card border-2 border-app-border flex items-center justify-center">
            <svg
              className="w-14 h-14 text-app-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-app-text mb-2">No matches yet</h3>
        <p className="text-app-text-muted text-sm max-w-sm mb-6">
          Start swiping on movies to find your perfect match. Tap the heart button or swipe right on movies you love!
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-app-pink to-app-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-glow-pink"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Start Discovering
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-app-pink animate-pulse" />
            <span className="text-app-text font-semibold">
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </span>
          </div>
          <span className="text-app-text-muted text-sm">
            — movies you loved
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-app-text-muted hover:text-app-pink text-xs font-medium flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-app-card"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {matches.map((movie, index) => (
          <MatchCard key={movie._id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}
