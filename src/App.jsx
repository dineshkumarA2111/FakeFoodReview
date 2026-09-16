import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ReviewAnalyzer from './components/ReviewAnalyzer';
import ReviewerAnalysis from './components/ReviewerAnalysis';
import ReviewHistory from './components/ReviewHistory';
import { INITIAL_STATS, INITIAL_REVIEWS_HISTORY } from './data/mockData';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(INITIAL_STATS);
  const [reviewsHistory, setReviewsHistory] = useState(INITIAL_REVIEWS_HISTORY);
  
  // Navigation contextual states
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [selectedReviewerId, setSelectedReviewerId] = useState(null);

  // Handle adding newly analyzed review to history
  const handleAddToHistory = (newReview) => {
    setReviewsHistory((prev) => [newReview, ...prev]);

    // Dynamically update statistics
    setStats((prev) => {
      const isSuspicious = newReview.riskScore >= 60;
      return {
        ...prev,
        totalReviews: prev.totalReviews + 1,
        genuineReviews: isSuspicious ? prev.genuineReviews : prev.genuineReviews + 1,
        suspiciousReviews: isSuspicious ? prev.suspiciousReviews + 1 : prev.suspiciousReviews,
      };
    });
  };

  // Switch to Analyzer tab with preset
  const handleSelectPreset = (presetId) => {
    setSelectedPresetId(presetId);
    setActiveTab('analyzer');
  };

  // Switch to Reviewer tab
  const handleViewReviewer = (reviewerId) => {
    setSelectedReviewerId(reviewerId);
    setActiveTab('reviewer');
  };

  // Switch to Analyzer with custom sample
  const handleAnalyzeSampleReview = (sample) => {
    setSelectedPresetId(null);
    setActiveTab('analyzer');
  };

  // Count suspicious reviews in history
  const suspiciousCount = reviewsHistory.filter(r => r.riskScore >= 60).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        suspiciousCount={suspiciousCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            onNavigate={(tab) => setActiveTab(tab)}
            onInspectReview={(rev) => {
              setActiveTab('history');
            }}
            recentReviews={reviewsHistory}
          />
        )}

        {activeTab === 'analyzer' && (
          <ReviewAnalyzer
            onAddToHistory={handleAddToHistory}
            onViewReviewer={handleViewReviewer}
            preloadedPresetId={selectedPresetId}
          />
        )}

        {activeTab === 'reviewer' && (
          <ReviewerAnalysis
            selectedReviewerId={selectedReviewerId}
            onAnalyzeSampleReview={handleAnalyzeSampleReview}
          />
        )}

        {activeTab === 'history' && (
          <ReviewHistory
            reviews={reviewsHistory}
            onViewReviewer={handleViewReviewer}
          />
        )}
      </main>

      {/* Modern Dashboard Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 backdrop-blur py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">FoodReviewGuard</span>
            <span>— Fake Food Review Detection Prototype</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>React.js + Tailwind CSS</span>
            <span>•</span>
            <span>Simulated Heuristic NLP Engine</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              Ready for Demo & Presentation
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
