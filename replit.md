# Landing Page HARB - Clone Personalizado

## Overview
This project is a custom-designed landing page for HARB Saúde e Bem-estar. Its primary purpose is to promote HARB's technology rental services, focusing on aesthetic laser equipment. The page aims to drive lead generation through a contact form and clearly communicate the benefits of HARB's "Intelligent Rental with Integrated Management" model. The project's ambition is to effectively market high-end aesthetic technology rentals, positioning HARB as a key partner for clinics seeking growth and increased revenue.

## User Preferences
- The user wants the agent to adhere strictly to the provided design specifications, including color palettes, font sizes, and responsive behaviors.
- The user prefers clear and concise explanations for any proposed changes or decisions.
- The user prefers an iterative development approach, focusing on implementing one section or feature at a time for review.
- The user wants to avoid auto-scrolling features unless explicitly requested.
- The user emphasizes precise control over image dimensions and spacing, especially within galleries.
- The user expects the agent to prioritize custom SVG icons and consistent use of brand identity elements.

## System Architecture
The landing page is built using HTML5 for structure, CSS3 with custom properties for styling, and vanilla JavaScript (ES6+) for interactive functionalities.

### UI/UX Decisions
- **Brand Identity**: Custom HARB logo and a defined color palette (`Primary: #06112F`, `Secondary: #06112F`, `Background: #F0F0F0`) are consistently applied.
- **Unified Design**: A consistent light gray background (`#F0F0F0`) is used across all sections.
- **Responsive Design**: The layout is fully responsive with specific breakpoints for Desktop (> 1024px), Tablet (768px - 1024px), and Mobile (< 767px). Desktop enhancements include progressive enlargement of header elements, wider containers, and increased font sizes.
- **Interactive Elements**: Buttons feature gradient linear fills and hover effects. Cards include hover effects.
- **Animations**: Smooth scroll for anchor links, fade-in elements on scroll (IntersectionObserver), and a "shake" effect for CTA buttons on tablet/mobile when in viewport.

### Technical Implementations
- **HTML Structure**: Semantic HTML5 is used (`index.html`).
- **CSS Styling**: `style.css` manages responsive design using media queries and CSS variables.
- **JavaScript Functionality**: `script.js` handles:
    - **Mobile Navigation**: Hamburger menu toggle.
    - **Sliders**: Infinite circular sliders for Hero, Product Gallery, and Testimonials. These feature auto-scroll (4s, pause on hover/touch), manual navigation (arrows on desktop, swipe on touch devices), and clone-based looping for seamless transitions.
    - **Product Gallery Specifics**: Uses transform-based approach for desktop and scroll-based with clones for mobile/tablet for native drag feedback.
    - **Contact Form**: Includes input masks (CNPJ, phone), validation for terms, and submission feedback.

### Feature Specifications
- **Header**: Responsive HARB logo, desktop navigation, "Falar com especialista" CTA.
- **Hero Section**: Dynamic title with an infinite circular slider.
- **Benefits Section**: Badge, title, description, and 4 cards detailing HARB's advantages.
- **Product Gallery**: Infinite circular slider displaying equipment.
- **Intelligent Investment Section**: Highlights cost-saving benefits with custom SVG icons.
- **Intelligent Rental HSB™ Section**: Details HARB's rental model with a rocket icon and benefit cards.
- **National Delivery Section**: Emphasizes nationwide delivery and flexible contracts.
- **Simulation CTA Section**: Dark blue gradient section acting as a call-to-action to the form.
- **Process Section**: Step-by-step guide with 6 cards, each with a custom SVG icon.
- **Testimonials Section**: Infinite circular slider displaying customer reviews with auto-scroll and navigation.
- **Form Section**: Lead capture form with custom validation, updated title, and button text, with an animated scroll indicator.
- **Footer**: Legal information and HARB logo.

## External Dependencies
- **Google Fonts**: Poppins font.
- **Images**: Product images from an external server; HARB logo stored locally in `attached_assets/`.
- **Server**: Python HTTP Server for local development.
- **Form Submission**: Configured for demonstration (console.log); designed for API integration in production.

## Replit Environment Setup
- **Server**: Python 3 HTTP server (`server.py`) configured to serve static files on port 5000 with cache-control headers
- **Workflow**: Configured to run `python3 server.py` on port 5000 with webview output
- **Deployment**: Autoscale deployment configured for production (stateless website)
- **Dependencies**: Python 3.11+ with Pillow library (managed via pyproject.toml)
- **Assets**: All images stored in `attached_assets/` directory

## Recent Changes

### October 17, 2025 - Replit Environment Setup
**Changes Made:**
- Added `server.py` - Python HTTP server with cache-control headers to prevent caching issues
- Added `.gitignore` - Configured for Python, UV, and Replit environment files
- Configured workflow to serve website on port 5000
- Set up autoscale deployment configuration for production
- Verified all assets load correctly and website is fully functional

### October 17, 2025 - Testimonials Slider Complete Implementation
**Changes Made:**
- **Desktop Display (>1024px)**: Shows 3 testimonial cards side-by-side (33.333% width each) with transform-based slider
- **Mobile/Tablet Display (≤1024px)**: Shows 1 card at a time using native scroll-snap behavior
- **Uniform Card Heights**: All cards have min-height of 280px with flexbox for consistent sizing
- **Clone-based Looping**: Uses 3 clones on each side for seamless infinite loop on desktop
- **JavaScript Optimization**: Slider logic only executes on screens >1024px; mobile/tablet use pure CSS scroll
- **CSS Override**: Added `transform: none !important` in mobile/tablet breakpoints to prevent JavaScript conflicts
- **Anti-Lock Protection**: Applied to all sliders (Hero, Gallery, Testimonials) - filters transitionend events by property name and adds 600ms safety timeout
- **Mobile/Tablet Fix**: Cards now display correctly on all screen sizes with proper scroll-snap behavior