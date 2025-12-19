// Project navigation arrays - define which projects have which modal types
const projectNavigationData = {
    all: ['employee-retention'],
    documentation: [],
    caseStudy: []
};

// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initContactForm();
    initMobileMenu();
    initScrollIndicator();
    initResumeDownload();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active navigation link based on scroll position
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Scroll effects and animations
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Header background opacity
        const header = document.querySelector('.header');
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.background = `rgba(10, 10, 10, ${opacity})`;
    });
}

// Skill bars animation
function initSkillBars() {
    // This will be triggered by the intersection observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, Math.random() * 500); // Stagger the animations
        }
    });
}

// Contact form functionality with EmailJS
function initContactForm() {
    // Initialize EmailJS with your public key
    emailjs.init("CYiqForLdyqEWb4m5");
    
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Prepare form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send(
                'service_gf2j2gd',    // Your service ID
                'template_364dbv6',   // Your template ID
                {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'harsh.swami.demo@email.com' // Your email
                }
            ).then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully!<br>I\'ll get back to you soon.', 'success');
                    form.reset();
                },
                function(error) {
                    console.log('FAILED...', error);
                    showNotification('Failed to send message. Please try again later.', 'error');
                }
            ).finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles with gaming theme
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, var(--primary-color), #00cc70)' : 'linear-gradient(135deg, var(--secondary-color), #ff3366)'};
        color: var(--primary-bg);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        border: 2px solid ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${type === 'success' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 0, 128, 0.3)'};
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        font-family: var(--font-primary);
        font-weight: 500;
    `;
    
    // Style the notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        line-height: 1.4;
    `;
    
    // Style the message span for better multi-line display
    const messageSpan = notification.querySelector('.notification-content span');
    messageSpan.style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;
    
    // Style the close button to match modal close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-left: auto;
    `;
    
    // Add hover effect to match modal close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = '#ff0080';
        closeBtn.style.background = 'rgba(255, 0, 128, 0.1)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = 'rgba(255, 255, 255, 0.7)';
        closeBtn.style.background = 'none';
        closeBtn.style.transform = 'scale(1)';
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button click functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-open');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = nav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-nav-open');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('mobile-nav-open');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Typing animation for hero subtitle - DISABLED to prevent layout shifts
function initTypingAnimation() {
    // Disabled to prevent layout shifts
    return;
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing animation - DISABLED
// setTimeout(initTypingAnimation, 500);

// Smooth scrolling for CTA buttons
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cursor trail effect (optional gaming enhancement)
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${(trailLength - i) / trailLength};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    // Update trail position
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Initialize cursor trail on larger screens
if (window.innerWidth > 1024) {
    initCursorTrail();
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Any scroll-based animations or calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Project Modal Functionality
const projectData = {
    'employee-retention': {
        title: 'Employee Retention Prediction',
        subtitle: 'Predictive ML model for HR analytics and employee turnover forecasting',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Random Forest', 'Machine Learning'],
        sections: {
            overview: 'A comprehensive machine learning project analyzing HR data to identify key factors influencing employee turnover and develop predictive models for retention forecasting. The project uses various classification algorithms to help organizations improve their retention strategies.',
            challenge: 'Organizations face high turnover rates that negatively impact productivity, morale, and overall performance. Understanding the factors that drive employees to leave is crucial for developing effective retention strategies, but traditional analysis methods often miss complex patterns in employee behavior.',
            solution: 'Developed a complete data science pipeline including data preprocessing, exploratory data analysis (EDA), feature engineering, and model building. Implemented multiple machine learning algorithms including Logistic Regression, Decision Trees, Random Forest, and Gradient Boosting to predict employee turnover. Created visualizations to identify correlations and patterns in employee retention data.',
            results: 'Successfully identified 8 key factors influencing employee retention including satisfaction level, number of projects, evaluation scores, and time spent at company. Built predictive models with high accuracy for forecasting turnover. Provided actionable insights and recommendations for HR teams to improve retention strategies through data-driven decision making.',
            learnings: 'Gained hands-on experience with end-to-end machine learning workflows including data cleaning, handling missing values, encoding categorical variables, and feature scaling. Mastered supervised learning techniques and model evaluation using metrics like accuracy, precision, recall, and F1-score. Learned to translate complex ML results into business-actionable insights for HR strategy optimization.'
        }
    },
    'retention-dashboard': {
        title: 'Player Retention Dashboard',
        subtitle: 'Comprehensive dashboard tracking player retention metrics',
        tech: ['Python', 'Tableau', 'SQL', 'Pandas'],
        sections: {
            overview: 'A comprehensive dashboard system that tracks and analyzes player retention metrics across multiple game titles at Electronic Arts. This project enables data-driven decisions for player engagement strategies and helps product teams understand retention patterns.',
            challenge: 'EA needed a unified view of player retention across different games and platforms. The existing data was scattered across multiple systems, making it difficult to identify trends and optimize engagement strategies.',
            solution: 'Developed an automated data pipeline using Python to collect, clean, and transform player data from multiple sources. Created interactive Tableau dashboards with real-time metrics, cohort analysis, and predictive retention modeling.',
            results: 'Increased team efficiency by 40% in retention analysis. Identified key drop-off points leading to 15% improvement in 30-day retention. Dashboard now used by 12+ product teams across EA.',
            learnings: 'Gained expertise in large-scale data processing, real-time dashboard optimization, and cross-functional stakeholder management. Learned the importance of user-centered design in analytics tools.'
        }
    },
    'player-segmentation': {
        title: 'Player Segmentation Analysis',
        subtitle: 'ML-based player classification for targeted marketing',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
        sections: {
            overview: 'Developed a machine learning model to segment players based on behavior patterns and spending habits. This segmentation enables targeted marketing campaigns and personalized game experiences.',
            challenge: 'EA had millions of players with diverse gaming behaviors, but lacked a systematic way to group them for targeted campaigns. One-size-fits-all marketing was ineffective.',
            solution: 'Used unsupervised learning algorithms (K-means, DBSCAN) to identify distinct player archetypes. Analyzed spending patterns, session frequency, and in-game behavior to create actionable segments.',
            results: 'Identified 8 distinct player segments. Marketing campaign effectiveness increased by 25%. Personalized offers led to 18% increase in conversion rates.',
            learnings: 'Mastered unsupervised learning techniques and gained insights into behavioral analytics. Learned to translate complex ML results into business-actionable recommendations.'
        }
    },
    'ab-testing': {
        title: 'A/B Testing Framework',
        subtitle: 'Automated framework for experiment analysis and statistical testing',
        tech: ['R', 'Power BI', 'Statistics', 'SQL'],
        sections: {
            overview: 'Built a standardized framework for A/B testing analysis that automates statistical significance testing and provides clear recommendations for product features.',
            challenge: 'Product teams were running experiments without consistent statistical rigor. Results interpretation varied between analysts, leading to inconsistent decision-making.',
            solution: 'Created an R-based framework that automates power analysis, significance testing, and effect size calculations. Integrated with Power BI for automated reporting.',
            results: 'Standardized A/B testing across 15+ product teams. Reduced analysis time by 60%. Improved decision confidence with clear statistical guidelines.',
            learnings: 'Deepened understanding of experimental design and statistical inference. Learned to build scalable analytics frameworks for organization-wide use.'
        }
    },
    'revenue-optimization': {
        title: 'Revenue Optimization Model',
        subtitle: 'Predictive modeling for in-game purchase behavior optimization',
        tech: ['Python', 'TensorFlow', 'BigQuery', 'Keras'],
        sections: {
            overview: 'Developed a deep learning model to predict player purchase behavior and optimize pricing strategies for maximum revenue impact while maintaining player satisfaction.',
            challenge: 'EA needed to optimize in-game pricing and promotional strategies but lacked predictive insights into player spending behavior across different price points.',
            solution: 'Built a neural network using TensorFlow to predict purchase likelihood based on player history, game context, and economic factors. Integrated with BigQuery for real-time scoring.',
            results: 'Achieved 85% accuracy in purchase prediction. Optimized pricing led to 12% revenue increase. Reduced churn from pricing decisions by implementing player sensitivity analysis.',
            learnings: 'Gained expertise in deep learning applications for business problems. Learned to balance technical sophistication with practical business implementation.'
        }
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalSubtitle').textContent = project.subtitle;
    
    // Build modal body content
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-tech">
            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        
        <div class="modal-section">
            <h3>Overview</h3>
            <p>${project.sections.overview}</p>
        </div>
        
        <div class="modal-section">
            <h3>Challenge</h3>
            <p>${project.sections.challenge}</p>
        </div>
        
        <div class="modal-section">
            <h3>Solution</h3>
            <p>${project.sections.solution}</p>
        </div>
        
        <div class="modal-section">
            <h3>Results & Impact</h3>
            <p>${project.sections.results}</p>
        </div>
        
        <div class="modal-section">
            <h3>Key Learnings</h3>
            <p>${project.sections.learnings}</p>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set current project for navigation
    window.currentProjectIndex = Object.keys(projectData).indexOf(projectId);
    updateProjectNavigation();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateProject(direction) {
    const currentTitle = document.getElementById('modalTitle').textContent;
    
    // Determine current modal type and get appropriate project array
    let projectArray;
    let isDocumentation = currentTitle.includes('Documentation');
    let isCaseStudy = currentTitle.includes('Case Study');
    
    if (isDocumentation) {
        projectArray = projectNavigationData.documentation;
    } else if (isCaseStudy) {
        projectArray = projectNavigationData.caseStudy;
    } else {
        projectArray = projectNavigationData.all;
    }
    
    // Find current project index in the appropriate array
    const allProjects = projectNavigationData.all;
    const currentProjectId = allProjects[window.currentProjectIndex];
    const currentIndexInArray = projectArray.indexOf(currentProjectId);
    
    // Calculate new index in the filtered array
    const newIndexInArray = (currentIndexInArray + direction + projectArray.length) % projectArray.length;
    const newProjectId = projectArray[newIndexInArray];
    
    // Update the global index to match the new project
    window.currentProjectIndex = allProjects.indexOf(newProjectId);
    
    // Open the same type of modal for the new project
    if (isDocumentation) {
        openDocumentationModal(newProjectId);
    } else if (isCaseStudy) {
        openCaseStudyModal(newProjectId);
    } else {
        openProjectModal(newProjectId);
    }
}

function updateProjectNavigation() {
    const currentTitle = document.getElementById('modalTitle').textContent;
    
    // Get counter element (only inline now)
    const counterInline = document.getElementById('projectCounterInline');
    
    // Get navigation buttons (only inline now)
    const prevBtnInline = document.getElementById('prevProjectInline');
    const nextBtnInline = document.getElementById('nextProjectInline');
    
    // Determine current modal type and get appropriate project array
    let projectArray;
    let isDocumentation = currentTitle.includes('Documentation');
    let isCaseStudy = currentTitle.includes('Case Study');
    
    if (isDocumentation) {
        projectArray = projectNavigationData.documentation;
    } else if (isCaseStudy) {
        projectArray = projectNavigationData.caseStudy;
    } else {
        projectArray = projectNavigationData.all;
    }
    
    // Find current position in the filtered array
    const allProjects = projectNavigationData.all;
    const currentProjectId = allProjects[window.currentProjectIndex];
    const currentIndexInArray = projectArray.indexOf(currentProjectId);
    
    // Update counter based on filtered array
    const counterText = `${currentIndexInArray + 1} / ${projectArray.length}`;
    counterInline.textContent = counterText;
    
    // Enable/disable navigation buttons based on array length
    const isDisabled = projectArray.length <= 1;
    
    // Update navigation buttons
    prevBtnInline.disabled = isDisabled;
    nextBtnInline.disabled = isDisabled;
}

// Close modal on escape key or outside click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeProjectModal();
    }
});

// Handle documentation and case study modals (simplified versions)
function openDocumentationModal(projectId) {
    // Simplified documentation modal - you can expand this
    const project = projectData[projectId];
    if (!project) {
        console.error('Project not found for documentation:', projectId);
        return;
    }
    
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title + ' - Documentation';
    document.getElementById('modalSubtitle').textContent = 'Technical documentation and implementation details';
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-section">
            <h3>Technical Documentation</h3>
            <p>Detailed technical documentation for ${project.title} including API references, implementation guides, and best practices.</p>
            <p><strong>Note:</strong> This is a demo version. In a real implementation, this would contain comprehensive technical documentation, code examples, and API references.</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set current project for navigation
    window.currentProjectIndex = Object.keys(projectData).indexOf(projectId);
    updateProjectNavigation();
}

function openCaseStudyModal(projectId) {
    // Simplified case study modal - you can expand this
    const project = projectData[projectId];
    if (!project) {
        console.error('Project not found for case study:', projectId);
        return;
    }
    
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title + ' - Case Study';
    document.getElementById('modalSubtitle').textContent = 'Detailed case study with methodology and insights';
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-section">
            <h3>Detailed Case Study</h3>
            <p>In-depth case study for ${project.title} including detailed methodology, data analysis, and business insights.</p>
            <p><strong>Note:</strong> This is a demo version. In a real implementation, this would contain comprehensive case study details, charts, graphs, and detailed analysis.</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set current project for navigation
    window.currentProjectIndex = Object.keys(projectData).indexOf(projectId);
    updateProjectNavigation();
}

// Global function to handle all modal types
function openProjectModalGlobal(projectId) {
    console.log('Opening modal for:', projectId); // Debug log
    
    if (projectId === 'ab-testing-docs') {
        // Handle documentation modal for A/B Testing
        console.log('Opening documentation for ab-testing'); // Debug log
        openDocumentationModal('ab-testing');
    } else if (projectId === 'revenue-case-study') {
        // Handle case study modal for Revenue Optimization
        console.log('Opening case study for revenue-optimization'); // Debug log
        openCaseStudyModal('revenue-optimization');
    } else {
        // Handle regular project modal
        console.log('Opening regular modal for:', projectId); // Debug log
        openProjectModal(projectId);
    }
}

// Force resume download functionality
function initResumeDownload() {
    // Function is now handled by inline onclick
}

function forceDownload(element) {
    try {
        // For modern browsers, try the blob approach
        fetch(element.href)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Harsh_Swami_Resume.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(() => {
                // Fallback: open in new window with right-click save option
                window.open(element.href, '_blank');
            });
    } catch (error) {
        // Final fallback
        window.open(element.href, '_blank');
    }
    return false;
}