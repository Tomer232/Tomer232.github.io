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

// Iframe Sizing with postMessage support
function setupIframeResizing(iframeClass) {
    const iframe = document.querySelector(`.${iframeClass}`);
    if (!iframe) return;
    
    // Initial size setup
    iframe.addEventListener('load', () => {
        try {
            // Try to get dimensions from iframe content directly
            const height = iframe.contentDocument.body.scrollHeight;
            const width = iframe.contentDocument.body.scrollWidth;
            iframe.style.height = `${height}px`;
            iframe.style.width = `${width}px`;
        } catch (e) {
            console.warn(`Unable to resize ${iframeClass} directly:`, e);
            // This might happen due to cross-origin restrictions
            // The postMessage approach below will handle it
        }
    });
    
    // Listen for resize messages from the iframe content
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'resize') {
            // Make sure we only resize the correct iframe
            if (event.source === iframe.contentWindow) {
                const { width, height } = event.data;
                
                // Apply dimensions with some padding
                iframe.style.height = `${height + 20}px`;
                
                // Also resize the container if needed
                const container = iframe.closest('.iframe-container');
                if (container) {
                    container.style.height = `${height + 40}px`;
                }
                
                // Adjust card height if needed
                const card = iframe.closest('.card');
                if (card) {
                    // Make sure the card is tall enough
                    const minCardHeight = height + 150; // Add space for heading and buttons
                    if (card.offsetHeight < minCardHeight) {
                        card.style.height = `${minCardHeight}px`;
                    }
                }
            }
        }
    });
}

// Setup iframe sizing for both widgets
setupIframeResizing('weather-iframe');
setupIframeResizing('crypto-iframe');
