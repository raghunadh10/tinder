import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SwipeButtons from '../components/SwipeButtons';

const API_BASE = '/api';

// Match overlay component
function MatchOverlay({ movie, onClose }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['#e94560', '#ff6b9d', '#ffd700', '#00ff88', '#6c63ff'][
        Math.floor(Math.random() * 5)
      ],
      size: Math.random() * 8 + 4,
    }));
    setParticles(p);

    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div
      className="match-overlay animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Match found!"
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: '60%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti 1.5s ${p.delay}s ease-out forwards`,
          }}
        />
      ))}

      <div className="match-content animate-match-pop pointer-events-none">
        {/* Match badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-app-pink/20 to-app-purple/20 border border-app-pink/30 rounded-full px-6 py-2">
            <span className="text-2xl">🎉</span>
            <span className="text-app-pink font-black text-3xl tracking-wider uppercase">
              It's a Match!
            </span>
            <span className="text-2xl">🎉</span>
          </div>
        </div>

        {/* Movie poster & info */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-44 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-app-pink/50 shadow-glow-pink">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background =
                    'linear-gradient(135deg, #1e2a4a, #0f3460)';
                }}
              />
            </div>
            {/* Hearts floating */}
            <div className="absolute -top-4 -right-4 text-3xl animate-bounce">❤️</div>
            <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse">💕</div>
          </div>

          <div className="text-center">
            <h3 className="text-white text-2xl font-extrabold mb-1">{movie.title}</h3>
            <p className="text-app-text-muted text-sm">
              {movie.year} • {Array.isArray(movie.genre) ? movie.genre[0] : movie.genre}
            </p>
            <div className="mt-3 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(movie.rating / 2)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white font-bold ml-1">{movie.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <p className="text-app-text-muted text-sm mt-4 animate-pulse">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="w-full max-w-sm h-[520px] rounded-3xl shimmer bg-app-card" />
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full shimmer bg-app-card" />
        <div className="w-14 h-14 rounded-full shimmer bg-app-card" />
        <div className="w-16 h-16 rounded-full shimmer bg-app-card" />
      </div>
    </div>
  );
}

// Empty state
function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="float-animation mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-app-card to-app-blue flex items-center justify-center border-2 border-app-border">
          <span className="text-5xl">🎬</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-app-text mb-2">You've seen them all!</h3>
      <p className="text-app-text-muted text-sm max-w-xs mb-6">
        You've swiped through all available movies. Reset to start fresh and discover your favorites again!
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-app-pink to-app-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-glow-pink"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start Over
        </button>
        <a
          href="/matches"
          className="inline-flex items-center gap-2 px-6 py-3 bg-app-card border border-app-border text-app-text font-semibold rounded-xl hover:border-app-pink/50 transition-colors"
        >
          <svg className="w-4 h-4 text-app-pink" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          View Matches
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Drag state
  const dragStart = useRef(null);
  const cardRef = useRef(null);
  const animFrameRef = useRef(null);

  const currentMovie = movies[currentIndex] || null;
  const nextMovie = movies[currentIndex + 1] || null;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/movies`);
      setMovies(res.data.data);
      setCurrentIndex(0);
    } catch (err) {
      setError('Failed to load movies. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE}/movies/reset`);
      await fetchMovies();
    } catch (err) {
      setError('Failed to reset movies.');
    }
  };

  const handleLike = useCallback(async () => {
    if (!currentMovie || isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection('right');

    try {
      await axios.post(`${API_BASE}/movies/${currentMovie._id}/like`);
      setMatchedMovie(currentMovie);
      window.dispatchEvent(new CustomEvent('movieMatched'));
    } catch (err) {
      console.error('Failed to like movie:', err);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragDelta(0);
      setIsAnimating(false);
    }, 450);
  }, [currentMovie, isAnimating]);

  const handleDislike = useCallback(async () => {
    if (!currentMovie || isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection('left');

    try {
      await axios.post(`${API_BASE}/movies/${currentMovie._id}/dislike`);
    } catch (err) {
      console.error('Failed to dislike movie:', err);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragDelta(0);
      setIsAnimating(false);
    }, 450);
  }, [currentMovie, isAnimating]);

  const handleSuperLike = useCallback(async () => {
    if (!currentMovie || isAnimating) return;
    await handleLike();
  }, [currentMovie, isAnimating, handleLike]);

  // Drag / swipe handlers
  const onPointerDown = (e) => {
    if (isAnimating) return;
    dragStart.current = {
      x: e.clientX ?? e.touches?.[0]?.clientX,
      y: e.clientY ?? e.touches?.[0]?.clientY,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragStart.current || isAnimating) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const dx = x - dragStart.current.x;
    setDragDelta(dx);
  };

  const onPointerUp = (e) => {
    if (!dragStart.current || isAnimating) return;
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const dx = x - dragStart.current.x;
    dragStart.current = null;

    const threshold = 80;
    if (dx > threshold) {
      handleLike();
    } else if (dx < -threshold) {
      handleDislike();
    } else {
      setDragDelta(0);
    }
  };

  // Compute card transform from drag or swipe animation
  const getCardStyle = () => {
    if (swipeDirection === 'right') {
      return {
        animation: 'swipeRight 0.4s ease-in forwards',
        zIndex: 20,
      };
    }
    if (swipeDirection === 'left') {
      return {
        animation: 'swipeLeft 0.4s ease-in forwards',
        zIndex: 20,
      };
    }
    if (dragDelta !== 0) {
      const rotate = dragDelta / 20;
      return {
        transform: `translateX(${dragDelta}px) rotate(${rotate}deg)`,
        transition: 'none',
        zIndex: 20,
      };
    }
    return {
      transform: 'translateX(0) rotate(0deg)',
      transition: 'transform 0.3s ease',
      zIndex: 20,
    };
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full py-6">
      <LoadingSkeleton />
    </div>
  );

  if (error) return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-app-card flex items-center justify-center mb-4">
        <span className="text-4xl">⚠️</span>
      </div>
      <h3 className="text-xl font-bold text-app-text mb-2">Connection Error</h3>
      <p className="text-app-text-muted text-sm mb-6 max-w-xs">{error}</p>
      <button
        onClick={fetchMovies}
        className="px-6 py-3 bg-app-pink text-white font-semibold rounded-xl hover:bg-app-pink-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const remainingCount = movies.length - currentIndex;

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-4 pb-8 max-w-md mx-auto w-full">
      {/* Progress & counter */}
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {movies.slice(0, Math.min(movies.length, 10)).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentIndex
                    ? 'bg-app-text-muted/30 w-2'
                    : i === currentIndex
                    ? 'bg-app-pink w-4'
                    : 'bg-app-text-muted/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-app-card px-3 py-1.5 rounded-full border border-app-border">
          <svg className="w-3.5 h-3.5 text-app-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <span className="text-app-text-muted text-xs font-semibold">
            {remainingCount > 0 ? `${remainingCount} left` : 'All done!'}
          </span>
        </div>
      </div>

      {/* Hint text */}
      {remainingCount > 0 && !swipeDirection && dragDelta === 0 && (
        <p className="text-app-text-muted text-xs mb-3 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span>👈</span> Swipe left to skip
          </span>
          <span className="w-1 h-1 rounded-full bg-app-border" />
          <span className="flex items-center gap-1">
            Swipe right to like <span>👉</span>
          </span>
        </p>
      )}

      {/* Card stack or empty state */}
      {remainingCount === 0 ? (
        <EmptyState onReset={handleReset} />
      ) : (
        <>
          {/* Card stack */}
          <div className="swipe-container mb-6">
            {/* Background card (next movie) */}
            {nextMovie && (
              <div
                className="card-wrapper"
                style={{
                  zIndex: 10,
                  transform: 'scale(0.95) translateY(16px)',
                  transition: 'transform 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden bg-app-card shadow-card opacity-70">
                  <img
                    src={nextMovie.posterUrl}
                    alt={nextMovie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 card-gradient" />
                </div>
              </div>
            )}

            {/* Third card peek */}
            {movies[currentIndex + 2] && (
              <div
                className="card-wrapper"
                style={{
                  zIndex: 9,
                  transform: 'scale(0.90) translateY(28px)',
                  transition: 'transform 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <div className="w-full h-full rounded-3xl bg-app-card opacity-40" />
              </div>
            )}

            {/* Top card (current movie) */}
            {currentMovie && (
              <div
                ref={cardRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                style={getCardStyle()}
                className="touch-none"
              >
                <MovieCard
                  movie={currentMovie}
                  isTop={true}
                  dragDelta={dragDelta}
                />
              </div>
            )}
          </div>

          {/* Swipe buttons */}
          <SwipeButtons
            onLike={handleLike}
            onDislike={handleDislike}
            onSuperLike={handleSuperLike}
            disabled={!currentMovie || isAnimating}
          />

          {/* Keyboard hint */}
          <p className="text-app-text-muted/50 text-xs mt-3 hidden sm:block">
            Drag the card or use the buttons below
          </p>
        </>
      )}

      {/* Match overlay */}
      {matchedMovie && (
        <MatchOverlay
          movie={matchedMovie}
          onClose={() => setMatchedMovie(null)}
        />
      )}
    </div>
  );
}
