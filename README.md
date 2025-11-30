# Mastery Dental - Professional Dental Clinic Website

A modern, professional dentist clinic website built with React, Tailwind CSS, and Framer Motion. Features a complete light/dark mode theme system, smooth animations, and a fully responsive design.

## Features

- ✅ **Full Light/Dark Mode** - Smooth theme transitions with custom color scheme
- ✅ **Sticky Navigation** - Glass-morphism header with smooth scroll behavior
- ✅ **Animated Statistics** - Counter animations with scroll-triggered effects
- ✅ **Responsive Design** - Mobile-first approach with hamburger menu
- ✅ **Smooth Animations** - Framer Motion animations throughout
- ✅ **Modern UI** - Professional design with Tailwind CSS

## Color Scheme

### Light Mode
- Primary: Medical Purple `hsl(262, 52%, 47%)`
- Secondary: Clean White-Blue `hsl(220, 25%, 95%)`
- Accent: Trust Blue `hsl(199, 89%, 48%)`
- Muted: Neutral Gray `hsl(240, 10%, 85%)`

### Dark Mode
- Primary: `hsl(262, 65%, 60%)`
- Secondary: `hsl(220, 15%, 20%)`
- Accent: `hsl(199, 89%, 58%)`
- Muted: `hsl(240, 5%, 40%)`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation bar with theme toggle
│   ├── HeroSection.jsx         # Hero section with CTAs
│   ├── StatisticsSection.jsx  # Animated statistics counters
│   ├── RatingsSection.jsx      # Patient ratings display
│   ├── TreatmentsSection.jsx  # Services grid
│   └── Footer.jsx             # Footer with contact info
├── contexts/
│   └── ThemeContext.jsx       # Theme provider and context
├── styles/
│   └── globals.css            # Global styles and Tailwind imports
├── App.jsx                    # Main app component
└── main.jsx                   # Entry point
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Sections

1. **Header** - Sticky navigation with logo, menu items, and theme toggle
2. **Hero Section** - Welcome section with background image and CTAs
3. **Statistics** - Animated counters showing clinic achievements
4. **Ratings** - Patient review ratings with verification badge
5. **Treatments** - Grid of dental services with icons
6. **Footer** - Contact information and quick links

## Customization

To customize the clinic name, update:
- `src/components/Header.jsx` - Logo text
- `src/components/HeroSection.jsx` - Hero heading
- `src/components/Footer.jsx` - Footer branding
- `index.html` - Page title

## License

MIT

