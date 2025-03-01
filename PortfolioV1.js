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

// Replace the setupIframeResizing function in your PortfolioV1.js with this enhanced version

// Improved iframe sizing function
function setupIframeResizing(iframeClass) {
    const iframe = document.querySelector(`.${iframeClass}`);
    if (!iframe) return;
    
    // Handle cross-origin communication
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'resize') {
            // Make sure this message is for this iframe
            if (event.source === iframe.contentWindow) {
                const container = iframe.closest('.iframe-container');
                
                // Remove any fixed dimensions that might be causing black space
                iframe.style.height = '100%';
                iframe.style.width = '100%';
                
                // Ensure container has the right size
                if (container) {
                    container.style.height = `${event.data.height + 20}px`;
                    container.style.minHeight = `${event.data.height}px`;
                    container.style.overflow = 'hidden';
                }
                
                // Adjust parent card if needed
                const card = container ? container.closest('.card') : null;
                if (card) {
                    const totalHeight = event.data.height + 
                                       card.querySelector('h4').offsetHeight + 
                                       40; // padding
                    
                    // Set min-height instead of fixed height
                    card.style.minHeight = `${totalHeight}px`;
                }
            }
        }
    });
    
    // Try direct resize on load
    iframe.addEventListener('load', function() {
        try {
            // Direct access attempt (will work only for same-origin iframes)
            iframe.style.height = '100%';
            iframe.style.width = '100%';
            
            // Force a resize message after load
            setTimeout(() => {
                iframe.contentWindow.postMessage({ type: 'requestResize' }, '*');
            }, 500);
        } catch (e) {
            console.log('Cannot directly access iframe content:', e);
        }
    });
}

// Additional function to ensure iframes are properly sized
function ensureIframesResponsive() {
    // Find all iframes in the widgets section
    const iframes = document.querySelectorAll('.widgets iframe');
    
    iframes.forEach(iframe => {
        // Remove any fixed dimensions
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        
        // Make sure container is properly sized
        const container = iframe.closest('.iframe-container');
        if (container) {
            container.style.overflow = 'hidden';
        }
    });
}

// Run on page load and periodically to ensure proper sizing
document.addEventListener('DOMContentLoaded', function() {
    // Set up iframe resizing for both widgets
    setupIframeResizing('weather-iframe');
    setupIframeResizing('crypto-iframe');
    
    // Initial check
    ensureIframesResponsive();
    
    // Periodic check to ensure proper sizing
    setInterval(ensureIframesResponsive, 2000);
    
    // Also check on window resize
    window.addEventListener('resize', ensureIframesResponsive);
});

// Setup iframe sizing for both widgets
setupIframeResizing('weather-iframe');
setupIframeResizing('crypto-iframe');
