# HARB Saúde e Bem-Estar - Project Documentation

## Overview
Portuguese-language landing page website for HARB Saúde e Bem-Estar, a medical equipment rental clinic specializing in aesthetic devices. The site features equipment showcases, benefit descriptions, rental process information, and a contact form.

## Project Structure
- **Frontend**: Static HTML/CSS/JavaScript website
- **Server**: Python simple HTTP server serving static files on port 5000
- **Dependencies**: Python 3.11+ with Pillow (managed via pyproject.toml and uv)
- **Assets**: Medical equipment images, logos, and graphics in `attached_assets/` directory

## Recent Changes
- **2025-10-24**: 
  - **Product Gallery Slider Updated:**
    - Modified desktop gallery slider to display 3 images simultaneously (side-by-side)
    - Each slide now occupies 33.33% width on desktop (calc(100% / 3))
    - Navigation moves by 1/3 of container width per click
    - Mobile version unchanged - continues displaying 1 image at a time
    - Added padding between images (10px) for visual separation
    - Maintains infinite loop functionality and auto-scroll behavior
  - GitHub import successfully configured for Replit environment
  - Workflow "Server" verified running on port 5000 with webview output
  - Server bound to 0.0.0.0 with proper cache-control headers for Replit proxy compatibility
  - Deployment configured for autoscale (stateless web hosting)
  - All assets loading correctly, website fully functional
  - Import setup complete and ready for use
  - **Add-ons Section Added to Pricing Plans:**
    - Created professional add-ons section with blue gradient background matching pricing section
    - Two add-on cards with icons and descriptions:
      - "Operador Técnico" - qualified professional to operate equipment
      - "Locação Combinada" - combine equipment (e.g., Lavieen + Youlaser)
    - Fully responsive design: 2-column grid on desktop, single column on mobile
    - Cards feature white background with hover effects and blue circular icons
    - Section positioned between pricing plans and CTA button
    - Maintains consistent design with existing pricing section styling
  - **Included Features Notice Added:**
    - Added professional notice box before CTA button
    - Text: "Todos incluem: treinamento operacional, checklist de segurança, suporte técnico e orientação comercial"
    - Features semi-transparent white background with border and backdrop blur
    - Circular checkmark icon in white circle
    - Fully responsive: horizontal layout on desktop, vertical centered on mobile
    - Positioned between add-ons section and CTA button

- **2025-10-21**: 
  - Added WhatsApp CTA button in hero section with green gradient and WhatsApp icon
  - Created trust badge bar at end of hero section with full-width design
  - Trust seal shield icon positioned on the left with green glow effect
  - 4 key benefits displayed: Suporte Técnico, Logística Nacional, Contratos Sob Medida, Materiais & Checklists
  - Trust bar features blue background (#06112F) with white text and green accent icons
  - Mobile optimization: only trust seal displayed on mobile devices, text items hidden
  - Fully responsive design for both WhatsApp button and trust bar on mobile/tablet
  - Reduced header height for cleaner design (padding reduced and logo size decreased)
  - Hero section alignment adjusted for desktop - text and CTA button now left-aligned
  - Completed Replit environment setup for GitHub import
  - Configured workflow "Server" to run Python HTTP server on port 5000
  - Server properly configured with 0.0.0.0 binding and cache-control headers for Replit proxy
  - Deployment configured for autoscale (stateless web hosting)
  - Verified website loads correctly with all assets
  - Fixed .gitignore to track uv.lock file (required for reproducible builds)
  - Project ready for development and deployment
  - Added 4 benefit cards to "smart-investment" section with green check icons
  - Created new "pricing-plans" section featuring 3 rental plan options:
    - Plano Avulso: Flexible daily/weekly rentals for testing
    - Plano Trimestral: 3-month plan with R$ 900 savings (marked as "Mais Popular")
    - Plano Semestral: 6-month plan with R$ 1,200 savings
  - Section uses brand color #06112F as prominent background with gradient
  - Fully responsive design for desktop, tablet, and mobile
  - Added favicon.svg with brand "H" logo

## Key Features
- Responsive design with mobile navigation
- Multiple image sliders (hero section, equipment gallery)
- Contact form with CNPJ and phone number masking
- Smooth scroll navigation
- Auto-scrolling image carousels
- Animation effects on scroll

## Running the Project
The project runs automatically via the configured workflow:
- Command: `python3 server.py`
- Port: 5000 (frontend)
- Host: 0.0.0.0 (allows Replit proxy)

## Architecture
Simple static website architecture:
- No backend API or database
- Form submissions currently client-side only (console.log)
- All content is Portuguese language
- Designed for medical equipment rental business
