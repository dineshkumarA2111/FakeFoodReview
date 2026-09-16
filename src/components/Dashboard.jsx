import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  Search, 
  BarChart2, 
  Zap, 
  Copy, 
  Megaphone, 
  Clock, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

export default function Dashboard({ stats, onNavigate, onInspectReview, recentReviews }) {
  // Compute percentages
  const genuinePct = ((stats.genuineReviews / stats.totalReviews) * 100).toFixed(1);
  const suspiciousPct = ((stats.suspiciousReviews / stats.totalReviews) * 100).toFixed(1);

  // Rating distribution data for chart
  const ratingDistribution = [
    { stars: '5 Stars', genuine: 620, suspicious: 210, riskRate: 25.3, label: 'High promo spam risk' },
    { stars: '4 Stars', genuine: 310, suspicious: 18, riskRate: 5.5, label: 'Highest organic authenticity' },
    { stars: '3 Stars', genuine: 110, suspicious: 12, riskRate: 9.8, label: 'Normal diner distribution' },
    { stars: '2 Stars', genuine: 42, suspicious: 15, riskRate: 26.3, label: 'Moderate critique variance' },
    { stars: '1 Star', genuine: 13, suspicious: 130, riskRate: 90.9, label: 'High competitor smear risk' },
  ];

  // Primary risk indicators breakdown
  const suspiciousIndicators = [
    { name: 'Repetitive Wording & Templates', percentage: 38, count: 146, color: 'bg-amber-500', icon: Copy },
    { name: 'Commercial & Promotional Jargon', percentage: 29, count: 112, color: 'bg-rose-500', icon: Megaphone },
    { name: 'Unusual Reviewer Burst Velocity', percentage: 18, count: 69, color: 'bg-orange-500', icon: Clock },
    { name: 'Extreme Sentiment & Syntactic Shouting', percentage: 15, count: 58, color: 'bg-purple-500', icon: Zap },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Restaurant Reputation Protection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              FoodReviewGuard Dashboard
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Detect fake food reviews, paid 5-star promotions, and 1-star competitor smear attacks in real time. 
              Our multi-heuristic NLP engine protects authentic restaurants and diners from syndication spam.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('analyzer')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Launch Review Analyzer</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('reviewer')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            >
              Reviewer Profiles
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Reviews Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews Analyzed</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{stats.totalReviews.toLocaleString()}</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4% this week
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Processed across 84 restaurant menus</div>
          <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-full rounded-full"></div>
          </div>
        </div>

        {/* Genuine Reviews Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Genuine Reviews</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{stats.genuineReviews.toLocaleString()}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {genuinePct}%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Verified dining context & organic wording</div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${genuinePct}%` }}></div>
          </div>
        </div>

        {/* Suspicious Reviews Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suspicious Reviews</span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400">{stats.suspiciousReviews.toLocaleString()}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              {suspiciousPct}%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Flagged by heuristic NLP detection rules</div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${suspiciousPct}%` }}></div>
          </div>
        </div>

        {/* Bot Burst Attacks Prevented */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bot Bursts Mitigated</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{stats.botAttacksPrevented}</span>
            <span className="text-xs text-slate-400">clusters detected</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Coordinated spam networks neutralized</div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-4/5 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Review Authenticity Distribution Donut/Visual */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Review Authenticity Mix</h3>
              <span className="text-xs font-medium text-slate-400">All Time</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Proportion of verified genuine vs. artificial promotion and smears.</p>

            {/* Visual Circular Gauge / Stacked Ring */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Donut */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-800"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Genuine segment (74%) */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="74, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Suspicious promo segment (16%) */}
                  <path
                    className="text-rose-500"
                    strokeDasharray="16, 100"
                    strokeDashoffset="-74"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Smear segment (10%) */}
                  <path
                    className="text-amber-500"
                    strokeDasharray="10, 100"
                    strokeDashoffset="-90"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-white">{genuinePct}%</span>
                  <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">Authentic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-300">Likely Genuine</span>
              </div>
              <span className="font-semibold text-slate-200">{stats.genuineReviews} ({genuinePct}%)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-slate-300">Paid Bot Promos</span>
              </div>
              <span className="font-semibold text-slate-200">237 (16.0%)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-300">Competitor Smears</span>
              </div>
              <span className="font-semibold text-slate-200">148 (10.0%)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Rating vs Risk Distribution (Bimodal Pattern) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between lg:col-span-2">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Authenticity Risk by Star Rating
                </h3>
                <p className="text-xs text-slate-400">Notice the classic bimodal anomaly: extreme ratings (1★ and 5★) concentrate fake activity.</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium self-start sm:self-auto">
                Heuristic Distribution
              </span>
            </div>

            {/* Bar chart rows */}
            <div className="space-y-4 my-2">
              {ratingDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 w-16">{item.stars}</span>
                    <div className="flex-1 flex items-center justify-between px-3 text-[11px] text-slate-400">
                      <span>{item.label}</span>
                      <span className="font-bold text-slate-300">
                        Risk Rate: <span className={item.riskRate > 50 ? 'text-rose-400' : item.riskRate > 20 ? 'text-amber-400' : 'text-emerald-400'}>{item.riskRate}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Split visual bar */}
                  <div className="w-full h-3.5 bg-slate-800 rounded-full flex overflow-hidden">
                    <div 
                      className="bg-emerald-500/80 hover:bg-emerald-400 transition" 
                      style={{ width: `${100 - item.riskRate}%` }}
                      title={`Genuine: ${item.genuine} (${(100 - item.riskRate).toFixed(1)}%)`}
                    />
                    <div 
                      className={`${item.riskRate > 50 ? 'bg-rose-500' : 'bg-amber-500'} hover:opacity-90 transition`} 
                      style={{ width: `${item.riskRate}%` }}
                      title={`Suspicious: ${item.suspicious} (${item.riskRate}%)`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded bg-emerald-500"></span>
                <span>Genuine Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded bg-rose-500"></span>
                <span>Suspicious / Smear Risk</span>
              </div>
            </div>
            <span className="italic text-[11px]">Source: Live Simulated Heuristics</span>
          </div>
        </div>
      </div>

      {/* Section: Detected Suspicious Factors & Recent Flagged Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Indicators Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Suspicious Factors</h3>
            <span className="text-xs text-slate-400">Frequency</span>
          </div>
          <p className="text-xs text-slate-400 mb-6">Most prevalent markers detected across flagged food reviews.</p>

          <div className="space-y-4">
            {suspiciousIndicators.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${ind.color}/20 text-white`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-300 font-medium">{ind.name}</span>
                    </div>
                    <span className="font-bold text-slate-200">{ind.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${ind.color} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${ind.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Detection Tip:</strong> Repetitive copy-paste phrasing across multiple listings is the #1 signature of commercial review syndicates.
            </span>
          </div>
        </div>

        {/* Live Flagged Reviews Feed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Live AI Detections</h3>
                <p className="text-xs text-slate-400">Latest reviews analyzed by the engine</p>
              </div>
              <button 
                onClick={() => onNavigate('history')}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
              >
                <span>View All History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of recent items */}
            <div className="space-y-3">
              {recentReviews.slice(0, 4).map((rev) => {
                const isSuspicious = rev.riskScore >= 60;
                return (
                  <div 
                    key={rev.id}
                    onClick={() => onInspectReview && onInspectReview(rev)}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-200">{rev.restaurant}</span>
                        <span className="text-xs text-slate-400 font-mono">• {rev.rating}★</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isSuspicious 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {rev.verdictTag || (isSuspicious ? 'Suspicious' : 'Genuine')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 italic">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-300">
                          Risk: <span className={rev.riskScore > 60 ? 'text-rose-400' : 'text-emerald-400'}>{rev.riskScore}%</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.date}</div>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-white">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Real-time ingestion queue active</span>
            <button 
              onClick={() => onNavigate('analyzer')}
              className="text-amber-400 hover:underline font-medium"
            >
              Analyze a new review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
