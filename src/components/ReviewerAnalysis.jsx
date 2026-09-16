import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  ShieldCheck, 
  Star, 
  Clock, 
  Copy, 
  Activity, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';
import { MOCK_REVIEWERS } from '../data/mockData';

export default function ReviewerAnalysis({ selectedReviewerId, onAnalyzeSampleReview }) {
  const [activeReviewerId, setActiveReviewerId] = useState(
    selectedReviewerId || MOCK_REVIEWERS[0].id
  );

  const currentReviewer = MOCK_REVIEWERS.find(r => r.id === activeReviewerId) || MOCK_REVIEWERS[0];
  const isHighRisk = currentReviewer.riskScore >= 60;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                <Users className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Reviewer Behavioral Profiler
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Analyze posting velocity, rating bias, duplicate templates, and synthetic cluster signals across author accounts.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <span>4 Sample Profiles Loaded</span>
          </div>
        </div>

        {/* Reviewer Switcher Pills */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {MOCK_REVIEWERS.map((rev) => {
            const isSelected = rev.id === activeReviewerId;
            const isBot = rev.riskScore >= 60;
            return (
              <button
                key={rev.id}
                onClick={() => setActiveReviewerId(rev.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-slate-800 border-orange-500/50 text-white shadow-md ring-1 ring-orange-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-5 h-5 rounded-full object-cover" 
                />
                <span>{rev.name}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                  isBot 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {isBot ? 'Bot/Smear' : 'Organic'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Reviewer Detail Card */}
      <div className={`rounded-2xl p-6 border ${
        isHighRisk 
          ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-500/30' 
          : 'bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 border-emerald-500/30'
      } shadow-lg`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Avatar & Identifiers */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={currentReviewer.avatar} 
                alt={currentReviewer.name} 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-700" 
              />
              <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                isHighRisk ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {isHighRisk ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{currentReviewer.name}</h2>
                <span className="text-xs font-mono text-slate-400">{currentReviewer.handle}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  isHighRisk 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {currentReviewer.accountType}
                </span>
                <span className="text-xs text-slate-400">
                  Account Age: {currentReviewer.accountAgeDays} days
                </span>
                <span className="text-xs text-slate-400 font-mono">• {currentReviewer.ipDiversity}</span>
              </div>
            </div>
          </div>

          {/* Trust Score & Risk Rating Box */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 self-start lg:self-auto">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Trust Score
              </span>
              <span className={`text-2xl font-black ${
                currentReviewer.trustScore >= 70 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {currentReviewer.trustScore}/100
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Anomaly Risk
              </span>
              <span className={`text-2xl font-black ${
                isHighRisk ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {currentReviewer.riskScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviewer Core Behavioral Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Reviews */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Reviews</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white">
            {currentReviewer.totalReviews}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Lifetime submissions</div>
        </div>

        {/* Metric 2: Average Rating */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Rating</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-400 flex items-center gap-1">
            <span>{currentReviewer.avgRating}</span>
            <span className="text-sm font-normal text-slate-400">★</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Rating distribution mean</div>
        </div>

        {/* Metric 3: 5-Star Percentage */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>5-Star Percentage</span>
            <Sparkles className="w-4 h-4 text-orange-400" />
          </div>
          <div className={`mt-2 text-2xl font-extrabold ${
            currentReviewer.fiveStarPercentage > 85 ? 'text-rose-400' : 'text-white'
          }`}>
            {currentReviewer.fiveStarPercentage}%
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {currentReviewer.fiveStarPercentage > 85 ? 'Extreme promotional bias' : 'Natural rating diversity'}
          </div>
        </div>

        {/* Metric 4: Reviews Posted Recently */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Reviews in 48h</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className={`mt-2 text-2xl font-extrabold ${
            currentReviewer.reviewsRecently > 5 ? 'text-rose-400' : 'text-white'
          }`}>
            {currentReviewer.reviewsRecently}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {currentReviewer.reviewsRecently > 5 ? 'Unnatural burst velocity' : 'Normal posting cadence'}
          </div>
        </div>

        {/* Metric 5: Similar Reviews Detected */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Similar Reviews</span>
            <Copy className="w-4 h-4 text-rose-400" />
          </div>
          <div className={`mt-2 text-2xl font-extrabold ${
            currentReviewer.similarReviewsCount > 10 ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {currentReviewer.similarReviewsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {currentReviewer.similarReviewsCount > 10 ? 'Template syndication detected' : 'Unique phrasing'}
          </div>
        </div>
      </div>

      {/* Grid: Behavioral Flags and Historical Reviews from this user */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Behavioral Flags Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-400" />
              <span>Behavioral Heuristic Flags</span>
            </h3>

            <div className="space-y-2.5">
              {currentReviewer.behaviorFlags.map((flag, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    isHighRisk 
                      ? 'bg-rose-950/20 border-rose-500/20 text-rose-200' 
                      : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                  }`}
                >
                  {isHighRisk ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{flag}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>Account Fingerprint:</span>
                <span className="font-mono text-slate-300">FP_{currentReviewer.id.toUpperCase()}_v3</span>
              </div>
              <div className="flex justify-between">
                <span>Syndication Threat Level:</span>
                <span className={`font-bold ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isHighRisk ? 'CRITICAL RISK' : 'LOW RISK'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User's Recent Submissions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Reviews from this Author
              </h3>
              <span className="text-xs text-slate-400">
                {currentReviewer.sampleReviews.length} Recorded Submissions
              </span>
            </div>

            <div className="space-y-3">
              {currentReviewer.sampleReviews.map((rev, idx) => {
                const isRevFake = rev.score >= 60;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-200">{rev.restaurant}</span>
                        <span className="text-xs text-amber-400 font-mono font-bold bg-amber-400/10 px-1.5 py-0.2 rounded">
                          {rev.rating} ★
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isRevFake 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {rev.status} ({rev.score}%)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{rev.snippet}"
                    </p>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                      <span>Posted: {rev.date}</span>
                      {onAnalyzeSampleReview && (
                        <button
                          onClick={() => onAnalyzeSampleReview({
                            restaurant: rev.restaurant,
                            rating: rev.rating,
                            text: rev.snippet,
                            reviewerId: currentReviewer.id,
                            reviewerName: `${currentReviewer.name} (${currentReviewer.handle})`
                          })}
                          className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                        >
                          <span>Inspect in Analyzer</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
