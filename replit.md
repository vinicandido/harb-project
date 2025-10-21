# HARB Saúde e Bem-Estar - Project Documentation

## Overview
Portuguese-language landing page website for HARB Saúde e Bem-Estar, a medical equipment rental clinic specializing in aesthetic devices. The site features equipment showcases, benefit descriptions, rental process information, and a contact form.

## Project Structure
- **Frontend**: Static HTML/CSS/JavaScript website
- **Server**: Python simple HTTP server serving static files on port 5000
- **Dependencies**: Python 3.11+ with Pillow (managed via pyproject.toml and uv)
- **Assets**: Medical equipment images, logos, and graphics in `attached_assets/` directory

## Recent Changes
- **2025-10-21**: Completed Replit environment setup for GitHub import
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
