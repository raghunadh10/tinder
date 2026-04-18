import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchesList from '../components/MatchesList';

const API_BASE = '/api';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/movies/matches`);
      setMatches(res.data.data);
    } catch (err) {
      setError('Failed to load matches. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    try {
      await axios.post(`${API_BASE}/movies/reset`);
      setMatches([]);
      setResetConfirm(false);
    } catch (err) {
      setError('Failed to reset movies.');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-app-pink border-t-transparent rounded-full animate-spin" />
          <p className="text-app-text-muted text-sm">Loading your matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-app-card flex items-center justify-center mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-xl font-bold text-app-text mb-2">Connection Error</h3>
        <p className="text-app-text-muted text-sm mb-6 max-w-xs">{error}</p>
        <button
          onClick={fetchMatches}
          className="px-6 py-3 bg-app-pink text-white font-semibold rounded-xl hover:bg-app-pink-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-app-pink to-app-purple flex items-center justify-center shadow-glow-pink">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-app-text">Your Matches</h1>
            <p className="text-app-text-muted text-sm">
              {matches.length > 0
                ? `${matches.length} movie${matches.length !== 1 ? 's' : ''} you loved`
                : 'Movies you swiped right on'}
            </p>
          </div>
        </div>

        {/* Genre breakdown */}
        {matches.length > 0 && (
          <div className="mt-4 p-4 bg-app-card rounded-2xl border border-app-border">
            <p className="text-xs text-app-text-muted font-semibold uppercase tracking-wider mb-3">
              Your taste profile
            </p>
            <GenreBreakdown movies={matches} />
          </div>
        )}
      </div>

      {/* Reset confirmation */}
      {resetConfirm && (
        <div className="mb-4 p-4 bg-app-pink/10 border border-app-pink/30 rounded-xl flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-app-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-app-text text-sm font-medium">
              Click again to confirm reset — this will clear all likes!
            </span>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 bg-app-pink text-white text-sm font-semibold rounded-lg hover:bg-app-pink-dark transition-colors"
          >
            Confirm Reset
          </button>
        </div>
      )}

      <MatchesList matches={matches} onReset={handleReset} />
    </div>
  );
}

function GenreBreakdown({ movies }) {
  const genreCounts = {};
  movies.forEach((m) => {
    const genres = Array.isArray(m.genre) ? m.genre : [m.genre];
    genres.forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  const sorted = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const max = sorted[0]?.[1] || 1;

  const COLORS = {
    Action: 'bg-red-500',
    Adventure: 'bg-yellow-500',
    Animation: 'bg-pink-500',
    Biography: 'bg-amber-500',
    Comedy: 'bg-green-500',
    Crime: 'bg-gray-500',
    Drama: 'bg-blue-500',
    Family: 'bg-teal-500',
    History: 'bg-stone-500',
    Horror: 'bg-purple-500',
    Music: 'bg-indigo-500',
    Mystery: 'bg-violet-500',
    Romance: 'bg-rose-500',
    'Sci-Fi': 'bg-cyan-500',
    Thriller: 'bg-orange-500',
    War: 'bg-zinc-500',
  };

  return (
    <div className="space-y-2">
      {sorted.map(([genre, count]) => (
        <div key={genre} className="flex items-center gap-3">
          <span className="text-app-text-muted text-xs w-16 shrink-0">{genre}</span>
          <div className="flex-1 h-2 bg-app-darker rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${COLORS[genre] || 'bg-app-pink'}`}
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="text-app-text-muted text-xs w-4 text-right">{count}</span>
        </div>
      ))}
    </div>
  );
}
