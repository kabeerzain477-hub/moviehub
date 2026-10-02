import React, { useState } from 'react';
import { Search, Bookmark, Film, Send, X, Clapperboard, Sparkles, FileCode } from 'lucide-react';
import { MovieCategory } from '../types/movie';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: MovieCategory;
  onSelectCategory: (category: MovieCategory) => void;
  watchlistCount: number;
  showWatchlistOnly: boolean;
  onToggleWatchlist: () => void;
  onOpenRequestModal: () => void;
  onOpenBloggerModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  watchlistCount,
  showWatchlistOnly,
  onToggleWatchlist,
  onOpenRequestModal,
  onOpenBloggerModal
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const quickSearchTags = ['Stree 2', 'Pushpa 2', 'Singham Again', 'Kalki 2898 AD', 'Bhool Bhulaiyaa 3', 'Devara'];

  return (
    <header className="sticky top-0 z-40 bg-[#161a23] border-b border-gray-800 shadow-md">
      {/* Top Warning & Telegram Alert Bar */}
      <div className="bg-[#0f131a] border-b border-gray-800 text-[11px] py-1.5 px-3 sm:px-6 text-gray-300">
        <div className="w-full max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#cc0000] text-white font-bold px-1.5 py-0.2 rounded text-[10px] tracking-wider uppercase">
              Official
            </span>
            <span className="text-gray-300">Official Site:</span>
            <span className="text-amber-400 font-mono font-bold tracking-tight">moviehub4y.online</span>
            <span className="hidden md:inline text-gray-500">· Fast Movies Download (No Fake Links)</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0088cc] hover:text-[#33a3dc] font-bold transition-colors"
            >
              <Send className="w-3.5 h-3.5 fill-[#0088cc]" />
              <span>Join Telegram Channel For Instant Alerts</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              onSelectCategory('all');
              if (showWatchlistOnly) onToggleWatchlist();
            }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded bg-[#cc0000] flex items-center justify-center text-white shadow-sm font-black text-lg">
              M
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">MOVIE</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-400 font-display">HUB</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#ff3333] font-display">4Y</span>
                <span className="ml-1 text-[9px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-mono font-bold">.ONLINE</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium tracking-tight -mt-0.5 hidden sm:block">
                moviehub4y.online · Free Movies Portal
              </p>
            </div>
          </button>
        </div>

        {/* Search Bar Zone */}
        <div className="flex-1 max-w-md relative">
          <div
            className={`flex items-center gap-2 bg-[#0e1118] rounded-md px-3 py-1.5 border transition-all ${
              isSearchFocused
                ? 'border-amber-500 ring-1 ring-amber-500/30'
                : 'border-gray-700/80 hover:border-gray-600'
            }`}
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search movies (e.g. Stree 2, Pushpa 2, Singham)..."
              className="w-full bg-transparent text-xs text-white placeholder:text-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-gray-400 hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Suggestions when focused */}
          {isSearchFocused && !searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 p-2.5 bg-[#12151e] border border-gray-700 rounded-md shadow-xl z-50">
              <div className="text-[10px] font-semibold text-gray-400 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Trending Movie Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => onSearchChange(tag)}
                    className="text-xs bg-[#1e2330] hover:bg-amber-500/20 hover:text-amber-300 text-gray-300 px-2 py-0.5 rounded transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenBloggerModal && (
            <button
              onClick={onOpenBloggerModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-bold bg-[#cc0000] hover:bg-[#b30000] text-white shadow-xs transition-colors cursor-pointer"
              title="Download Blogger XML Theme File"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Blogger XML</span>
              <span className="sm:hidden">XML</span>
            </button>
          )}

          <button
            onClick={onToggleWatchlist}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold transition-all ${
              showWatchlistOnly
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700'
            }`}
            title="Saved Watchlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${showWatchlistOnly ? 'fill-black' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {watchlistCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] tabular-nums font-mono font-bold ${
                showWatchlistOnly ? 'bg-black text-amber-400' : 'bg-amber-500 text-black'
              }`}>
                {watchlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenRequestModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Request</span>
          </button>
        </div>
      </div>
    </header>
  );
};
