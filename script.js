document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.primary-nav');
    const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];

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
