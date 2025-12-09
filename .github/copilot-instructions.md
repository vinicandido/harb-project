<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->
# Copilot instructions for Clínica HARB (concise)

These notes are targeted at AI coding agents (Copilot-style) to become productive quickly in this repository.

**Big Picture**:
- **Repo type**: Static marketing site (HTML/CSS/JS) with a tiny Python dev server (`server.py`) used to serve files locally.
- **Primary entry**: `index.html` is the single-page site. Most behavior is in `script.js` and styling in `style.css`.
- **Assets**: Images and media live under `attached_assets/`, `cards/`, `img-prices/`.

**How to run locally**:
- **Start dev server**: run `python3 server.py` — server listens on port `5000` and serves repository root.
- No build step or bundler; changes to `index.html`, `script.js`, or `style.css` are reflected after refresh.

**Key files to inspect for behavior**:
- `index.html` — markup and IDs/classes relied on by JS (e.g. `#heroSlider`, `#heroSliderMobile`, `#gallerySlider`, `#contactForm`).
- `script.js` — slider implementations, form masks, scroll animations. Many features depend on specific class names (e.g. `.hero-slide`, `.gallery-slide`).
- `style.css` — long stylesheet using CSS variables in `:root`. Keep changes to spacing/variables consistent with the theme.
- `server.py` — small `http.server` wrapper; it sets cache-busting headers in `end_headers()`; do not remove those headers if local development depends on immediate reloads.
- `pyproject.toml` — minimal; lists `pillow` but the site itself is static (Pillow may be used by auxiliary scripts outside this repo).

**Project-specific conventions & gotchas**:
- Slider logic clones nodes heavily (desktop sliders clone first/last N slides). When adding/removing slides, update both desktop and mobile slider markup (`#heroSlider` and `#heroSliderMobile`) and ensure cloned-index math in `script.js` remains valid.
- Mobile vs desktop behavior: JS often branches on `window.innerWidth` (thresholds like `1024` or `1025`). Test responsive behavior when changing sizes.
- Form code is present but submission is commented out in `script.js`. If enabling submission, keep the existing input `id`s: `nome`, `telefone`, `email`, `empresa`, `cnpj`, `termos`.
- Image filenames include spaces and special characters (e.g. in `index.html`); prefer using URL-encoded or simplified names when adding new assets.
- CSS imports Google Fonts with a slightly malformed `@import` line — review before changing fonts.

**Common change examples** (copy-paste friendly):
- Add a hero image: insert a new `<div class="hero-slide"><img src="attached_assets/your-image.png" alt="..."/></div>` into both `#heroSlider` and `#heroSliderMobile`.
- Add a new pricing plan button: follow existing `.plan-card` markup inside `#pricing-plans` and include `data-plano="YourPlan"` on the anchor to keep tracking consistent.
- Enable form submission (dev): uncomment the `contactForm.addEventListener('submit'...)` block in `script.js` and adapt the handler to POST to your backend. Currently the code logs `formData`.

**Testing & debugging tips**:
- Use `python3 server.py` and open `http://localhost:5000/` (or the printed host). Use browser devtools to inspect DOM nodes that `script.js` expects.
- When debugging sliders, set breakpoints inside `script.js` functions like `updateHeroSlider()` or `handleGalleryTransitionEnd` — cloned nodes can make index math tricky.
- If CSS changes seem not to apply, check `server.py` cache-control headers are present (they disable caching by default).

**When to ask for human input**:
- Adding or removing slider cloning logic (non-trivial index math).
- Changing global layout breakpoints (e.g., switching mobile breakpoint from 1024 to 768) — this affects multiple JS branches.
- Replacing image assets that contain spaces or special characters — confirm desired filenames and update `index.html`.

If any part of this guidance is unclear or you want deeper examples (unit tests, CI, or a small Node tooling pipeline), tell me which area to expand.
