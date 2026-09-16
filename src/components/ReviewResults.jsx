import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Megaphone, 
  Zap, 
  Utensils, 
  Activity, 
  UserX, 
  UserCheck, 
  HelpCircle,
  ArrowRight,
  Share2,
  BookmarkPlus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const ICON_MAP = {
  Megaphone,
  ShieldAlert,
  Zap,
  Copy,
  Utensils,
  HelpCircle,
  UserX,
  UserCheck,
  Activity
};

export default function ReviewResults({ 
  result, 
  reviewInput, 
  onSaveToHistory, 
  onReset, 
  onViewReviewer,
  isSaved
}) {
  if (!result) return null;

  const {
    riskScore,
    status,
    verdictTag,
    sentiment,
    sentimentPolarity,
    factors,
    summary,
    metrics
  } = result;

  const isSuspicious = riskScore >= 60;
  const isModerate = riskScore >= 35 && riskScore < 60;

  // Determine colors based on risk
  const badgeColor = isSuspicious 
    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
    : isModerate 
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  const riskBarColor = isSuspicious 
    ? 'bg-rose-500' 
    : isModerate 
    ? 'bg-amber-500' 
    : 'bg-emerald-500';

  // Sentiment badge color
  const sentimentColor = sentimentPolarity === 'negative'
    ? 'bg-red-500/10 text-red-400 border-red-500/20'
    : sentimentPolarity === 'neutral'
    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Card: Verdict and Risk Meter */}
      <div className={`rounded-2xl p-6 border ${
        isSuspicious 
          ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-500/30 shadow-lg shadow-rose-950/20' 
          : isModerate
          ? 'bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border-amber-500/30 shadow-lg shadow-amber-950/20'
          : 'bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Status & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full border ${badgeColor}`}>
                {verdictTag}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${sentimentColor}`}>
                Sentiment: {sentiment}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                • Tested against 5 Heuristic NLP Models
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                isSuspicious ? 'bg-rose-500/20 text-rose-400' : isModerate ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isSuspicious ? <ShieldAlert className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {status === 'Likely Genuine' ? 'Review Classified as Likely Genuine' : 'Review Flagged as Potentially Suspicious'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">
                  {summary}
                </p>
              </div>
            </div>
          </div>

          {/* Authenticity Risk Score Gauge Box */}
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center min-w-[220px]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Authenticity Risk Score
            </span>
            <div className="flex items-baseline gap-1 my-2">
              <span className={`text-4xl font-black ${
                isSuspicious ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {riskScore}%
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ 100%</span>
            </div>

            {/* Risk Gauge Bar */}
            <div className="w-full space-y-1.5">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`${riskBarColor} h-full rounded-full transition-all duration-1000`} 
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>0% Safe</span>
                <span>50% Caution</span>
                <span>100% High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Submitted Review Text with Highlights & Factor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7 cols): Submitted Review Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Submitted Review Content</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">{reviewInput.restaurant || 'Target Restaurant'}</span>
                <span className="text-xs text-amber-400 font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {reviewInput.rating} ★
                </span>
              </div>
            </div>

            {/* Review text block */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-sm leading-relaxed text-slate-200">
              <p className="italic">
                "{reviewInput.text}"
              </p>
            </div>

            {/* Text analysis metrics pill row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Word Count</div>
                <div className="text-white font-bold mt-0.5">{metrics?.totalWords || 0} words</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Lexical Diversity</div>
                <div className="text-white font-bold mt-0.5">{metrics?.lexicalDiversity || 'N/A'}</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Exclamations</div>
                <div className="text-white font-bold mt-0.5">{metrics?.exclamationCount || 0} marks</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">UPPERCASE Ratio</div>
                <div className="text-white font-bold mt-0.5">{metrics?.capsRatio || '0%'}</div>
              </div>
            </div>

            {/* Reviewer context if known */}
            {reviewInput.reviewerName && (
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Author:</span>
                  <span className="font-semibold text-slate-200">{reviewInput.reviewerName}</span>
                </div>
                {onViewReviewer && (
                  <button
                    onClick={() => onViewReviewer(reviewInput.reviewerId)}
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                  >
                    <span>View Reviewer Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action bar: Save, Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Another Review</span>
            </button>

            <button
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition ${
                isSaved 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default' 
                  : 'bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20'
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved to Review History' : 'Save to Review History'}</span>
            </button>
          </div>
        </div>

        {/* Right Col (5 cols): Detected Suspicious Factors Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Detected AI Risk Factors
              </h3>
              <span className="text-xs text-slate-400">
                {factors.length} Signal{factors.length !== 1 ? 's' : ''} Identified
              </span>
            </div>

            {factors.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                No suspicious heuristics detected. Review content appears organic and consistent.
              </div>
            ) : (
              <div className="space-y-3">
                {factors.map((factor, idx) => {
                  const Icon = ICON_MAP[factor.icon] || AlertTriangle;
                  const isHighSev = factor.severity === 'high';
                  const isMedSev = factor.severity === 'medium';
                  const isLowSev = factor.severity === 'low';

                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border transition ${
                        isHighSev 
                          ? 'bg-rose-950/20 border-rose-500/30' 
                          : isMedSev 
                          ? 'bg-amber-950/20 border-amber-500/30'
                          : 'bg-emerald-950/20 border-emerald-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${
                            isHighSev ? 'bg-rose-500/20 text-rose-400' : isMedSev ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-200">{factor.name}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                                isHighSev ? 'bg-rose-500/20 text-rose-300' : isMedSev ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}>
                                {isLowSev ? 'Positive Signal' : `${factor.severity} anomaly`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Factor Score Bar */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-300">
                            {factor.score}%
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-300 pl-7 leading-relaxed">
                        {factor.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
