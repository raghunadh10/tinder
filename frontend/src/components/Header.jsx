import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE = '/api';

export default function Header() {
  const location = useLocation();
  const [matchCount, setMatchCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchMatchCount();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Refresh match count when navigating to matches page or coming back
  useEffect(() => {
    fetchMatchCount();
  }, [location.pathname]);

  const fetchMatchCount = async () => {
    try {
      const res = await axios.get(`${API_BASE}/movies/matches`);
      setMatchCount(res.data.data.length);
    } catch {
      setMatchCount(0);
    }
  };

  // Listen for custom match event
  useEffect(() => {
    const handleMatch = () => {
      setMatchCount((prev) => prev + 1);
    };
    window.addEventListener('movieMatched', handleMatch);
    return () => window.removeEventListener('movieMatched', handleMatch);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-app-darker/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-app-darker'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="CinéMatch Home"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-app-pink to-app-purple flex items-center justify-center shadow-glow-pink group-hover:scale-110 transition-transform duration-200">
              <span className="text-xl">🎬</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-app-pink rounded-full border-2 border-app-darker animate-pulse-pink" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold gradient-text leading-none tracking-tight">
              CinéMatch
            </span>
            <span className="text-xs text-app-text-muted font-medium">
              Swipe. Watch. Love.
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-app-pink text-white shadow-glow-pink'
                : 'text-app-text-muted hover:text-app-text hover:bg-app-card'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              Discover
            </span>
          </Link>

          <Link
            to="/matches"
            className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
              location.pathname === '/matches'
                ? 'bg-app-pink text-white shadow-glow-pink'
                : 'text-app-text-muted hover:text-app-text hover:bg-app-card'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill={location.pathname === '/matches' ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Matches
            </span>
            {matchCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-app-pink text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-glow-pink">
                {matchCount > 99 ? '99+' : matchCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
