import React from 'react';
import { MovieCategory } from '../types/movie';

interface CategoryNavProps {
  selectedCategory: MovieCategory;
  onSelectCategory: (category: MovieCategory) => void;
  showWatchlistOnly: boolean;
  onDisableWatchlistOnly: () => void;
}

interface CategoryItem {
  id: MovieCategory;
  label: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Movies' },
  { id: 'bollywood', label: 'Bollywood Movies' },
  { id: 'web-series', label: 'Web Series' },
  { id: 'k-drama', label: 'K-Drama' },
  { id: 'animation', label: 'Animation' },
  { id: 'south-hindi', label: 'South Hindi Dubbed' },
  { id: 'hollywood-hindi', label: 'Hollywood (Hindi Dubbed)' },
  { id: 'dual-audio', label: 'Dual Audio' },
  { id: 'punjabi', label: 'Punjabi Movies' }
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  showWatchlistOnly,
  onDisableWatchlistOnly
}) => {
  return (
    <nav className="bg-[#1f2430] border-b border-gray-800 shadow-xs">
      <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = !showWatchlistOnly && selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (showWatchlistOnly) onDisableWatchlistOnly();
                  onSelectCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#cc0000] text-white shadow-xs font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
