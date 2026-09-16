# 🛡️ FoodReviewGuard – Fake Food Review Detection System

**FoodReviewGuard** is a modern, responsive web prototype showcasing how an AI-driven detection system identifies fake, paid promotional, and malicious competitor food reviews.

Designed for SaaS dashboards and project presentations, it provides interactive review analysis, risk breakdown meters, reviewer behavioral profiling, and historical audit logs.

---

## ✨ Features

- **📊 Home / Dashboard**:
  - Statistics overview: Total Reviews, Genuine Reviews, Suspicious Reviews Flagged, Bot Clusters Prevented.
  - Interactive Authenticity Distribution (Genuine vs. Paid Bots vs. Competitor Smear).
  - Rating vs. Risk Bimodal Chart (illustrates why 1-star and 5-star reviews have 4x higher risk).
  - Frequency breakdown of detected suspicious factors.
  - Live AI detection ticker.

- **🔍 Review Analyzer**:
  - Input fields for Restaurant Name, Interactive Star Rating (1–5 stars), and Review text.
  - 1-Click Demo Scenarios (Paid 5-Star Promo, 1-Star Competitor Smear, Balanced Genuine, Repetitive Bot Template).
  - Multi-stage simulated NLP scanner (tokenization, promotional patterns, cross-similarity, and score calculation).

- **📈 Review Results**:
  - Authenticity Risk Score (0–100%) with an animated progress meter.
  - Verdict classification (*Likely Genuine*, *Potentially Suspicious*, *High Risk Fake*).
  - Sentiment Polarity (*Positive*, *Neutral*, *Negative*).
  - Detected factor diagnosis cards with individual weights.
  - Action buttons to save to review history and test new reviews.

- **👤 Reviewer Behavioral Analysis**:
  - Reviewer profile switcher with sample personas (Bot Syndicate, Targeted Smearer, Verified Journalist, Casual Diner).
  - Behavioral metrics: Total reviews, Average rating, 5-star ratio, Recent burst velocity, Similar reviews detected.
  - Account trust score and timeline of user submissions.

- **📋 Review History & Audit Log**:
  - Searchable and filterable table of previously audited reviews.
  - Filter by verdict status and star ratings.
  - Detailed modal inspection.
  - 1-click **Export CSV** download.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd "Fake Food Review"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Engine**: Simulated Heuristic NLP Engine
