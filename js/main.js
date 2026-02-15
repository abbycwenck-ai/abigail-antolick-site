/* ============================================
   ABIGAIL ANTOLICK - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal animations ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Animated stat counters ---
  const counters = document.querySelectorAll('.stat__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = performance.now();

        const targetNum = parseFloat(target);
        const isDecimal = target.includes('.');

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = targetNum * easeOut;

          if (isDecimal) {
            el.textContent = prefix + current.toFixed(1) + suffix;
          } else {
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = prefix + target + suffix;
          }
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // --- Dashboard mockup chart animation ---
  const chartBars = document.querySelectorAll('.mockup-chart__bar');

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chartBars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.transition = 'height 0.6s ease';
            bar.style.height = bar.getAttribute('data-height') || bar.style.height;
          }, i * 80);
        });
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const chartContainer = document.querySelector('.mockup-chart__bars');
  if (chartContainer) {
    chartObserver.observe(chartContainer);
  }

  // --- Active nav link highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact form handling ---
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual form handler)
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#28c840';
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
