import React from 'react';

export default function SwipeButtons({ onLike, onDislike, onSuperLike, disabled }) {
  return (
    <div className="flex items-center justify-center gap-5 py-2">
      {/* Dislike Button */}
      <button
        onClick={onDislike}
        disabled={disabled}
        aria-label="Dislike movie"
        className={`
          btn-action
          group
          w-16 h-16
          rounded-full
          flex items-center justify-center
          bg-app-card
          border-2 border-app-pink/30
          shadow-lg
          transition-all duration-200
          hover:border-app-pink hover:shadow-glow-pink hover:bg-app-pink/10
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          disabled:hover:border-app-pink/30 disabled:hover:bg-app-card
          active:scale-95
        `}
      >
        <svg
          className="w-7 h-7 text-app-pink group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Super Like Button */}
      <button
        onClick={onSuperLike}
        disabled={disabled}
        aria-label="Super like movie"
        className={`
          btn-action
          group
          w-14 h-14
          rounded-full
          flex items-center justify-center
          bg-app-card
          border-2 border-blue-500/30
          shadow-lg
          transition-all duration-200
          hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-500/10
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          active:scale-95
        `}
      >
        <svg
          className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>

      {/* Like Button */}
      <button
        onClick={onLike}
        disabled={disabled}
        aria-label="Like movie"
        className={`
          btn-action
          group
          w-16 h-16
          rounded-full
          flex items-center justify-center
          bg-app-card
          border-2 border-green-500/30
          shadow-lg
          transition-all duration-200
          hover:border-green-400 hover:shadow-glow-green hover:bg-green-500/10
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          disabled:hover:border-green-500/30 disabled:hover:bg-app-card
          active:scale-95
        `}
      >
        <svg
          className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
}
