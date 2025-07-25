// Navigation and Scroll Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for all navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll to Top Button
    const scrollTopButton = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 20) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Popup Handling
const popup = document.getElementById('popup');
const aboutBtn = document.getElementById('about-btn');

function togglePopup(show) {
    popup.style.display = show ? 'block' : 'none';
}

aboutBtn.addEventListener('click', () => togglePopup(true));
document.querySelector('.close-btn').addEventListener('click', () => togglePopup(false));

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        togglePopup(false);
    }
});

// Social Links
const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/tomer-karmazin-19182a22a/',
    github: 'https://github.com/Tomer232',
    weatherApp: 'https://github.com/Tomer232/JS-Weather-app',
    cryptoApp: 'https://github.com/Tomer232/Crypto-price-tracker'
};

// Handle all social link clicks
document.addEventListener('click', (e) => {
    const socialTrigger = e.target.closest('[data-social]');
    if (socialTrigger) {
        const socialType = socialTrigger.getAttribute('data-social');
        if (socialLinks[socialType]) {
            window.open(socialLinks[socialType], '_blank');
        }
    }
});

// Featured Project Interaction
document.addEventListener('DOMContentLoaded', () => {
    const featuredProject = document.querySelector('.featured-project');
    
    if (featuredProject) {
        // Add keyboard accessibility
        featuredProject.setAttribute('tabindex', '0');
        featuredProject.setAttribute('role', 'button');
        featuredProject.setAttribute('aria-label', 'View Off-Road Route Planner project');
        
        // Handle keyboard navigation
        featuredProject.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://clever-recreation-production.up.railway.app/', '_blank');
            }
        });
        
        // Add loading state for project buttons
        const projectButtons = featuredProject.querySelectorAll('a');
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add subtle loading indication
                const originalText = button.innerHTML;
                button.style.opacity = '0.7';
                
                // Reset after a short delay
                setTimeout(() => {
                    button.style.opacity = '1';
                }, 200);
            });
        });
    }
});

// Iframe Sizing
function setupIframeResizing(iframeClass) {
    const iframe = document.querySelector(`.${iframeClass}`);
    if (iframe) {
        iframe.addEventListener('load', () => {
            try {
                const height = iframe.contentDocument.body.scrollHeight;
                const width = iframe.contentDocument.body.scrollWidth;
                iframe.style.height = `${height}px`;
                iframe.style.width = `${width}px`;
            } catch (e) {
                console.warn(`Unable to resize ${iframeClass}:`, e);
            }
        });
    }
}

// Setup iframe sizing for both widgets
setupIframeResizing('weather-iframe');
setupIframeResizing('crypto-iframe');

// Scroll to Top Function (for backward compatibility)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Close Popup Function (for backward compatibility)
function closePopup() {
    togglePopup(false);
}
