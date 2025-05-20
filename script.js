document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const loader = document.querySelector('.loader');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        backToTop.classList.toggle('active', window.scrollY > 300);
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Video Modal
    const videoBtns = document.querySelectorAll('.video-thumbnail, .video-link');
    const videoModal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.modal-close');
    const videoIframe = document.querySelector('.video-iframe');
    
    function openVideoModal(videoId) {
        videoIframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close modal with Escape key
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                closeVideoModal();
                document.removeEventListener('keydown', escClose);
            }
        });
    }
    
    function closeVideoModal() {
        videoIframe.setAttribute('src', '');
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    videoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.closest('.video-thumbnail')?.getAttribute('data-video-id') || 
                          this.closest('.project-media')?.querySelector('.video-thumbnail')?.getAttribute('data-video-id');
            if (videoId) openVideoModal(videoId);
        });
    });
    
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Animation on Scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 150
    });
    
    
    // Hero image animation on mobile
    function checkHeroPhoto() {
        const heroPhoto = document.querySelector('.hero-photo');
        if (window.innerWidth <= 992) {
            heroPhoto.style.display = 'block';
        }
    }
    
    checkHeroPhoto();
    window.addEventListener('resize', checkHeroPhoto);

    
});