window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const logo = document.querySelector('.logo img');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        logo.style.transform = 'scale(0.85)';
        logo.style.opacity = '0.9';
    } else {
        logo.style.transform = 'scale(1)';
        logo.style.opacity = '1';
    }
});