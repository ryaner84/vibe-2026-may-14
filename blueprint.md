# Project Blueprint: Vibe 2026

## Overview
Vibe 2026 is a multi-purpose lifestyle and travel utility application designed with a focus on modern web standards (Baseline), interactivity, and personalized data-driven insights. It currently features two main modules: "Lucky Toto" and "Travelling Essential".

## Implemented Features

### Core Framework
- **Multi-App Interface:** A fixed navigation bar allowing seamless switching between different modules.
- **Dynamic Theming:** Persistent Day/Night mode using CSS variables (OKLCH) and `localStorage`.
- **Responsive Design:** Polished UI that adapts to mobile and desktop screens.

### Module 1: Lucky Toto
- **Web Component Architecture:** Uses `<toto-generator>` custom element.
- **Trend-Based Generation:** Uses 6-month historical frequency data (Nov 2025 - May 2026) to categorize numbers.
- **Heat Mapping:** Visual "Heat Tags" (Hot, Warm, Avg, Cold) provide instant statistical context for every generated number.

### Module 2: Travelling Essential
- **Regional Global Map:** Powered by Leaflet.js, featuring country-wide selection markers and a fixed, non-intrusive global perspective.
- **Side-by-Side UI:** A refactored selection interface showing "From" and "To" boxes side-by-side for a clearer journey overview.
- **Enriched Intelligence Engine:**
    - **Specific Roaming Data:** Detailed roaming costs based on the selected telco and destination country.
    - **Transparency & Citations:** Every piece of data includes a "Source" and "Last Updated" date for reliability.
    - **Visual Power Guides:** Icons representing specific power adapter types (e.g., Type G, Type C).
    - **Dynamic Visa Check:** Automated visa status check based on citizenship and destination region.
- **Comprehensive Travel Report:** A detailed dashboard summarizing all travel essentials with verified citations.

## Technical Stack
- **Languages:** HTML5, CSS3 (Modern Baseline features like OKLCH, :has()), JavaScript (ES Modules).
- **Libraries:** Leaflet.js (Map), Three.js (Ready for future 3D enhancements).
- **Components:** Vanilla Web Components (Custom Elements + Shadow DOM).
- **Persistence:** LocalStorage for theme preferences.

## Future Roadmap
1. **Weather Integration:** Connect to a real-time weather API for the destination country.
2. **Flight Search:** Integration with flight booking APIs.
3. **3D Globe Mode:** Toggleable 3D view for the travel selector.
