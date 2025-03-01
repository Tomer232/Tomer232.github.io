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
