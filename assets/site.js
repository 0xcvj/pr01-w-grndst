(function() {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var year = document.getElementById('year');
  var leadForm = document.getElementById('leadForm');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function closeMenu() {
    if (!toggle || !mobileMenu) return;
    mobileMenu.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function() {
      var isOpen = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.setAttribute('data-open', String(!isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (leadForm) {
    leadForm.addEventListener('submit', function(event) {
      event.preventDefault();

      var btn = leadForm.querySelector('.submit');
      var formStatus = leadForm.querySelector('#formStatus');

      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(leadForm.action, {
        method: 'POST',
        body: new FormData(leadForm),
        headers: { Accept: 'application/json' }
      })
        .then(function(response) {
          if (response.ok) {
            btn.textContent = 'Message sent';
            if (formStatus) {
              formStatus.textContent = 'Thanks. We will follow up within one business day.';
            }
            leadForm.reset();
            return;
          }

          btn.textContent = 'Submit again';
          if (formStatus) {
            formStatus.textContent = 'Something went wrong. Please try again.';
          }
        })
        .catch(function() {
          btn.textContent = 'Submit again';
          if (formStatus) {
            formStatus.textContent = 'Network error. Please check your connection.';
          }
        })
        .finally(function() {
          btn.disabled = false;
          window.setTimeout(function() {
            btn.textContent = 'Send message';
          }, 1800);
        });
    });
  }

  var revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length) {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      revealItems.forEach(function(item) {
        item.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      });

      revealItems.forEach(function(item) {
        revealObserver.observe(item);
      });
    }
  }

  (function() {
    var canvas = document.getElementById('dotCanvas');
    if (!canvas || reduceMotion.matches) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var container = canvas.parentElement;
    var dots = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var animId;
    var SPACING = 18;
    var DOT_RADIUS = 1.5;
    var SCATTER_RADIUS = 80;
    var SCATTER_FORCE = 12;
    var RETURN_SPEED = 0.06;
    var FRICTION = 0.85;

    function initDots() {
      var rect = container.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      var cols = Math.floor(rect.width / SPACING);
      var rows = Math.floor(rect.height / SPACING);
      var offsetX = (rect.width - cols * SPACING) / 2 + SPACING / 2;
      var offsetY = (rect.height - rows * SPACING) / 2 + SPACING / 2;

      for (var r = 0; r < rows; r += 1) {
        for (var c = 0; c < cols; c += 1) {
          var homeX = offsetX + c * SPACING;
          var homeY = offsetY + r * SPACING;
          dots.push({
            homeX: homeX,
            homeY: homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
            opacity: 0.5 + Math.random() * 0.3
          });
        }
      }
    }

    function animate() {
      var rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (var i = 0; i < dots.length; i += 1) {
        var d = dots[i];

        if (mouse.active) {
          var dx = d.x - mouse.x;
          var dy = d.y - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < SCATTER_RADIUS && dist > 0) {
            var force = (SCATTER_RADIUS - dist) / SCATTER_RADIUS;
            var angle = Math.atan2(dy, dx);
            d.vx += Math.cos(angle) * force * SCATTER_FORCE;
            d.vy += Math.sin(angle) * force * SCATTER_FORCE;
          }
        }

        d.vx += (d.homeX - d.x) * RETURN_SPEED;
        d.vy += (d.homeY - d.y) * RETURN_SPEED;
        d.vx *= FRICTION;
        d.vy *= FRICTION;
        d.x += d.vx;
        d.y += d.vy;

        var distFromHome = Math.sqrt(
          (d.x - d.homeX) * (d.x - d.homeX) +
          (d.y - d.homeY) * (d.y - d.homeY)
        );
        var displacement = Math.min(distFromHome / 40, 1);
        var radius = DOT_RADIUS + displacement * 1.5;
        var alpha = d.opacity + displacement * 0.3;

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        ctx.fill();
      }

      animId = window.requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    container.addEventListener('mouseleave', function() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    container.addEventListener('touchmove', function(e) {
      var rect = container.getBoundingClientRect();
      var touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    container.addEventListener('touchend', function() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    var resizeTimer;
    window.addEventListener('resize', function() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function() {
        window.cancelAnimationFrame(animId);
        initDots();
        animate();
      }, 200);
    });

    initDots();
    animate();
  })();
})();
