import React from 'react';
import { Clapperboard, Send, ArrowUp, ShieldAlert, Heart, FileCode } from 'lucide-react';
import { MovieCategory } from '../types/movie';

interface FooterProps {
  onSelectCategory: (category: MovieCategory) => void;
  onOpenRequestModal: () => void;
  onOpenBloggerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenRequestModal,
  onOpenBloggerModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-slate-800/90 text-slate-400 text-xs mt-12">
      {/* Upper Footer: Branding & Quick Links */}
      <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white">
                <Clapperboard className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-black text-white font-display">MOVIE</span>
                <span className="text-xl font-black text-amber-400 font-display">HUB</span>
                <span className="text-xl font-black text-[#ff3333] font-display">4Y</span>
                <span className="ml-1 text-[10px] px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono font-semibold">.ONLINE</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              MovieHub4y (moviehub4y.online) is your premier destination for free Bollywood movies download, Hollywood Hindi dubbed movies, South Indian blockbusters, and 300MB mobile movies in 480p, 720p, 1080p, and 4K Ultra HD.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors font-medium text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Official Telegram</span>
              </a>

              <button
                onClick={onOpenRequestModal}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium text-xs cursor-pointer"
              >
                Request Movie
              </button>

              {onOpenBloggerModal && (
                <button
                  onClick={onOpenBloggerModal}
                  className="px-3 py-1.5 rounded-lg bg-[#cc0000]/20 hover:bg-[#cc0000]/30 text-red-300 border border-red-500/40 transition-colors font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Host on Blogger (.XML)</span>
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Movie Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { onSelectCategory('bollywood'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                Bollywood Movies
              </button>
              <button
                onClick={() => { onSelectCategory('south-hindi'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                South Hindi Dubbed
              </button>
              <button
                onClick={() => { onSelectCategory('hollywood-hindi'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                Hollywood Hindi
              </button>
              <button
                onClick={() => { onSelectCategory('web-series'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                Web Series
              </button>
              <button
                onClick={() => { onSelectCategory('k-drama'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                K-Drama (Korean)
              </button>
              <button
                onClick={() => { onSelectCategory('animation'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                Animation Movies
              </button>
              <button
                onClick={() => { onSelectCategory('dual-audio'); scrollToTop(); }}
                className="text-left text-slate-400 hover:text-amber-400 transition-colors"
              >
                Dual Audio Movies
              </button>
            </div>
          </div>

          {/* Official Domain */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Official Domain
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li className="text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>moviehub4y.online (Official)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer / DMCA */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 p-3.5 bg-slate-900/40 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DMCA Compliance & Copyright Disclaimer</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            MovieHub4y (moviehub4y.online) does not host, upload, or store any video media files on its servers. All videos and files are provided by non-affiliated third-party cloud hosting services. MovieHub4y operates purely as an index and discovery directory. If you believe your copyrighted content is linked here, please send a formal DMCA notice to the respective hosting webmasters.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} moviehub4y.online. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
