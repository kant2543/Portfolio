/* =========================================================
   PORTFOLIO DATA — edit this file to update content.
   - EXPERIENCE: slides shown in the popup when a timeline card is clicked
   - PROJECTS:   cards in the "Tools I've Built" section
   Images: put files in assets/img/ and set img: 'assets/img/xxx.jpg'
           (img: null shows a "Photo coming soon" placeholder)
   ========================================================= */

window.EXPERIENCE = {
  cj: {
    period: 'Sep 2024 — Present',
    company: 'C.J. Express Group Co., Ltd.',
    role: 'Operations Strategy Specialist',
    slides: [
      { img: 'assets/img/cj-dashboard.jpg', label: 'Automated KPI Dashboard', caption: 'Looker Studio and BigQuery pipeline consolidating branch sales data so leadership sees performance without waiting on manual reports.' },
      { img: 'assets/img/cj-co-flow.jpg', label: 'Automated CO Flow', caption: 'Web-based system automating customer-order workflows for field teams, with an integrated competitor price tracker for territory-level decisions.' },
      { img: null, label: 'Branch Network Analytics', caption: 'Interactive map of ~2,000 branches with competitor layers and proximity analysis, used for target setting and new-branch planning.' },
      { img: null, label: 'Multi-Province Strategy', caption: 'Sales target frameworks for 7 provinces — each calibrated to local market size, competitive density and growth potential.' },
      { img: null, label: 'Team Coordination', caption: 'Aligned a cross-functional team of 30 across operations, sales and logistics to eliminate bottlenecks and sustain momentum.' }
    ]
  },
  cp2024: {
    period: 'Jan — Jun 2024',
    company: 'Charoen Pokphand Group Co., Ltd.',
    role: "Partnership Lead — Shop-in-Shop (Lotus's)",
    slides: [
      { img: 'assets/img/cp24-promo.jpg', label: '+25% Category Sales Growth', caption: "Drove a 25% uplift in fresh product sales through a structured commercial partnership with Lotus's across multiple store formats." },
      { img: 'assets/img/cp24-shelf.jpg', label: 'Promotional Mechanics', caption: 'Designed activations to boost trial and repeat purchase — shelf positioning, bundling and in-store sampling aligned to shopper behaviour.' },
      { img: 'assets/img/cp24-instore.jpg', label: 'In-Store Execution', caption: 'Optimised floor-level operations and staff coordination to improve conversion and the end-to-end shopper experience.' }
    ]
  },
  cp2023: {
    period: 'Jan — Dec 2023',
    company: 'Charoen Pokphand Group Co., Ltd.',
    role: 'Product Development Lead — Egg & Shrimp',
    slides: [
      { img: 'assets/img/cp-launch.jpg', label: 'New Product Launches', caption: 'Identified untapped price-tier segments in egg and shrimp and led full product development cycles from concept to commercial launch.' },
      { img: 'assets/img/cp23-egg-range.jpg', label: 'Tiered Egg Range', caption: 'Rolled out a branded egg range across fresh-market stalls and CP outlets, with good-better-best pack tiers to capture different price points.' },
      { img: 'assets/img/cp-gtm.jpg', label: 'Go-to-Market Strategy', caption: 'GTM plans grounded in financial analysis and consumer insight — each launch built to hit margin targets from day one.' },
      { img: 'assets/img/cp-supply.jpg', label: 'Supply Chain Resilience', caption: 'Streamlined upstream coordination between farms and distribution to close fulfilment gaps and keep shelves stocked.' },
      { img: 'assets/img/cp23-market.jpg', label: 'Field Market Research', caption: 'Visited fresh markets and traditional-trade outlets to validate price tiers and pack formats before each launch.' }
    ]
  },
  cp2022: {
    period: 'May — Dec 2022',
    company: 'Charoen Pokphand Group Co., Ltd.',
    role: 'Regional Sales Lead — Traditional Trade, Phetchabun',
    slides: [
      { img: 'assets/img/cp22-roadshow.jpg', label: '35% Revenue Growth', caption: 'Led an 8-person sales team to a 35% increase, sustaining a monthly run-rate of 12.3M THB across traditional trade.' },
      { img: 'assets/img/cp22-market.jpg', label: 'P&L Ownership', caption: 'Full accountability for shrimp and chicken profitability — real-time pricing, volume and channel-mix decisions.' },
      { img: 'assets/img/cp22-plant.jpg', label: 'Operational Coordination', caption: 'Connected farm production, logistics and last-mile teams to keep fulfilment reliable and minimise out-of-stocks.' }
    ]
  }
};

window.PROJECTS = [
  {
    name: 'Branch Analytics Dashboard',
    cat: 'Geospatial · Web App',
    desc: 'Interactive map of the branch network with competitor layers, proximity analysis and overview/detail views, plus an embedded AI assistant for ad-hoc questions.',
    tags: ['Leaflet', 'JavaScript', 'OpenAI API']
  },
  {
    name: 'Competitor Price Monitor',
    cat: 'Field Tool',
    desc: 'Field staff submit competitor shelf prices from their phones; photos are read by vision OCR, HQ reviews by role, and updates are pushed to LINE with CSV export.',
    tags: ['Apps Script', 'Vision OCR', 'LINE API', 'Sheets']
  },
  {
    name: 'Sales Gap Alerting',
    cat: 'Data Pipeline',
    desc: 'Scheduled BigQuery jobs aggregate daily branch sales and flag branches whose bills or sales drop out unexpectedly, so issues surface the same day.',
    tags: ['BigQuery', 'SQL', 'Scheduled Queries']
  },
  {
    name: 'Target Revise App',
    cat: 'Planning Tool',
    desc: 'Lets area teams redistribute sales targets across branches within guardrails, replacing back-and-forth spreadsheet edits.',
    tags: ['Apps Script', 'Sheets']
  },
  {
    name: 'LINE OA Multi-Agent Assistant',
    cat: 'AI Automation',
    desc: 'An operations assistant inside LINE that routes each question to one of eight specialised agents, so field teams get answers where they already chat.',
    tags: ['LINE OA', 'LLM', 'Agent Routing']
  },
  {
    name: 'Branch Zone Assignment',
    cat: 'Geospatial · Analysis',
    desc: 'Clusters ~2,000 branches into balanced zones and visualises them on a map to support field-team coverage planning.',
    tags: ['Python', 'K-Means', 'Leaflet']
  },
  {
    name: 'Competitor Cannibalisation Study',
    cat: 'Market Intelligence',
    desc: 'Collected public competitor store locations with grid-based geocoding and measured overlap with our branch network to inform expansion.',
    tags: ['Python', 'Geocoding', 'Spatial Analysis']
  },
  {
    name: 'Fair Registration System',
    cat: 'Field Tool',
    desc: 'Branch registration for trade fairs with scheduling windows, a calendar view, HQ batch upload and role-based field/HQ access.',
    tags: ['Apps Script', 'Sheets', 'Calendar UI']
  },
  {
    name: 'Department Gantt Tracker',
    cat: 'Project Management',
    desc: 'Tracks department initiatives on a Gantt view with schedule-performance health scoring and LINE updates.',
    tags: ['Apps Script', 'LINE Webhook', 'SPI']
  }
];
