import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Copy, Check, ExternalLink, Code, FileCode, HelpCircle, AlertCircle } from 'lucide-react';

interface BloggerExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerExportModal: React.FC<BloggerExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedTheme, setCopiedTheme] = useState(false);
  const [copiedPostHtml, setCopiedPostHtml] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'postTemplate' | 'guide'>('theme');
  const [xmlContent, setXmlContent] = useState<string>('Loading XML code...');
  const xmlTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const postTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/moviehub4y-blogger-theme.xml')
        .then((res) => res.text())
        .then((text) => setXmlContent(text))
        .catch(() => {
          setXmlContent('<!-- Error loading XML. Please use the Download button below -->');
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const samplePostHtml = `<div class="post-top-notice">
  <strong>MovieHub4y:</strong> Download Free Movies &amp; Series in 480p, 720p, 1080p and 4K Ultra HD Dual Audio.
</div>

<div style="text-align: center; margin: 15px 0;">
  <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Movie Poster" style="max-width: 250px; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);" />
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; line-height: 1.8;">
  <div><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>IMDb Rating :</strong> 7.8/10 (84.5K Votes)</div>
  <div><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Genre :</strong> Action, Thriller, Dual Audio</div>
  <div><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Language :</strong> Hindi Clean + English [Dual Audio]</div>
  <div><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Subtitles :</strong> English [ESubs]</div>
  <div><span style="color: #0066cc; font-weight: bold;">🗹</span> <strong>Video Quality :</strong> WEB-DL · 480p, 720p, 1080p</div>
</div>

<div style="margin-bottom: 16px; font-size: 12px; line-height: 1.6; color: #334155;">
  <h4 style="font-size: 13px; font-weight: bold; margin-bottom: 6px;">Synopsis / Plot:</h4>
  <p>Download full movie in high definition dual audio with ultra-fast direct cloud mirrors.</p>
</div>

<div style="text-align: center; margin: 16px 0;">
  <a href="https://telegram.org" target="_blank" rel="noreferrer" style="display: inline-block; background: #0088cc; color: #fff; padding: 10px 24px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 12px;">
    ✈ Join Telegram Channel For Instant Alerts
  </a>
</div>

<!-- Exact Bolly4u Video 2 Download Links Section -->
<div style="border-top: 2px dashed #cbd5e1; padding-top: 20px; margin-top: 20px;">
  <div style="text-align: center; margin-bottom: 16px;">
    <h3 style="font-size: 15px; font-weight: 800; color: #1e293b; text-transform: uppercase;">
      FREE DOWNLOAD FULL MOVIE VIA SINGLE LINKS
    </h3>
  </div>

  <!-- 720P [1.2GB/EP] DOWNLOAD LINKS -->
  <div class="quality-tier-block" style="margin-bottom: 20px;">
    <div style="text-align: center; font-size: 13px; font-weight: 800; color: #0066cc; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px;">
      720P [1.2GB/EP] DOWNLOAD LINKS
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-width: 600px; margin: 0 auto;">
      <a href="https://hubcloud.stream" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT 1 ]</a>
      <a href="https://drive.google.com" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT [ G-DRIVE ] ]</a>
      <a href="magnet:?xt=urn:btih:movie_720p" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DOWNLOAD [T] ]</a>
      <a href="https://hubcloud.stream" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ HUBCLOUD VIP ]</a>
    </div>
  </div>

  <!-- 1080P [2.8GB] DOWNLOAD LINKS : 2.8 GB -->
  <div class="quality-tier-block" style="margin-bottom: 20px;">
    <div style="text-align: center; font-size: 13px; font-weight: 800; color: #0066cc; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px;">
      1080P [2.8GB] DOWNLOAD LINKS : 2.8 GB
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-width: 600px; margin: 0 auto;">
      <a href="https://hubcloud.stream" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT 1 ]</a>
      <a href="https://drive.google.com" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DIRECT [ G-DRIVE ] ]</a>
      <a href="magnet:?xt=urn:btih:movie_1080p" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ DOWNLOAD [T] ]</a>
      <a href="https://hubcloud.stream" target="_blank" class="box-dl-btn" style="display: flex; align-items: center; justify-content: center; padding: 10px 14px; background: #f8f9fa; border: 1px solid #cbd5e1; border-radius: 4px; color: #1e293b; font-size: 11px; font-weight: 700; text-transform: uppercase; text-decoration: none;">[ HUBCLOUD VIP ]</a>
    </div>
  </div>
</div>`;

  const copyWithFallback = async (text: string, ref?: React.RefObject<HTMLTextAreaElement | null>) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      if (ref && ref.current) {
        ref.current.select();
        document.execCommand('copy');
        return true;
      }
      return false;
    }
  };

  const handleCopyThemeXml = async () => {
    await copyWithFallback(xmlContent, xmlTextAreaRef);
    setCopiedTheme(true);
    setTimeout(() => setCopiedTheme(false), 2500);
  };

  const handleCopyPostHtml = async () => {
    await copyWithFallback(samplePostHtml, postTextAreaRef);
    setCopiedPostHtml(true);
    setTimeout(() => setCopiedPostHtml(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full border border-gray-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#161a23] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#cc0000] flex items-center justify-center text-white font-black text-xs">
              XML
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>Blogger Theme (.XML) &amp; Setup Guide</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded">
                  100% Verified
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">
                Works on Google Blogger (Blogspot) with 0 errors via Edit HTML or Restore
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'theme'
                ? 'border-[#0066cc] text-[#0066cc] bg-white rounded-t'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Theme XML Code</span>
          </button>

          <button
            onClick={() => setActiveTab('postTemplate')}
            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'postTemplate'
                ? 'border-[#0066cc] text-[#0066cc] bg-white rounded-t'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Post HTML (720P / 1080P Links)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#0066cc] text-[#0066cc] bg-white rounded-t'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Host on Blogger (Fix Errors)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs text-gray-700">
          {activeTab === 'theme' && (
            <div className="space-y-3">
              {/* Important Blogger Tip */}
              <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 text-emerald-900 text-[11px] flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>How to apply in Blogger without errors:</strong>
                  <p className="mt-0.5 text-emerald-800">
                    If Blogger &quot;Restore&quot; gives an error, use <strong>Theme &gt; Edit HTML</strong>: Press <strong>Ctrl+A</strong>, delete existing code, paste this code below, and click the <strong>Save (💾)</strong> button. This works 100% guaranteed on every blog!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="/moviehub4y-blogger-theme.xml"
                  download="moviehub4y-blogger-theme.xml"
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 bg-[#cc0000] hover:bg-[#b30000] text-white font-bold py-2 px-3 rounded shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .XML File</span>
                </a>

                <button
                  onClick={handleCopyThemeXml}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 bg-[#0066cc] hover:bg-[#0055aa] text-white font-bold py-2 px-3 rounded shadow-xs transition-colors cursor-pointer"
                >
                  {copiedTheme ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full XML Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Visible Raw XML Textarea */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                  <span>Raw Blogger XML Code (Click inside to select all):</span>
                  <span>{xmlContent.length.toLocaleString()} characters</span>
                </div>
                <textarea
                  ref={xmlTextAreaRef}
                  readOnly
                  value={xmlContent}
                  onClick={(e) => e.currentTarget.select()}
                  className="w-full h-56 font-mono text-[11px] bg-gray-900 text-gray-100 p-2.5 rounded border border-gray-700 outline-none focus:border-[#0066cc] select-all resize-y"
                  spellCheck={false}
                />
              </div>
            </div>
          )}

          {activeTab === 'postTemplate' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-600">
                  When creating a new post on Blogger, click the pencil/HTML icon and switch to <strong>HTML View</strong>, then paste this:
                </p>
                <button
                  onClick={handleCopyPostHtml}
                  className="flex items-center gap-1.5 bg-[#0066cc] hover:bg-[#0055aa] text-white px-3 py-1 rounded font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedPostHtml ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Post HTML!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Post HTML</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                ref={postTextAreaRef}
                readOnly
                value={samplePostHtml}
                onClick={(e) => e.currentTarget.select()}
                className="w-full h-56 font-mono text-[11px] bg-gray-900 text-gray-100 p-2.5 rounded border border-gray-700 outline-none focus:border-[#0066cc] select-all resize-y"
                spellCheck={false}
              />

              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-blue-900 text-[11px] space-y-1">
                <strong>Includes exact requested titles:</strong>
                <div>• <code className="bg-blue-100 px-1 font-bold rounded">720P [1.2GB/EP] DOWNLOAD LINKS</code></div>
                <div>• <code className="bg-blue-100 px-1 font-bold rounded">1080P [2.8GB] DOWNLOAD LINKS : 2.8 GB</code></div>
                <div>• Boxed buttons: <code className="bg-blue-100 px-1 rounded">[ DIRECT 1 ]</code>, <code className="bg-blue-100 px-1 rounded">[ DIRECT [ G-DRIVE ] ]</code>, <code className="bg-blue-100 px-1 rounded">[ DOWNLOAD [T] ]</code>, <code className="bg-blue-100 px-1 rounded">[ HUBCLOUD VIP ]</code></div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-amber-900 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Why does Blogger show &quot;Error parsing XML&quot; or &quot;Theme not valid&quot;?</strong>
                  <p className="mt-0.5 text-amber-800">
                    Blogger&apos;s &quot;Restore&quot; button sometimes fails due to browser cache or security checks. Follow <strong>Method 1 (Edit HTML)</strong> below — it is 100% error-free!
                  </p>
                </div>
              </div>

              {/* Method 1 */}
              <div className="border border-emerald-300 rounded-lg p-3 bg-emerald-50/50 space-y-2">
                <h4 className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</span>
                  <span>Method 1 (Recommended): Edit HTML Directly</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-[11px] text-gray-700">
                  <li>Open <a href="https://www.blogger.com" target="_blank" rel="noreferrer" className="text-[#0066cc] underline">blogger.com</a> and click <strong>Theme</strong> in the left menu.</li>
                  <li>Click the arrow ▾ next to the orange <strong>CUSTOMIZE</strong> button.</li>
                  <li>Click <strong>Edit HTML</strong>.</li>
                  <li>Press <strong>Ctrl + A</strong> (Select All) on your keyboard and press <strong>Delete</strong> or <strong>Backspace</strong> to clear old code.</li>
                  <li>Copy the XML code from the <strong>Theme XML Code</strong> tab above, paste it into Blogger, and click the <strong>Save (💾)</strong> button at the top right.</li>
                  <li>View your blog — it is now live with MovieHub4y!</li>
                </ol>
              </div>

              {/* Method 2 */}
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-2">
                <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Method 2: One-Click Restore</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-[11px] text-gray-600">
                  <li>Download <code className="bg-white px-1 border rounded">moviehub4y-blogger-theme.xml</code> to your computer.</li>
                  <li>In Blogger, go to <strong>Theme &gt; Customize ▾ &gt; Restore &gt; Upload</strong>.</li>
                  <li>Select the downloaded <code className="bg-white px-1 border rounded">moviehub4y-blogger-theme.xml</code> file.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-mono">
            moviehub4y.online · Valid Blogger v2 Theme
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
