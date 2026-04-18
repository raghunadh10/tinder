import React, { useState } from 'react';

const GENRE_COLORS = {
  Action: 'bg-red-900/80 text-red-300 border border-red-700/50',
  Adventure: 'bg-yellow-900/80 text-yellow-300 border border-yellow-700/50',
  Animation: 'bg-pink-900/80 text-pink-300 border border-pink-700/50',
  Biography: 'bg-amber-900/80 text-amber-300 border border-amber-700/50',
  Comedy: 'bg-green-900/80 text-green-300 border border-green-700/50',
  Crime: 'bg-gray-800/80 text-gray-300 border border-gray-600/50',
  Drama: 'bg-blue-900/80 text-blue-300 border border-blue-700/50',
  Family: 'bg-teal-900/80 text-teal-300 border border-teal-700/50',
  History: 'bg-stone-800/80 text-stone-300 border border-stone-600/50',
  Horror: 'bg-purple-900/80 text-purple-300 border border-purple-700/50',
  Music: 'bg-indigo-900/80 text-indigo-300 border border-indigo-700/50',
  Mystery: 'bg-violet-900/80 text-violet-300 border border-violet-700/50',
  Romance: 'bg-rose-900/80 text-rose-300 border border-rose-700/50',
  'Sci-Fi': 'bg-cyan-900/80 text-cyan-300 border border-cyan-700/50',
  Thriller: 'bg-orange-900/80 text-orange-300 border border-orange-700/50',
  War: 'bg-zinc-800/80 text-zinc-300 border border-zinc-600/50',
};

const DEFAULT_GENRE_COLOR = 'bg-app-card text-app-text-muted border border-app-border';

function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < stars ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-app-text-muted ml-0.5 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function MovieCard({ movie, style, onSwipe, isTop, dragDelta }) {
  const [imgError, setImgError] = useState(false);
  const [showFull, setShowFull] = useState(false);

  if (!movie) return null;

  const likeOpacity = dragDelta > 0 ? Math.min(dragDelta / 80, 1) : 0;
  const nopeOpacity = dragDelta < 0 ? Math.min(-dragDelta / 80, 1) : 0;

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
  const primaryGenre = genres[0] || 'Drama';
  const posterBg = imgError
    ? `linear-gradient(135deg, #1e2a4a 0%, #0f3460 50%, #16213e 100%)`
    : undefined;

  return (
    <div
      className="card-wrapper"
      style={style}
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-app-card shadow-card select-none">
        {/* Poster image */}
        <div className="absolute inset-0" style={posterBg ? { background: posterBg } : {}}>
          {!imgError ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ background: 'linear-gradient(135deg, #1e2a4a 0%, #0f3460 50%, #16213e 100%)' }}
            >
              <span className="text-7xl opacity-50">🎬</span>
              <span className="text-app-text-muted text-sm font-medium px-4 text-center">{movie.title}</span>
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 card-gradient pointer-events-none" />

        {/* LIKE stamp */}
        {isTop && (
          <div
            className="stamp-like"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </div>
        )}

        {/* NOPE stamp */}
        {isTop && (
          <div
            className="stamp-nope"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </div>
        )}

        {/* Genre badge top right */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-1 justify-end max-w-[60%]">
          {genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className={`genre-badge text-xs px-2 py-0.5 rounded-full font-semibold ${
                GENRE_COLORS[g] || DEFAULT_GENRE_COLOR
              }`}
            >
              {g}
            </span>
          ))}
        </div>

        {/* Movie info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Title & Year */}
          <div className="flex items-end justify-between mb-1">
            <h2 className="text-2xl font-extrabold text-white leading-tight flex-1 mr-2">
              {movie.title}
            </h2>
            <span className="text-app-text-muted text-sm font-medium shrink-0 bg-black/30 px-2 py-0.5 rounded-lg">
              {movie.year}
            </span>
          </div>

          {/* Director & Duration */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-app-text-muted text-xs font-medium truncate">
              🎬 {movie.director}
            </span>
            <span className="text-app-text-muted text-xs">
              ⏱ {formatDuration(movie.duration)}
            </span>
          </div>

          {/* Rating */}
          <div className="mb-2">
            <StarRating rating={movie.rating} />
          </div>

          {/* Description */}
          <div className="relative">
            <p
              className={`text-app-text text-xs leading-relaxed ${
                showFull ? '' : 'line-clamp-2'
              }`}
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
              {movie.description}
            </p>
            {movie.description.length > 100 && (
              <button
                className="text-app-pink text-xs font-semibold mt-0.5 hover:text-app-pink-dark transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFull(!showFull);
                }}
              >
                {showFull ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
