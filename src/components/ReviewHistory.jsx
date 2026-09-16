import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  ShieldCheck, 
  ShieldAlert, 
  Calendar, 
  User, 
  X, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function ReviewHistory({ reviews, onInspectReview, onViewReviewer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [inspectModalReview, setInspectModalReview] = useState(null);

  // Filter reviews
  const filteredReviews = reviews.filter((item) => {
    const matchesSearch = 
      item.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.reviewer && item.reviewer.toLowerCase().includes(searchTerm.toLowerCase()));

    const isSuspicious = item.riskScore >= 60;
    let matchesStatus = true;
    if (statusFilter === 'GENUINE') {
      matchesStatus = !isSuspicious;
    } else if (statusFilter === 'SUSPICIOUS') {
      matchesStatus = isSuspicious;
    }

    let matchesRating = true;
    if (ratingFilter !== 'ALL') {
      matchesRating = item.rating === parseInt(ratingFilter, 10);
    }

    return matchesSearch && matchesStatus && matchesRating;
  });

  // Export as CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Restaurant', 'Rating', 'Reviewer', 'RiskScore', 'Status', 'Sentiment', 'Date', 'ReviewText'];
    const rows = filteredReviews.map(r => [
      r.id,
      `"${r.restaurant.replace(/"/g, '""')}"`,
      r.rating,
      `"${(r.reviewer || 'N/A').replace(/"/g, '""')}"`,
      r.riskScore,
      `"${r.status}"`,
      `"${r.sentiment}"`,
      `"${r.date}"`,
      `"${r.text.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `food_reviews_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                <History className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Review Audit History
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Historical repository of analyzed reviews with AI verdicts, factor diagnostics, and export capabilities.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shadow-sm self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Export CSV Audit</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search restaurant, keywords, author..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="ALL">All Statuses ({reviews.length})</option>
              <option value="GENUINE">Likely Genuine Only</option>
              <option value="SUSPICIOUS">Potentially Suspicious Only</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="sm:col-span-3">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="ALL">All Star Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Restaurant & Author</th>
                <th className="px-4 py-3.5">Rating</th>
                <th className="px-4 py-3.5">Review Snippet</th>
                <th className="px-4 py-3.5">Sentiment</th>
                <th className="px-4 py-3.5">Risk Score</th>
                <th className="px-4 py-3.5">Verdict</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No reviews match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => {
                  const isSuspicious = rev.riskScore >= 60;
                  const isModerate = rev.riskScore >= 35 && rev.riskScore < 60;

                  return (
                    <tr 
                      key={rev.id} 
                      className="hover:bg-slate-800/40 transition group cursor-pointer"
                      onClick={() => setInspectModalReview(rev)}
                    >
                      {/* Restaurant & Author */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-100 text-sm group-hover:text-orange-400 transition">
                          {rev.restaurant}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {rev.reviewer || 'Anonymous Diner'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {rev.date}
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg w-max border border-amber-400/20">
                          <span>{rev.rating}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                      </td>

                      {/* Review Snippet */}
                      <td className="px-4 py-4 max-w-xs sm:max-w-sm">
                        <p className="line-clamp-2 text-slate-300 italic text-xs leading-relaxed">
                          "{rev.text}"
                        </p>
                      </td>

                      {/* Sentiment */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          rev.sentimentPolarity === 'negative'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : rev.sentimentPolarity === 'neutral'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {rev.sentiment}
                        </span>
                      </td>

                      {/* Risk Score */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`font-black text-sm ${
                            isSuspicious ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {rev.riskScore}%
                          </span>
                          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                isSuspicious ? 'bg-rose-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${rev.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Verdict Badge */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          isSuspicious
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : isModerate
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {rev.verdictTag || (isSuspicious ? 'Suspicious' : 'Genuine')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectModalReview(rev);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="View detailed AI analysis"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredReviews.length} of {reviews.length} total logged reviews</span>
          <span className="italic">Database synced with automated ingestion engine</span>
        </div>
      </div>

      {/* Details Modal */}
      {inspectModalReview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setInspectModalReview(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    inspectModalReview.riskScore >= 60 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {inspectModalReview.verdictTag || inspectModalReview.status}
                  </span>
                  <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                    {inspectModalReview.rating} ★
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {inspectModalReview.restaurant}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Author: <span className="text-slate-200">{inspectModalReview.reviewer}</span> • {inspectModalReview.date}
                </div>
              </div>

              <button
                onClick={() => setInspectModalReview(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Sentiment Overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Authenticity Risk</span>
                <span className={`text-2xl font-black ${
                  inspectModalReview.riskScore >= 60 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {inspectModalReview.riskScore}%
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Sentiment Polarity</span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {inspectModalReview.sentiment}
                </span>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Review Text</h4>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 italic leading-relaxed">
                "{inspectModalReview.text}"
              </div>
            </div>

            {/* Detected Factors */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detected AI Factors & Indicators ({inspectModalReview.detectedFactors?.length || 0})
              </h4>
              <div className="space-y-2">
                {inspectModalReview.detectedFactors?.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-start justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-200">{f.name}</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">{f.detail}</p>
                    </div>
                    {f.score && (
                      <span className="font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {f.score}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {inspectModalReview.reviewerId && onViewReviewer && (
                <button
                  onClick={() => {
                    const revId = inspectModalReview.reviewerId;
                    setInspectModalReview(null);
                    onViewReviewer(revId);
                  }}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>View Reviewer Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setInspectModalReview(null)}
                className="ml-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
