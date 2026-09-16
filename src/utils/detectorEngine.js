/**
 * Simulated AI Detection Engine for Fake Food Reviews
 * Uses realistic NLP heuristics, lexical diversity, promotional pattern recognition,
 * emotional polarity variance, and template matching.
 */

// Known promotional triggers
const PROMO_KEYWORDS = [
  "coupon", "code", "discount", "off", "save20", "save10", "click link", "bio",
  "guaranteed", "must visit", "best in the world", "entire universe", "life changing",
  "100% perfection", "totally flawless", "masterpiece", "unbelievable hospitality",
  "don't miss out", "10/10", "visit today", "free gift", "promotional", "sponsored"
];

// Smear and competitor triggers
const SMEAR_KEYWORDS = [
  "disaster", "disgusting", "worst place ever", "health hazard", "total scam",
  "food poisoning", "trash", "shut down", "go to", "instead", "across the street",
  "right across the corner", "competitor", "rip off", "do not eat here"
];

// Generic bot template phrases
const BOT_TEMPLATE_PHRASES = [
  "amazing ambiance", "tasty food", "quick delivery", "friendly staff",
  "highly recommend to everyone", "very delicious meal", "wonderful atmosphere",
  "will definitely come back again", "great place to eat", "good food good mood"
];

// Authentic food/dining specific terminology that genuine foodies use
const GENUINE_FOOD_TERMS = [
  "risotto", "pasta", "broth", "sauce", "texture", "cooked", "waiter", "arrived",
  "table", "appetizer", "dessert", "medium-rare", "al dente", "spices", "naan",
  "crust", "cheese", "flavor", "tender", "crispy", "grilled", "portion", "price",
  "reservation", "minutes", "service was", "ordered", "served", "sommelier"
];

export function analyzeFoodReview(reviewText, rating = 5, restaurantName = "Restaurant", reviewerData = null) {
  if (!reviewText || reviewText.trim().length === 0) {
    return {
      riskScore: 10,
      status: "Likely Genuine",
      verdictTag: "Insufficient Data",
      sentiment: "Neutral",
      sentimentPolarity: "neutral",
      factors: [],
      highlightWords: [],
      summary: "Please provide review text to analyze."
    };
  }

  const text = reviewText.trim();
  const lowerText = text.toLowerCase();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  let riskScore = 15; // baseline
  const detectedFactors = [];
  const highlightWords = [];

  // 1. Promotional Language Check
  let promoMatches = [];
  PROMO_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) {
      promoMatches.push(kw);
      highlightWords.push({ term: kw, type: "promo" });
    }
  });

  if (promoMatches.length > 0) {
    const promoImpact = Math.min(38, promoMatches.length * 12 + 10);
    riskScore += promoImpact;
    detectedFactors.push({
      name: "Excessive promotional language",
      score: Math.min(98, 55 + promoMatches.length * 15),
      severity: "high",
      icon: "Megaphone",
      detail: `Detected ${promoMatches.length} commercial/promotional keyword(s): "${promoMatches.slice(0, 3).join('", "')}"`
    });
  }

  // 2. Smear & Competitor Redirection Check
  let smearMatches = [];
  SMEAR_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) {
      smearMatches.push(kw);
      highlightWords.push({ term: kw, type: "smear" });
    }
  });

  if (smearMatches.length > 0 && rating <= 2) {
    const smearImpact = Math.min(36, smearMatches.length * 14 + 12);
    riskScore += smearImpact;
    detectedFactors.push({
      name: "Malicious smear & competitor diversion",
      score: Math.min(96, 60 + smearMatches.length * 12),
      severity: "high",
      icon: "ShieldAlert",
      detail: `Detected hostile diversion triggers: "${smearMatches.slice(0, 3).join('", "')}" pointing to alternative venues.`
    });
  }

  // 3. Emotional Extremism & ALL-CAPS / Exclamation Burst
  const exclamationCount = (text.match(/!/g) || []).length;
  const uppercaseWords = words.filter(w => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w));
  const capsRatio = uppercaseWords.length / Math.max(1, totalWords);

  if (exclamationCount >= 4 || capsRatio > 0.25) {
    const emotionScore = Math.min(92, 50 + exclamationCount * 5 + Math.round(capsRatio * 60));
    riskScore += 18;
    detectedFactors.push({
      name: "Extreme sentiment & syntactic shouting",
      score: emotionScore,
      severity: capsRatio > 0.4 ? "high" : "medium",
      icon: "Zap",
      detail: `Contains ${exclamationCount} exclamation marks and ${(capsRatio * 100).toFixed(0)}% uppercase shouting vocabulary.`
    });
  }

  // 4. Repetitive Wording & Lexical Diversity (Type-Token Ratio)
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, "")));
  const lexicalDiversity = uniqueWords.size / Math.max(1, totalWords);

  let templateMatchCount = 0;
  BOT_TEMPLATE_PHRASES.forEach(phrase => {
    if (lowerText.includes(phrase)) {
      templateMatchCount++;
      highlightWords.push({ term: phrase, type: "template" });
    }
  });

  if (templateMatchCount >= 2 || (lexicalDiversity < 0.65 && totalWords > 12)) {
    const repScore = Math.min(94, 60 + templateMatchCount * 12 + Math.round((1 - lexicalDiversity) * 40));
    riskScore += 22;
    detectedFactors.push({
      name: "Repetitive wording & template clustering",
      score: repScore,
      severity: templateMatchCount >= 2 ? "high" : "medium",
      icon: "Copy",
      detail: `Matches common bot syndication templates (${templateMatchCount} matches, lexical diversity ${(lexicalDiversity * 100).toFixed(0)}%).`
    });
  }

  // 5. Dish Specificity & Culinary Depth Check (Genuine Signals)
  let genuineFoodMatches = [];
  GENUINE_FOOD_TERMS.forEach(term => {
    if (lowerText.includes(term)) {
      genuineFoodMatches.push(term);
    }
  });

  if (genuineFoodMatches.length >= 2 && totalWords > 20) {
    // Deduct risk because specific dishes/aspects were discussed
    riskScore = Math.max(5, riskScore - 22);
    detectedFactors.push({
      name: "Culinary & contextual specificity",
      score: Math.max(5, 20 - genuineFoodMatches.length * 3),
      severity: "low",
      icon: "Utensils",
      detail: `High domain authenticity: mentions specific culinary details ("${genuineFoodMatches.slice(0, 3).join('", "')}").`
    });
  } else if (totalWords > 15 && genuineFoodMatches.length === 0 && (rating === 1 || rating === 5)) {
    riskScore += 14;
    detectedFactors.push({
      name: "Lack of specific culinary context",
      score: 74,
      severity: "medium",
      icon: "HelpCircle",
      detail: "Review assigns extreme rating without mentioning any specific dish, ingredient, or dining circumstance."
    });
  }

  // 6. Reviewer Behavioral Context
  if (reviewerData) {
    if (reviewerData.reviewsRecently > 10 || reviewerData.fiveStarPercentage > 90) {
      riskScore += 16;
      detectedFactors.push({
        name: "Unusual reviewer activity burst",
        score: 88,
        severity: "high",
        icon: "UserX",
        detail: `Reviewer account has high velocity (${reviewerData.reviewsRecently} reviews in 48h) and ${reviewerData.fiveStarPercentage}% 5-star skew.`
      });
    } else if (reviewerData.trustScore > 80) {
      riskScore = Math.max(5, riskScore - 15);
      detectedFactors.push({
        name: "Verified reviewer credibility",
        score: 8,
        severity: "low",
        icon: "UserCheck",
        detail: `Posted by verified reviewer with ${reviewerData.trustScore}/100 organic trust score.`
      });
    }
  } else {
    // Default simulated reviewer context if none provided
    if (riskScore > 60) {
      detectedFactors.push({
        name: "Unusual reviewer activity",
        score: 82,
        severity: "medium",
        icon: "Activity",
        detail: "Associated account pattern exhibits high similarity clustering with commercial review farms."
      });
    }
  }

  // Clamp Risk Score between 4 and 98
  riskScore = Math.min(98, Math.max(4, Math.round(riskScore)));

  // Determine Overall Status Verdict
  let status = "Likely Genuine";
  let verdictTag = "Likely Genuine";
  if (riskScore >= 68) {
    status = "Potentially Suspicious";
    verdictTag = promoMatches.length > 0 ? "High Risk Bot Promo" : (smearMatches.length > 0 ? "Competitor Smear" : "High Risk Fake");
  } else if (riskScore >= 40) {
    status = "Moderate Caution";
    verdictTag = "Needs Review";
  }

  // Sentiment Analysis
  let sentimentPolarity = "positive";
  let sentiment = "Positive";
  if (rating <= 2 || smearMatches.length > 1) {
    sentimentPolarity = "negative";
    sentiment = (exclamationCount > 2 || capsRatio > 0.2) ? "Negative (Extreme)" : "Negative";
  } else if (rating === 3) {
    sentimentPolarity = "neutral";
    sentiment = "Neutral / Balanced";
  } else {
    sentimentPolarity = "positive";
    sentiment = (exclamationCount > 2 || promoMatches.length > 1) ? "Positive (Extreme)" : "Positive";
  }

  // Generate actionable summary
  let summary = "";
  if (status === "Likely Genuine") {
    summary = "This review exhibits natural human cadence, specific dining context, and balanced sentence structure. Highly probable to be an authentic diner experience.";
  } else if (verdictTag === "Competitor Smear") {
    summary = "High probability of targeted negative attack. Text contains hostile redirection cues to rival establishments with extreme unverified claims.";
  } else {
    summary = "High probability of artificial promotion or bot generation. Detected uncharacteristic superlatives, commercial incentive phrasing, and low contextual depth.";
  }

  return {
    riskScore,
    status,
    verdictTag,
    sentiment,
    sentimentPolarity,
    factors: detectedFactors,
    highlightWords,
    summary,
    metrics: {
      totalWords,
      uniqueWords: uniqueWords.size,
      lexicalDiversity: (lexicalDiversity * 100).toFixed(1) + "%",
      exclamationCount,
      capsRatio: (capsRatio * 100).toFixed(0) + "%"
    }
  };
}
