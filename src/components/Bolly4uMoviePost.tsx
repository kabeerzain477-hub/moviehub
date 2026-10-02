import React, { useState } from 'react';
import { Movie, DownloadPack, DownloadLink } from '../types/movie';
import { 
  ArrowLeft, Send, Share2, 
  Download, Bookmark, FileCode, Check, Copy
} from 'lucide-react';

interface Bolly4uMoviePostProps {
  movie: Movie;
  onBack: () => void;
  onInitiateDownload: (pack: DownloadPack, link: DownloadLink, movieTitle: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (movieId: string) => void;
}

export const Bolly4uMoviePost: React.FC<Bolly4uMoviePostProps> = ({
  movie,
  onBack,
  onInitiateDownload,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedBloggerPost, setCopiedBloggerPost] = useState(false);

  const formatTierHeading = (pack: DownloadPack) => {
    const tier = pack.tier.toUpperCase();
    const size = pack.size ? pack.size.toUpperCase() : '';
    
    if (tier.includes('DOWNLOAD LINKS')) {
      return tier;
    }
    // E.g. 720P [1.2GB/EP] DOWNLOAD LINKS
    if (tier.includes('/EP') || tier.includes('EPISODE')) {
      return `${tier} DOWNLOAD LINKS`;
    }
    // E.g. 1080P [2.8GB] DOWNLOAD LINKS : 2.8 GB
    if (size && !tier.endsWith(size)) {
      return `${tier} DOWNLOAD LINKS : ${size}`;
    }
    return `${tier} DOWNLOAD LINKS`;
  };

  const handleCopyBloggerPost = async () => {
    const postHtml = `<div class="post-top-notice">
  <strong>MovieHub4y:</strong> Download Free Movies &amp; Series in 480p, 720p, 1080p and 4K Ultra HD Dual Audio.
</div>

<div style="text-align: center; margin: 15px 0;">
  <img src="${movie.poster}" alt="${movie.title}" style="max-width: 250px; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);" />
</div>

<div class="meta-checklist" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; line-height: 1.8;">
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>IMDb Rating :</strong> ${movie.rating}/10 (${movie.voteCount} Votes)</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Genre :</strong> ${movie.genres.join(', ')}</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Director / Creator :</strong> ${movie.director}</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Star Cast :</strong> ${movie.cast.join(', ')}</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Language :</strong> ${movie.audio}</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Subtitles :</strong> ${movie.subtitles}</div>
  <div class="meta-item"><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Video Quality :</strong> ${movie.quality} · ${movie.resolutions.join(', ')}</div>
</div>

<div class="storyline-box" style="margin-bottom: 16px; font-size: 12px; line-height: 1.6; color: #334155;">
  <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 6px;">Synopsis / Plot:</h4>
  <p>${movie.storyline}</p>
</div>

<div style="text-align: center; margin: 16px 0;">
  <a href="https://telegram.org" target="_blank" rel="noreferrer" style="display: inline-block; background: #0088cc; color: #fff; padding: 10px 24px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 12px;">
    ✈ Join Telegram Channel For Instant Alerts
  </a>
</div>

<!-- Download Links Section -->
<div class="download-section" style="border-top: 2px dashed #cbd5e1; padding-top: 20px; margin-top: 20px;">
  <div style="text-align: center; margin-bottom: 16px;">
    <h3 style="font-size: 15px; font-weight: 800; color: #1e293b; text-transform: uppercase;">
      FREE DOWNLOAD FULL MOVIE VIA SINGLE LINKS
    </h3>
  </div>

  ${movie.downloadPacks.map((pack) => `
  <!-- ${formatTierHeading(pack)} -->
  <div class="quality-tier-block" style="margin-bottom: 20px;">
    <div style="text-align: center; font-size: 13px; font-weight: 800; color: #0066cc; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px;">
      ${formatTierHeading(pack)}
    </div>
    <div class="boxed-buttons-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-width: 600px; margin: 0 auto;">
      <a href="${pack.links[0]?.url || 'https://hubcloud.stream'}" target="_blank" class="box-dl-btn" style="text-align: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT 1 ]</a>
      <a href="${pack.links[1]?.url || 'https://drive.google.com'}" target="_blank" class="box-dl-btn" style="text-align: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT [ G-DRIVE ] ]</a>
      <a href="magnet:?xt=urn:btih:${movie.id}_${pack.tier}" class="box-dl-btn" style="text-align: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DOWNLOAD [T] ]</a>
      <a href="${pack.links[0]?.url || 'https://hubcloud.stream'}" target="_blank" class="box-dl-btn" style="text-align: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ HUBCLOUD VIP ]</a>
    </div>
  </div>`).join('\n')}
</div>`;

    await navigator.clipboard.writeText(postHtml);
    setCopiedBloggerPost(true);
    setTimeout(() => setCopiedBloggerPost(false), 2500);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Download ${movie.title} on MovieHub4y`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#f0f2f5] text-[#222] py-4 px-2 sm:px-4 font-sans">
      <div className="w-full max-w-[1400px] mx-auto space-y-3">
        {/* Back Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-2 rounded border border-gray-300 shadow-2xs">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0066cc] hover:text-[#004488] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Movies</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBloggerPost}
              className="px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border border-blue-200 bg-blue-50 text-[#0066cc] hover:bg-blue-100 transition-colors cursor-pointer"
              title="Copy HTML to paste directly into a Blogger post"
            >
              {copiedBloggerPost ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Blogger HTML Copied!</span>
                </>
              ) : (
                <>
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Copy Blogger Post HTML</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleBookmark(movie.id)}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Save Movie'}</span>
            </button>
          </div>
        </div>

        {/* Main White Content Card */}
        <article className="bg-white rounded border border-gray-300 shadow-xs p-4 sm:p-6 space-y-4">
          
          {/* Top Legal Notice Bar */}
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[11px] text-gray-600 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <span className="text-emerald-600">🗹 Watch this legally:</span>
              <span className="font-normal text-gray-500 hidden sm:inline">
                Looking to watch this title? MovieHub4y (moviehub4y.online) doesn't host or link to any copyrighted files. Available to stream legally:
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[11px] text-gray-600">
              <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">JioCinema</span>
              <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">Netflix</span>
              <span className="bg-white px-1.5 py-0.5 rounded border border-gray-200">Prime Video</span>
            </div>
          </div>

          {/* Centered Post Title */}
          <div className="text-center border-b border-gray-100 pb-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111] leading-tight">
              {movie.formattedTitle}
            </h1>
          </div>

          {/* Centered Poster */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-52 sm:w-60 rounded overflow-hidden border border-gray-300 shadow-sm bg-gray-100 aspect-[3/4]">
              <img
                src={movie.poster}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Checkmark Metadata List */}
          <div className="bg-[#f9fafc] border border-gray-200 rounded p-3.5 sm:p-4 space-y-1.5 text-xs text-gray-800 font-sans">
            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>IMDb Rating :</strong> <span className="font-bold text-gray-900">{movie.rating}/10</span> <span className="text-gray-500 font-normal">({movie.voteCount} Votes)</span></span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Genre :</strong> {movie.genres.join(', ')}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Director / Creators :</strong> {movie.director}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Stars Cast :</strong> {movie.cast.join(', ')}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Language :</strong> <span className="font-semibold text-emerald-700">{movie.audio}</span></span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Subtitles :</strong> {movie.subtitles}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span><strong>Video Quality :</strong> <span className="font-mono font-medium">{movie.quality} · {movie.resolutions.join(', ')}</span></span>
            </div>

            <div className="flex items-start gap-2 pt-0.5">
              <span className="text-[#0066cc] font-bold">🗹</span>
              <span className="leading-relaxed"><strong>Film Story :</strong> {movie.storyline}</span>
            </div>
          </div>

          {/* Telegram Channel Button */}
          <div className="flex justify-center pt-1">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded shadow-xs transition-colors"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Join Our Telegram Channel For Instant Alerts</span>
            </a>
          </div>

          {/* Download Links Section (Exact Bolly4u Video 2 layout!) */}
          <div id="download-section" className="space-y-4 pt-3 border-t border-gray-200">
            <div className="text-center">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">
                Free Download Full Movie Via Single Links
              </h2>
            </div>

            {/* Quality Blocks with Boxed Buttons Grid */}
            <div className="space-y-5">
              {movie.downloadPacks.map((pack, pIdx) => (
                <div key={pIdx} className="space-y-2">
                  {/* Quality Heading */}
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-bold text-[#0066cc] uppercase tracking-wider">
                      {formatTierHeading(pack)}
                    </span>
                  </div>

                  {/* 2x2 Grid of Clean Boxed Buttons (From Video 2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto">
                    {/* Direct 1 */}
                    <button
                      onClick={() => onInitiateDownload(pack, pack.links[0] || {
                        serverName: 'Direct 1 Fast Cloud Server',
                        type: 'cloud',
                        speed: 'Ultra Fast',
                        url: '#'
                      }, movie.title)}
                      className="py-2.5 px-3 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-gray-300 rounded text-xs font-semibold text-gray-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-400 cursor-pointer"
                    >
                      <span>[ DIRECT 1 ]</span>
                    </button>

                    {/* Direct G-Drive */}
                    <button
                      onClick={() => onInitiateDownload(pack, pack.links[1] || {
                        serverName: 'Direct Google Drive Mirror',
                        type: 'gdrive',
                        speed: 'Ultra Fast',
                        url: '#'
                      }, movie.title)}
                      className="py-2.5 px-3 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-gray-300 rounded text-xs font-semibold text-gray-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-400 cursor-pointer"
                    >
                      <span>[ DIRECT [ G-DRIVE ] ]</span>
                    </button>

                    {/* Download Torrent */}
                    <button
                      onClick={() => onInitiateDownload(pack, {
                        serverName: '1-Click Torrent Magnet (Seeds: 4,500+)',
                        type: 'torrent',
                        speed: 'Ultra Fast',
                        url: `magnet:?xt=urn:btih:${movie.id}_${pack.tier}`
                      }, movie.title)}
                      className="py-2.5 px-3 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-gray-300 rounded text-xs font-semibold text-gray-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-400 cursor-pointer"
                    >
                      <span>[ DOWNLOAD [T] ]</span>
                    </button>

                    {/* Download Links / HubCloud */}
                    <button
                      onClick={() => onInitiateDownload(pack, pack.links[0] || {
                        serverName: 'HubCloud All Fast Links',
                        type: 'cloud',
                        speed: 'Ultra Fast',
                        url: '#'
                      }, movie.title)}
                      className="py-2.5 px-3 bg-[#f8f9fa] hover:bg-[#e9ecef] border border-gray-300 rounded text-xs font-semibold text-gray-800 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-400 cursor-pointer"
                    >
                      <span>[ DOWNLOAD LINKS ]</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Share Bar (From Video 2) */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-bold text-gray-600 mb-1.5">Share this with friends:</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-8 h-8 rounded bg-[#25D366] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 shadow-2xs"
                title="Share on WhatsApp"
              >
                WA
              </button>
              <button
                onClick={() => handleShare('telegram')}
                className="w-8 h-8 rounded bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 shadow-2xs"
                title="Share on Telegram"
              >
                TG
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-8 h-8 rounded bg-[#1DA1F2] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 shadow-2xs"
                title="Share on Twitter"
              >
                X
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-8 h-8 rounded bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 shadow-2xs"
                title="Share on Facebook"
              >
                FB
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-2.5 h-8 rounded bg-gray-700 text-white flex items-center justify-center text-xs font-medium hover:bg-gray-800 shadow-2xs gap-1"
                title="Copy Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedShare ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
};
