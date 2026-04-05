// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // 平滑滚动
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 关闭移动端菜单
                navLinks.classList.remove('active');
                
                // 计算滚动位置
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.section-title, .skill-item, .timeline-item, .education-item, .project-card, .footer-content, .footer-bottom');
    animateElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
    
    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // 3D卡片鼠标跟随效果
    const projectCards3D = document.querySelectorAll('.project-card-3d');
    
    projectCards3D.forEach(card => {
        const container = card.querySelector('.card-3d-container');
        const cardInner = card.querySelector('.card-3d');
        
        if (container && cardInner) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                container.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
            
            card.addEventListener('mouseenter', function() {
                container.style.transition = 'transform 0.1s ease-out';
            });
        }
    });
});