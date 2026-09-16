import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Star, 
  Store, 
  FileText, 
  Send, 
  RefreshCw, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  CornerDownRight
} from 'lucide-react';
import { DEMO_PRESETS, MOCK_REVIEWERS } from '../data/mockData';
import { analyzeFoodReview } from '../utils/detectorEngine';
import ReviewResults from './ReviewResults';

export default function ReviewAnalyzer({ onAddToHistory, onViewReviewer, preloadedPresetId }) {
  const [restaurant, setRestaurant] = useState('Golden Wok Express');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [reviewerData, setReviewerData] = useState(null);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Load demo preset if requested
  const loadPreset = (presetId) => {
    const preset = DEMO_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setSelectedPreset(preset.id);
    setRestaurant(preset.restaurant);
    setRating(preset.rating);
    setReviewText(preset.text);
    
    // Find matching mock reviewer
    const reviewer = MOCK_REVIEWERS.find(r => r.id === preset.reviewerId);
    setReviewerData(reviewer || null);

    setAnalysisResult(null);
    setIsSaved(false);
  };

  useEffect(() => {
    if (preloadedPresetId) {
      loadPreset(preloadedPresetId);
    } else if (!reviewText) {
      // Default to first preset
      loadPreset('promo');
    }
  }, [preloadedPresetId]);

  const handleStarClick = (stars) => {
    setRating(stars);
  };

  // Simulated AI multi-step analysis sequence
  const handleAnalyze = () => {
    if (!reviewText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep(1);
    setAnalysisResult(null);
    setIsSaved(false);

    // Multi-step scanning steps
    const timer1 = setTimeout(() => setAnalysisStep(2), 500);
    const timer2 = setTimeout(() => setAnalysisStep(3), 1000);
    const timer3 = setTimeout(() => {
      // Run detection engine
      const res = analyzeFoodReview(reviewText, rating, restaurant, reviewerData);
      setAnalysisResult(res);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleSaveToHistory = () => {
    if (!analysisResult) return;

    const historyEntry = {
      id: `hist-${Date.now()}`,
      restaurant: restaurant || 'Anonymous Restaurant',
      cuisine: 'Food & Dining',
      rating,
      reviewer: reviewerData ? `${reviewerData.name} (${reviewerData.handle})` : 'Self-Submitted Review',
      reviewerId: reviewerData?.id || 'rev-custom',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      sentiment: analysisResult.sentiment,
      sentimentPolarity: analysisResult.sentimentPolarity,
      riskScore: analysisResult.riskScore,
      status: analysisResult.status,
      verdictTag: analysisResult.verdictTag,
      text: reviewText,
      detectedFactors: analysisResult.factors
    };

    onAddToHistory(historyEntry);
    setIsSaved(true);
  };

  const handleResetForm = () => {
    setReviewText('');
    setRestaurant('');
    setRating(5);
    setSelectedPreset(null);
    setReviewerData(null);
    setAnalysisResult(null);
    setIsSaved(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Quick Scenarios */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                <Search className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                AI Review Analyzer
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Submit any food review to evaluate lexical repetition, promotional buzzwords, sentiment dissonance, and reviewer anomalies.
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Presets:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition border ${
                    selectedPreset === preset.id
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Input Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Restaurant Name field */}
          <div className="md:col-span-7 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Restaurant Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                placeholder="e.g. Golden Wok Express, The Truffle Bistro"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Star Rating field */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Assigned Rating
            </label>
            <div className="flex items-center gap-1.5 py-2 px-3.5 bg-slate-950 border border-slate-800 rounded-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="p-1 hover:scale-110 transition focus:outline-none"
                  title={`${star} Star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                        : 'text-slate-600 fill-slate-800'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-auto text-xs font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {rating} / 5 Stars
              </span>
            </div>
          </div>
        </div>

        {/* Review Text Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Review Content
            </label>
            <span className="text-xs text-slate-400">
              {reviewText.length} characters • {reviewText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            rows={5}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              setSelectedPreset(null);
            }}
            placeholder="Paste or type a food review here to analyze its authenticity..."
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 leading-relaxed font-sans"
          />
        </div>

        {/* Context metadata: Simulated Reviewer Account */}
        {reviewerData && (
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <img 
                src={reviewerData.avatar} 
                alt={reviewerData.name} 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700" 
              />
              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>Linked Author: {reviewerData.name}</span>
                  <span className="text-slate-400">({reviewerData.handle})</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  {reviewerData.totalReviews} total reviews • {reviewerData.avgRating}★ avg • {reviewerData.fiveStarPercentage}% 5-star ratio
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                reviewerData.riskScore > 50 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {reviewerData.accountType}
              </span>
              {onViewReviewer && (
                <button
                  type="button"
                  onClick={() => onViewReviewer(reviewerData.id)}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  View Profile →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Button: Analyze Review */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>Multi-heuristic AI: Lexical Diversity, Sentiment Polarity & Pattern Matching</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !reviewText.trim()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-sm font-bold shadow-lg shadow-orange-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Review...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scanning progress display */}
        {isAnalyzing && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-orange-500/30 space-y-3 animate-pulse">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-orange-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin text-orange-400" />
                {analysisStep === 1 && "Tokenizing review text & calculating lexical diversity..."}
                {analysisStep === 2 && "Scanning promotional buzzwords, sentiment dissonance & competitor flags..."}
                {analysisStep === 3 && "Cross-referencing reviewer velocity & computing Authenticity Risk Score..."}
              </span>
              <span className="text-slate-400 font-mono">Step {analysisStep}/3</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-rose-500 h-full transition-all duration-500" 
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Render Results Component if Analysis Complete */}
      {analysisResult && !isAnalyzing && (
        <div id="results-section">
          <ReviewResults
            result={analysisResult}
            reviewInput={{
              restaurant,
              rating,
              text: reviewText,
              reviewerName: reviewerData ? `${reviewerData.name} (${reviewerData.handle})` : null,
              reviewerId: reviewerData?.id
            }}
            onSaveToHistory={handleSaveToHistory}
            onReset={handleResetForm}
            onViewReviewer={onViewReviewer}
            isSaved={isSaved}
          />
        </div>
      )}
    </div>
  );
}
