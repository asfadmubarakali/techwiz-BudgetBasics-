(() => {
    'use strict';

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const imageFallbacks = [
        ['.loader-techwiz-logo', 'TECHWIZ 7', 'loader-logo-fallback'],
        ['.techwiz-logo-image', 'TECHWIZ 7', 'techwiz-nav-fallback'],
        ['.techwiz-footer-logo', 'TECHWIZ 7', 'techwiz-footer-fallback'],
        ['.aptech-nav-logo', 'APTECH', 'aptech-nav-fallback'],
        ['.aptech-card-logo', 'APTECH  ·  COMPUTER EDUCATION', 'aptech-card-fallback']
    ];
    imageFallbacks.forEach(([selector, label, fallbackClass]) => {
        const image = $(selector);
        if (!image) return;
        const showFallback = () => {
            if (image.dataset.fallbackShown) return;
            image.dataset.fallbackShown = 'true'; image.hidden = true;
            const fallback = document.createElement('span'); fallback.className = fallbackClass; fallback.textContent = label;
            image.after(fallback);
        };
        image.addEventListener('error', showFallback, { once: true });
        if (image.complete && image.naturalWidth === 0) showFallback();
    });
    const money = value => Number.isFinite(value) ? `PKR ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 }).format(value)}` : '—';
    const readNumber = input => {
        const raw = String(input.value).trim();
        if (!raw) return { error: 'Please enter an amount.' };
        const value = Number(raw);
        if (!Number.isFinite(value)) return { error: 'Enter a valid number.' };
        if (value < 0) return { error: 'Amount cannot be negative.' };
        return { value };
    };
    const emailIsValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    // Give each navigation destination a crisp, consistent inline SVG icon.
    const navIconPaths = {
        '#home': 'M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9.5 21v-6h5v6',
        '#basics': 'M4 4.5c3-1 5.7-.5 8 1v15c-2.3-1.5-5-2-8-1zm16 0c-3-1-5.7-.5-8 1v15c2.3-1.5 5-2 8-1z',
        '#needs-wants': 'M12 3v18M5 7h14M5 7l-3 6h6zm14 0-3 6h6zM8 21h8',
        '#mistakes': 'M12 3 2.5 20h19zM12 9v5m0 3h.01',
        '#gallery': 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z',
        '#budget-guide': 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 4h12M7 11h2m4 0h4M7 15h2m4 0h4M7 18h2',
        '#savings-goal': 'M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
        '#expense-planner': 'M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21zM9 8h6m-6 4h6m-6 4h3',
        '#currency': 'M4 7h15l-3-3m4 13H5l3 3M8 10v4m-2-2h4m7-2v4m-2-2h4',
        '#snapshot': 'M4 19V5m0 14h17M7 15l4-4 3 2 6-7',
        '#bill-generator': 'M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm8 1v4h4M8 12h8m-8 4h8',
        '#assistant': 'M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 4v-4a3 3 0 0 1-3-3zm5 4h.01m6 0h.01m-5 4h3',
        '#about': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-11v6m0-10h.01',
        '#contact': 'M3 5h18v14H3zm0 1 9 7 9-7'
    };
    $$('#navLinks a[href^="#"]').forEach(link => {
        const pathData = navIconPaths[link.getAttribute('href')];
        if (!pathData) return;
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true'); icon.classList.add('nav-item-icon');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', pathData); icon.append(path); link.prepend(icon);
    });
    $$('.nav-dropdown .nav-drop-trigger').forEach(trigger => {
        const pathData = trigger.textContent.trim().startsWith('Learn') ? navIconPaths['#basics'] : navIconPaths['#budget-guide'];
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true'); icon.classList.add('nav-item-icon');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', pathData); icon.append(path); trigger.prepend(icon);
    });
    const chatNavIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chatNavIcon.setAttribute('viewBox', '0 0 24 24'); chatNavIcon.setAttribute('aria-hidden', 'true'); chatNavIcon.classList.add('nav-item-icon');
    const chatNavPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); chatNavPath.setAttribute('d', navIconPaths['#assistant']); chatNavIcon.append(chatNavPath); $('.nav-chat-trigger').prepend(chatNavIcon);
    // Header, responsive navigation, and theme preference.
    const header = $('.site-header');
    const navLinks = $('#navLinks');
    const menuToggle = $('#menuToggle');
    const techwizInfoTrigger = $('#techwizInfoTrigger');
    const techwizInfo = $('#techwizInfo');
    const closeTechwizInfo = () => { techwizInfo.hidden = true; techwizInfoTrigger.setAttribute('aria-expanded', 'false'); };
    techwizInfoTrigger.addEventListener('click', event => {
        event.stopPropagation();
        const show = techwizInfo.hidden;
        techwizInfo.hidden = !show;
        techwizInfoTrigger.setAttribute('aria-expanded', String(show));
    });
    document.addEventListener('click', event => { if (!event.target.closest('.techwiz-nav-wrap')) closeTechwizInfo(); });
    const techwizSlides = $$('.techwiz-slide');
    const techwizSlider = $('#techwizSlider');
    const techwizRibbon = $('#techwizRibbon');
    const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let techwizSlideIndex = 0, techwizTimer = null, announcementsPaused = Boolean(reducedMotionQuery?.matches), pointerOnSlider = false, sliderHasFocus = false;
    const drawTechwizSlide = (index, announce = false) => {
        techwizSlideIndex = (index + techwizSlides.length) % techwizSlides.length;
        techwizSlides.forEach((slide, i) => { const active = i === techwizSlideIndex; slide.classList.toggle('is-active', active); slide.setAttribute('aria-hidden', String(!active)); });
        $('#techwizSlideCount').textContent = `${String(techwizSlideIndex + 1).padStart(2, '0')} / ${String(techwizSlides.length).padStart(2, '0')}`;
        if (announce) $('#techwizSlideStatus').textContent = techwizSlides[techwizSlideIndex].innerText.replace(/\s+/g, ' ').trim();
    };
    const clearTechwizTimer = () => { window.clearInterval(techwizTimer); techwizTimer = null; };
    const startTechwizTimer = () => {
        clearTechwizTimer();
        if (announcementsPaused || pointerOnSlider || sliderHasFocus || document.hidden || techwizSlides.length < 2) return;
        techwizTimer = window.setInterval(() => drawTechwizSlide(techwizSlideIndex + 1), 5200);
    };
    const setSliderPaused = paused => {
        announcementsPaused = paused;
        const button = $('#techwizSlidePause');
        button.textContent = paused ? '▶' : 'Ⅱ';
        button.setAttribute('aria-label', paused ? 'Resume announcements' : 'Pause announcements');
        button.title = paused ? 'Resume announcements' : 'Pause announcements';
        startTechwizTimer();
    };
    $('#techwizSlidePrev').addEventListener('click', () => { drawTechwizSlide(techwizSlideIndex - 1, true); startTechwizTimer(); });
    $('#techwizSlideNext').addEventListener('click', () => { drawTechwizSlide(techwizSlideIndex + 1, true); startTechwizTimer(); });
    $('#techwizSlidePause').addEventListener('click', () => setSliderPaused(!announcementsPaused));
    techwizRibbon.addEventListener('pointerenter', () => { pointerOnSlider = true; clearTechwizTimer(); });
    techwizRibbon.addEventListener('pointerleave', () => { pointerOnSlider = false; startTechwizTimer(); });
    techwizRibbon.addEventListener('focusin', () => { sliderHasFocus = true; clearTechwizTimer(); });
    techwizRibbon.addEventListener('focusout', event => { if (!techwizRibbon.contains(event.relatedTarget)) { sliderHasFocus = false; startTechwizTimer(); } });
    document.addEventListener('visibilitychange', startTechwizTimer);
    reducedMotionQuery?.addEventListener?.('change', event => { if (event.matches) setSliderPaused(true); });
    drawTechwizSlide(0); setSliderPaused(announcementsPaused);
    const closeMenu = () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); };
    menuToggle.addEventListener('click', () => {
        const open = menuToggle.getAttribute('aria-expanded') !== 'true';
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        navLinks.classList.toggle('open', open);
    });
    $$('#navLinks a').forEach(link => link.addEventListener('click', closeMenu));
    $$('.nav-drop-trigger').forEach(trigger => trigger.addEventListener('click', event => {
        const dropdown = trigger.closest('.nav-dropdown');
        if (!dropdown) return;
        event.stopPropagation();
        if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches && dropdown.matches(':hover')) { trigger.setAttribute('aria-expanded', 'true'); return; }
        const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
        $$('.nav-dropdown .nav-drop-trigger').forEach(other => other.setAttribute('aria-expanded', 'false'));
        trigger.setAttribute('aria-expanded', String(willOpen));
    }));
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
        $$('.nav-dropdown').forEach(dropdown => {
            const trigger = $('.nav-drop-trigger', dropdown);
            dropdown.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { $$('.nav-dropdown .nav-drop-trigger').forEach(other => other.setAttribute('aria-expanded', 'false')); trigger.setAttribute('aria-expanded', 'true'); } });
            dropdown.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') trigger.setAttribute('aria-expanded', 'false'); });
            dropdown.addEventListener('focusin', () => trigger.setAttribute('aria-expanded', 'true'));
            dropdown.addEventListener('focusout', event => { if (!dropdown.contains(event.relatedTarget)) trigger.setAttribute('aria-expanded', 'false'); });
        });
    }
    document.addEventListener('click', event => {
        if (!event.target.closest('.nav-dropdown')) $$('.nav-dropdown .nav-drop-trigger').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); closeTechwizInfo(); } });
    const themeToggle = $('#themeToggle');
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('budgetbasics-theme-v2'); } catch { /* Storage may be disabled in private or file contexts. */ }
    if (savedTheme === 'light') document.documentElement.classList.add('theme-light');
    else document.documentElement.classList.remove('theme-light');
    const setThemeLabel = () => {
        const light = document.documentElement.classList.contains('theme-light');
        themeToggle.textContent = light ? '☾' : '☼';
        themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
        themeToggle.title = light ? 'Switch to dark theme' : 'Switch to light theme';
    };
    setThemeLabel();
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('theme-light');
        try { localStorage.setItem('budgetbasics-theme-v2', document.documentElement.classList.contains('theme-light') ? 'light' : 'dark'); } catch { /* Theme still changes for this page view. */ }
        setThemeLabel();
    });

    // GSAP powers the entrance, scroll choreography, 3D hover, and horizontal learning path.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gsapMotion = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && !reducedMotion;
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger, ...(window.ScrollToPlugin ? [window.ScrollToPlugin] : []));
    const initMotion = () => {
        const loader = $('#pageLoader');
        if (!gsapMotion) {
            $$('.reveal').forEach(item => item.classList.add('is-visible'));
            if (loader) {
                loader.classList.add('welcome-fallback');
                window.setTimeout(() => { loader.classList.add('is-leaving'); window.setTimeout(() => loader.remove(), 500); }, reducedMotion ? 900 : 2200);
            }
            return;
        }
        document.body.classList.add('gsap-active');
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro.fromTo('.loader-logo-card', { autoAlpha: 0, scale: .86, y: 12, filter: 'blur(8px)' }, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0)', duration: .48 })
            .fromTo('.loader-project-label,.loader-welcome', { autoAlpha: 0, y: 15, filter: 'blur(6px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0)', stagger: .11, duration: .4 }, '-=.22')
            .fromTo('.loader-caption,.loader-progress,.loader-status', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: .06, duration: .28 }, '-=.12')
            .to('.loader-progress i', { scaleX: 1, duration: .82, ease: 'power2.inOut' }, '-=.08')
            .to(loader, { autoAlpha: 0, duration: .4, delay: .12, onComplete: () => loader.remove() })
            .from('.brand', { autoAlpha: 0, y: -14, duration: .28 }, '-=.16')
            .from('.hero-copy .eyebrow', { autoAlpha: 0, y: 14, duration: .32 }, '-=.12')
            .from('.hero h1', { autoAlpha: 0, y: 27, filter: 'blur(8px)', duration: .5 }, '-=.15')
            .from('.hero-lead,.hero-actions,.hero-tags,.microcopy', { autoAlpha: 0, y: 13, stagger: .06, duration: .3 }, '-=.2')
            .from('.hero-art', { autoAlpha: 0, x: 25, rotateY: 8, duration: .65 }, '-=.36');
        if (window.ScrollTrigger) {
            $$('.reveal').forEach((element, index) => gsap.fromTo(element,
                { autoAlpha: 0, y: 30, rotateX: index % 2 ? 2 : -1, transformPerspective: 900 },
                { autoAlpha: 1, y: 0, rotateX: 0, duration: .68, delay: (index % 3) * .05, ease: 'power3.out', onComplete: () => element.classList.add('is-visible'), scrollTrigger: { trigger: element, start: 'top 88%', once: true } }));
            gsap.from('.feature-strip>div', { y: 16, autoAlpha: 0, stagger: .08, duration: .5, delay: .8, ease: 'power2.out' });
            $$('.feature-strip strong').forEach((element, index) => {
                const target = Number(element.textContent.trim());
                if (!Number.isFinite(target)) return;
                const counter = { value: 0 };
                gsap.to(counter, { value: target, duration: .85, delay: .95 + index * .07, snap: { value: 1 }, onUpdate: () => { element.textContent = String(counter.value).padStart(2, '0'); } });
            });
            gsap.from('.master-head>*', { x: (i, target) => target.classList.contains('master-scroll-note') ? 18 : -18, autoAlpha: 0, duration: .6, scrollTrigger: { trigger: '.master-section', start: 'top 75%', once: true } });
            const track = $('.master-track'), wrap = $('.master-track-wrap');
            if (track && wrap) {
                const responsiveMotion = gsap.matchMedia();
                responsiveMotion.add('(min-width: 801px)', () => {
                    const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
                    gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '.master-section', start: 'top top+=68', end: () => `+=${Math.max(650, distance())}`, scrub: .8, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
                    gsap.to('.master-progress i', { width: '100%', ease: 'none', scrollTrigger: { trigger: '.master-section', start: 'top top+=68', end: () => `+=${Math.max(650, distance())}`, scrub: .8 } });
                });
                responsiveMotion.add('(max-width: 800px)', () => gsap.from('.master-card', { y: 25, autoAlpha: 0, stagger: .08, duration: .5, scrollTrigger: { trigger: '.master-section', start: 'top 82%', once: true } }));
            }
            $$('.sample-track i').forEach((bar, i) => gsap.fromTo(bar, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .75, delay: i * .08, scrollTrigger: { trigger: '.sample-budget', start: 'top 82%', once: true } }));
            gsap.from('.snapshot-donut', { rotate: -70, scale: .7, autoAlpha: 0, duration: .7, scrollTrigger: { trigger: '.snapshot-section', start: 'top 78%', once: true } });
            gsap.to('.glow-left', { y: 230, x: 55, scrollTrigger: { trigger: '#basics', start: 'top bottom', end: 'bottom top', scrub: 1 } });
            gsap.to('.glow-right', { y: -190, x: -50, scrollTrigger: { trigger: '#mistakes', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
        gsap.to('.main-dash', { y: -8, duration: 3.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.bee-float', { y: -10, rotateZ: -2, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.saving-float', { y: 8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.expense-float', { y: -7, duration: 2.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.character-aura', { scale: 1.08, opacity: .55, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.ticker-track', { xPercent: -50, duration: 34, repeat: -1, ease: 'none' });
        setupPointerMotion();
    };
    const setupPointerMotion = () => {
        if (!gsapMotion || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
        const art = $('.hero-art');
        art?.addEventListener('pointermove', event => { const r = art.getBoundingClientRect(), px = (event.clientX - r.left) / r.width - .5, py = (event.clientY - r.top) / r.height - .5; gsap.to('.main-dash', { rotateY: -10 + px * 10, rotateX: 5 - py * 7, duration: .4, overwrite: 'auto' }); });
        art?.addEventListener('pointerleave', () => gsap.to('.main-dash', { rotateY: -10, rotateX: 5, duration: .6, overwrite: 'auto' }));
        $$('.concept-card,.gallery-card,.master-card').forEach(card => {
            card.addEventListener('pointermove', event => { const r = card.getBoundingClientRect(), x = ((event.clientX - r.left) / r.width - .5) * 7, y = ((event.clientY - r.top) / r.height - .5) * -5; gsap.to(card, { rotateY: x, rotateX: y, y: -3, duration: .25, overwrite: 'auto', transformPerspective: 800 }); });
            card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: .5, ease: 'power3.out', overwrite: 'auto' }));
        });
        $$('.button').forEach(button => {
            button.addEventListener('pointermove', event => { const r = button.getBoundingClientRect(); gsap.to(button, { x: (event.clientX - r.left - r.width / 2) * .07, y: (event.clientY - r.top - r.height / 2) * .1, duration: .2, overwrite: 'auto' }); });
            button.addEventListener('pointerleave', () => gsap.to(button, { x: 0, y: 0, duration: .35, ease: 'elastic.out(1,.4)' }));
        });
    };
    const setupCursorAccent = () => {
        const orbit = $('.pointer-orbit');
        if (!orbit || reducedMotion || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
        let moveX, moveY;
        if (window.gsap) {
            gsap.set(orbit, { xPercent: -50, yPercent: -50 });
            moveX = gsap.quickTo(orbit, 'x', { duration: .16, ease: 'power2.out' });
            moveY = gsap.quickTo(orbit, 'y', { duration: .16, ease: 'power2.out' });
        } else {
            moveX = x => { orbit.style.left = `${x}px`; };
            moveY = y => { orbit.style.top = `${y}px`; };
        }
        window.addEventListener('pointermove', event => {
            moveX(event.clientX); moveY(event.clientY);
            orbit.classList.add('is-visible');
        }, { passive: true });
        window.addEventListener('blur', () => orbit.classList.remove('is-visible'));
        document.addEventListener('pointerdown', () => orbit.classList.add('is-pressed'));
        document.addEventListener('pointerup', () => orbit.classList.remove('is-pressed'));
        $$('a,button,input,select,textarea,summary').forEach(element => {
            element.addEventListener('pointerenter', () => orbit.classList.add('is-hover'));
            element.addEventListener('pointerleave', () => orbit.classList.remove('is-hover'));
        });
    };
    setupCursorAccent();
    initMotion();
    const backTop = $('#backTop');
    const sectionLinks = $$('#navLinks a[href^="#"]');
    const trackedSections = sectionLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
    const updateActiveNavigation = () => {
        let current = '';
        trackedSections.forEach(section => { if (section.getBoundingClientRect().top < 170) current = section.id; });
        sectionLinks.forEach(link => link.classList.toggle('active', link.hash.slice(1) === current));
        $$('.nav-dropdown').forEach(dropdown => {
            const active = $$('a[href^="#"]', dropdown).some(link => link.hash.slice(1) === current);
            dropdown.querySelector('.nav-drop-trigger')?.classList.toggle('is-section-active', active);
        });
    };
    updateActiveNavigation();
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link || link.classList.contains('skip-link') || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = $(link.getAttribute('href'));
        if (!target) return;
        if (target.id === 'assistant') { event.preventDefault(); closeMenu(); openChat(); return; }
        event.preventDefault(); closeMenu();
        if (gsapMotion && window.ScrollToPlugin) gsap.to(window, { duration: .8, ease: 'power2.inOut', scrollTo: { y: target, offsetY: 75 } });
        else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', link.getAttribute('href'));
    });
    const scrollBee = $('#scrollBee');
    const journeyRail = $('.journey-rail');
    const journeyPath = $('#journeyProgressPath');
    const journeyPathLength = journeyPath.getTotalLength();
    journeyPath.style.strokeDasharray = `${journeyPathLength} ${journeyPathLength}`;
    journeyPath.style.strokeDashoffset = String(journeyPathLength);
    let beeMoveX = null, beeMoveY = null, beeMoveRotation = null;
    if (window.gsap && !reducedMotion) {
        scrollBee.style.transition = 'none';
        gsap.set(scrollBee, { xPercent: -50, yPercent: -50 });
        beeMoveX = gsap.quickTo(scrollBee, 'x', { duration: .28, ease: 'power1.out' });
        beeMoveY = gsap.quickTo(scrollBee, 'y', { duration: .28, ease: 'power1.out' });
        beeMoveRotation = gsap.quickTo(scrollBee, 'rotation', { duration: .32, ease: 'power1.out' });
    } else if (reducedMotion) { scrollBee.hidden = true; journeyRail.hidden = true; }
    else scrollBee.style.transition = 'transform .28s linear';
    const updateScrollBee = () => {
        if (reducedMotion) return;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const progress = Math.max(0, Math.min(window.scrollY / maxScroll, 1));
        const railBounds = journeyRail.getBoundingClientRect();
        const point = journeyPath.getPointAtLength(journeyPathLength * progress);
        const x = railBounds.left + point.x / 72 * railBounds.width;
        const y = railBounds.top + point.y / 800 * railBounds.height;
        journeyPath.style.strokeDashoffset = String(journeyPathLength * (1 - progress));
        scrollBee.dataset.progress = `${Math.round(progress * 100)}%`;
        const rotation = Math.max(-24, Math.min(24, point.x - 36));
        if (beeMoveX) { beeMoveX(x); beeMoveY(y); beeMoveRotation(rotation); }
        else scrollBee.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${rotation}deg)`;
    };
    window.addEventListener('scroll', updateScrollBee, { passive: true });
    window.addEventListener('resize', updateScrollBee, { passive: true });
    updateScrollBee();
    let scrollQueued = false;
    window.addEventListener('scroll', () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const scrolled = y > 12;
            const showTop = y > 500;
            if (header.classList.contains('scrolled') !== scrolled) {
                header.classList.toggle('scrolled', scrolled);
                if (gsapMotion) gsap.to('.nav', { height: scrolled ? (innerWidth < 760 ? 62 : 67) : 82, duration: .25, ease: 'power2.out', overwrite: true });
            }
            if (backTop.classList.contains('visible') !== showTop) {
                backTop.classList.toggle('visible', showTop);
                if (gsapMotion) gsap.fromTo(backTop, { scale: showTop ? .7 : 1, autoAlpha: showTop ? 0 : 1 }, { scale: showTop ? 1 : .8, autoAlpha: showTop ? 1 : 0, duration: .28, ease: 'back.out(2)' });
            }
            updateActiveNavigation();
            scrollQueued = false;
        });
    }, { passive: true });
    backTop.addEventListener('click', () => gsapMotion && window.ScrollToPlugin ? gsap.to(window, { duration: .85, scrollTo: 0, ease: 'power2.inOut' }) : window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

    // Interactive foundations quiz.
    $$('.quiz-options button').forEach(button => button.addEventListener('click', () => {
        const feedback = $('#quizFeedback');
        $$('.quiz-options button').forEach(option => option.classList.remove('correct-answer', 'wrong-answer'));
        const correct = button.dataset.quiz === 'correct';
        button.classList.add(correct ? 'correct-answer' : 'wrong-answer');
        feedback.textContent = correct
            ? 'That’s right. A required textbook supports your education, so it is generally a need.'
            : 'Not quite. Those are usually optional wants. A required textbook is generally a need for class.';
    }));

    // Needs and wants classification activity.
    const challengeItems = [
        { name: 'Textbook for class', type: 'need', why: 'A required textbook supports learning.' },
        { name: 'Monthly rent', type: 'need', why: 'Safe housing is an essential need.' },
        { name: 'Basic groceries', type: 'need', why: 'Food is essential, though choices and budgets vary.' },
        { name: 'Gaming subscription', type: 'want', why: 'Entertainment can be enjoyable, but it is usually optional.' },
        { name: 'Designer shoes', type: 'want', why: 'A particular brand is usually an optional extra.' },
        { name: 'Transport to class', type: 'need', why: 'Reliable travel may be needed to attend classes.' },
        { name: 'New phone upgrade', type: 'want', why: 'An upgrade can often wait if your current phone works.' },
        { name: 'Movie ticket', type: 'want', why: 'A movie is a fun optional activity.' }
    ];
    let challengeIndex = 0;
    let challengeLocked = false;
    const renderChallenge = () => {
        const item = challengeItems[challengeIndex];
        $('#challengeCount').textContent = `${String(challengeIndex + 1).padStart(2, '0')} / ${String(challengeItems.length).padStart(2, '0')}`;
        $('#challengeBar').style.width = `${((challengeIndex + 1) / challengeItems.length) * 100}%`;
        $('#challengePrompt').innerHTML = `<span class="item-symbol">${item.type === 'need' ? '▤' : '✳'}</span><span class="item-category">ITEM ${String(challengeIndex + 1).padStart(2, '0')}</span><h3>${item.name}</h3><p>Classify this example based on the situation.</p>`;
        $('#challengeFeedback').textContent = '';
        $('#nextChallenge').hidden = true;
        $$('.choice-button').forEach(button => { button.disabled = false; });
        challengeLocked = false;
        if (gsapMotion) gsap.fromTo('#challengePrompt', { autoAlpha: 0, y: 12, rotateX: -3 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: .35, ease: 'power2.out' });
    };
    $$('.choice-button').forEach(button => button.addEventListener('click', () => {
        if (challengeLocked) return;
        challengeLocked = true;
        $$('.choice-button').forEach(option => { option.disabled = true; });
        const item = challengeItems[challengeIndex];
        const correct = button.dataset.choice === item.type;
        $('#challengeFeedback').textContent = `${correct ? 'Good choice!' : 'A different way to look at it:'} ${item.why}`;
        $('#nextChallenge').textContent = challengeIndex === challengeItems.length - 1 ? 'Start again ↻' : 'Next item →';
        $('#nextChallenge').hidden = false;
    }));
    $('#nextChallenge').addEventListener('click', () => { challengeIndex = (challengeIndex + 1) % challengeItems.length; renderChallenge(); });

    // 50 / 30 / 20 calculator.
    $('#ruleForm').addEventListener('submit', event => {
        event.preventDefault();
        const result = readNumber($('#incomeInput'));
        $('#ruleError').textContent = result.error || '';
        if (result.error) return;
        const values = [result.value * .5, result.value * .3, result.value * .2];
        $$('.allocation-results>div').forEach((row, index) => {
            $('b', row).textContent = money(values[index]);
            if (gsapMotion) gsap.to($('.result-bar>i', row), { width: `${[50, 30, 20][index]}%`, duration: .75, ease: 'power2.out', overwrite: true });
            else $('.result-bar>i', row).style.width = `${[50, 30, 20][index]}%`;
        });
    });

    // Savings goal estimate handles empty starting balances and zero contributions.
    let currentSavingsGoal = null;
    $('#savingsForm').addEventListener('submit', event => {
        event.preventDefault();
        const target = readNumber($('#goalTarget'));
        const saved = $('#goalSaved').value.trim() ? readNumber($('#goalSaved')) : { value: 0 };
        const monthly = $('#goalMonthly').value.trim() ? readNumber($('#goalMonthly')) : { value: 0 };
        const name = $('#goalName').value.trim() || 'My savings goal';
        const error = $('#savingsError');
        error.textContent = '';
        if (!name) error.textContent = 'Please name your goal.';
        else if (target.error) error.textContent = `Target: ${target.error}`;
        else if (target.value === 0) error.textContent = 'Your target must be greater than zero.';
        else if (saved.error) error.textContent = `Current savings: ${saved.error}`;
        else if (monthly.error) error.textContent = `Monthly contribution: ${monthly.error}`;
        if (error.textContent) return;
        currentSavingsGoal = { name, target: target.value, saved: saved.value, monthly: monthly.value };
        const remaining = Math.max(target.value - saved.value, 0);
        const progress = Math.min(saved.value / target.value * 100, 100);
        if (gsapMotion) gsap.to('#savingsMeter', { width: `${progress}%`, duration: .8, ease: 'power2.out', overwrite: true });
        else $('#savingsMeter').style.width = `${progress}%`;
        $('#savingsProgress').textContent = `${name} · ${Math.round(progress)}% · ${money(remaining)} to go`;
        const months = monthly.value > 0 ? Math.ceil(remaining / monthly.value) : 0;
        $('#savingsEta').textContent = remaining === 0 ? 'Goal reached!' : monthly.value === 0 ? 'Add a monthly amount to estimate' : !Number.isFinite(months) ? 'Beyond the estimate range' : `${months} month${months === 1 ? '' : 's'} at this pace`;
    });

    // Expense planner is deliberately memory-only. Rows can be edited and deleted.
    let expenses = [];
    let editExpenseId = null;
    const expenseRows = $('#expenseRows');
    const totals = () => expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const renderExpenses = () => {
        expenseRows.replaceChildren();
        if (!expenses.length) {
            const row = document.createElement('tr'); row.className = 'empty-row';
            const cell = document.createElement('td'); cell.colSpan = 5; cell.textContent = 'Your planned items will appear here.'; row.append(cell); expenseRows.append(row);
        } else expenses.forEach(expense => {
            const row = document.createElement('tr');
            [expense.date, expense.category, expense.description, money(expense.amount)].forEach(value => { const cell = document.createElement('td'); cell.textContent = value; row.append(cell); });
            const actionCell = document.createElement('td');
            const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'row-action'; edit.textContent = 'Edit'; edit.setAttribute('aria-label', `Edit ${expense.description}`);
            edit.addEventListener('click', () => {
                editExpenseId = expense.id;
                $('#expenseDate').value = expense.date; $('#expenseCategory').value = expense.category;
                $('#expenseDescription').value = expense.description; $('#expenseAmount').value = expense.amount;
                $('#expenseForm button[type="submit"]').innerHTML = 'Save changes <span>✓</span>';
                $('#expenseDate').focus();
            });
            const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'row-action'; remove.textContent = 'Delete'; remove.setAttribute('aria-label', `Delete ${expense.description}`);
            remove.addEventListener('click', () => { expenses = expenses.filter(item => item.id !== expense.id); if (editExpenseId === expense.id) resetExpenseForm(); renderExpenses(); });
            actionCell.append(edit, document.createTextNode(' · '), remove); row.append(actionCell); expenseRows.append(row);
        });
        const total = totals();
        $('#expenseTotal').textContent = money(total);
        const incomeInput = $('#plannerIncome');
        const income = incomeInput.value.trim() && Number.isFinite(Number(incomeInput.value)) && Number(incomeInput.value) >= 0 ? Number(incomeInput.value) : 0;
        $('#remainingBalance').textContent = incomeInput.value.trim() ? money(income - total) : 'Add income';
        updateSnapshot();
    };
    const resetExpenseForm = () => {
        editExpenseId = null; $('#expenseForm').reset();
        $('#expenseDate').value = new Date().toISOString().slice(0, 10);
        $('#expenseForm button[type="submit"]').innerHTML = 'Add expense <span>+</span>';
    };
    $('#expenseDate').value = new Date().toISOString().slice(0, 10);
    $('#expenseForm').addEventListener('submit', event => {
        event.preventDefault();
        const error = $('#expenseError'); error.textContent = '';
        const amount = readNumber($('#expenseAmount'));
        if (!$('#expenseDate').value || !$('#expenseCategory').value || !$('#expenseDescription').value.trim()) error.textContent = 'Please complete the date, category, and description.';
        else if (amount.error) error.textContent = amount.error;
        else if (amount.value === 0) error.textContent = 'Expense amount must be greater than zero.';
        if (error.textContent) return;
        const oldAmount = editExpenseId ? expenses.find(item => item.id === editExpenseId)?.amount || 0 : 0;
        if (!Number.isFinite(totals() - oldAmount + amount.value)) { error.textContent = 'That amount is too large to add to this plan.'; return; }
        const expense = { id: editExpenseId || `${Date.now()}-${Math.random()}`, date: $('#expenseDate').value, category: $('#expenseCategory').value, description: $('#expenseDescription').value.trim(), amount: amount.value };
        if (editExpenseId) expenses = expenses.map(item => item.id === editExpenseId ? expense : item); else expenses.push(expense);
        resetExpenseForm(); error.textContent = ''; renderExpenses();
    });
    $('#plannerIncome').addEventListener('input', () => {
        const input = $('#plannerIncome');
        if (input.value && (!Number.isFinite(Number(input.value)) || Number(input.value) < 0)) { $('#remainingBalance').textContent = 'Check income'; return; }
        renderExpenses();
    });
    $('#clearExpenses').addEventListener('click', () => { expenses = []; resetExpenseForm(); $('#expenseError').textContent = ''; renderExpenses(); });
    $$('.mistake-card').forEach(card => card.addEventListener('toggle', () => {
        if (gsapMotion && card.open) gsap.fromTo($('.mistake-content', card), { autoAlpha: 0, height: 0, y: -5 }, { autoAlpha: 1, height: 'auto', y: 0, duration: .3, ease: 'power2.out' });
    }));

    // Other small tools: no eval; a tiny arithmetic parser accepts only numeric expressions.
    $('#budgetForm').addEventListener('submit', event => {
        event.preventDefault();
        const budget = readNumber($('#quickBudget')), spent = readNumber($('#quickSpent'));
        const out = $('#quickBudgetResult');
        out.textContent = budget.error ? `Budget: ${budget.error}` : spent.error ? `Expenses: ${spent.error}` : `Estimated balance: ${money(budget.value - spent.value)}${spent.value > budget.value ? ' · This plan is above the amount entered.' : ''}`;
    });
    $('#categoryForm').addEventListener('submit', event => {
        event.preventDefault();
        const idea = $('#purchaseIdea').value.trim(), reason = $('#purchaseReason').value;
        $('#categoryResult').textContent = !idea ? 'Add a purchase idea first.' : !reason ? 'Choose the main reason for this purchase.' : reason === 'essential' ? `${idea}: this sounds like a need. Check that the amount fits your available plan.` : reason === 'replace' ? `${idea}: replacing a worn item may be a need; consider a practical option that fits your budget.` : `${idea}: this sounds like a want. Consider whether it can wait until essentials and goals are covered.`;
    });
    const calculateExpression = source => {
        const input = source.replace(/[×x]/gi, '*').replace(/[÷]/g, '/').replace(/[−–]/g, '-').replace(/\s+/g, '');
        if (!input || input.length > 40 || !/^[0-9.+*/()\-]+$/.test(input)) throw new Error('Use numbers and + − × ÷ only.');
        const tokens = input.match(/\d*\.?\d+|[()+*/-]/g) || [];
        if (tokens.join('') !== input) throw new Error('Check the expression and try again.');
        let position = 0;
        const parsePrimary = () => {
            const token = tokens[position++];
            if (token === '+' || token === '-') { const value = parsePrimary(); return token === '-' ? -value : value; }
            if (token === '(') { const value = parseSum(); if (tokens[position++] !== ')') throw new Error('Add a closing parenthesis.'); return value; }
            const value = Number(token); if (!Number.isFinite(value)) throw new Error('Check the number.'); return value;
        };
        const parseProduct = () => { let value = parsePrimary(); while (tokens[position] === '*' || tokens[position] === '/') { const op = tokens[position++], rhs = parsePrimary(); if (op === '/' && rhs === 0) throw new Error('Cannot divide by zero.'); value = op === '*' ? value * rhs : value / rhs; } return value; };
        const parseSum = () => { let value = parseProduct(); while (tokens[position] === '+' || tokens[position] === '-') { const op = tokens[position++], rhs = parseProduct(); value = op === '+' ? value + rhs : value - rhs; } return value; };
        const value = parseSum();
        if (position !== tokens.length) throw new Error('Check the expression and parentheses.');
        if (!Number.isFinite(value)) throw new Error('This calculation is outside the supported range.');
        return value;
    };
    $('#simpleCalcForm').addEventListener('submit', event => {
        event.preventDefault();
        try { $('#calcResult').textContent = `Result: ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 6 }).format(calculateExpression($('#calcExpression').value))}`; }
        catch (error) { $('#calcResult').textContent = error.message; }
    });

    // Currency rates are requested live and kept only in memory for this page view.
    let exchangeRates = null;
    const currencyAmount = $('#currencyAmount'), currencyFrom = $('#currencyFrom'), currencyTo = $('#currencyTo');
    const currencyResult = $('#currencyResult');
    const renderCurrencyOptions = rates => {
        const keepFrom = currencyFrom.value, keepTo = currencyTo.value;
        let names;
        try { names = new Intl.DisplayNames(['en'], { type: 'currency' }); } catch { names = null; }
        Object.keys(rates).sort((a, b) => a.localeCompare(b)).forEach((code, index, codes) => {
            if (index === 0) { currencyFrom.replaceChildren(); currencyTo.replaceChildren(); }
            const makeOption = () => { const option = document.createElement('option'); option.value = code; let name = code; try { name = names?.of(code) || code; } catch { name = code; } option.textContent = `${code} · ${name}`; return option; };
            currencyFrom.append(makeOption()); currencyTo.append(makeOption());
        });
        if (rates[keepFrom]) currencyFrom.value = keepFrom;
        if (rates[keepTo]) currencyTo.value = keepTo;
    };
    const convertCurrency = () => {
        if (!exchangeRates) { currencyResult.textContent = 'Current rates are unavailable. Connect to the internet and try again.'; currencyResult.classList.add('error'); return; }
        const raw = currencyAmount.value.trim(), amount = Number(raw), from = currencyFrom.value, to = currencyTo.value;
        if (!raw || !Number.isFinite(amount) || amount < 0) { currencyResult.textContent = 'Enter a valid amount of zero or more.'; currencyResult.classList.add('error'); return; }
        const fromRate = exchangeRates[from], toRate = exchangeRates[to];
        if (!Number.isFinite(fromRate) || fromRate <= 0 || !Number.isFinite(toRate)) { currencyResult.textContent = 'That currency is not available in the current rate set.'; currencyResult.classList.add('error'); return; }
        const converted = amount / fromRate * toRate;
        if (!Number.isFinite(converted)) { currencyResult.textContent = 'This amount is outside the supported range.'; currencyResult.classList.add('error'); return; }
        let formatted;
        try { formatted = new Intl.NumberFormat(undefined, { style: 'currency', currency: to, maximumFractionDigits: 2 }).format(converted); } catch { formatted = `${converted.toFixed(2)} ${to}`; }
        currencyResult.classList.remove('error'); currencyResult.textContent = `${amount.toLocaleString()} ${from}  ≈  ${formatted}`;
        if (gsapMotion) gsap.fromTo(currencyResult, { autoAlpha: .55, y: 5 }, { autoAlpha: 1, y: 0, duration: .3, ease: 'power2.out' });
    };
    $('#currencyForm').addEventListener('submit', event => { event.preventDefault(); convertCurrency(); });
    $('#swapCurrency').addEventListener('click', () => { const previous = currencyFrom.value; currencyFrom.value = currencyTo.value; currencyTo.value = previous; convertCurrency(); });
    const loadExchangeRates = async () => {
        const controller = new AbortController(), timeout = window.setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal, cache: 'no-store' });
            if (!response.ok) throw new Error('Rate service returned an error.');
            const data = await response.json();
            if (data.result !== 'success' || !data.rates || !Number.isFinite(data.rates.PKR)) throw new Error('Rate data is incomplete.');
            exchangeRates = data.rates; renderCurrencyOptions(exchangeRates);
            const updated = data.time_last_update_utc ? new Date(data.time_last_update_utc) : null;
            $('#rateUpdated').textContent = updated && Number.isFinite(updated.valueOf()) ? `Daily rate updated ${updated.toLocaleDateString()}.` : 'Daily reference rates loaded.';
            convertCurrency();
        } catch {
            $('#rateUpdated').textContent = 'Could not reach the live rate service.';
            currencyResult.textContent = 'Live rates could not load. You can retry when connected.';
            currencyResult.classList.add('error');
        } finally { window.clearTimeout(timeout); }
    };
    loadExchangeRates();

    // Search the educational cards and site sections; gallery filters remain usable together with search.
    const searchableContent = [
        ['Budgeting basics', 'Income, fixed costs, variable costs, needs, wants and savings', '#basics', 'budgeting'],
        ['Needs vs wants', 'Essentials, optional purchases and the four-question pause', '#needs-wants', 'needs'],
        ['50 / 30 / 20 guide', 'A sample framework for monthly needs, wants and savings', '#tools', 'budgeting'],
        ['Savings goals', 'Set a target and estimate how long regular contributions may take', '#tools', 'saving'],
        ['Expense planner', 'Plan food, transport, education, shopping and other expenses', '#tools', 'expenses'],
        ['Money mistakes', 'Impulse buying, small costs, late payments and subscriptions', '#mistakes', 'budgeting'],
        ['Learning gallery', 'Visual lessons about budgets, saving, expenses and needs', '#gallery', 'budgeting'],
        ['BudgetBee AI', 'Ask an educational guide about saving and student spending', '#assistant', 'budgeting']
    ];
    const search = $('#globalSearch'), searchResults = $('#searchResults');
    const galleryCards = $$('.gallery-card');
    let activeFilter = 'all';
    const runSearch = () => {
        const query = search.value.trim().toLowerCase();
        galleryCards.forEach(card => {
            if (gsapMotion) gsap.killTweensOf(card);
            const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
            const queryMatches = !query || `${card.dataset.search} ${card.innerText}`.toLowerCase().includes(query);
            const show = categoryMatches && queryMatches;
            if (gsapMotion && show && card.hidden) {
                card.hidden = false;
                gsap.fromTo(card, { autoAlpha: 0, scale: .94, y: 12 }, { autoAlpha: 1, scale: 1, y: 0, duration: .34, ease: 'power2.out', overwrite: true });
            } else if (gsapMotion && !show && !card.hidden) {
                gsap.to(card, { autoAlpha: 0, scale: .96, duration: .18, onComplete: () => { card.hidden = true; }, overwrite: true });
            } else card.hidden = !show;
        });
        const visible = galleryCards.some(card => !card.hidden);
        $('#galleryEmpty').hidden = visible;
        if (!query) { searchResults.hidden = true; searchResults.replaceChildren(); return; }
        const matches = searchableContent.filter(([, text, , category]) => `${text} ${category}`.toLowerCase().includes(query));
        searchResults.replaceChildren();
        if (!matches.length) { const empty = document.createElement('p'); empty.textContent = 'No matching learning content found.'; searchResults.append(empty); }
        else matches.slice(0, 6).forEach(([title, text, href]) => { const link = document.createElement('a'); link.href = href; link.innerHTML = `<span><b>${title}</b><br>${text}</span><span aria-hidden="true">↗</span>`; link.addEventListener('click', () => { searchResults.hidden = true; }); searchResults.append(link); });
        searchResults.hidden = false;
        if (gsapMotion) gsap.fromTo(searchResults.children, { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, stagger: .035, duration: .2, overwrite: true });
    };
    search.addEventListener('input', runSearch);
    $$('.filter-chip').forEach(button => button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        $$('.filter-chip').forEach(chip => chip.classList.toggle('active', chip === button));
        runSearch();
    }));
    document.addEventListener('click', event => { if (!event.target.closest('.search-panel')) searchResults.hidden = true; });

    // Local rule-based learning responses. This intentionally works without an API key or network.
    const intentPatterns = [
        { keys: ['50/30/20', '50-30-20', '50 30 20', 'rule', 'fifty'], answer: 'The 50/30/20 guide is a simple example: 50% for needs, 30% for wants, and 20% for savings. It is a learning framework, not a rule everyone must follow. Try the calculator to see what those percentages look like for a sample income.' },
        { keys: ['need', 'needs', 'essential'], answer: 'A need is something important for health, safety, or an essential responsibility, such as basic food, safe housing, or a required textbook. Context matters: the same item can be a need for one person and a want for another.' },
        { keys: ['want', 'wants', 'impulse', 'buy'], answer: 'A want is something optional that you would enjoy, but can usually delay. Before buying, pause and ask: do I need it now, can I afford it after essentials, can I wait, and will it help me long-term?' },
        { keys: ['save', 'saving', 'savings', 'goal', 'target'], answer: 'Start with a clear, realistic goal. Subtract what you have already saved from the target, then divide what remains by the amount you can set aside each month. The result is an estimate; plans and costs can change.' },
        { keys: ['expense', 'expenses', 'spend', 'spending', 'overspend'], answer: 'Try listing your expected costs by category, then compare the total with the income you are planning around. Keeping a short note of small purchases can reveal patterns without judging yourself.' },
        { keys: ['budget', 'income', 'monthly', 'plan'], answer: 'A simple budget starts with the money you expect to receive, then lists essential and flexible expenses plus savings goals. Make a plan that fits your circumstances, and revisit it as things change.' },
        { keys: ['mistake', 'subscription', 'late payment', 'small cost'], answer: 'Common student money slips include unplanned purchases, overlooked small costs, forgotten due dates, unused subscriptions, and spending without a plan. A weekly check-in or calendar reminder can help build awareness.' },
        { keys: ['hello', 'hi ', 'hey', 'salam'], answer: 'Hello! I can help with budgeting basics, savings goals, needs versus wants, expenses, and student spending. What would you like to understand?' }
    ];
    const localizedSnippets = {
        roman: [
            '50/30/20 ek simple misaali framework hai: 50% zarooriyat, 30% khwahishat, aur 20% bachat ke liye. Har shakhs ke halaat mukhtalif ho sakte hain.',
            'Need woh cheez hai jo sehat, hifazat, ya zaroori taleemi zimmedari ke liye aham ho, jaise basic khana ya required textbook. Halaat se farq parta hai.',
            'Want ek optional cheez hoti hai jo achi lagti hai magar aksar baad mein li ja sakti hai. Pehle sochain: kya zaroorat hai, afford kar sakte hain, aur kya intezar mumkin hai?',
            'Pehle clear aur realistic savings goal rakhein. Target mein se pehle ki bachat minus karein, phir baqi raqam ko monthly contribution se divide karein. Yeh sirf andaza hai.',
            'Expected kharchon ko categories mein likhein aur total ko planned income se compare karein. Chhoti purchases ka note rakhna spending samajhne mein madad karta hai.',
            'Simple budget ke liye planned income likhein, phir zaroori kharchay, flexible expenses, aur savings goals dekhein. Halaat badlein to plan dobara dekhein.',
            'Students ki aam ghaltiyon mein jaldi khareedna, chhote kharch bhoolna, due dates miss karna, unused subscriptions, aur baghair plan ke spending shamil hain.',
            'Assalam-o-alaikum! Main budgeting, saving goals, needs aur wants, expenses, aur student spending par madad kar sakta hoon. Aap kya seekhna chahein ge?'
        ],
        ur: ['50/30/20 ایک سادہ تعلیمی مثال ہے: 50٪ ضروریات، 30٪ خواہشات، اور 20٪ بچت کے لیے۔ ہر شخص کے حالات مختلف ہوتے ہیں۔', 'ضرورت ایسی چیز ہے جو صحت، حفاظت یا تعلیم کی لازمی ذمہ داری کے لیے اہم ہو، جیسے بنیادی خوراک یا مطلوبہ درسی کتاب۔', 'خواہش ایک اختیاری چیز ہے جو اچھی لگتی ہے مگر عموماً بعد میں لی جا سکتی ہے۔ خریدنے سے پہلے اپنی ترجیحات اور بجٹ دیکھیں۔', 'ایک واضح اور حقیقت پسندانہ بچت کا ہدف مقرر کریں۔ ہدف میں سے موجودہ بچت نکالیں، پھر باقی رقم کو ماہانہ بچت سے تقسیم کریں۔ یہ صرف اندازہ ہے۔', 'متوقع اخراجات کو زمروں میں لکھیں اور کل رقم کو آمدنی سے ملائیں۔ چھوٹے اخراجات نوٹ کرنے سے عادات سمجھنے میں مدد ملتی ہے۔', 'سادہ بجٹ کے لیے آمدنی لکھیں، پھر ضروری اخراجات، اختیاری خرچ اور بچت کے اہداف دیکھیں۔ حالات بدلیں تو منصوبہ دوبارہ دیکھیں۔', 'عام غلطیوں میں فوری خریداری، چھوٹے اخراجات بھولنا، تاریخ پر ادائیگی نہ کرنا، غیر استعمال شدہ سبسکرپشن اور بغیر منصوبہ خرچ شامل ہیں۔', 'السلام علیکم! میں بجٹ، بچت کے اہداف، ضروریات اور خواہشات، اخراجات اور طلبہ کے خرچ کے بارے میں مدد کر سکتا ہوں۔'],
        es: ['La regla 50/30/20 es una guía educativa: 50% para necesidades, 30% para deseos y 20% para ahorrar. Tu situación puede requerir otra distribución.', 'Una necesidad ayuda a cubrir salud, seguridad o una responsabilidad esencial, como comida básica o un libro obligatorio.', 'Un deseo es algo opcional que normalmente puede esperar. Antes de comprar, revisa tus prioridades y tu presupuesto.', 'Define una meta de ahorro realista. Resta lo que ya tienes y divide el resto por tu aporte mensual; es solo una estimación.', 'Anota los gastos previstos por categoría y compáralos con los ingresos planeados. Registrar compras pequeñas ayuda a entender hábitos.', 'Empieza con tus ingresos previstos, los gastos esenciales, los gastos flexibles y tus metas de ahorro. Revisa el plan cuando cambie tu situación.', 'Errores frecuentes: compras impulsivas, olvidar gastos pequeños, pagos tardíos, suscripciones sin uso y gastar sin un plan.', '¡Hola! Puedo explicar presupuestos, ahorro, necesidades, deseos y gastos de estudiantes. ¿Qué te gustaría aprender?'],
        fr: ['La règle 50/30/20 est un repère éducatif : 50 % pour les besoins, 30 % pour les envies et 20 % pour l’épargne. Votre situation peut être différente.', 'Un besoin répond à la santé, à la sécurité ou à une obligation essentielle, comme des aliments de base ou un manuel requis.', 'Une envie est facultative et peut souvent attendre. Avant un achat, vérifiez vos priorités et votre budget.', 'Choisissez un objectif d’épargne réaliste. Soustrayez l’épargne actuelle puis divisez le reste par votre contribution mensuelle. C’est une estimation.', 'Notez les dépenses prévues par catégorie et comparez-les aux revenus envisagés. Suivre les petits achats aide à comprendre ses habitudes.', 'Commencez par les revenus prévus, les dépenses essentielles, les dépenses flexibles et vos objectifs d’épargne. Révisez le plan si la situation change.', 'Erreurs fréquentes : achats impulsifs, petits frais oubliés, paiements tardifs, abonnements inutilisés et dépenses sans plan.', 'Bonjour ! Je peux expliquer le budget, l’épargne, les besoins, les envies et les dépenses étudiantes. Que souhaitez-vous apprendre ?'],
        de: ['Die 50/30/20-Regel ist eine Lernhilfe: 50 % für Bedürfnisse, 30 % für Wünsche und 20 % zum Sparen. Deine Situation kann anders sein.', 'Ein Bedürfnis ist wichtig für Gesundheit, Sicherheit oder eine notwendige Verpflichtung, zum Beispiel Grundnahrung oder ein Pflichtbuch.', 'Ein Wunsch ist optional und kann oft warten. Prüfe vor dem Kauf deine Prioritäten und dein Budget.', 'Setze ein realistisches Sparziel. Ziehe dein vorhandenes Guthaben ab und teile den Rest durch deinen monatlichen Beitrag. Das ist nur eine Schätzung.', 'Notiere geplante Ausgaben nach Kategorien und vergleiche sie mit dem geplanten Einkommen. Kleine Käufe zu notieren macht Gewohnheiten sichtbar.', 'Beginne mit erwartetem Einkommen, notwendigen Kosten, flexiblen Ausgaben und Sparzielen. Überprüfe den Plan bei Veränderungen.', 'Häufige Fehler: Spontankäufe, vergessene Kleinausgaben, verspätete Zahlungen, ungenutzte Abos und Ausgaben ohne Plan.', 'Hallo! Ich kann Budgetplanung, Sparen, Bedürfnisse, Wünsche und studentische Ausgaben erklären. Was möchtest du lernen?'],
        hi: ['50/30/20 एक शैक्षिक उदाहरण है: 50% ज़रूरतों, 30% इच्छाओं और 20% बचत के लिए। हर व्यक्ति की स्थिति अलग हो सकती है।', 'ज़रूरत वह चीज़ है जो स्वास्थ्य, सुरक्षा या पढ़ाई की आवश्यक ज़िम्मेदारी के लिए अहम हो, जैसे बुनियादी भोजन या ज़रूरी पाठ्यपुस्तक।', 'इच्छा एक वैकल्पिक चीज़ है जो अक्सर बाद में ली जा सकती है। खरीदने से पहले अपनी प्राथमिकताएँ और बजट देखें।', 'एक स्पष्ट और वास्तविक बचत लक्ष्य बनाएँ। लक्ष्य में से मौजूदा बचत घटाएँ और बाकी को मासिक योगदान से बाँटें। यह केवल अनुमान है।', 'अपेक्षित खर्चों को श्रेणियों में लिखें और उन्हें नियोजित आय से मिलाएँ। छोटे खर्च लिखने से आदतें समझने में मदद मिलती है।', 'अपनी अपेक्षित आय से शुरू करें, फिर ज़रूरी खर्च, लचीले खर्च और बचत लक्ष्य देखें। परिस्थितियाँ बदलें तो योजना दोबारा देखें।', 'आम गलतियाँ: जल्दबाज़ी में खरीदारी, छोटे खर्च भूलना, देर से भुगतान, इस्तेमाल न होने वाली सदस्यताएँ और बिना योजना खर्च करना।', 'नमस्ते! मैं बजट, बचत लक्ष्य, ज़रूरतों, इच्छाओं और छात्र खर्चों को समझा सकता हूँ। आप क्या सीखना चाहेंगे?'],
        ar: ['قاعدة 50/30/20 مثال تعليمي: 50٪ للاحتياجات، و30٪ للرغبات، و20٪ للادخار. قد تحتاج ظروفك إلى توزيع مختلف.', 'الحاجة شيء مهم للصحة أو السلامة أو مسؤولية أساسية، مثل الطعام الأساسي أو كتاب مطلوب للدراسة.', 'الرغبة شيء اختياري يمكن غالباً تأجيله. قبل الشراء، راجع أولوياتك وميزانيتك.', 'اختر هدف ادخار واقعياً. اطرح مدخراتك الحالية من الهدف، ثم اقسم الباقي على مساهمتك الشهرية. هذا تقدير فقط.', 'دوّن النفقات المتوقعة حسب الفئة وقارنها بالدخل المخطط. تسجيل المشتريات الصغيرة يساعد على فهم العادات.', 'ابدأ بالدخل المتوقع، ثم النفقات الأساسية والمرنة وأهداف الادخار. راجع الخطة عندما تتغير الظروف.', 'من الأخطاء الشائعة الشراء الاندفاعي، ونسيان النفقات الصغيرة، والتأخر في السداد، والاشتراكات غير المستخدمة، والإنفاق بلا خطة.', 'مرحباً! يمكنني شرح الميزانية والادخار والاحتياجات والرغبات ونفقات الطلاب. ماذا تريد أن تتعلم؟'],
        zh: ['50/30/20 是一个学习参考：50% 用于需要，30% 用于想要，20% 用于储蓄。每个人的情况可能不同。', '需要是对健康、安全或必要责任很重要的东西，例如基本食物或课程必需的课本。', '想要是可选的东西，通常可以稍后再买。购买前先看看自己的优先事项和预算。', '设定一个实际的储蓄目标。用目标减去现有储蓄，再除以每月计划存下的金额。这只是估算。', '按类别记录预计支出，并与计划收入比较。记录小额购买有助于了解消费习惯。', '从预计收入开始，再列出必要支出、灵活支出和储蓄目标。情况变化时重新检查计划。', '常见问题包括冲动消费、忽略小额支出、延迟付款、闲置订阅和没有计划地花钱。', '你好！我可以解释预算、储蓄、需要与想要以及学生支出。你想了解什么？'],
        ja: ['50/30/20は学習用の目安です。50％を必要な支出、30％を欲しいもの、20％を貯蓄に分けます。状況に応じて調整してください。', '必要なものは、健康、安全、または学業上の必須事項に関わるものです。基本的な食料や授業で必要な教科書などがあります。', '欲しいものは必須ではなく、後回しにできることが多いものです。買う前に優先順位と予算を確認しましょう。', '現実的な貯蓄目標を決めます。目標額から現在の貯蓄を引き、残りを毎月の貯蓄額で割ると目安の期間が分かります。', '予定している支出を分類して、計画した収入と比べましょう。小さな買い物の記録も習慣を知る助けになります。', '予定収入、必要な支出、調整できる支出、貯蓄目標を書き出します。状況が変わったら見直しましょう。', 'よくある失敗は衝動買い、小さな出費の見落とし、支払いの遅れ、使っていない定期契約、計画のない支出です。', 'こんにちは。予算、貯蓄、必要なものと欲しいもの、学生の支出について説明できます。何を知りたいですか？']
    };
    const getAIResponse = (message, language = 'en') => {
        const normalized = message.toLowerCase();
        const romanUrdu = /\b(kaise|karun|karon|karein|kya|hai|hain|mera|meri|banaun|bachat|kharch|zaroori|paise|mahina|kitna|chahiye|batao|samjhao)\b/i.test(message);
        let index = intentPatterns.findIndex(intent => intent.keys.some(key => normalized.includes(key)));
        if (index < 0 && language === 'en' && romanUrdu) return getLocalized('roman', 5);
        if (index < 0) {
            if (/^[\p{Script=Arabic}\s؟،]+$/u.test(message)) index = 0;
            return language === 'en' ? 'I can help with budgeting, saving, expenses, needs and wants, student spending, and common money habits. Try asking me about a monthly budget or savings goal.' : getLocalized(language, 5);
        }
        if (language === 'en' && romanUrdu) return getLocalized('roman', index);
        if (language === 'en') return intentPatterns[index].answer;
        return getLocalized(language, index);
    };
    const getLocalized = (language, index) => {
        const source = localizedSnippets[language] || localizedSnippets.en;
        return source[index] || intentPatterns[index].answer;
    };
    let persona = 'nova';
    let lastAIResponse = '';
    const addMessage = (text, who) => {
        const row = document.createElement('div'); row.className = `message ${who === 'user' ? 'user-message' : 'ai-message'}`;
        const avatar = document.createElement('span'); avatar.className = 'message-avatar'; avatar.textContent = who === 'user' ? '●' : '✦';
        const content = document.createElement('div');
        const label = document.createElement('small'); label.textContent = who === 'user' ? 'You' : persona === 'nova' ? 'Nova · BudgetBee' : 'Zayn · BudgetBee';
        const paragraph = document.createElement('p'); paragraph.textContent = text; paragraph.lang = $('#languageSelect').value === 'roman' ? 'ur' : $('#languageSelect').value; paragraph.dir = ['ur', 'ar'].includes($('#languageSelect').value) ? 'rtl' : 'auto';
        content.append(label, paragraph); row.append(avatar, content); $('#chatMessages').append(row); $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
        if (gsapMotion) gsap.from(row, { autoAlpha: 0, y: 9, duration: .24, ease: 'power2.out' });
        if (who === 'ai') lastAIResponse = text;
    };
    const sendChat = (message, speak = true) => {
        const clean = message.trim(); if (!clean) return;
        addMessage(clean, 'user');
        const response = getAIResponse(clean, $('#languageSelect').value);
        addMessage(response, 'ai');
        $('#chatStatus').textContent = 'Online · Educational demo';
        if (speak) speakText(response);
    };
    $('#chatForm').addEventListener('submit', event => { event.preventDefault(); const input = $('#chatInput'); sendChat(input.value, true); input.value = ''; input.focus(); });
    const chatPanel = $('.chat-panel');
    const chatPanelHome = chatPanel.parentNode;
    const chatPanelAnchor = chatPanel.nextSibling;
    chatPanel.setAttribute('aria-hidden', 'true');
    let chatReturnFocus = null;
    const openChat = () => {
        chatReturnFocus = document.activeElement;
        if ($('#navLinks').classList.contains('open')) closeMenu();
        $$('.nav-dropdown .nav-drop-trigger').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
        if (chatPanel.parentNode !== document.body) document.body.append(chatPanel);
        document.body.classList.add('chat-open');
        chatPanel.setAttribute('role', 'dialog'); chatPanel.setAttribute('aria-modal', 'false'); chatPanel.setAttribute('aria-label', 'BudgetBee AI chat');
        chatPanel.removeAttribute('aria-hidden');
        window.setTimeout(() => $('#chatInput').focus({ preventScroll: true }), 80);
    };
    const closeChat = () => {
        if (!document.body.classList.contains('chat-open')) return;
        document.body.classList.remove('chat-open'); chatPanel.setAttribute('aria-hidden', 'true');
        if (chatPanel.parentNode === document.body) chatPanelHome.insertBefore(chatPanel, chatPanelAnchor);
        if (chatReturnFocus?.focus) chatReturnFocus.focus({ preventScroll: true });
    };
    $$('#chatLauncher, #closeChat, [data-open-chat]').forEach(button => button.addEventListener('click', event => {
        event.preventDefault();
        if (button.id === 'closeChat') closeChat(); else openChat();
    }));
    $('#assistant').addEventListener('click', event => { if (event.target === $('#assistant')) closeChat(); });
    document.addEventListener('keydown', event => {
        if (!document.body.classList.contains('chat-open')) return;
        if (event.key === 'Escape') { event.preventDefault(); closeChat(); return; }
    });
    $$('.suggested-prompts button').forEach(button => button.addEventListener('click', () => sendChat(button.textContent)));
    $$('.persona-button').forEach(button => button.addEventListener('click', () => setPersona(button.dataset.persona)));
    const setPersona = value => {
        persona = value;
        $$('.persona-button').forEach(button => button.classList.toggle('selected', button.dataset.persona === value));
        $('#assistantName').textContent = value === 'nova' ? 'Nova is here to help.' : 'Zayn is here to help.';
        $('#aiCharacter').classList.toggle('zayn', value === 'zayn');
        $('#chatStatus').textContent = `${value === 'nova' ? 'Nova' : 'Zayn'} · Educational demo`;
        $('#callTitle').textContent = `Talk with ${value === 'nova' ? 'Nova' : 'Zayn'}`;
        $('#callAvatar').textContent = value === 'nova' ? '✦' : '◈';
        if (gsapMotion) gsap.fromTo('#aiCharacter', { rotateY: value === 'nova' ? -14 : 14, scale: .96 }, { rotateY: 0, scale: 1, duration: .55, ease: 'power3.out', transformPerspective: 700 });
    };

    // Native speech support is optional and detected at runtime.
    const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let callRecognition = null;
    let callActive = false;
    let micMuted = false;
    let callSpeakerMuted = false;
    let callVoiceUnavailable = false;
    let callStartedAt = 0;
    let timerHandle = null;
    let preferredVoice = null;
    const voiceNotice = $('#voiceNotice');
    if (!Recognition) {
        voiceNotice.textContent = "Voice input isn't supported in this browser. You can still chat using text.";
        $('#micButton').disabled = true;
    } else {
        try { recognition = new Recognition(); recognition.continuous = false; recognition.interimResults = false; } catch { recognition = null; }
    }
    const languageCode = () => ({ en: 'en-US', ur: 'ur-PK', roman: 'ur-PK', hi: 'hi-IN', ar: 'ar-SA', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', zh: 'zh-CN', ja: 'ja-JP' }[$('#languageSelect').value] || 'en-US');
    const selectedLanguageName = () => ({ en: 'English', ur: 'Urdu', roman: 'Roman Urdu', hi: 'Hindi', ar: 'Arabic', es: 'Spanish', fr: 'French', de: 'German', zh: 'Chinese', ja: 'Japanese' }[$('#languageSelect').value] || 'selected language');
    let availableVoices = [];
    const findVoice = () => {
        if (!synth) return null;
        if (preferredVoice && availableVoices.includes(preferredVoice)) return preferredVoice;
        if (persona === 'nova') return availableVoices.find(voice => /female|woman|zira|samantha|aria|jenny/i.test(voice.name)) || availableVoices[0] || null;
        return availableVoices.find(voice => /male|man|david|guy|daniel/i.test(voice.name)) || availableVoices[0] || null;
    };
    const speakText = text => {
        if (callActive && callSpeakerMuted) return;
        if (!synth) { voiceNotice.textContent = 'Speech playback is not supported here. The text response is available above.'; return; }
        const voice = findVoice();
        if (!voice) { voiceNotice.textContent = `No installed ${selectedLanguageName()} voice was found. Your answer is still available as text.`; return; }
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageCode(); utterance.voice = voice;
        utterance.onstart = () => { $('#chatStatus').textContent = `${persona === 'nova' ? 'Nova' : 'Zayn'} is speaking…`; $('#aiCharacter').classList.add('speaking'); };
        utterance.onend = () => {
            $('#chatStatus').textContent = 'Online · Educational demo'; $('#aiCharacter').classList.remove('speaking');
            if (callActive && !micMuted) window.setTimeout(startCallRecognition, 350);
        };
        utterance.onerror = () => {
            $('#chatStatus').textContent = 'Online · Educational demo'; $('#aiCharacter').classList.remove('speaking');
            voiceNotice.textContent = 'Your browser could not start speech. The answer is still available as text.';
        };
        synth.speak(utterance);
    };
    const voiceSelect = document.createElement('select');
    voiceSelect.id = 'voiceSelect'; voiceSelect.setAttribute('aria-label', 'Choose a browser voice'); voiceSelect.title = 'Choose a browser voice'; voiceSelect.hidden = true;
    voiceSelect.style.cssText = 'max-width:120px;min-height:32px;padding:0 6px;border:1px solid #453032;border-radius:4px;background:#0b0b0b;color:#d7cccc;font-size:9px';
    $('.chat-controls').insertBefore(voiceSelect, $('#voiceCallButton'));
    const onVoiceChange = () => { preferredVoice = voiceSelect.value === '' ? null : availableVoices[Number(voiceSelect.value)] || null; };
    const populateVoices = () => {
        if (!synth) return;
        const languagePrefix = languageCode().split('-')[0].toLowerCase();
        availableVoices = synth.getVoices().filter(voice => voice.lang.toLowerCase().split('-')[0] === languagePrefix);
        voiceSelect.replaceChildren();
        if (availableVoices.length > 1) {
            const automatic = document.createElement('option'); automatic.value = ''; automatic.textContent = 'Auto voice'; voiceSelect.append(automatic);
        }
        availableVoices.forEach((voice, index) => { const option = document.createElement('option'); option.value = String(index); option.textContent = `${voice.name} · ${voice.lang}`; voiceSelect.append(option); });
        voiceSelect.hidden = availableVoices.length === 0;
        if (availableVoices.length === 0) {
            voiceNotice.textContent = `No installed ${selectedLanguageName()} voice was found. Answers will remain available as text.`;
        } else {
            voiceNotice.textContent = 'Replies use the selected language voice when you send a question.';
        }
        voiceSelect.removeEventListener('change', onVoiceChange);
        voiceSelect.addEventListener('change', onVoiceChange);
    };
    if (synth) { populateVoices(); synth.onvoiceschanged = populateVoices; }
    const setRecognitionLanguage = instance => { instance.lang = languageCode(); };
    $('#micButton').addEventListener('click', () => {
        if (!recognition) { voiceNotice.textContent = "Voice input isn't supported in this browser. You can still chat using text."; return; }
        try {
            setRecognitionLanguage(recognition);
            recognition.onstart = () => { $('#chatStatus').textContent = 'Listening…'; $('#aiCharacter').classList.add('listening'); };
            recognition.onend = () => { $('#chatStatus').textContent = 'Online · Educational demo'; $('#aiCharacter').classList.remove('listening'); };
            recognition.onerror = event => { voiceNotice.textContent = event.error === 'not-allowed' ? 'Microphone permission was denied. You can still chat using text.' : 'Voice input ended. You can continue with text chat.'; };
            recognition.onresult = event => { const transcript = event.results[0][0].transcript; $('#chatInput').value = transcript; sendChat(transcript, true); $('#chatInput').value = ''; };
            recognition.start();
        } catch { voiceNotice.textContent = 'Voice input could not start. Please use text chat.'; }
    });
    $('#stopSpeech').addEventListener('click', () => { if (synth) synth.cancel(); $('#chatStatus').textContent = 'Online · Educational demo'; $('#aiCharacter').classList.remove('speaking'); });
    const replayButton = document.createElement('button'); replayButton.type = 'button'; replayButton.className = 'icon-button'; replayButton.textContent = '◖'; replayButton.title = 'Replay the last BudgetBee response'; replayButton.setAttribute('aria-label', 'Replay the last response');
    replayButton.addEventListener('click', () => { if (lastAIResponse) speakText(lastAIResponse); else voiceNotice.textContent = 'Ask BudgetBee a question first, then replay its response.'; });
    $('.chat-controls').insertBefore(replayButton, $('#voiceCallButton'));
    $('#languageSelect').addEventListener('change', () => { preferredVoice = null; if (synth) synth.cancel(); populateVoices(); });

    // Voice conversation modal: browser recognition + local answer + speech synthesis.
    const callOverlay = $('#callOverlay');
    let callWaveTween = null;
    const updateCallTimer = () => { if (!callActive) return; const seconds = Math.floor((Date.now() - callStartedAt) / 1000); $('#callTimer').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; };
    const openCall = () => {
        callOverlay.hidden = false; $('#closeCall').focus(); callActive = true; micMuted = false; callSpeakerMuted = false; callVoiceUnavailable = false; callStartedAt = Date.now();
        $('#toggleCallSpeaker').querySelector('span').textContent = 'Mute audio';
        if (gsapMotion) {
            gsap.fromTo(callOverlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: .22 });
            gsap.fromTo('.call-content', { autoAlpha: 0, y: 22, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .45, ease: 'power3.out' });
            callWaveTween = gsap.to('.call-wave i', { scaleY: 2.4, duration: .3, repeat: -1, yoyo: true, stagger: { each: .07, from: 'center' }, ease: 'sine.inOut' });
        }
        callOverlay.classList.add('active-call'); $('#callStatus').textContent = Recognition ? `${persona === 'nova' ? 'Nova' : 'Zayn'} is listening…` : 'Voice recognition is unavailable here';
        timerHandle = window.setInterval(updateCallTimer, 500); updateCallTimer();
        if (Recognition) startCallRecognition();
    };
    const stopCall = () => {
        callActive = false; window.clearInterval(timerHandle); timerHandle = null;
        if (callRecognition) { try { callRecognition.stop(); } catch { } callRecognition = null; }
        callWaveTween?.kill(); callWaveTween = null;
        if (synth) synth.cancel(); callOverlay.classList.remove('active-call');
        $('#callStatus').textContent = 'Session ended'; $('#callTimer').textContent = '00:00';
    };
    const closeCallModal = () => {
        stopCall();
        const hide = () => { callOverlay.hidden = true; $('#voiceCallButton').focus(); };
        if (gsapMotion) gsap.to('.call-content', { autoAlpha: 0, y: 12, duration: .2, onComplete: hide });
        else hide();
    };
    const startCallRecognition = () => {
        if (!Recognition || !callActive || micMuted || callVoiceUnavailable) return;
        try {
            callRecognition = new Recognition(); callRecognition.continuous = false; callRecognition.interimResults = false; setRecognitionLanguage(callRecognition);
            callRecognition.onstart = () => { if (callActive) $('#callStatus').textContent = `${persona === 'nova' ? 'Nova' : 'Zayn'} is listening…`; };
            callRecognition.onresult = event => {
                const transcript = event.results[0][0].transcript;
                addMessage(transcript, 'user');
                const response = getAIResponse(transcript, $('#languageSelect').value);
                addMessage(response, 'ai');
                $('#callStatus').textContent = `${persona === 'nova' ? 'Nova' : 'Zayn'} is speaking…`;
                speakText(response);
            };
            callRecognition.onerror = event => {
                callVoiceUnavailable = true;
                $('#callStatus').textContent = event.error === 'not-allowed' ? 'Microphone permission was denied. End this session to continue in text.' : 'Voice input paused. Restart the session to try again.';
            };
            callRecognition.onend = () => {
                callRecognition = null;
                if (callActive && !micMuted && !callVoiceUnavailable && !synth?.speaking) window.setTimeout(startCallRecognition, 400);
            };
            callRecognition.start();
        } catch { $('#callStatus').textContent = 'Voice input could not start on this device.'; }
    };
    $('#voiceCallButton').addEventListener('click', openCall);
    $('#closeCall').addEventListener('click', closeCallModal);
    $('#endCall').addEventListener('click', closeCallModal);
    $('#muteCall').addEventListener('click', event => {
        micMuted = !micMuted; event.currentTarget.querySelector('span').textContent = micMuted ? 'Unmute mic' : 'Mute mic';
        if (callRecognition) { try { callRecognition.stop(); } catch { } }
        $('#callStatus').textContent = micMuted ? 'Microphone muted' : `${persona === 'nova' ? 'Nova' : 'Zayn'} is listening…`;
        if (!micMuted) startCallRecognition();
    });
    $('#toggleCallSpeaker').addEventListener('click', event => {
        callSpeakerMuted = !callSpeakerMuted;
        event.currentTarget.querySelector('span').textContent = callSpeakerMuted ? 'Unmute audio' : 'Mute audio';
        if (callSpeakerMuted && synth) synth.cancel();
        $('#callStatus').textContent = callSpeakerMuted ? 'Speaker muted · mic still active' : `${persona === 'nova' ? 'Nova' : 'Zayn'} is listening…`;
    });
    $('#switchCallPersona').addEventListener('click', () => { setPersona(persona === 'nova' ? 'zayn' : 'nova'); if (callActive && !micMuted) { if (callRecognition) { try { callRecognition.stop(); } catch { } } startCallRecognition(); } });
    $('#callOverlay').addEventListener('keydown', event => { if (event.key === 'Escape') closeCallModal(); });
    document.addEventListener('keydown', event => {
        if (event.key === 'Tab' && !callOverlay.hidden) {
            const focusable = $$('button:not([disabled])', callOverlay); const first = focusable[0], last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    // Snapshot uses the in-memory planner values and never persists them.
    const updateSnapshot = () => {
        const rawIncome = $('#plannerIncome').value.trim();
        const income = rawIncome && Number.isFinite(Number(rawIncome)) && Number(rawIncome) >= 0 ? Number(rawIncome) : 0;
        const spent = totals(), remaining = income - spent;
        $('#snapIncome').textContent = money(income); $('#snapExpenses').textContent = money(spent); $('#snapRemaining').textContent = money(remaining);
        $('#snapNeeds').textContent = money(income * .5); $('#snapWants').textContent = money(income * .3); $('#snapSavings').textContent = money(income * .2);
        const expensePercent = income > 0 ? Math.min(spent / income * 100, 100) : 0;
        const remainingPercent = income > 0 ? Math.max(100 - expensePercent, 0) : 0;
        $('#snapPercent').textContent = `${Math.round(expensePercent)}%`;
        $('#snapExpensePct').textContent = `${Math.round(expensePercent)}%`; $('#snapLeftPct').textContent = `${Math.round(remainingPercent)}%`;
        const degrees = expensePercent * 3.6;
        $('#snapshotDonut').style.background = `conic-gradient(#59d1c6 0deg ${degrees}deg,#d6e99e ${degrees}deg 360deg)`;
        const categories = expenses.reduce((totalsByCategory, expense) => {
            totalsByCategory[expense.category] = (totalsByCategory[expense.category] || 0) + expense.amount;
            return totalsByCategory;
        }, {});
        const categoryList = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        const categoryContainer = $('#snapshotCategories');
        categoryContainer.replaceChildren();
        if (!categoryList.length) {
            const empty = document.createElement('p'); empty.textContent = 'No expenses in this session yet.'; categoryContainer.append(empty);
        } else categoryList.forEach(([category, amount]) => {
            const row = document.createElement('div'); row.className = 'snapshot-category-row';
            const label = document.createElement('span'); label.textContent = category;
            const value = document.createElement('b'); value.textContent = money(amount);
            const track = document.createElement('i'); track.className = 'snapshot-category-track';
            const fill = document.createElement('i'); fill.style.width = `${spent > 0 ? amount / spent * 100 : 0}%`; track.append(fill);
            row.append(label, value, track); categoryContainer.append(row);
        });
    };
    const pdfStatus = $('#pdfStatus');
    const getReportLines = () => {
        const rawIncome = $('#plannerIncome').value.trim();
        const income = rawIncome && Number.isFinite(Number(rawIncome)) && Number(rawIncome) >= 0 ? Number(rawIncome) : 0;
        const spent = totals(), categories = expenses.reduce((result, expense) => { result[expense.category] = (result[expense.category] || 0) + expense.amount; return result; }, {});
        return [
            'BUDGETBASICS | BUDGETBEE', 'Personal budget snapshot', `Created: ${new Date().toLocaleString()}`, '',
            `Planned income: ${money(income)}`, `Planned expenses: ${money(spent)}`, `Remaining: ${money(income - spent)}`,
            `Needs guide (50%): ${money(income * .5)}`, `Wants guide (30%): ${money(income * .3)}`, `Savings guide (20%): ${money(income * .2)}`,
            '', 'Expenses by category:', ...(Object.entries(categories).length ? Object.entries(categories).map(([category, value]) => `${category}: ${money(value)}`) : ['No expenses added in this session.']),
            ...(expenses.length ? ['', 'Planned expense details:', ...expenses.map(item => `${item.date} | ${item.category} | ${item.description} | ${money(item.amount)}`)] : []),
            '', 'Savings goal:', ...(currentSavingsGoal ? [`${currentSavingsGoal.name} | target ${money(currentSavingsGoal.target)} | saved ${money(currentSavingsGoal.saved)} | monthly ${money(currentSavingsGoal.monthly)}`] : ['No savings goal has been calculated yet.']),
            '', 'Educational estimate only. The 50/30/20 amounts are a flexible guide, not financial advice.',
            'NEX GEN CODERS | BudgetBasics student project | TechWiz | Aptech Rahim Yar Khan'
        ];
    };
    const createReportPdf = () => {
        const jsPDF = window.jspdf?.jsPDF;
        if (!jsPDF) return null;
        const doc = new jsPDF({ unit: 'mm', format: 'a4' }), pageWidth = doc.internal.pageSize.getWidth(), margin = 18;
        doc.setFillColor(13, 10, 10); doc.rect(0, 0, pageWidth, 35, 'F');
        doc.setTextColor(245, 65, 73); doc.setFont('helvetica', 'bold'); doc.setFontSize(17); doc.text('BUDGETBASICS', margin, 16);
        doc.setTextColor(255, 255, 255); doc.setFontSize(10); doc.text('BUDGETBEE | PERSONAL BUDGET SNAPSHOT', margin, 25);
        doc.setTextColor(35, 30, 30); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
        let y = 46;
        getReportLines().slice(2).forEach(line => {
            const wrapped = doc.splitTextToSize(line || ' ', pageWidth - margin * 2);
            if (y + wrapped.length * 5.5 > 278) { doc.addPage(); y = 20; }
            doc.text(wrapped, margin, y); y += wrapped.length * 5.5 + (line ? 2 : 1);
        });
        const pages = doc.getNumberOfPages();
        for (let page = 1; page <= pages; page++) { doc.setPage(page); doc.setTextColor(130, 120, 120); doc.setFontSize(8); doc.text(`Page ${page} of ${pages}`, pageWidth - margin, 287, { align: 'right' }); }
        return doc;
    };
    const printReportFallback = () => {
        const report = $('#printReport'); report.replaceChildren();
        getReportLines().forEach((line, index) => { const node = document.createElement(index < 2 ? 'h2' : 'p'); node.textContent = line || '\u00a0'; report.append(node); });
        window.print();
    };
    const saveReport = () => {
        try {
            const doc = createReportPdf();
            if (!doc) { pdfStatus.textContent = 'Opening the print dialog so you can choose Save as PDF.'; printReportFallback(); return null; }
            const blob = doc.output('blob'); doc.save('budgetbasics-budget-snapshot.pdf');
            return new File([blob], 'budgetbasics-budget-snapshot.pdf', { type: 'application/pdf' });
        } catch {
            pdfStatus.textContent = 'The PDF could not be created. Use your browser print dialog to save a PDF.';
            printReportFallback(); return null;
        }
    };
    $('#savePdf').addEventListener('click', () => { const file = saveReport(); if (file) pdfStatus.textContent = 'Your budget snapshot PDF is ready and saved to your device.'; });
    $('#printPdf').addEventListener('click', () => { pdfStatus.textContent = 'Print dialog opened. Choose Save as PDF to download a copy.'; printReportFallback(); });
    $('#sharePdf').addEventListener('click', async () => {
        const file = saveReport(); if (!file) return;
        try {
            if (navigator.canShare?.({ files: [file] }) && navigator.share) {
                await navigator.share({ files: [file], title: 'BudgetBasics budget snapshot', text: 'My BudgetBasics calculation snapshot.' });
                pdfStatus.textContent = 'PDF shared.';
            } else pdfStatus.textContent = 'PDF downloaded. Attach it from your files to share it.';
        } catch (error) {
            pdfStatus.textContent = error?.name === 'AbortError' ? 'Share cancelled. The PDF is saved on your device.' : 'PDF downloaded. Attach it from your files to share it.';
        }
    });

    // Itemized bill builder. The QR code stores a short bill summary, not a payment link.
    const billItems = $('#billItems'), billStatus = $('#billStatus');
    let billNumber = `BB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const billMoney = value => `PKR ${Number(value || 0).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const billDate = $('#billDate');
    const today = new Date();
    billDate.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const readBill = () => {
        const rows = [...billItems.querySelectorAll('.bill-item-row')].map(row => ({
            name: row.querySelector('.bill-item-name').value.trim(),
            qty: Number(row.querySelector('.bill-item-qty').value),
            price: Number(row.querySelector('.bill-item-price').value)
        }));
        return {
            issuer: $('#billIssuer').value.trim(), contact: $('#billContact').value.trim(), client: $('#billClient').value.trim(),
            date: billDate.value, note: $('#billNote').value.trim(), rows,
            total: rows.reduce((sum, row) => sum + (Number.isFinite(row.qty * row.price) ? row.qty * row.price : 0), 0)
        };
    };
    const makeBillQr = bill => {
        const qrImage = $('#billQr');
        try {
            if (!window.qrcode) throw new Error('QR library unavailable');
            const qr = window.qrcode(0, 'M');
            qr.addData(`BudgetBasics bill ${billNumber} | To: ${bill.client || 'Customer'} | Date: ${bill.date || '—'} | Total: PKR ${bill.total.toFixed(2)}`);
            qr.make(); qrImage.src = qr.createDataURL(5, 4); qrImage.hidden = false; return qrImage.src;
        } catch { qrImage.hidden = true; return ''; }
    };
    const updateBill = () => {
        const bill = readBill(), rowsHost = $('#billPreviewRows');
        $('#billNumberLabel').textContent = billNumber;
        $('#previewBillNumber').textContent = billNumber;
        $('#previewBillDate').textContent = bill.date || '—';
        $('#previewBillClient').textContent = bill.client || 'Customer';
        $('#previewBillIssuer').textContent = bill.issuer || 'Business / sender';
        $('#previewBillContact').textContent = bill.contact;
        $('#billTotal').textContent = billMoney(bill.total);
        $('#previewBillTotal').textContent = billMoney(bill.total);
        $('#previewBillNote').textContent = bill.note || 'Thank you.';
        rowsHost.replaceChildren();
        const table = document.createElement('table'), head = document.createElement('thead'), headRow = document.createElement('tr');
        ['Description', 'Qty', 'Unit price', 'Amount'].forEach(label => { const th = document.createElement('th'); th.textContent = label; headRow.append(th); });
        head.append(headRow); table.append(head);
        const body = document.createElement('tbody');
        bill.rows.filter(row => row.name || row.price).forEach(row => {
            const tr = document.createElement('tr');
            [row.name || 'Item', String(row.qty || 0), billMoney(row.price), billMoney(row.qty * row.price)].forEach(value => { const td = document.createElement('td'); td.textContent = value; tr.append(td); });
            body.append(tr);
        });
        if (!body.children.length) { const p = document.createElement('p'); p.textContent = 'Add an item to see the bill preview.'; rowsHost.append(p); }
        else { table.append(body); rowsHost.append(table); }
        const qrData = makeBillQr(bill);
        return { ...bill, qrData };
    };
    const validBill = bill => bill.issuer && bill.client && bill.date && bill.rows.length && bill.rows.every(row => row.name && row.qty > 0 && row.price >= 0 && Number.isFinite(row.qty * row.price));
    const ensureBill = () => {
        const bill = updateBill();
        if (!validBill(bill)) { billStatus.textContent = 'Enter a sender, customer, date, and valid item details first.'; return null; }
        if (!bill.qrData) billStatus.textContent = 'QR service is unavailable. Check your connection, then try again.';
        return bill;
    };
    $('#addBillItem').addEventListener('click', () => {
        const row = document.createElement('div'); row.className = 'bill-item-row';
        row.innerHTML = '<input class="bill-item-name" maxlength="80" aria-label="Item description" placeholder="Item or service" required><input class="bill-item-qty" type="number" min="0.01" step="0.01" value="1" aria-label="Quantity" required><input class="bill-item-price" type="number" min="0" step="0.01" placeholder="0.00" aria-label="Unit price in PKR" required><button type="button" class="bill-remove" aria-label="Remove item" title="Remove item">×</button>';
        billItems.append(row); row.querySelector('.bill-item-name').focus(); updateBill();
    });
    billItems.addEventListener('click', event => {
        const button = event.target.closest('.bill-remove'); if (!button) return;
        if (billItems.children.length === 1) { button.closest('.bill-item-row').querySelectorAll('input').forEach(input => input.value = input.classList.contains('bill-item-qty') ? '1' : ''); }
        else button.closest('.bill-item-row').remove();
        updateBill();
    });
    $('#billForm').addEventListener('input', updateBill);
    $('#billForm').addEventListener('submit', event => {
        event.preventDefault(); const bill = ensureBill(); if (!bill) return;
        billStatus.textContent = bill.qrData
            ? `Bill ${billNumber} generated. Its QR code contains a text summary.`
            : `Bill ${billNumber} is ready, but its QR code could not load. Connect to the internet and try again.`;
    });
    const makeBillPdf = bill => {
        const jsPDF = window.jspdf?.jsPDF; if (!jsPDF) return null;
        const doc = new jsPDF({ unit: 'mm', format: 'a4' }), pageWidth = doc.internal.pageSize.getWidth(), margin = 17;
        const paintHeader = () => {
            doc.setFillColor(247, 248, 250); doc.rect(0, 0, pageWidth, 43, 'F');
            doc.setFillColor(229, 9, 20); doc.rect(0, 0, 4, 43, 'F');
            doc.setTextColor(116, 126, 141); doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.text('BUDGETBASICS  /  TECHWIZ', margin, 14);
            doc.setTextColor(24, 31, 43); doc.setFontSize(22); doc.text('INVOICE', margin, 30);
            doc.setTextColor(114, 123, 137); doc.setFontSize(8); doc.text('BILL NUMBER', pageWidth - margin, 14, { align: 'right' });
            doc.setTextColor(25, 32, 44); doc.setFontSize(10); doc.text(billNumber, pageWidth - margin, 20, { align: 'right' });
            doc.setTextColor(114, 123, 137); doc.setFontSize(8); doc.text('ISSUED', pageWidth - margin, 30, { align: 'right' });
            doc.setTextColor(25, 32, 44); doc.setFontSize(9); doc.text(bill.date, pageWidth - margin, 36, { align: 'right' });
        };
        const paintTableHead = y => {
            doc.setFillColor(247, 248, 250); doc.roundedRect(margin, y - 6, pageWidth - margin * 2, 11, 2, 2, 'F');
            doc.setTextColor(105, 116, 132); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
            doc.text('DESCRIPTION', margin + 3, y + 1); doc.text('QTY', 117, y + 1);
            doc.text('UNIT PRICE', 144, y + 1); doc.text('AMOUNT', pageWidth - margin - 3, y + 1, { align: 'right' });
        };
        paintHeader();
        doc.setTextColor(119, 130, 145); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
        doc.text('FROM', margin, 56); doc.text('BILL TO', pageWidth / 2 + 4, 56);
        doc.setTextColor(28, 36, 49); doc.setFontSize(10); doc.text(doc.splitTextToSize(bill.issuer, 78), margin, 63);
        doc.text(doc.splitTextToSize(bill.client, 78), pageWidth / 2 + 4, 63);
        if (bill.contact) { doc.setTextColor(111, 122, 138); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.text(doc.splitTextToSize(bill.contact, 78), margin, 69); }
        doc.setDrawColor(229, 232, 237); doc.line(margin, 77, pageWidth - margin, 77);
        let y = 89; paintTableHead(y); y += 13;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
        for (const row of bill.rows) {
            const wrapped = doc.splitTextToSize(row.name, 84), height = Math.max(9, wrapped.length * 5);
            if (y + height + 10 > 260) { doc.addPage(); paintHeader(); y = 59; paintTableHead(y); y += 13; doc.setFont('helvetica', 'normal'); doc.setFontSize(9); }
            doc.setTextColor(33, 42, 56); doc.text(wrapped, margin + 3, y);
            doc.setTextColor(83, 93, 108); doc.text(String(row.qty), 117, y);
            doc.text(billMoney(row.price), 144, y); doc.setFont('helvetica', 'bold'); doc.setTextColor(25, 32, 44); doc.text(billMoney(row.qty * row.price), pageWidth - margin - 3, y, { align: 'right' });
            doc.setFont('helvetica', 'normal'); y += height + 7; doc.setDrawColor(237, 239, 243); doc.line(margin, y - 4, pageWidth - margin, y - 4);
        }
        if (y + 46 > 270) { doc.addPage(); paintHeader(); y = 62; }
        doc.setFillColor(255, 247, 247); doc.roundedRect(pageWidth - margin - 86, y + 2, 86, 23, 2, 2, 'F');
        doc.setTextColor(158, 40, 48); doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.text('TOTAL DUE', pageWidth - margin - 81, y + 11);
        doc.setTextColor(24, 31, 43); doc.setFontSize(14); doc.text(billMoney(bill.total), pageWidth - margin - 5, y + 19, { align: 'right' }); y += 34;
        if (bill.note) { doc.setTextColor(111, 122, 138); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.text(doc.splitTextToSize(`Note: ${bill.note}`, pageWidth - margin * 2), margin, y); y += 12; }
        if (bill.qrData && y + 38 < 276) { doc.addImage(bill.qrData, 'PNG', margin, y, 30, 30); doc.setFontSize(8); doc.setTextColor(100, 111, 126); doc.text('Scan for bill summary', margin + 36, y + 16); }
        const pages = doc.getNumberOfPages();
        for (let page = 1; page <= pages; page++) { doc.setPage(page); doc.setDrawColor(230, 233, 238); doc.line(margin, 282, pageWidth - margin, 282); doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(122, 132, 146); doc.text('NEX GEN coders  ·  BudgetBasics  ·  TechWiz  ·  Aptech Rahim Yar Khan', margin, 288); doc.text(`${page} / ${pages}`, pageWidth - margin, 288, { align: 'right' }); }
        return doc;
    };
    const prepareBillPrint = bill => {
        const report = $('#printReport'); report.replaceChildren();
        const title = document.createElement('h1'); title.textContent = 'BUDGETBASICS · INVOICE'; title.className = 'print-brand'; report.append(title);
        [`Bill number: ${billNumber}`, `Date: ${bill.date}`, `From: ${bill.issuer}`, `Contact: ${bill.contact || '—'}`, `Bill to: ${bill.client}`].forEach(text => { const p = document.createElement('p'); p.textContent = text; report.append(p); });
        const table = document.createElement('table'), tbody = document.createElement('tbody');
        const labels = ['Description', 'Qty', 'Unit price (PKR)', 'Amount (PKR)']; const header = document.createElement('tr'); labels.forEach(text => { const th = document.createElement('th'); th.textContent = text; header.append(th); }); table.append(header);
        bill.rows.forEach(row => { const tr = document.createElement('tr');[row.name, String(row.qty), billMoney(row.price), billMoney(row.qty * row.price)].forEach(text => { const td = document.createElement('td'); td.textContent = text; tr.append(td); }); tbody.append(tr); }); table.append(tbody); report.append(table);
        const total = document.createElement('h2'); total.textContent = `TOTAL DUE: ${billMoney(bill.total)}`; report.append(total);
        if (bill.note) { const note = document.createElement('p'); note.textContent = `Note: ${bill.note}`; report.append(note); }
        if (bill.qrData) { const image = document.createElement('img'); image.src = bill.qrData; image.alt = 'Bill summary QR code'; image.width = 110; image.height = 110; report.append(image); }
        const footer = document.createElement('p'); footer.textContent = 'NEX GEN coders · BudgetBasics student project · TechWiz · Aptech Rahim Yar Khan, Pakistan'; report.append(footer);
        window.print();
    };
    $('#billPdf').addEventListener('click', () => {
        const bill = ensureBill(); if (!bill) return;
        try {
            const doc = makeBillPdf(bill);
            if (!doc) {
                billStatus.textContent = `PDF library is unavailable. Opening print dialog.${bill.qrData ? '' : ' The QR code is unavailable too.'}`;
                prepareBillPrint(bill); return;
            }
            doc.save(`budgetbasics-${billNumber.toLowerCase()}.pdf`);
            billStatus.textContent = `Bill ${billNumber} downloaded as PDF.${bill.qrData ? '' : ' QR code unavailable; this copy has no QR code.'}`;
        }
        catch { billStatus.textContent = 'Could not create a PDF. Use Print / Save as PDF instead.'; }
    });
    $('#billPrint').addEventListener('click', () => {
        const bill = ensureBill(); if (!bill) return;
        billStatus.textContent = `Choose your printer or Save as PDF in the print dialog.${bill.qrData ? '' : ' The QR code is unavailable.'}`;
        prepareBillPrint(bill);
    });
    updateBill();
    renderExpenses();

    // Feedback and contact forms validate and confirm locally; no form payload is sent or retained.
    $('#feedbackForm').addEventListener('submit', event => {
        event.preventDefault();
        const name = $('#feedbackName').value.trim(), email = $('#feedbackEmail').value.trim(), rating = $('#feedbackRating').value, comments = $('#feedbackComments').value.trim();
        let message = '';
        if (!name || !email || !rating || !comments) message = 'Please complete every field.';
        else if (!emailIsValid(email)) message = 'Enter a valid email address.';
        else if (comments.length < 10 || comments.length > 500) message = 'Comments must be between 10 and 500 characters.';
        $('#feedbackError').textContent = message;
        if (!message) { $('#feedbackSuccess').hidden = false; $('#feedbackForm').reset(); if (gsapMotion) gsap.from('#feedbackSuccess', { autoAlpha: 0, y: 8, duration: .35 }); }
    });
    $('#contactForm').addEventListener('submit', event => {
        event.preventDefault();
        const name = $('#contactName').value.trim(), email = $('#contactEmail').value.trim(), message = $('#contactMessage').value.trim();
        let error = '';
        if (!name || !email || !message) error = 'Please complete every field.';
        else if (!emailIsValid(email)) error = 'Enter a valid email address.';
        else if (message.length < 10 || message.length > 500) error = 'Message must be between 10 and 500 characters.';
        $('#contactError').textContent = error;
        if (!error) { $('#contactSuccess').hidden = false; $('#contactForm').reset(); if (gsapMotion) gsap.from('#contactSuccess', { autoAlpha: 0, y: 8, duration: .35 }); }
    });

    // Session-only visit count; a dynamic date/time display.
    let visits = 0;
    try { visits = Number(sessionStorage.getItem('budgetbasics-visits') || '0'); } catch { /* Session count is a convenience and is optional. */ }
    if (!Number.isFinite(visits) || visits < 0) visits = 0;
    visits += 1;
    try { sessionStorage.setItem('budgetbasics-visits', String(visits)); } catch { /* Continue without session storage. */ }
    $('#visitCount').textContent = new Intl.NumberFormat().format(visits);
    const updateClock = () => {
        const now = new Date();
        $('#localClock').textContent = new Intl.DateTimeFormat('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(now);
        $('#localDate').textContent = new Intl.DateTimeFormat('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }).format(now);
    };
    updateClock(); window.setInterval(updateClock, 1000);
})();
