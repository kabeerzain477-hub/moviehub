import React, { useState } from 'react';
import { Movie } from '../types/movie';
import { Star, Download, Film, Bookmark } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  isBookmarked: boolean;
  onToggleBookmark: (movieId: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  isBookmarked,
  onToggleBookmark
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={() => onSelect(movie)}
      className="group bg-white rounded-lg border border-gray-200 hover:border-[#0066cc] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Poster Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        {!imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-gray-400 bg-gray-50">
            <Film className="w-8 h-8 mb-1 text-gray-300" />
            <span className="text-[11px] text-center font-medium">{movie.title}</span>
          </div>
        )}

        {/* Quality Badge Overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="bg-[#cc0000] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
            {movie.quality}
          </span>
        </div>

        {/* IMDb Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-black/80 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs font-mono">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{movie.rating}</span>
          </div>
        </div>

        {/* Audio Language Tag */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
            {movie.audio.includes('Dual') ? 'Dual Audio' : 'Hindi Clean'}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(movie.id);
          }}
          className={`absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors ${
            isBookmarked
              ? 'bg-amber-500 text-white'
              : 'bg-black/60 text-white hover:bg-black/80'
          }`}
          title={isBookmarked ? 'Bookmarked' : 'Save'}
        >
          <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Info Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <h3 
          className="text-xs font-bold text-gray-900 group-hover:text-[#0066cc] line-clamp-2 leading-snug transition-colors"
          title={movie.formattedTitle}
        >
          {movie.formattedTitle}
        </h3>

        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            className="w-full py-1.5 px-3 bg-[#0066cc] group-hover:bg-[#0052a3] text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
