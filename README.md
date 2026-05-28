# What's Your Poison? — Premium Drink Lounge PWA

A mobile-first, responsive progressive web application (PWA) serving as a premium quick-reference guide for alcoholic and non-alcoholic drinks. It features dynamic result cards, serving suggestions, and curated food pairings (separated into Vegetarian and Non-Vegetarian options).

## Features

- **Zero-Latency Search & Autocomplete**: Search 18 premium drinks across categories instantly (Whiskey, Beer, Tequila, Vodka, Rum, Gin, and Mocktails).
- **Responsive Mobile-First Design**: Optimized for touch inputs and easy accessibility.
- **Cosmic Dark Lounge Aesthetic**: Sleek slate and zinc dark styling with glowing amber highlights and luxury serif typography.
- **Structured Pairing Details**: Clear badges for ingredients and serving variations, alongside side starters grouped by veg vs. non-veg options.
- **PWA Capabilities**: Installable directly onto mobile/desktop home screens and fully functional offline using local service worker caching.

## Project Structure

```
whats-your-poison/
├── index.html       # Main HTML UI structure (Tailwind CDN & PWA Installer)
├── index.js         # Autocomplete engine, 18-drink database, and card renderers
├── sw.js            # Service Worker offline asset cache setup
├── manifest.json    # PWA installable manifest metadata
├── icon.svg         # SVG vector glass icon for branding
└── images/          # Category drink visual assets
    ├── whiskey.png
    ├── beer.png
    ├── tequila.png
    ├── cocktail.png
    └── mocktail.png
```

## Running the Project

To test the PWA features (like the service worker and offline capability), the application must be served over a local HTTP server (browsers block service worker installation from local `file://` protocols).

### Serve with Python (Easiest)

Navigate to the project directory and run:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000`.
- Open DevTools (F12) -> Application -> Service Workers to monitor offline status.
- Shrink browser width to test the fluid mobile layout.
