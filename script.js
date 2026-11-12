document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const navigation = document.querySelector('.primary-nav');
    const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('portfolio-theme-v2');
    } catch {
        savedTheme = null;
    }

    let hasManualTheme = savedTheme === 'light' || savedTheme === 'dark';

    const setTheme = (theme) => {
        document.documentElement.dataset.theme = theme;
        const isDark = theme === 'dark';
        themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle?.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle?.setAttribute('aria-pressed', String(isDark));
        themeColorMeta?.setAttribute('content', isDark ? '#111725' : '#f5f7fb');
    };

    setTheme(hasManualTheme ? savedTheme : 'dark');

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        hasManualTheme = true;
        setTheme(nextTheme);
        try {
            localStorage.setItem('portfolio-theme-v2', nextTheme);
        } catch {
            // The chosen theme remains active for this page view when storage is unavailable.
        }
    });

    const updateHeader = () => {
        header?.classList.toggle('scrolled', window.scrollY > 16);
    };

    const setMenuOpen = (isOpen) => {
        if (!menuToggle || !navigation) return;
        navigation.classList.toggle('mobile-nav-open', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    menuToggle?.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (event) => {
        if (navigation && menuToggle && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    const updateActiveLink = () => {
        const currentSection = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 130);
        navLinks.forEach((link) => {
            const isCurrent = currentSection && link.getAttribute('href') === `#${currentSection.id}`;
            link.classList.toggle('active', Boolean(isCurrent));
            if (isCurrent) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateHeader();
    updateActiveLink();

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.section').forEach((section) => revealObserver.observe(section));
    }
});
