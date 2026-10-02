import React, { useState } from 'react';
import { MovieRequest } from '../types/movie';
import { X, Film, Send, CheckCircle2, Clock, Check } from 'lucide-react';

interface RequestMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: MovieRequest[];
  onSubmitRequest: (req: Omit<MovieRequest, 'id' | 'status' | 'requestedAt'>) => void;
}

export const RequestMovieModal: React.FC<RequestMovieModalProps> = ({
  isOpen,
  onClose,
  requests,
  onSubmitRequest
}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('2024');
  const [language, setLanguage] = useState('Hindi Clean Audio');
  const [preferredQuality, setPreferredQuality] = useState('1080p WEB-DL');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmitRequest({
      title: title.trim(),
      year,
      language,
      preferredQuality
    });

    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0e111a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Request a Movie Download
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Movie Title <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Baby John, Kanguva, Game Changer, War 2..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Release Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2024"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Audio / Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Hindi Clean Audio">Hindi Clean Audio</option>
                  <option value="Dual Audio [Hindi + Eng]">Dual Audio [Hindi + Eng]</option>
                  <option value="South Hindi Dubbed">South Hindi Dubbed</option>
                  <option value="Multi Audio">Multi Audio (Tamil/Telugu)</option>
                  <option value="Punjabi">Punjabi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Quality
                </label>
                <select
                  value={preferredQuality}
                  onChange={(e) => setPreferredQuality(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="1080p WEB-DL">1080p Full HD</option>
                  <option value="720p HD">720p HD Standard</option>
                  <option value="480p SD [300MB]">480p [300MB Mobile]</option>
                  <option value="4K Ultra HD">4K UHD Remux</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                submitted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Request Submitted to MovieHub4y Team!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Movie Request</span>
                </>
              )}
            </button>
          </form>

          {/* Recent Community Requests */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="uppercase tracking-wider font-mono">Recent Community Requests</span>
              <span>Updated Live</span>
            </div>

            <div className="space-y-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-3 bg-slate-900/70 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-semibold text-slate-200">{req.title} ({req.year})</h5>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {req.language} · {req.preferredQuality}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        req.status === 'Uploaded'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : req.status === 'Processing'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">{req.requestedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
