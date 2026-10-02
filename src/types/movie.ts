export type MovieCategory = 
  | 'all'
  | 'bollywood'
  | 'hollywood-hindi'
  | 'south-hindi'
  | 'web-series'
  | 'k-drama'
  | 'animation'
  | 'dual-audio'
  | 'punjabi'
  | '300mb'
  | '4k-uhd';

export type QualityTier = '480p' | '720p' | '1080p' | '4k' | 'hevc';

export interface DownloadLink {
  serverName: string;
  type: 'cloud' | 'gdrive' | 'torrent' | 'direct';
  speed: string;
  url: string;
  isRecommended?: boolean;
}

export interface DownloadPack {
  tier: string; // e.g. "480p [450MB]", "720p [1.2GB]", "1080p [2.8GB]", "4K Ultra HD [6.5GB]"
  label: string;
  size: string;
  resolution: string;
  codec: string;
  audioSpec: string;
  links: DownloadLink[];
}

export interface Movie {
  id: string;
  title: string;
  formattedTitle: string; // e.g. "Stree 2 (2024) Hindi Movie Download WEB-DL 1080p 720p 480p"
  originalTitle?: string;
  year: number;
  category: MovieCategory;
  genres: string[];
  rating: number;
  voteCount: string;
  quality: string; // e.g. "WEB-DL", "HDRip", "BluRay", "Pre-DVDRip"
  resolutions: string[]; // e.g. ['480p', '720p', '1080p', '4K']
  audio: string; // e.g. "Hindi DDP 5.1 + English"
  subtitles: string; // e.g. "English [MSubs]"
  runtime: string;
  director: string;
  cast: string[];
  storyline: string;
  poster: string;
  backdrop: string;
  screenshots: string[];
  trailerUrl: string;
  videoPreviewUrl?: string;
  releaseDate: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  is300MB?: boolean;
  downloadPacks: DownloadPack[];
}

export interface MovieFilterState {
  category: MovieCategory;
  genre: string;
  year: string;
  quality: string;
  searchQuery: string;
  sortBy: 'latest' | 'rating' | 'year' | 'title';
  onlyWatchlist: boolean;
}

export interface MovieRequest {
  id: string;
  title: string;
  year: string;
  preferredQuality: string;
  language: string;
  status: 'Pending' | 'Uploaded' | 'Processing';
  requestedAt: string;
}

