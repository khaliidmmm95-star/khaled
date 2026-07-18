const portfolioData = [
    { id: 1, titleEn: 'Social Media Reel', titleAr: 'ريل سوشيال ميديا', category: 'All Works', googleId: '1vnV5SyCzvfFUH6y5B7uY1R-3YssBPZn6', thumbnail: '1Abg9SmTVzHPpvYkIJRFLej8b2fKIRdz-', duration: '0:26', views: '128K' },
    { id: 2, titleEn: 'Social Media Reel', titleAr: 'ريل سوشيال ميديا', category: 'All Works', googleId: '1tI_FVZopFHhHg1_3y_7wAeugwm9VF5Ck', thumbnail: '1zHYowiIvPoDK84zdOMNn3fsdKltJ7tX1', duration: '0:42', views: '2.5M' },
    { id: 3, titleEn: 'Social Media Reel', titleAr: 'ريل سوشيال ميديا', category: 'All Works', googleId: '1JAF0oyeTNBptp03HypCYddRwVt1a2AP7', thumbnail: '13RjHd3_HQsmcleLSLOLazlcVFhzobFpl', duration: '0:47', views: '564K' },
    { id: 4, titleEn: 'Social Media Reel', titleAr: 'ريل سوشيال ميديا', category: 'All Works', googleId: '1X_I9y_lRCw52I0K_6KVEbOjzng4FbQ8H', thumbnail: '1nCJe-Bc2Cg4zw9z5NLkDtHhVpUS053lT', duration: '0:13', views: '45K' },
    { id: 5, titleEn: 'Social Media Reel', titleAr: 'ريل سوشيال ميديا', category: 'All Works', googleId: '1PX5i5Zy3tnH5N9vclKwIhytU3aUmSfvW', thumbnail: '1CVE5fyOl5OrfmOQ4-24xvE2vTj2PAAC3', duration: '1:40', views: '89K' },
];

// Optional: load videos automatically from a Google Drive folder.
// To enable: set `apiKey` and `folderId` below (Drive API v3 must be enabled for your project).
// If not set, the static `portfolioData` above will be used.
const googleDriveConfig = {
    apiKey: '', // <-- Put your Google API key here (optional)
    folderId: '' // <-- Put a public/shared Drive folder ID here (optional)
};

async function fetchVideosFromDrive() {
    if (!googleDriveConfig.apiKey || !googleDriveConfig.folderId) {
        return;
    }

    try {
        const q = `'${googleDriveConfig.folderId}' in parents and mimeType contains 'video/' and trashed = false`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,thumbnailLink,mimeType)&pageSize=100&key=${googleDriveConfig.apiKey}`;
        const res = await fetch(url);
        if (!res.ok) {
            console.warn('Drive API request failed', res.status, await res.text());
            return;
        }

        const data = await res.json();
        if (!data.files || !data.files.length) {
            console.info('No video files found in the specified Drive folder.');
            return;
        }

        // Replace portfolioData contents with files from Drive
        const newItems = data.files.map((f, idx) => ({
            id: 1000 + idx,
            titleEn: f.name,
            titleAr: f.name,
            category: 'social',
            googleId: f.id,
            thumbnail: f.thumbnailLink || 'https://via.placeholder.com/1280x720?text=Video',
            duration: '–',
            views: ''
        }));

        portfolioData.length = 0;
        portfolioData.push(...newItems);
        console.info(`Loaded ${newItems.length} videos from Google Drive folder.`);
    } catch (err) {
        console.error('Error fetching videos from Google Drive:', err);
    }
}

const translations = {
    en: {
        pageTitle: 'Visuals By Khaled',
        navHome: 'Home',
        navPortfolio: 'Portfolio',
        navServices: 'Services',
        navContact: 'Contact',
        heroTitle: 'Scouting for Visual <span>Masterpieces</span><br>Shaping Raw Footage Into <span>High-Retention Cinema</span>',
        heroSubtitle: 'Premium video editing, motion design, and cinematic storytelling for brands that demand excellence',
        heroButton: 'Watch Showreel',
        featuredSectionTitle: 'Latest Masterpiece',
        featuredTitle: 'Cinematic Travel Vlog',
        featuredDescription: 'Experience the magic of premium video editing and motion design. Watch how raw footage transforms into cinematic storytelling.',
        portfolioTitle: 'Video Masterpieces',
        portfolioSubtitle: 'Explore our collection of premium video productions, motion graphics, and cinematic content.',
        filterAll: 'All Works',
        filterCommercials: 'Commercials',
        filterMusic: 'Music Videos',
        filterSocial: 'Social Media',
        filterDesign: 'Graphic Design',
        capabilitiesTitle: 'Capabilities & Services',
        serviceOneTitle: 'Creative Direction',
        serviceOneDescription: 'Conceptualize and execute bold creative visions. From storyboarding to final delivery, crafting narratives that captivate and convert.',
        serviceTwoTitle: 'Advanced Post-Production',
        serviceTwoDescription: 'Color grading, advanced VFX, sound design, and meticulous attention to detail. Transforming raw footage into polished cinema.',
        serviceThreeTitle: 'Motion Graphics',
        serviceThreeDescription: 'High-retention motion design, kinetic typography, and animated explainers. Making static ideas dynamic and unforgettable.',
        softwareTitle: 'Software & Tools',
        impactTitle: 'Impact & Results',
        viewsLabel: 'Views Generated',
        brandsLabel: 'Brands Scaled',
        projectsLabel: 'Projects Delivered',
        testimonialsTitle: 'Client Testimonials',
        testimonialOneText: '"Their creative direction transformed our brand narrative. The result was a 300% increase in engagement."',
        testimonialOneRole: 'Marketing Director, Tech Startup',
        testimonialTwoText: '"The quality of motion design was exceptional. Every frame felt intentional and impactful."',
        testimonialTwoRole: 'Creative Lead, Fashion Brand',
        testimonialThreeText: '"Professional, responsive, and delivered beyond expectations. Highly recommend for premium projects."',
        testimonialThreeRole: 'CEO, Production Company',
        contactTitle: 'Contact & WhatsApp',
        contactSubtitle: 'Reach out directly by phone or WhatsApp to request services, discuss pricing, or plan your next project.',
        directContact: 'Direct Contact',
        whatsappPhone: 'WhatsApp / Phone',
        contactDescription: 'Quick replies for editing, motion graphics, and branded content inquiries.',
        messageWhatsapp: 'Message on WhatsApp',
        callNow: 'Call Now',
        whatIHandle: 'What I Handle',
        projectTypes: 'Project Types',
        projectTypeOne: 'Video editing and cinematic storytelling',
        projectTypeTwo: 'Motion graphics and social media content',
        projectTypeThree: 'Brand promos, ads, and short-form reels',
        footerText: '© 2024 Visuals By Khaled. All rights reserved. | Crafted with intention.',
        viewsSuffix: 'views',
        categoryLabels: {
            all: 'All Works',
            commercials: 'Commercials',
            music: 'Music Videos',
            social: 'Social Media',
            design: 'Graphic Design'
        },
        langToggle: 'AR'
    },
    ar: {
        pageTitle: 'Visuals By Khaled',
        navHome: 'الرئيسية',
        navPortfolio: 'الأعمال',
        navServices: 'الخدمات',
        navContact: 'تواصل',
        heroTitle: 'أبحث عن <span>تحف بصرية</span><br>وأحوّل اللقطات الخام إلى <span>سينما عالية الاحتفاظ</span>',
        heroSubtitle: 'خدمات مونتاج احترافية، موشن جرافيك، وسرد سينمائي للعلامات التي تبحث عن التميز',
        heroButton: 'شاهد العرض',
        featuredSectionTitle: 'أحدث عمل',
        featuredTitle: 'فيديو سفر سينمائي',
        featuredDescription: 'استمتع بسحر المونتاج الاحترافي والموشن جرافيك. شاهد كيف تتحول اللقطات الخام إلى سرد سينمائي.',
        portfolioTitle: 'تحف الفيديو',
        portfolioSubtitle: 'استكشف مجموعة من أعمال الفيديو، الموشن جرافيك، والمحتوى السينمائي الاحترافي.',
        filterAll: 'الكل',
        filterCommercials: 'إعلانات',
        filterMusic: 'فيديو كليب',
        filterSocial: 'سوشيال ميديا',
        filterDesign: 'تصميم جرافيك',
        capabilitiesTitle: 'القدرات والخدمات',
        serviceOneTitle: 'الإخراج الإبداعي',
        serviceOneDescription: 'صياغة وتنفيذ رؤى إبداعية جريئة. من التخطيط البصري حتى التسليم النهائي لسرديات تجذب وتحوّل.',
        serviceTwoTitle: 'ما بعد الإنتاج المتقدم',
        serviceTwoDescription: 'تصحيح الألوان، المؤثرات البصرية، تصميم الصوت، والاهتمام الدقيق بالتفاصيل. تحويل اللقطات الخام إلى عمل متقن.',
        serviceThreeTitle: 'الموشن جرافيك',
        serviceThreeDescription: 'تصميم موشن عالي الاحتفاظ، تيبوغرافي متحرك، وشروحات مرئية تجعل الأفكار الثابتة ديناميكية ولا تُنسى.',
        softwareTitle: 'البرامج والأدوات',
        impactTitle: 'الأثر والنتائج',
        viewsLabel: 'عدد المشاهدات',
        brandsLabel: 'العلامات التجارية',
        projectsLabel: 'المشاريع المنفذة',
        testimonialsTitle: 'آراء العملاء',
        testimonialOneText: '"غيّر التوجيه الإبداعي قصة علامتنا بالكامل، وكانت النتيجة زيادة 300% في التفاعل."',
        testimonialOneRole: 'مدير تسويق، شركة تقنية',
        testimonialTwoText: '"كانت جودة الموشن جرافيك ممتازة. كل لقطة بدت مقصودة ومؤثرة."',
        testimonialTwoRole: 'قائد إبداعي، علامة أزياء',
        testimonialThreeText: '"احترافي، سريع الاستجابة، وسلّم عملًا تجاوز التوقعات. أنصح به للمشاريع المميزة."',
        testimonialThreeRole: 'المدير التنفيذي، شركة إنتاج',
        contactTitle: 'التواصل وواتساب',
        contactSubtitle: 'تواصل مباشرة عبر الهاتف أو واتساب لطلب الخدمات، معرفة الأسعار، أو مناقشة مشروعك القادم.',
        directContact: 'تواصل مباشر',
        whatsappPhone: 'واتساب / هاتف',
        contactDescription: 'ردود سريعة على استفسارات المونتاج، الموشن جرافيك، والمحتوى الإعلاني.',
        messageWhatsapp: 'راسلني على واتساب',
        callNow: 'اتصال مباشر',
        whatIHandle: 'ما أقدمه',
        projectTypes: 'أنواع المشاريع',
        projectTypeOne: 'مونتاج فيديو وسرد سينمائي',
        projectTypeTwo: 'موشن جرافيك ومحتوى سوشيال ميديا',
        projectTypeThree: 'إعلانات براند، بروموهات، وريلات قصيرة',
        footerText: '© 2024 Visuals By Khaled. جميع الحقوق محفوظة | صُنع بعناية.',
        viewsSuffix: 'مشاهدة',
        categoryLabels: {
            all: 'الكل',
            commercials: 'إعلانات',
            music: 'فيديو كليب',
            social: 'سوشيال ميديا',
            design: 'تصميم جرافيك'
        },
        langToggle: 'EN'
    }
};

const state = {
    currentFilter: 'all',
    currentTestimonial: 0,
    language: localStorage.getItem('portfolio-language') || 'en'
};

const selectors = {
    portfolioGrid: '#portfolioGrid',
    filterButtons: '.filter-btn',
    testimonialCard: '.testimonial-card',
    revealableCards: '.capability-card, .stat-card, .portfolio-card',
    sectionTitles: '.section-title',
    navLinks: 'nav a',
    hero: '.hero',
    ctaButton: '.cta-button',
    modal: '#hero-showreel',
    langSwitch: '#langSwitch'
};

const animationState = {
    revealObserver: null,
    counterObserver: null
};

function getCurrentTranslations() {
    return translations[state.language] || translations.en;
}

function updatePageLanguage() {
    const current = getCurrentTranslations();
    document.documentElement.lang = state.language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    document.title = current.pageTitle;
    localStorage.setItem('portfolio-language', state.language);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const value = current[key];
        if (value !== undefined) {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.dataset.i18nHtml;
        const value = current[key];
        if (value !== undefined) {
            element.innerHTML = value;
        }
    });

    const langSwitch = document.querySelector(selectors.langSwitch);
    if (langSwitch) {
        langSwitch.textContent = current.langToggle;
        langSwitch.setAttribute('aria-label', state.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    renderPortfolio();
}

function toggleLanguage() {
    state.language = state.language === 'en' ? 'ar' : 'en';
    updatePageLanguage();
}

// Resolve thumbnail URL with fallbacks:
// 1) If item.thumbnail is a full URL, use it
// 2) If item.thumbnail looks like a Drive fileId, use a uc export view URL (requires public sharing)
// 3) Fallback to placeholder
function getThumbnailSrc(item) {
    if (!item || !item.thumbnail) return 'https://via.placeholder.com/720x1280?text=Video';
    const t = item.thumbnail;
    if (typeof t === 'string' && t.startsWith('http')) return t;
    // treat as Drive fileId
    return `https://drive.google.com/uc?export=view&id=${t}`;
}

// Async check whether an image URL loads successfully
function checkUrl(url, timeout = 5000) {
    return new Promise(resolve => {
        const img = new Image();
        let done = false;
        const clean = (ok) => {
            if (done) return;
            done = true;
            img.onload = img.onerror = null;
            clearTimeout(timer);
            resolve(ok);
        };
        img.onload = () => clean(true);
        img.onerror = () => clean(false);
        const timer = setTimeout(() => clean(false), timeout);
        img.src = url;
    });
}

// Try candidate URLs sequentially and return the first that loads
async function resolveThumbnailSrc(item) {
    const placeholder = 'https://via.placeholder.com/720x1280?text=Video';
    if (!item || !item.thumbnail) return placeholder;
    const t = item.thumbnail;
    const candidates = [];
    if (typeof t === 'string' && t.startsWith('http')) {
        candidates.push(t);
    } else {
        // Common Drive direct-view pattern (requires file shared publicly)
        candidates.push(`https://drive.google.com/uc?export=view&id=${t}`);
        // Older thumbnail endpoints
        candidates.push(`https://drive.google.com/thumbnail?id=${t}`);
        // Googleusercontent patterns sometimes work for images
        candidates.push(`https://lh3.googleusercontent.com/d/${t}`);
        // A variant used for some exported resources
        candidates.push(`https://drive.google.com/uc?export=download&id=${t}`);
    }

    // Try candidates sequentially and log attempts for debugging
    for (const c of candidates) {
        try {
            // eslint-disable-next-line no-await-in-loop
            const ok = await checkUrl(c);
            console.debug('[thumbnail] tried', c, 'ok=', ok);
            if (ok) return c;
        } catch (e) {
            console.debug('[thumbnail] error for', c, e);
        }
    }

    console.info('[thumbnail] no candidate worked for item', item.id || item.googleId || item.thumbnail);
    return placeholder;
}

function renderPortfolio() {
    const grid = document.querySelector(selectors.portfolioGrid);
    if (!grid) {
        return;
    }

    const current = getCurrentTranslations();
    grid.innerHTML = '';

    const items = getFilteredPortfolioItems();

    items.forEach(item => {
        const title = state.language === 'ar' ? item.titleAr : item.titleEn;
        const categoryLabel = current.categoryLabels[item.category] || item.category;
        const card = document.createElement('div');
        card.className = 'portfolio-card reveal';
        card.setAttribute('aria-label', title);
        const placeholder = 'https://via.placeholder.com/720x1280?text=Video';
        card.innerHTML = `                
            <img src="${placeholder}" alt="${title}" decoding="async" loading="lazy" class="video-thumbnail">
            <div class="play-button-container">
                <div class="play-button">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <div class="video-metadata">
                <span class="video-duration">${item.duration}</span>
                <span class="video-views">${item.views} ${current.viewsSuffix}</span>
            </div>
            <div class="portfolio-overlay">
                <h3>${title}</h3>
                <span class="category-badge">${categoryLabel.toUpperCase()}</span>
            </div>
        `;

        card.addEventListener('click', () => openVideoModal(item.googleId, title));
        grid.appendChild(card);

        // attempt to replace placeholder with a working thumbnail (no blocking)
        resolveThumbnailSrc(item).then(url => {
            const img = card.querySelector('img.video-thumbnail');
            if (img && url) img.src = url;
        }).catch(() => { });

        if (animationState.revealObserver) {
            animationState.revealObserver.observe(card);
        }
    });

    // If we have multiple items (like the 5 in the example), switch to the centered row layout
    if (items.length >= 3) {
        grid.classList.add('portfolio-row');
    } else {
        grid.classList.remove('portfolio-row');
    }

    // mark the centered card (middle index) for the glow/scale
    const children = Array.from(grid.children);
    children.forEach(c => c.classList.remove('center'));
    if (children.length) {
        const mid = Math.floor(children.length / 2);
        const centerCard = children[mid];
        if (centerCard) centerCard.classList.add('center');
    }
}

function getFilteredPortfolioItems() {
    return portfolioData.filter(item => state.currentFilter === 'all' || item.category === state.currentFilter);
}

function filterPortfolio(category, event) {
    state.currentFilter = category;
    setActiveFilterButton(event);
    renderPortfolio();
}

function setActiveFilterButton(event) {
    document.querySelectorAll(selectors.filterButtons).forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = event?.currentTarget || event?.target;
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function openVideoModal(googleId, title) {
    const modal = document.querySelector(selectors.modal);
    if (!modal) {
        return;
    }

    const iframe = modal.querySelector('iframe');
    if (!iframe) {
        return;
    }

    modal.classList.add('active');
    // ensure iframe allows autoplay/fullscreen and receives pointer events on mobile
    iframe.title = `${title} video player`;
    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; clipboard-write; gyroscope; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');
    // remove any stale loading blocker after a short timeout to avoid blocking touches on mobile
    modal.classList.remove('loading');
    iframe.onload = null;
    iframe.src = `https://drive.google.com/file/d/${googleId}/preview`;
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    modal.classList.remove('active', 'loading');

    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.src = '';
    }

    document.body.style.overflow = '';
}


function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) {
        return;
    }

    animationState.counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.dataset.animated === 'true') {
                return;
            }

            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.dataset.finalValue = counter.textContent.trim();
        animationState.counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const rawValue = counter.dataset.finalValue || counter.textContent.trim();
    const target = parseInt(rawValue.replace(/\D/g, ''), 10);
    const suffix = rawValue.includes('M') ? 'M+' : rawValue.includes('+') ? '+' : '';

    if (!Number.isFinite(target) || target <= 0) {
        return;
    }

    const steps = 50;
    const increment = target / steps;
    let current = 0;

    const updateCount = () => {
        current += increment;
        const nextValue = Math.min(Math.floor(current), target);
        counter.textContent = `${nextValue}${suffix}`;

        if (nextValue < target) {
            setTimeout(updateCount, 30);
        }
    };

    updateCount();
}

function initRevealObserver() {
    animationState.revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll(selectors.revealableCards).forEach(element => {
        element.classList.add('reveal');
        animationState.revealObserver.observe(element);
    });
}

function initScrollEffects() {
    document.querySelectorAll(selectors.navLinks).forEach(link => {
        link.addEventListener('click', event => {
            const targetSelector = link.getAttribute('href');
            if (!targetSelector || !targetSelector.startsWith('#')) {
                return;
            }

            event.preventDefault();
            const target = document.querySelector(targetSelector);
            target?.scrollIntoView({ behavior: 'smooth' });
        });

        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const hero = document.querySelector(selectors.hero);
        const scrolled = window.pageYOffset;

        if (nav) {
            nav.classList.toggle('scrolled', scrolled > 50);
        }

        if (hero && scrolled < window.innerHeight) {
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
        }
    });

    window.addEventListener('mousemove', event => {
        const hero = document.querySelector(selectors.hero);
        if (!hero) {
            return;
        }

        const x = (event.clientX / window.innerWidth) * 20;
        const y = (event.clientY / window.innerHeight) * 20;
        hero.style.backgroundPosition = `${x}% ${y}%`;
    });

    const ctaButton = document.querySelector(selectors.ctaButton);
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', event => {
            const rect = ctaButton.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            ctaButton.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translate(0, 0)';
        });
    }

    document.querySelectorAll(selectors.sectionTitles).forEach((title, index) => {
        title.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s backwards`;
    });

    const langSwitch = document.querySelector(selectors.langSwitch);
    if (langSwitch) {
        langSwitch.addEventListener('click', toggleLanguage);
    }
}

function bindModalEvents() {
    document.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            closeModal('hero-showreel');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal('hero-showreel');
        }
    });
}

async function init() {
    // If Drive config is set, try to load videos first so renderPortfolio uses them.
    await fetchVideosFromDrive();

    // Render language and portfolio
    updatePageLanguage();

    // Then initialize observers and interactions that expect DOM elements
    initRevealObserver();
    initScrollEffects();
    bindModalEvents();
    animateCounters();
}

document.addEventListener('DOMContentLoaded', () => { init(); });
