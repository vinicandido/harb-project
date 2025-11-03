// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Slider (Desktop)
const gallerySlider = document.getElementById('gallerySlider');
const galleryPrevBtn = document.querySelector('.gallery-slider-prev');
const galleryNextBtn = document.querySelector('.gallery-slider-next');

if (galleryPrevBtn && galleryNextBtn && gallerySlider) {
    const gallerySlides = gallerySlider.querySelectorAll('.gallery-slide');
    const galleryTotalSlides = gallerySlides.length;
    
    // Detectar se estamos em desktop (3 imagens por vez)
    const isDesktop = () => window.innerWidth >= 1025;
    const slidesToShow = () => isDesktop() ? 3 : 1;
    
    // Clone múltiplos slides para garantir loop suave
    // Clonar 3 primeiros slides no final
    for (let i = 0; i < 3; i++) {
        const clone = gallerySlides[i].cloneNode(true);
        gallerySlider.appendChild(clone);
    }
    
    // Clonar 3 últimos slides no início
    for (let i = galleryTotalSlides - 1; i >= galleryTotalSlides - 3; i--) {
        const clone = gallerySlides[i].cloneNode(true);
        gallerySlider.insertBefore(clone, gallerySlider.firstChild);
    }
    
    let galleryCurrentSlide = 3; // Começar após os 3 clones iniciais
    let isGalleryTransitioning = false;

    function updateGallerySlider(transition = true) {
        if (!transition) {
            gallerySlider.style.transition = 'none';
        } else {
            gallerySlider.style.transition = 'transform 0.5s ease-in-out';
        }
        const slideWidth = isDesktop() ? (100 / 3) : 100;
        const offset = -galleryCurrentSlide * slideWidth;
        gallerySlider.style.transform = `translateX(${offset}%)`;
        
        if (!transition) {
            gallerySlider.offsetHeight; // Force reflow
        }
    }

    function handleGalleryTransitionEnd(e) {
        if (e.propertyName !== 'transform') return;
        
        // Se chegamos nos clones do início (índices 0, 1, 2)
        if (galleryCurrentSlide <= 2) {
            galleryCurrentSlide = galleryTotalSlides + 2;
            updateGallerySlider(false);
        } 
        // Se chegamos nos clones do final (após os slides originais)
        else if (galleryCurrentSlide >= galleryTotalSlides + 3) {
            galleryCurrentSlide = 3;
            updateGallerySlider(false);
        }
        isGalleryTransitioning = false;
    }

    gallerySlider.addEventListener('transitionend', handleGalleryTransitionEnd);

    function nextGallerySlide() {
        if (isGalleryTransitioning) return;
        isGalleryTransitioning = true;
        galleryCurrentSlide++;
        updateGallerySlider(true);
    }

    function prevGallerySlide() {
        if (isGalleryTransitioning) return;
        isGalleryTransitioning = true;
        galleryCurrentSlide--;
        updateGallerySlider(true);
    }

    updateGallerySlider(false);

    galleryPrevBtn.addEventListener('click', prevGallerySlide);
    galleryNextBtn.addEventListener('click', nextGallerySlide);

    // Auto-scroll gallery slider
    let galleryAutoScrollInterval;
    
    function startGalleryAutoScroll() {
        clearInterval(galleryAutoScrollInterval);
        galleryAutoScrollInterval = setInterval(nextGallerySlide, 4000);
    }

    function stopGalleryAutoScroll() {
        clearInterval(galleryAutoScrollInterval);
    }

    startGalleryAutoScroll();

    gallerySlider.addEventListener('mouseenter', stopGalleryAutoScroll);
    gallerySlider.addEventListener('mouseleave', startGalleryAutoScroll);
    galleryPrevBtn.addEventListener('click', () => {
        stopGalleryAutoScroll();
        setTimeout(startGalleryAutoScroll, 10000);
    });
    galleryNextBtn.addEventListener('click', () => {
        stopGalleryAutoScroll();
        setTimeout(startGalleryAutoScroll, 10000);
    });

    // Atualizar ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateGallerySlider(false);
        }, 150);
    });

    // Touch/Swipe functionality for desktop gallery
    let galleryTouchStartX = 0;
    let galleryTouchEndX = 0;
    let isGalleryDragging = false;

    gallerySlider.addEventListener('touchstart', (e) => {
        galleryTouchStartX = e.changedTouches[0].screenX;
        isGalleryDragging = true;
        stopGalleryAutoScroll();
    }, { passive: true });

    gallerySlider.addEventListener('touchmove', (e) => {
        if (!isGalleryDragging) return;
        galleryTouchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallerySlider.addEventListener('touchend', (e) => {
        if (!isGalleryDragging) return;
        isGalleryDragging = false;
        galleryTouchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, { passive: true });

    function handleGallerySwipe() {
        const swipeThreshold = 50;
        const swipeDistance = galleryTouchStartX - galleryTouchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextGallerySlide();
            } else {
                prevGallerySlide();
            }
            setTimeout(startGalleryAutoScroll, 10000);
        }

        galleryTouchStartX = 0;
        galleryTouchEndX = 0;
    }
}

// Gallery Slider Mobile - COM LOOPING INFINITO REAL (scroll-based igual ao hero)
const gallerySliderMobile = document.getElementById('gallerySliderMobile');
const galleryMobilePrevBtn = document.querySelector('.gallery-slider-mobile-prev');
const galleryMobileNextBtn = document.querySelector('.gallery-slider-mobile-next');

if (gallerySliderMobile) {
    const galleryMobileSlides = Array.from(gallerySliderMobile.querySelectorAll('.gallery-slide'));
    const totalGallerySlides = galleryMobileSlides.length;
    
    // Clone first and last slides for infinite loop
    const firstGalleryClone = galleryMobileSlides[0].cloneNode(true);
    const lastGalleryClone = galleryMobileSlides[totalGallerySlides - 1].cloneNode(true);
    
    firstGalleryClone.classList.add('clone');
    lastGalleryClone.classList.add('clone');
    
    gallerySliderMobile.appendChild(firstGalleryClone);
    gallerySliderMobile.insertBefore(lastGalleryClone, galleryMobileSlides[0]);
    
    const gallerySlideWidth = gallerySliderMobile.clientWidth;
    let currentGalleryIndex = 1; // Start at first real slide
    
    // Set initial position
    gallerySliderMobile.scrollLeft = gallerySlideWidth;
    
    function goToGallerySlide(index, smooth = true) {
        gallerySliderMobile.scrollTo({
            left: index * gallerySlideWidth,
            behavior: smooth ? 'smooth' : 'auto'
        });
        currentGalleryIndex = index;
    }
    
    function nextGallerySlide() {
        currentGalleryIndex++;
        goToGallerySlide(currentGalleryIndex);
    }
    
    function prevGallerySlide() {
        currentGalleryIndex--;
        goToGallerySlide(currentGalleryIndex);
    }
    
    // Handle infinite loop - usando scroll com debounce
    let galleryScrollTimeout;
    gallerySliderMobile.addEventListener('scroll', () => {
        clearTimeout(galleryScrollTimeout);
        galleryScrollTimeout = setTimeout(() => {
            const scrollPosition = gallerySliderMobile.scrollLeft;
            const slidePosition = Math.round(scrollPosition / gallerySlideWidth);
            
            if (slidePosition === 0) {
                // At clone of last slide, jump to real last slide
                currentGalleryIndex = totalGallerySlides;
                gallerySliderMobile.scrollLeft = totalGallerySlides * gallerySlideWidth;
            } else if (slidePosition === totalGallerySlides + 1) {
                // At clone of first slide, jump to real first slide
                currentGalleryIndex = 1;
                gallerySliderMobile.scrollLeft = gallerySlideWidth;
            } else {
                currentGalleryIndex = slidePosition;
            }
        }, 150);
    });
    
    // Navigation buttons
    if (galleryMobilePrevBtn) {
        galleryMobilePrevBtn.addEventListener('click', () => {
            prevGallerySlide();
            stopGalleryMobileAutoScroll();
            setTimeout(startGalleryMobileAutoScroll, 10000);
        });
    }
    
    if (galleryMobileNextBtn) {
        galleryMobileNextBtn.addEventListener('click', () => {
            nextGallerySlide();
            stopGalleryMobileAutoScroll();
            setTimeout(startGalleryMobileAutoScroll, 10000);
        });
    }
    
    // Auto-scroll
    let galleryMobileAutoScrollInterval;
    
    function startGalleryMobileAutoScroll() {
        clearInterval(galleryMobileAutoScrollInterval);
        galleryMobileAutoScrollInterval = setInterval(nextGallerySlide, 4000);
    }
    
    function stopGalleryMobileAutoScroll() {
        clearInterval(galleryMobileAutoScrollInterval);
    }
    
    startGalleryMobileAutoScroll();
    
    gallerySliderMobile.addEventListener('mouseenter', stopGalleryMobileAutoScroll);
    gallerySliderMobile.addEventListener('mouseleave', startGalleryMobileAutoScroll);
    
    // Touch/Swipe functionality
    let galleryMobileTouchStartX = 0;
    let galleryMobileTouchEndX = 0;
    let isGalleryMobileDragging = false;
    
    gallerySliderMobile.addEventListener('touchstart', (e) => {
        galleryMobileTouchStartX = e.changedTouches[0].screenX;
        isGalleryMobileDragging = true;
        stopGalleryMobileAutoScroll();
    }, { passive: true });
    
    gallerySliderMobile.addEventListener('touchmove', (e) => {
        if (!isGalleryMobileDragging) return;
        galleryMobileTouchEndX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    gallerySliderMobile.addEventListener('touchend', (e) => {
        if (!isGalleryMobileDragging) return;
        isGalleryMobileDragging = false;
        galleryMobileTouchEndX = e.changedTouches[0].screenX;
        handleGalleryMobileSwipe();
    }, { passive: true });
    
    function handleGalleryMobileSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = galleryMobileTouchStartX - galleryMobileTouchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left - next
                nextGallerySlide();
            } else {
                // Swipe right - prev
                prevGallerySlide();
            }
            setTimeout(startGalleryMobileAutoScroll, 10000);
        }
        
        galleryMobileTouchStartX = 0;
        galleryMobileTouchEndX = 0;
    }
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // CNPJ Mask
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    // Phone Mask
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
            }
            e.target.value = value;
        });
    }

    // Form Submit
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            empresa: document.getElementById('empresa').value,
            cnpj: document.getElementById('cnpj').value,
            termos: document.getElementById('termos').checked
        };

        // Validate
        if (!formData.termos) {
            alert('Por favor, aceite os termos de uso e política de privacidade.');
            return;
        }

        // Show success message
        alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
        
        // Reset form
        contactForm.reset();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // In a real application, you would send this data to a server
        console.log('Form Data:', formData);
    });
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.benefit-card, .kit-card, .revenue-card, .testimonial-block, .process-step');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// WhatsApp Button (optional - can be added to HTML)
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5511999999999'; // Replace with actual WhatsApp number
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.target = '_blank';
    whatsappBtn.title = 'Fale conosco no WhatsApp';
    
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .whatsapp-float:hover {
            background-color: #128C7E;
            transform: scale(1.1);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappBtn);
}

// Uncomment to enable WhatsApp button
// createWhatsAppButton();

// Efeito de tremor nos botões para tablet e mobile
document.addEventListener('DOMContentLoaded', () => {
    // Apenas em dispositivos tablet e mobile (max-width: 1024px)
    if (window.innerWidth <= 1024) {
        const buttons = document.querySelectorAll('.btn, .cta-btn');
        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('btn-shaken')) {
                    entry.target.classList.add('btn-shake');
                    entry.target.classList.add('btn-shaken');
                    
                    // Remover a classe de animação após terminar
                    setTimeout(() => {
                        entry.target.classList.remove('btn-shake');
                    }, 500);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        buttons.forEach(btn => {
            buttonObserver.observe(btn);
        });
    }
});

// Hero Slider (Desktop)
const heroSlider = document.getElementById('heroSlider');
const heroPrevBtn = document.querySelector('.hero-slider-prev');
const heroNextBtn = document.querySelector('.hero-slider-next');

if (heroPrevBtn && heroNextBtn && heroSlider) {
    const heroSlides = heroSlider.querySelectorAll('.hero-slide');
    const heroTotalSlides = heroSlides.length;
    
    // Clone first and last slides for infinite loop
    const firstClone = heroSlides[0].cloneNode(true);
    const lastClone = heroSlides[heroTotalSlides - 1].cloneNode(true);
    
    heroSlider.appendChild(firstClone);
    heroSlider.insertBefore(lastClone, heroSlides[0]);
    
    let heroCurrentSlide = 1;
    let isTransitioning = false;

    function updateHeroSlider(transition = true) {
        if (!transition) {
            heroSlider.style.transition = 'none';
        } else {
            heroSlider.style.transition = 'transform 0.5s ease-in-out';
        }
        const offset = -heroCurrentSlide * 100;
        heroSlider.style.transform = `translateX(${offset}%)`;
        
        if (!transition) {
            heroSlider.offsetHeight; // Force reflow
        }
    }

    function handleTransitionEnd(e) {
        if (e.propertyName !== 'transform') return;
        
        if (heroCurrentSlide === 0) {
            heroCurrentSlide = heroTotalSlides;
            updateHeroSlider(false);
        } else if (heroCurrentSlide === heroTotalSlides + 1) {
            heroCurrentSlide = 1;
            updateHeroSlider(false);
        }
        isTransitioning = false;
    }

    heroSlider.addEventListener('transitionend', handleTransitionEnd);

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        heroCurrentSlide++;
        updateHeroSlider(true);
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        heroCurrentSlide--;
        updateHeroSlider(true);
    }

    updateHeroSlider(false);

    heroPrevBtn.addEventListener('click', prevSlide);
    heroNextBtn.addEventListener('click', nextSlide);

    // Auto-scroll hero slider
    let heroAutoScrollInterval;
    
    function startHeroAutoScroll() {
        clearInterval(heroAutoScrollInterval);
        heroAutoScrollInterval = setInterval(nextSlide, 4000);
    }

    function stopHeroAutoScroll() {
        clearInterval(heroAutoScrollInterval);
    }

    startHeroAutoScroll();

    heroSlider.addEventListener('mouseenter', stopHeroAutoScroll);
    heroSlider.addEventListener('mouseleave', startHeroAutoScroll);
    heroPrevBtn.addEventListener('click', () => {
        stopHeroAutoScroll();
        setTimeout(startHeroAutoScroll, 10000);
    });
    heroNextBtn.addEventListener('click', () => {
        stopHeroAutoScroll();
        setTimeout(startHeroAutoScroll, 10000);
    });
}

// Hero Slider Mobile - COM LOOPING INFINITO REAL
const heroSliderMobile = document.getElementById('heroSliderMobile');
const heroMobilePrevBtn = document.querySelector('.hero-slider-mobile-prev');
const heroMobileNextBtn = document.querySelector('.hero-slider-mobile-next');

if (heroSliderMobile) {
    const heroMobileSlides = Array.from(heroSliderMobile.querySelectorAll('.hero-slide'));
    const totalSlides = heroMobileSlides.length;
    
    // Clone first and last slides for infinite loop
    const firstClone = heroMobileSlides[0].cloneNode(true);
    const lastClone = heroMobileSlides[totalSlides - 1].cloneNode(true);
    
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    
    heroSliderMobile.appendChild(firstClone);
    heroSliderMobile.insertBefore(lastClone, heroMobileSlides[0]);
    
    const slideWidth = heroSliderMobile.clientWidth;
    let currentIndex = 1; // Start at first real slide
    
    // Set initial position
    heroSliderMobile.scrollLeft = slideWidth;
    
    function goToSlide(index, smooth = true) {
        heroSliderMobile.scrollTo({
            left: index * slideWidth,
            behavior: smooth ? 'smooth' : 'auto'
        });
        currentIndex = index;
    }
    
    function nextSlide() {
        currentIndex++;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex--;
        goToSlide(currentIndex);
    }
    
    // Handle infinite loop - usando scroll com debounce
    let scrollTimeout;
    heroSliderMobile.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = heroSliderMobile.scrollLeft;
            const slidePosition = Math.round(scrollPosition / slideWidth);
            
            if (slidePosition === 0) {
                // At clone of last slide, jump to real last slide
                currentIndex = totalSlides;
                heroSliderMobile.scrollLeft = totalSlides * slideWidth;
            } else if (slidePosition === totalSlides + 1) {
                // At clone of first slide, jump to real first slide
                currentIndex = 1;
                heroSliderMobile.scrollLeft = slideWidth;
            } else {
                currentIndex = slidePosition;
            }
        }, 150);
    });
    
    // Navigation buttons
    if (heroMobilePrevBtn) {
        heroMobilePrevBtn.addEventListener('click', () => {
            prevSlide();
            stopHeroMobileAutoScroll();
            setTimeout(startHeroMobileAutoScroll, 10000);
        });
    }
    
    if (heroMobileNextBtn) {
        heroMobileNextBtn.addEventListener('click', () => {
            nextSlide();
            stopHeroMobileAutoScroll();
            setTimeout(startHeroMobileAutoScroll, 10000);
        });
    }
    
    // Auto-scroll
    let heroMobileAutoScrollInterval;
    
    function startHeroMobileAutoScroll() {
        clearInterval(heroMobileAutoScrollInterval);
        heroMobileAutoScrollInterval = setInterval(nextSlide, 4000);
    }
    
    function stopHeroMobileAutoScroll() {
        clearInterval(heroMobileAutoScrollInterval);
    }
    
    startHeroMobileAutoScroll();
    
    heroSliderMobile.addEventListener('mouseenter', stopHeroMobileAutoScroll);
    heroSliderMobile.addEventListener('mouseleave', startHeroMobileAutoScroll);
    
    // Touch/Swipe functionality
    let heroMobileTouchStartX = 0;
    let heroMobileTouchEndX = 0;
    let isHeroMobileDragging = false;
    
    heroSliderMobile.addEventListener('touchstart', (e) => {
        heroMobileTouchStartX = e.changedTouches[0].screenX;
        isHeroMobileDragging = true;
        stopHeroMobileAutoScroll();
    }, { passive: true });
    
    heroSliderMobile.addEventListener('touchmove', (e) => {
        if (!isHeroMobileDragging) return;
        heroMobileTouchEndX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    heroSliderMobile.addEventListener('touchend', (e) => {
        if (!isHeroMobileDragging) return;
        isHeroMobileDragging = false;
        heroMobileTouchEndX = e.changedTouches[0].screenX;
        handleHeroMobileSwipe();
    }, { passive: true });
    
    function handleHeroMobileSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = heroMobileTouchStartX - heroMobileTouchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - prev
                prevSlide();
            }
            setTimeout(startHeroMobileAutoScroll, 10000);
        }
        
        heroMobileTouchStartX = 0;
        heroMobileTouchEndX = 0;
    }
}

// Testimonials Slider (Desktop only - >1024px)
const testimonialsSlider = document.getElementById('testimonialsSlider');
const testimonialsPrevBtn = document.querySelector('.testimonials-slider-prev');
const testimonialsNextBtn = document.querySelector('.testimonials-slider-next');

if (testimonialsPrevBtn && testimonialsNextBtn && testimonialsSlider && window.innerWidth > 1024) {
    const testimonialsSlides = testimonialsSlider.querySelectorAll('.testimonial-slide');
    const testimonialsTotalSlides = testimonialsSlides.length;
    
    // Clone first 3 and last 3 slides for infinite loop (for desktop 3-card view)
    const firstClone1 = testimonialsSlides[0].cloneNode(true);
    const firstClone2 = testimonialsSlides[1].cloneNode(true);
    const firstClone3 = testimonialsSlides[2].cloneNode(true);
    const lastClone1 = testimonialsSlides[testimonialsTotalSlides - 1].cloneNode(true);
    const lastClone2 = testimonialsSlides[testimonialsTotalSlides - 2].cloneNode(true);
    const lastClone3 = testimonialsSlides[testimonialsTotalSlides - 3].cloneNode(true);
    
    testimonialsSlider.appendChild(firstClone1);
    testimonialsSlider.appendChild(firstClone2);
    testimonialsSlider.appendChild(firstClone3);
    testimonialsSlider.insertBefore(lastClone1, testimonialsSlides[0]);
    testimonialsSlider.insertBefore(lastClone2, testimonialsSlides[0]);
    testimonialsSlider.insertBefore(lastClone3, testimonialsSlides[0]);
    
    let testimonialsCurrentSlide = 3;
    let isTestimonialsTransitioning = false;

    function getSlideWidth() {
        return window.innerWidth > 1024 ? 33.333 : 100;
    }

    function updateTestimonialsSlider(transition = true) {
        if (!transition) {
            testimonialsSlider.style.transition = 'none';
        } else {
            testimonialsSlider.style.transition = 'transform 0.5s ease-in-out';
        }
        const slideWidth = getSlideWidth();
        const offset = -testimonialsCurrentSlide * slideWidth;
        testimonialsSlider.style.transform = `translateX(${offset}%)`;
        
        if (!transition) {
            testimonialsSlider.offsetHeight; // Force reflow
        }
    }

    function handleTestimonialsTransitionEnd(e) {
        if (e.propertyName !== 'transform') return;
        
        if (testimonialsCurrentSlide <= 2) {
            testimonialsCurrentSlide = testimonialsTotalSlides + 2;
            updateTestimonialsSlider(false);
        } else if (testimonialsCurrentSlide >= testimonialsTotalSlides + 3) {
            testimonialsCurrentSlide = 3;
            updateTestimonialsSlider(false);
        }
        isTestimonialsTransitioning = false;
    }

    testimonialsSlider.addEventListener('transitionend', handleTestimonialsTransitionEnd);

    function nextTestimonialsSlide() {
        if (isTestimonialsTransitioning) return;
        isTestimonialsTransitioning = true;
        testimonialsCurrentSlide++;
        updateTestimonialsSlider(true);
    }

    function prevTestimonialsSlide() {
        if (isTestimonialsTransitioning) return;
        isTestimonialsTransitioning = true;
        testimonialsCurrentSlide--;
        updateTestimonialsSlider(true);
    }

    updateTestimonialsSlider(false);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 1024) {
                updateTestimonialsSlider(false);
            }
        }, 100);
    });

    testimonialsPrevBtn.addEventListener('click', prevTestimonialsSlide);
    testimonialsNextBtn.addEventListener('click', nextTestimonialsSlide);

    // Auto-scroll testimonials slider
    let testimonialsAutoScrollInterval;
    
    function startTestimonialsAutoScroll() {
        clearInterval(testimonialsAutoScrollInterval);
        testimonialsAutoScrollInterval = setInterval(nextTestimonialsSlide, 4000);
    }

    function stopTestimonialsAutoScroll() {
        clearInterval(testimonialsAutoScrollInterval);
    }

    startTestimonialsAutoScroll();

    testimonialsSlider.addEventListener('mouseenter', stopTestimonialsAutoScroll);
    testimonialsSlider.addEventListener('mouseleave', startTestimonialsAutoScroll);
    testimonialsPrevBtn.addEventListener('click', () => {
        stopTestimonialsAutoScroll();
        setTimeout(startTestimonialsAutoScroll, 10000);
    });
    testimonialsNextBtn.addEventListener('click', () => {
        stopTestimonialsAutoScroll();
        setTimeout(startTestimonialsAutoScroll, 10000);
    });

    // Touch/Swipe functionality for testimonials
    let testimonialsTouchStartX = 0;
    let testimonialsTouchEndX = 0;
    let isTestimonialsDragging = false;

    testimonialsSlider.addEventListener('touchstart', (e) => {
        testimonialsTouchStartX = e.changedTouches[0].screenX;
        isTestimonialsDragging = true;
        stopTestimonialsAutoScroll();
    }, { passive: true });

    testimonialsSlider.addEventListener('touchmove', (e) => {
        if (!isTestimonialsDragging) return;
        testimonialsTouchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsSlider.addEventListener('touchend', (e) => {
        if (!isTestimonialsDragging) return;
        isTestimonialsDragging = false;
        testimonialsTouchEndX = e.changedTouches[0].screenX;
        handleTestimonialsSwipe();
    }, { passive: true });

    function handleTestimonialsSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = testimonialsTouchStartX - testimonialsTouchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextTestimonialsSlide();
            } else {
                prevTestimonialsSlide();
            }
            setTimeout(startTestimonialsAutoScroll, 10000);
        }

        testimonialsTouchStartX = 0;
        testimonialsTouchEndX = 0;
    }
}

// Testimonials Slider Mobile/Tablet - Looping infinito com scroll nativo
if (testimonialsSlider && window.innerWidth <= 1024) {
    const testimonialsSlidesArray = Array.from(testimonialsSlider.querySelectorAll('.testimonial-slide'));
    const totalTestimonialsSlides = testimonialsSlidesArray.length;
    
    // Clone first and last slides for infinite loop
    const firstTestimonialsClone = testimonialsSlidesArray[0].cloneNode(true);
    const lastTestimonialsClone = testimonialsSlidesArray[totalTestimonialsSlides - 1].cloneNode(true);
    
    firstTestimonialsClone.classList.add('clone');
    lastTestimonialsClone.classList.add('clone');
    
    testimonialsSlider.appendChild(firstTestimonialsClone);
    testimonialsSlider.insertBefore(lastTestimonialsClone, testimonialsSlidesArray[0]);
    
    const testimonialsSlideWidth = testimonialsSlider.clientWidth;
    let currentTestimonialsIndex = 1; // Start at first real slide
    
    // Set initial position
    testimonialsSlider.scrollLeft = testimonialsSlideWidth;
    
    // Handle infinite loop - usando scroll com debounce
    let testimonialsScrollTimeout;
    testimonialsSlider.addEventListener('scroll', () => {
        clearTimeout(testimonialsScrollTimeout);
        testimonialsScrollTimeout = setTimeout(() => {
            const scrollPosition = testimonialsSlider.scrollLeft;
            const slidePosition = Math.round(scrollPosition / testimonialsSlideWidth);
            
            if (slidePosition === 0) {
                // At clone of last slide, jump to real last slide
                currentTestimonialsIndex = totalTestimonialsSlides;
                testimonialsSlider.scrollLeft = totalTestimonialsSlides * testimonialsSlideWidth;
            } else if (slidePosition === totalTestimonialsSlides + 1) {
                // At clone of first slide, jump to real first slide
                currentTestimonialsIndex = 1;
                testimonialsSlider.scrollLeft = testimonialsSlideWidth;
            } else {
                currentTestimonialsIndex = slidePosition;
            }
        }, 150);
    });
}
const links = document.querySelectorAll('a[data-plano]');
const mensagem = document.getElementById('mensagem');

links.forEach(link => {
  link.addEventListener('click', event => {
    // Captura o nome do plano
    const plano = link.getAttribute('data-plano');

    // Preenche o campo do formulário
    mensagem.value = `Olá! Tenho interesse no plano ${plano}. Poderia me passar mais informações?`;

    // Foca o campo (depois da rolagem suave)
    setTimeout(() => mensagem.focus(), 500);
  });
});