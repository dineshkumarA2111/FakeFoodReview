export const INITIAL_STATS = {
  totalReviews: 1480,
  genuineReviews: 1095,
  suspiciousReviews: 385,
  botAttacksPrevented: 42,
  averageRiskScore: 28.4,
  recentDetections: 19
};

export const DEMO_PRESETS = [
  {
    id: "promo",
    label: "🌟 Paid 5-Star Promo",
    tag: "High Risk Bot Promo",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    restaurant: "Golden Wok Express",
    cuisine: "Asian Fusion",
    rating: 5,
    reviewerId: "rev-bot99",
    reviewerName: "Alex Hunter (@FoodieBot99)",
    text: "BEST RESTAURANT IN THE ENTIRE UNIVERSE!!! MUST VISIT IMMEDIATELY!! The food is 100% perfection, unbelievable hospitality, totally flawless experience! Use coupon code SAVE20 for maximum discount! Don't miss out on this life changing culinary masterpiece! 10/10 stars guaranteed!!"
  },
  {
    id: "smear",
    label: "😡 Competitor Smear 1-Star",
    tag: "Malicious Smear",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    restaurant: "Bella Napoli Pizzeria",
    cuisine: "Italian",
    rating: 1,
    reviewerId: "rev-smear",
    reviewerName: "Marcus Reed (@CompetitorSpy)",
    text: "ABSOLUTE DISASTER DO NOT EAT HERE!! WORST PLACE EVER DISGUSTING FOOD RUDE STAFF TOOK 2 HOURS!! Go to Luigi's Trattoria right across the corner instead for real authentic pizza and 10x better service. Total scam and health hazard!!"
  },
  {
    id: "genuine",
    label: "✅ Genuine Balanced 4-Star",
    tag: "Verified Authentic",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    restaurant: "The Truffle Bistro",
    cuisine: "Contemporary European",
    rating: 4,
    reviewerId: "rev-critic",
    reviewerName: "Elena Rostova (@GourmetElena)",
    text: "Visited on a rainy Thursday evening for an anniversary dinner. The wild mushroom risotto had lovely earthy undertones and perfectly cooked arborio grain. However, the duck breast was slightly past medium-rare and our table waited roughly 25 minutes between appetizers and mains. Attentive sommelier made up for the delay."
  },
  {
    id: "template",
    label: "🤖 Repetitive Bot Template",
    tag: "Template Spam",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    restaurant: "Burger Craft Lab",
    cuisine: "American Gourmet",
    rating: 5,
    reviewerId: "rev-bot99",
    reviewerName: "Alex Hunter (@FoodieBot99)",
    text: "Amazing ambiance, tasty food, quick delivery, friendly staff, highly recommend to everyone. Very delicious meal and wonderful atmosphere. Will definitely come back again soon with family."
  }
];

export const MOCK_REVIEWERS = [
  {
    id: "rev-bot99",
    name: "Alex Hunter",
    handle: "@FoodieBot99",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    accountType: "Syndicate Bot Account",
    riskLevel: "High Risk",
    riskScore: 89,
    trustScore: 11,
    totalReviews: 142,
    avgRating: 4.9,
    fiveStarPercentage: 96,
    reviewsRecently: 24, // in past 48 hours
    similarReviewsCount: 118,
    accountAgeDays: 14,
    ipDiversity: "Single IP Subnet (Proxy Farm)",
    behaviorFlags: [
      "24 reviews posted within 4 hours",
      "96% five-star rating skew",
      "83% lexical overlap across 15 different restaurants",
      "Zero photos or receipt verifications uploaded"
    ],
    sampleReviews: [
      {
        restaurant: "Golden Wok Express",
        rating: 5,
        date: "2026-09-16 14:22",
        snippet: "BEST RESTAURANT IN THE ENTIRE UNIVERSE!!! MUST VISIT IMMEDIATELY!! 10/10...",
        status: "High Risk Fake",
        score: 92
      },
      {
        restaurant: "FlameGrill Steaks",
        rating: 5,
        date: "2026-09-16 13:58",
        snippet: "Best steaks ever! Flawless experience, 100% recommend, use code MEAT10...",
        status: "High Risk Fake",
        score: 88
      },
      {
        restaurant: "Taco Haven",
        rating: 5,
        date: "2026-09-16 13:41",
        snippet: "Amazing ambiance, tasty food, quick delivery, friendly staff, highly recommend...",
        status: "High Risk Fake",
        score: 85
      }
    ]
  },
  {
    id: "rev-critic",
    name: "Elena Rostova",
    handle: "@GourmetElena",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    accountType: "Verified Food Journalist",
    riskLevel: "Low Risk",
    riskScore: 6,
    trustScore: 94,
    totalReviews: 63,
    avgRating: 3.7,
    fiveStarPercentage: 28,
    reviewsRecently: 1, // in past 48 hours
    similarReviewsCount: 0,
    accountAgeDays: 1140,
    ipDiversity: "Residential ISP, Multi-device verified",
    behaviorFlags: [
      "Natural Poisson-distribution review cadence (~1.5 reviews/week)",
      "High lexical entropy & dish-specific terminology",
      "Balanced rating curve (1s: 8%, 2s: 14%, 3s: 26%, 4s: 34%, 5s: 18%)",
      "100% verified location tags and photo metadata"
    ],
    sampleReviews: [
      {
        restaurant: "The Truffle Bistro",
        rating: 4,
        date: "2026-09-15 20:15",
        snippet: "Visited on a rainy Thursday evening... wild mushroom risotto had lovely earthy undertones...",
        status: "Likely Genuine",
        score: 8
      },
      {
        restaurant: "Koto Izakaya",
        rating: 5,
        date: "2026-09-08 19:30",
        snippet: "Exquisite binchotan charcoal grilling. The hamachi collar had crispy skin and melt-in-mouth fat...",
        status: "Likely Genuine",
        score: 5
      },
      {
        restaurant: "Saffron Lounge",
        rating: 2,
        date: "2026-08-28 21:00",
        snippet: "Disappointing spice balance. The biryani rice was clumpy and overly oily despite high prices...",
        status: "Likely Genuine",
        score: 11
      }
    ]
  },
  {
    id: "rev-smear",
    name: "Marcus Reed",
    handle: "@CompetitorSpy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    accountType: "Targeted Smear Account",
    riskLevel: "High Risk",
    riskScore: 84,
    trustScore: 16,
    totalReviews: 38,
    avgRating: 1.3,
    fiveStarPercentage: 4,
    reviewsRecently: 9, // in past 48 hours
    similarReviewsCount: 29,
    accountAgeDays: 28,
    ipDiversity: "VPN Exit Node Cluster",
    behaviorFlags: [
      "88% 1-star negative reviews targeting adjacent pizzerias",
      "Repeatedly recommends a single competing brand (Luigi's)",
      "Excessive capitalization and extreme emotional polarity",
      "Negative bursts following competitor marketing promotions"
    ],
    sampleReviews: [
      {
        restaurant: "Bella Napoli Pizzeria",
        rating: 1,
        date: "2026-09-16 11:10",
        snippet: "ABSOLUTE DISASTER DO NOT EAT HERE!! Go to Luigi's Trattoria instead...",
        status: "High Risk Fake",
        score: 86
      },
      {
        restaurant: "Crust & Craft Woodfired",
        rating: 1,
        date: "2026-09-15 18:40",
        snippet: "Burnt crust, raw center. Worst service in town. Luigi's Trattoria is 100x better...",
        status: "High Risk Fake",
        score: 82
      },
      {
        restaurant: "Luigi's Trattoria",
        rating: 5,
        date: "2026-09-14 12:00",
        snippet: "The best Italian dining on earth! Authentic masters! All other pizza shops in area are fake!",
        status: "High Risk Fake",
        score: 91
      }
    ]
  },
  {
    id: "rev-casual",
    name: "David Chen",
    handle: "@CasualDinerD",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    accountType: "Casual Community Reviewer",
    riskLevel: "Low Risk",
    riskScore: 14,
    trustScore: 86,
    totalReviews: 29,
    avgRating: 4.1,
    fiveStarPercentage: 41,
    reviewsRecently: 1,
    similarReviewsCount: 2,
    accountAgeDays: 480,
    ipDiversity: "Residential ISP",
    behaviorFlags: [
      "Natural organic review cadence over 16 months",
      "Mentions specific dining occasions with friends and kids",
      "Consistent moderate vocabulary and constructive feedback"
    ],
    sampleReviews: [
      {
        restaurant: "Harbor Fish House",
        rating: 4,
        date: "2026-09-10 13:10",
        snippet: "Generous portions of crispy cod and hand-cut chips. Tartar sauce was freshly made.",
        status: "Likely Genuine",
        score: 12
      },
      {
        restaurant: "Spice Route Express",
        rating: 3,
        date: "2026-08-19 19:45",
        snippet: "Decent butter chicken and garlic naan. Dining room was slightly loud on a Friday night.",
        status: "Likely Genuine",
        score: 15
      }
    ]
  }
];

export const INITIAL_REVIEWS_HISTORY = [
  {
    id: "hist-101",
    restaurant: "Golden Wok Express",
    cuisine: "Asian Fusion",
    rating: 5,
    reviewer: "Alex Hunter (@FoodieBot99)",
    reviewerId: "rev-bot99",
    date: "2026-09-16 14:22",
    sentiment: "Positive (Extreme)",
    sentimentPolarity: "positive",
    riskScore: 92,
    status: "Potentially Suspicious",
    verdictTag: "High Risk Fake",
    text: "BEST RESTAURANT IN THE ENTIRE UNIVERSE!!! MUST VISIT IMMEDIATELY!! The food is 100% perfection, unbelievable hospitality, totally flawless experience! Use coupon code SAVE20 for maximum discount! Don't miss out on this life changing culinary masterpiece! 10/10 stars guaranteed!!",
    detectedFactors: [
      { name: "Excessive promotional language", score: 94, detail: "Found commercial keywords ('coupon code', 'SAVE20', 'discount', 'guaranteed')" },
      { name: "Superlative hyperbole & exclamation overuse", score: 91, detail: "7 exclamation marks and 4 hyperbolic superlatives detected ('ENTIRE UNIVERSE', 'flawless', 'life changing')" },
      { name: "Lack of specific dish/dining context", score: 78, detail: "No dishes, ingredients, or culinary textures cited" },
      { name: "Reviewer burst velocity", score: 86, detail: "Reviewer submitted 24 reviews in under 48 hours" }
    ]
  },
  {
    id: "hist-102",
    restaurant: "The Truffle Bistro",
    cuisine: "Contemporary European",
    rating: 4,
    reviewer: "Elena Rostova (@GourmetElena)",
    reviewerId: "rev-critic",
    date: "2026-09-15 20:15",
    sentiment: "Balanced Positive",
    sentimentPolarity: "positive",
    riskScore: 8,
    status: "Likely Genuine",
    verdictTag: "Likely Genuine",
    text: "Visited on a rainy Thursday evening for an anniversary dinner. The wild mushroom risotto had lovely earthy undertones and perfectly cooked arborio grain. However, the duck breast was slightly past medium-rare and our table waited roughly 25 minutes between appetizers and mains. Attentive sommelier made up for the delay.",
    detectedFactors: [
      { name: "Lexical & sensory authenticity", score: 6, detail: "Natural dish detail ('wild mushroom risotto', 'arborio grain', 'sommelier')" },
      { name: "Balanced sentiment nuance", score: 7, detail: "Mix of praise and constructive pacing feedback" },
      { name: "Reviewer history credibility", score: 5, detail: "Longstanding profile with normal review spacing" }
    ]
  },
  {
    id: "hist-103",
    restaurant: "Bella Napoli Pizzeria",
    cuisine: "Italian",
    rating: 1,
    reviewer: "Marcus Reed (@CompetitorSpy)",
    reviewerId: "rev-smear",
    date: "2026-09-16 11:10",
    sentiment: "Negative (Extreme)",
    sentimentPolarity: "negative",
    riskScore: 86,
    status: "Potentially Suspicious",
    verdictTag: "Competitor Smear",
    text: "ABSOLUTE DISASTER DO NOT EAT HERE!! WORST PLACE EVER DISGUSTING FOOD RUDE STAFF TOOK 2 HOURS!! Go to Luigi's Trattoria right across the corner instead for real authentic pizza and 10x better service. Total scam and health hazard!!",
    detectedFactors: [
      { name: "Competitor redirection detected", score: 96, detail: "Explicit referral to direct local rival ('Luigi's Trattoria')" },
      { name: "Extreme negative sentiment & ALL-CAPS", score: 89, detail: "Heavy capitalisation and smear triggers ('ABSOLUTE DISASTER', 'health hazard')" },
      { name: "Account smear clustering", score: 84, detail: "88% of user's reviews are 1-star attacks against neighboring eateries" }
    ]
  },
  {
    id: "hist-104",
    restaurant: "Burger Craft Lab",
    cuisine: "American Gourmet",
    rating: 5,
    reviewer: "Alex Hunter (@FoodieBot99)",
    reviewerId: "rev-bot99",
    date: "2026-09-15 16:30",
    sentiment: "Positive",
    sentimentPolarity: "positive",
    riskScore: 78,
    status: "Potentially Suspicious",
    verdictTag: "Template Spam",
    text: "Amazing ambiance, tasty food, quick delivery, friendly staff, highly recommend to everyone. Very delicious meal and wonderful atmosphere. Will definitely come back again soon with family.",
    detectedFactors: [
      { name: "Repetitive wording & syntax template", score: 88, detail: "Matches common generic template with 83% phrase similarity" },
      { name: "Low lexical richness", score: 72, detail: "Repeated adjectives: 'tasty', 'delicious', 'wonderful' without specifics" },
      { name: "Reviewer similarity score", score: 79, detail: "User posted identical structure on 6 other profiles" }
    ]
  },
  {
    id: "hist-105",
    restaurant: "Ocean Catch Seafood",
    cuisine: "Seafood & Grill",
    rating: 4,
    reviewer: "David Chen (@CasualDinerD)",
    reviewerId: "rev-casual",
    date: "2026-09-14 19:10",
    sentiment: "Positive",
    sentimentPolarity: "positive",
    riskScore: 12,
    status: "Likely Genuine",
    verdictTag: "Likely Genuine",
    text: "Tried the grilled red snapper and clam chowder. The fish was fresh with a crisp lemon-herb crust. Chowder was piping hot and had good clam-to-potato ratio. Outdoor patio seating has nice harbor views.",
    detectedFactors: [
      { name: "Contextual dining authenticity", score: 10, detail: "High domain-specific vocabulary and dish details" },
      { name: "Natural sentiment expression", score: 12, detail: "Even tone with realistic dining experience notes" }
    ]
  },
  {
    id: "hist-106",
    restaurant: "Spice Route Express",
    cuisine: "Indian",
    rating: 2,
    reviewer: "Priya Sharma (@PriyaEats)",
    reviewerId: "rev-priya",
    date: "2026-09-13 13:45",
    sentiment: "Negative",
    sentimentPolarity: "negative",
    riskScore: 19,
    status: "Likely Genuine",
    verdictTag: "Likely Genuine",
    text: "Ordered paneer tikka masala and butter garlic naan for lunch delivery. Unfortunately, the gravy was far too sweet and the naan arrived soggy from packaging. On the positive side, delivery was on time in 25 mins.",
    detectedFactors: [
      { name: "Constructive feedback nuance", score: 14, detail: "Realistic critique with acknowledged positives" },
      { name: "Legitimate food delivery context", score: 18, detail: "Valid packaging and temperature observations" }
    ]
  },
  {
    id: "hist-107",
    restaurant: "Le Petit Bistro",
    cuisine: "French",
    rating: 5,
    reviewer: "SpamNetwork_Node_4",
    reviewerId: "rev-bot99",
    date: "2026-09-12 04:15",
    sentiment: "Positive (Extreme)",
    sentimentPolarity: "positive",
    riskScore: 94,
    status: "Potentially Suspicious",
    verdictTag: "High Risk Fake",
    text: "100% THE GREATEST FOOD ON PLANET EARTH!! OUTSTANDING HEAVENLY PERFECTION!! VISIT TODAY CLICK LINK IN BIO FOR 30% OFF!! ALL OTHER RESTAURANTS ARE TRASH COMPARED TO THIS MASTERPIECE!!",
    detectedFactors: [
      { name: "Promotional clickbait & commercial spam", score: 98, detail: "Contains 'CLICK LINK IN BIO', '30% OFF', promo cues" },
      { name: "Excessive capitalization & shouting", score: 95, detail: "100% uppercase words with extreme sentiment" },
      { name: "Posting timestamp anomaly", score: 82, detail: "Submitted at 4:15 AM local restaurant time" }
    ]
  },
  {
    id: "hist-108",
    restaurant: "Tokyo Ramen Bar",
    cuisine: "Japanese",
    rating: 5,
    reviewer: "Elena Rostova (@GourmetElena)",
    reviewerId: "rev-critic",
    date: "2026-09-11 18:20",
    sentiment: "Positive",
    sentimentPolarity: "positive",
    riskScore: 7,
    status: "Likely Genuine",
    verdictTag: "Likely Genuine",
    text: "Rich 16-hour tonkotsu broth with commendable collagen density. The chashu pork belly was beautifully torched with delicate smokiness, and noodles had the requisite springy bite (katame). Worth the typical 20-minute queue.",
    detectedFactors: [
      { name: "High culinary domain precision", score: 5, detail: "Specialized culinary terms ('tonkotsu', 'katame', 'chashu')" },
      { name: "Verified diner pattern", score: 8, detail: "Realistic description of wait time and dining logistics" }
    ]
  }
];
