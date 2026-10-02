import React, { useState, useMemo, useEffect } from 'react';
import { 
  MOVIES_DATA, 
  INITIAL_REQUESTS 
} from './data/movies';
import { 
  Movie, 
  MovieCategory, 
  DownloadPack, 
  DownloadLink, 
  MovieRequest 
} from './types/movie';

import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MovieCard } from './components/MovieCard';
import { Bolly4uMoviePost } from './components/Bolly4uMoviePost';
import { DownloadModal } from './components/DownloadModal';
import { RequestMovieModal } from './components/RequestMovieModal';
import { BloggerExportModal } from './components/BloggerExportModal';
import { Footer } from './components/Footer';

import { Film, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rating' | 'year' | 'title'>('latest');

  // Watchlist State (with localStorage persistence)
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moviehub4y_watchlist') || localStorage.getItem('bolly4u_watchlist');
      return saved ? JSON.parse(saved) : ['stree-2-2024', 'pushpa-2-the-rule-2024'];
    } catch {
      return ['stree-2-2024', 'pushpa-2-the-rule-2024'];
    }
  });
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  // Active Movie View (When clicked, displays exact Bolly4u Single Post Page from Video)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Download Generation Modal State
  const [activeDownloadPack, setActiveDownloadPack] = useState<DownloadPack | null>(null);
  const [activeDownloadLink, setActiveDownloadLink] = useState<DownloadLink | null>(null);
  const [downloadMovieTitle, setDownloadMovieTitle] = useState<string>('');
  
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState(false);
  const [requests, setRequests] = useState<MovieRequest[]>(INITIAL_REQUESTS);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Watchlist persistence
  useEffect(() => {
    try {
      localStorage.setItem('moviehub4y_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(movieId);
      if (exists) {
        showToast('Removed from Watchlist');
        return prev.filter((id) => id !== movieId);
      } else {
        showToast('Added to Watchlist');
        return [...prev, movieId];
      }
    });
  };

  // Movie Requests
  const handleAddRequest = (newReq: Omit<MovieRequest, 'id' | 'status' | 'requestedAt'>) => {
    const item: MovieRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      status: 'Pending',
      requestedAt: 'Just now'
    };
    setRequests((prev) => [item, ...prev]);
    showToast('Movie request submitted successfully!');
  };

  // Filtered and Sorted Movies
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((m) => {
      // Watchlist filter
      if (showWatchlistOnly && !watchlist.includes(m.id)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchFormatted = m.formattedTitle.toLowerCase().includes(q);
        const matchCast = m.cast.some((c) => c.toLowerCase().includes(q));
        const matchDirector = m.director.toLowerCase().includes(q);
        const matchGenre = m.genres.some((g) => g.toLowerCase().includes(q));
        const matchYear = m.year.toString().includes(q);
        if (!matchTitle && !matchFormatted && !matchCast && !matchDirector && !matchGenre && !matchYear) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'web-series') {
          const isSeries = m.category === 'web-series' || 
            m.genres.some((g) => g.toLowerCase().includes('series')) ||
            m.title.toLowerCase().includes('season') || 
            m.title.toLowerCase().includes('series');
          if (!isSeries) return false;
        } else if (selectedCategory === 'k-drama') {
          const isKDrama = m.category === 'k-drama' || 
            m.genres.some((g) => g.toLowerCase().includes('korean') || g.toLowerCase().includes('k-drama')) ||
            m.title.toLowerCase().includes('korean') ||
            m.audio.toLowerCase().includes('korean');
          if (!isKDrama) return false;
        } else if (selectedCategory === 'animation') {
          const isAnim = m.category === 'animation' || 
            m.genres.some((g) => g.toLowerCase().includes('animation') || g.toLowerCase().includes('anime')) ||
            m.title.toLowerCase().includes('animation');
          if (!isAnim) return false;
        } else if (selectedCategory === 'dual-audio') {
          if (!m.audio.toLowerCase().includes('dual') && !m.audio.toLowerCase().includes('multi')) return false;
        } else if (m.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0; // latest order
    });
  }, [
    showWatchlistOnly,
    watchlist,
    searchQuery,
    selectedCategory,
    sortBy
  ]);

  const handleInitiateDownload = (pack: DownloadPack, link: DownloadLink, title: string) => {
    setActiveDownloadPack(pack);
    setActiveDownloadLink(link);
    setDownloadMovieTitle(title);
  };

  // Dynamic Section Heading
  const getSectionHeading = () => {
    if (showWatchlistOnly) return 'My Saved Movies (Download Watchlist)';
    if (searchQuery.trim()) return `Movie Results for "${searchQuery}"`;
    switch (selectedCategory) {
      case 'bollywood': return 'Bollywood Movies Download (480p, 720p, 1080p, 4K)';
      case 'web-series': return 'Web Series Download (All Episodes Hindi Dubbed / Dual Audio)';
      case 'k-drama': return 'K-Drama Download (Korean Series Hindi Dubbed)';
      case 'animation': return 'Animated Movies Download (Hindi Dubbed & Dual Audio 1080p 720p)';
      case 'south-hindi': return 'South Indian Movies (Hindi Dubbed Download)';
      case 'hollywood-hindi': return 'Hollywood Movies (Hindi Dubbed Dual Audio Download)';
      case 'punjabi': return 'Punjabi Movies Download (Full HD Clean)';
      case 'dual-audio': return 'Dual Audio Movies Download [Hindi + English]';
      default: return 'Latest Movies & Series Added';
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#222] flex flex-col font-sans selection:bg-[#0066cc] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-[#0066cc] text-white px-4 py-2.5 rounded shadow-xl font-bold text-xs flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 fill-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (selectedMovie) setSelectedMovie(null);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedMovie) setSelectedMovie(null);
        }}
        watchlistCount={watchlist.length}
        showWatchlistOnly={showWatchlistOnly}
        onToggleWatchlist={() => {
          setShowWatchlistOnly(!showWatchlistOnly);
          if (selectedMovie) setSelectedMovie(null);
        }}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
      />

      {/* Secondary Categories Bar (Matching real Bolly4u) */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedMovie) setSelectedMovie(null);
        }}
        showWatchlistOnly={showWatchlistOnly}
        onDisableWatchlistOnly={() => {
          setShowWatchlistOnly(false);
          if (selectedMovie) setSelectedMovie(null);
        }}
      />

      {/* If a Movie is selected: Render the EXACT Bolly4u Single Post Page from Video */}
      {selectedMovie ? (
        <Bolly4uMoviePost
          movie={selectedMovie}
          onBack={() => {
            setSelectedMovie(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onInitiateDownload={handleInitiateDownload}
          isBookmarked={watchlist.includes(selectedMovie.id)}
          onToggleBookmark={toggleWatchlist}
        />
      ) : (
        /* Otherwise: Render Clean Movie Catalog */
        <main className="flex-1 w-full max-w-[1800px] mx-auto px-3 sm:px-6 py-4">
          {/* Section Header */}
          <div className="bg-white rounded border border-gray-300 p-3 mb-4 shadow-2xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-4 bg-[#cc0000] rounded-xs" />
              <h2 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
                {getSectionHeading()}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-mono text-[11px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                <strong className="text-[#0066cc]">{filteredMovies.length}</strong> Movies Available
              </span>

              {showWatchlistOnly && (
                <button
                  onClick={() => setShowWatchlistOnly(false)}
                  className="text-xs text-[#0066cc] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>All Movies</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-2.5 sm:gap-3.5">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={(m) => {
                    setSelectedMovie(m);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  isBookmarked={watchlist.includes(movie.id)}
                  onToggleBookmark={toggleWatchlist}
                />
              ))}
            </div>
          ) : (
            /* Empty Search / Filter State */
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-3 bg-white rounded border border-gray-300 my-6">
              <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-800 mb-1">
                  {showWatchlistOnly ? 'Your Watchlist is Empty' : 'No Movies Found'}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {showWatchlistOnly
                    ? 'Save movies by clicking the bookmark button on any movie card.'
                    : `No movie matching "${searchQuery}". Please check the spelling or request it below.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-1 rounded bg-[#0066cc] hover:bg-[#0055aa] text-white font-bold text-xs transition-colors"
                  >
                    Clear Search
                  </button>
                )}

                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs border border-gray-300 transition-colors"
                >
                  Request this Movie
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedMovie) setSelectedMovie(null);
        }}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
      />

      {/* Download Generation Modal */}
      <DownloadModal
        pack={activeDownloadPack}
        link={activeDownloadLink}
        movieTitle={downloadMovieTitle}
        onClose={() => {
          setActiveDownloadPack(null);
          setActiveDownloadLink(null);
        }}
      />

      {/* Request Movie Modal */}
      <RequestMovieModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        requests={requests}
        onSubmitRequest={handleAddRequest}
      />

      {/* Blogger Hosting XML Export Modal */}
      <BloggerExportModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
      />
    </div>
  );
}
