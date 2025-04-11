document.addEventListener('DOMContentLoaded', function() {
    // Only inject styles if they haven't been added already
    if (!document.getElementById('footer-dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'footer-dynamic-styles';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .tooltip {
                position: fixed;
                background-color: var(--first-color);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.8rem;
                pointer-events: none;
                transform: translateY(5px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1000;
                display: none;
            }
            
            .tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: var(--first-color) transparent transparent transparent;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .current-time {
                margin-top: 10px;
                font-weight: bold;
            }
            
            .newsletter {
                text-align: center;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                margin: 20px auto;
                max-width: 500px;
            }
            
            .newsletter-form {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 15px;
            }
            
            .newsletter-form input {
                padding: 8px 12px;
                border-radius: 5px;
                border: 1px solid var(--first-color);
            }
            
            .newsletter-form button {
                padding: 8px 15px;
                background-color: var(--first-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    // Social Icons Animation
    function setupSocialIcons() {
        const socialIcons = document.querySelectorAll('.footer-data-social a i');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);

        socialIcons.forEach(icon => {
            // Wave animation
            icon.addEventListener('mouseenter', () => {
                icon.style.transition = 'all 0.3s ease';
                icon.style.transform = 'translateY(-5px)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0)';
            });

            // Tooltip
            const parentLink = icon.parentElement;
            
            parentLink.addEventListener('mouseenter', (e) => {
                const platform = icon.classList.contains('fa-facebook') ? 'Facebook' :
                                icon.classList.contains('fa-instagram') ? 'Instagram' :
                                icon.classList.contains('fa-whatsapp') ? 'WhatsApp' :
                                icon.classList.contains('fa-snapchat') ? 'Snapchat' : 'Social';
                
                tooltip.textContent = `Visit our ${platform}`;
                tooltip.style.display = 'block';
                
                const rect = parentLink.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            });
            
            parentLink.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    // Contact Numbers Pulse Effect
    function setupContactNumbers() {
        const contactNumbers = document.querySelectorAll('.footer-data p a');
        contactNumbers.forEach(number => {
            number.addEventListener('mouseenter', () => {
                number.style.animation = 'pulse 0.5s ease';
            });
            
            number.addEventListener('animationend', () => {
                number.style.animation = '';
            });
        });
    }

    // Logo Hover Effect
    function setupLogoHover() {
        const logo = document.querySelector('.footer-data h1 a img');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'rotate(5deg) scale(1.05)';
                logo.style.transition = 'all 0.3s ease';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'rotate(0) scale(1)';
            });
        }
    }

    // Parallax Effect
    function setupParallax() {
        const footer = document.querySelector('.footer');
        if (footer) {
            let lastScroll = 0;
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                lastScroll = window.pageYOffset;
                
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        footer.style.backgroundPositionY = lastScroll * 0.3 + 'px';
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            });
        }
    }

    // Update Copyright Year
    function updateCopyrightYear() {
        const copyrightYear = document.querySelector('.copy p');
        if (copyrightYear) {
            const currentYear = new Date().getFullYear();
            copyrightYear.innerHTML = `&copy; ${currentYear} All Rights Reserved`;
        }
    }

    // Visitor Counter
    function setupVisitorCounter() {
        const visitorContainer = document.querySelector('.footer-data:nth-child(2)');
        if (visitorContainer) {
            const visitorCount = document.createElement('p');
            visitorCount.textContent = 'Visitors: Loading...';
            visitorContainer.appendChild(visitorCount);

            // Simulate API call
            setTimeout(() => {
                const count = Math.floor(Math.random() * 1000) + 500;
                visitorCount.textContent = `Visitors: ${count.toLocaleString()}`;
            }, 1500);
        }
    }

    // Time Display
    function setupTimeDisplay() {
        const timeContainer = document.querySelector('.footer-data:nth-child(3)');
        if (timeContainer) {
            const timeDisplay = document.createElement('p');
            timeDisplay.className = 'current-time';
            timeContainer.appendChild(timeDisplay);

            function updateTime() {
                const now = new Date();
                const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                timeDisplay.textContent = `Current time: ${now.toLocaleTimeString([], options)}`;
                
                // Check if we're open
                const hours = now.getHours();
                const isOpen = hours >= 9 && hours < 23; // 11pm is 23
                timeDisplay.style.color = isOpen ? '#4CAF50' : '#F44336';
                timeDisplay.textContent += isOpen ? ' (OPEN NOW)' : ' (CLOSED)';
            }

            updateTime();
            setInterval(updateTime, 1000);
        }
    }

    // Newsletter Form
    function setupNewsletter() {
        const footerList = document.querySelector('.footer-list');
        if (footerList) {
            const newsletter = document.createElement('div');
            newsletter.className = 'newsletter';
            newsletter.innerHTML = `
                <h3>Subscribe to our newsletter</h3>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Subscribe</button>
                </form>
                <p class="newsletter-message"></p>
            `;
            footerList.after(newsletter);

            document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                const message = this.nextElementSibling;
                
                // Simulate subscription
                if (email) {
                    message.textContent = 'Thank you for subscribing!';
                    message.style.color = '#4CAF50';
                    this.reset();
                    
                    setTimeout(() => {
                        message.textContent = '';
                    }, 3000);
                }
            });
        }
    }

    // Ripple Effect
    function setupRippleEffects() {
        const footerDatas = document.querySelectorAll('.footer-data');
        footerDatas.forEach(data => {
            data.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    // Add this to your footer.js
    function setupAnimatedGradient() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Add gradient background style
    footer.style.background = 'linear-gradient(135deg, var(--main-color), var(--second-color), var(--first-color))';
    footer.style.backgroundSize = '300% 300%';
    footer.style.animation = 'gradientShift 15s ease infinite';
    
    // Add to your dynamic styles
    const style = document.createElement('style');
    style.textContent += `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}
    function setupParticleBackground() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    footer.style.position = 'relative';
    footer.style.overflow = 'hidden';

    // Create particle container
    const particles = document.createElement('div');
    particles.style.position = 'absolute';
    particles.style.top = '0';
    particles.style.left = '0';
    particles.style.width = '100%';
    particles.style.height = '100%';
    particles.style.zIndex = '0';
    particles.style.pointerEvents = 'none';
    footer.prepend(particles);

    // Generate particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Animation
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particle);
    }

    // Add animation to styles
    const style = document.createElement('style');
    style.textContent += `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 1; }
            50% { transform: translateY(-100px) translateX(50px); }
            100% { transform: translateY(0) translateX(100px); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}
function setupGeometricPattern() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    footer.style.backgroundImage = `
        linear-gradient(45deg, var(--first-color) 25%, transparent 25%),
        linear-gradient(-45deg, var(--first-color) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--first-color) 75%),
        linear-gradient(-45deg, transparent 75%, var(--first-color) 75%)
    `;
    footer.style.backgroundSize = '40px 40px';
    footer.style.backgroundPosition = '0 0, 0 20px, 20px -20px, -20px 0px';
    footer.style.backgroundColor = 'var(--main-color)';
}
function setupWaveAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    footer.style.position = 'relative';
    footer.style.overflow = 'hidden';

    // Create wave container
    const waves = document.createElement('div');
    waves.style.position = 'absolute';
    waves.style.bottom = '0';
    waves.style.left = '0';
    waves.style.width = '100%';
    waves.style.height = '100px';
    waves.style.zIndex = '0';
    footer.prepend(waves);

    // Add SVG wave
    waves.innerHTML = `
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="width: 100%; height: 100%;">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="var(--first-color)" 
                  opacity="0.25"
                  style="animation: wave 10s linear infinite;"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                  fill="var(--first-color)" 
                  opacity="0.5"
                  style="animation: wave 15s linear infinite reverse;"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                  fill="var(--first-color)"
                  style="animation: wave 20s linear infinite;"></path>
        </svg>
    `;

    // Add animation to styles
    const style = document.createElement('style');
    style.textContent += `
        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(style);
}
    // Add this with your other functions
function setupWaveAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Only add if not already added
    if (footer.querySelector('.wave-container')) return;

    footer.style.position = 'relative';
    footer.style.overflow = 'hidden';

    // Create wave container
    const waves = document.createElement('div');
    waves.className = 'wave-container';
    waves.style.position = 'absolute';
    waves.style.bottom = '0';
    waves.style.left = '0';
    waves.style.width = '100%';
    waves.style.height = '100px';
    waves.style.zIndex = '0';
    footer.prepend(waves);

    // Add SVG wave
    waves.innerHTML = `
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="footer-wave">
            <path class="wave-1" 
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="var(--first-color)"></path>
            <path class="wave-2"
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                  fill="var(--first-color)"></path>
            <path class="wave-3"
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                  fill="var(--first-color)"></path>
        </svg>
    `;

    // Add to your dynamic styles if not already present
    if (!document.getElementById('wave-styles')) {
        const style = document.createElement('style');
        style.id = 'wave-styles';
        style.textContent = `
            .wave-container {
                opacity: 0.8;
            }
            .wave-1 {
                opacity: 0.25;
                animation: wave 10s linear infinite;
            }
            .wave-2 {
                opacity: 0.5;
                animation: wave 15s linear infinite reverse;
            }
            .wave-3 {
                animation: wave 20s linear infinite;
            }
            @keyframes wave {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .footer-content {
                position: relative;
                z-index: 10;
            }
        `;
        document.head.appendChild(style);
    }
}

// Then call it in your initialization:
setupWaveAnimation();
    // Initialize all features
setupSocialIcons();
    setupContactNumbers();
    setupLogoHover();
    setupParallax();
    updateCopyrightYear();
    setupVisitorCounter();
    setupTimeDisplay();
    setupNewsletter();
    setupRippleEffects();
    
});