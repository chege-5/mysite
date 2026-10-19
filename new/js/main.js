/* ============================================
   MAIN.JS — All interactivity (no framework)
   ============================================ */
(function () {
  'use strict';

  var DATA = {
    personal: PERSONAL,
    typeWords: TYPEWORDS,
    skills: SKILLS,
    skillLevels: SKILL_LEVELS,
    projects: PROJECTS,
  };

  /* ========================================
     UTILITY
     ======================================== */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function getEl(id) { return document.getElementById(id); }

  /* ========================================
     CUSTOM CURSOR
     ======================================== */
  function initCursor() {
    var cursor = getEl('cursor');
    if (!cursor) return;
    var dot = $('.cursor-dot', cursor);
    var ring = $('.cursor-ring', cursor);
    if (!dot || !ring) return;

    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
    });

    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = 'translate(' + (rx - 16) + 'px,' + (ry - 16) + 'px)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    $$('a, button, input, textarea, .project-card, .defense-item, .capability-card, .skill-item, .timeline-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = 'rgba(0,255,136,0.8)';
      });
      el.addEventListener('mouseleave', function () {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(0,255,136,0.5)';
      });
    });
  }

  /* ========================================
     SCROLL PROGRESS BAR
     ======================================== */
  function initScrollProgress() {
    var bar = getEl('progressBar');
    if (!bar) return;
    var ticking = false;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ========================================
     NAVBAR — scroll + active section
     ======================================== */
  function initNavbar() {
    var navbar = getEl('navbar');
    var navLinks = $$('.nav-link');

    // Scroll styling
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Active section tracking via IntersectionObserver
    var sections = $$('section[id]');
    if (sections.length) {
      var navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;
              navLinks.forEach(function (link) {
                var isActive = link.getAttribute('data-section') === id;
                link.classList.toggle('active', isActive);
                if (isActive) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
              });
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      sections.forEach(function (s) { navObserver.observe(s); });
    }

    // Smooth scroll for nav links
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#' || !href) return;
        var target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ========================================
     MOBILE MENU
     ======================================== */
  function initMobileMenu() {
    var menu = getEl('mobileMenu');
    var btn = getEl('mobileMenuBtn');
    if (!menu || !btn) return;

    function openMenu() { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); }
    function closeMenu() { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }

    btn.addEventListener('click', openMenu);

    // Close buttons
    $$('.mobile-nav-link', menu).forEach(function (link) {
      link.addEventListener('click', function () {
        var section = link.getAttribute('data-section');
        closeMenu();
        var target = $('#' + section);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    $$('.dialog-close', menu).forEach(function (b) { b.addEventListener('click', closeMenu); });
    $$('.dialog-close-btn', menu).forEach(function (b) { b.addEventListener('click', closeMenu); });

    // Close on overlay click
    menu.addEventListener('click', function (e) {
      if (e.target === menu) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ========================================
     TYPEWRITER EFFECT
     ======================================== */
  function initTypewriter() {
    var el = getEl('typedText');
    if (!el) return;

    var words = DATA.typeWords;
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 90;
    var deletingSpeed = 45;
    var pauseTime = 2200;
    var timer;

    function tick() {
      var word = words[wordIndex % words.length];

      if (isDeleting) {
        el.textContent = word.slice(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = word.slice(0, charIndex + 1);
        charIndex++;
      }

      var delay;

      if (isDeleting) {
        delay = charIndex <= 0 ? 300 : deletingSpeed;
        if (charIndex <= 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 200;
        }
      } else if (charIndex >= word.length) {
        isDeleting = true;
        delay = pauseTime;
      } else {
        delay = typingSpeed;
      }

      timer = setTimeout(tick, delay);
    }

    // Start after a short delay
    timer = setTimeout(tick, 1500);

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(tick, 200);
      }
    });
  }

  /* ========================================
     REVEAL ANIMATIONS (IntersectionObserver)
     ======================================== */
  function initReveals() {
    var reveals = $$('.reveal, .text-reveal, .stagger-container');
    if (!reveals.length) return;

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Handle stagger children
            var staggerItems = entry.target.querySelectorAll('[data-stagger]');
            if (staggerItems.length) {
              staggerItems.forEach(function (item) {
                var delay = parseFloat(item.getAttribute('data-stagger')) || 0;
                item.style.transitionDelay = delay + 's';
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ========================================
     PROGRESS RINGS (Competencies)
     ======================================== */
  function initProgressRings() {
    var container = getEl('progressRings');
    if (!container) return;

    var circumference = 2 * Math.PI * 26; // r=26

    DATA.skillLevels.forEach(function (skill, i) {
      var wrapper = document.createElement('div');
      wrapper.className = 'progress-ring';
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(12px)';
      wrapper.style.transition = 'opacity 0.5s ease ' + (i * 0.06) + 's, transform 0.5s ease ' + (i * 0.06) + 's';

      var percentage = skill.value;
      var dashoffset = circumference - (percentage / 100) * circumference;

      wrapper.innerHTML =
        '<div class="progress-ring-visual">' +
          '<svg class="progress-ring-svg" viewBox="0 0 56 56">' +
            '<circle class="progress-ring-bg" cx="28" cy="28" r="26"></circle>' +
            '<circle class="progress-ring-fg" cx="28" cy="28" r="26" ' +
              'stroke-dasharray="' + circumference + '" ' +
              'stroke-dashoffset="' + circumference + '" ' +
              'style="transition: stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) ' + (i * 0.08) + 's;"></circle>' +
          '</svg>' +
          '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:var(--color-fg);font-variant-numeric:tabular-nums;">' + percentage + '%</div>' +
        '</div>' +
        '<span class="progress-ring-name">' + skill.name + '</span>';

      container.appendChild(wrapper);
    });

    // Animate when visible
    var ringObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var rings = container.querySelectorAll('.progress-ring');
            rings.forEach(function (ring, i) {
              setTimeout(function () {
                ring.style.opacity = '1';
                ring.style.transform = 'translateY(0)';
                var fg = $('.progress-ring-fg', ring);
                if (fg) {
                  var skill = DATA.skillLevels[i];
                  fg.style.strokeDashoffset = circumference - (skill.value / 100) * circumference;
                }
              }, i * 80);
            });
            ringObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    ringObserver.observe(container);
  }

  /* ========================================
     SECURITY DIAGRAM
     ======================================== */
  function initSecurityDiagram() {
    var defenseDots = getEl('defenseDots');
    var attackDots = getEl('attackDots');
    var attackLines = getEl('attackLines');
    var defenseLines = getEl('defenseLines');

    if (!defenseDots) return;

    // Defense dots (green, on left)
    var defensePositions = [
      { x: 50, y: 50 }, { x: 50, y: 90 }, { x: 50, y: 130 },
      { x: 50, y: 170 }, { x: 50, y: 210 },
    ];
    defensePositions.forEach(function (pos, i) {
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', pos.x);
      dot.setAttribute('cy', pos.y);
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', 'rgba(0,255,136,' + (0.3 + i * 0.08) + ')');
      defenseDots.appendChild(dot);
    });

    // Attack dots (orange, on right)
    var attackPositions = [
      { x: 310, y: 60 }, { x: 310, y: 120 }, { x: 310, y: 180 },
    ];
    attackPositions.forEach(function (pos) {
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', pos.x);
      dot.setAttribute('cy', pos.y);
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', 'rgba(255,122,24,0.5)');
      attackDots.appendChild(dot);
    });

    // Attack lines (orange, from right to center)
    var attackPaths = [
      'M310,60 C200,80 150,100 100,120',
      'M310,120 C200,130 150,140 100,140',
      'M310,180 C200,170 150,160 100,160',
    ];
    attackPaths.forEach(function (d) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(255,122,24,0.3)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('stroke-dasharray', '4 4');
      attackLines.appendChild(path);
    });

    // Defense lines (green, from center to left)
    var defensePaths = [
      'M100,120 C150,100 200,80 250,60',
      'M100,140 C150,130 200,120 250,110',
      'M100,160 C150,150 200,170 250,190',
    ];
    defensePaths.forEach(function (d) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(0,255,136,0.3)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('stroke-dasharray', '4 4');
      defenseLines.appendChild(path);
    });
  }

  /* ========================================
     PROJECTS LIST
     ======================================== */
  function renderProjects() {
    var list = getEl('projectsList');
    if (!list) return;

    DATA.projects.forEach(function (project, i) {
      var accentClass = project.accent === 'green' ? 'text-green' : 'text-orange';
      var techBadges = project.technologies.slice(0, 5).map(function (t) {
        return '<span class="tech-badge">' + t + '</span>';
      }).join('');

      var li = document.createElement('li');
      li.innerHTML =
        '<button class="project-card" data-project="' + project.id + '" type="button">' +
          '<div class="project-card-visual">' +
            renderProjectVisual(project.visualType, project.accent) +
          '</div>' +
          '<div class="project-card-content">' +
            '<span class="badge ' + accentClass + '">PROJECT 0' + (i + 1) + '</span>' +
            '<h3>' + project.title + '</h3>' +
            '<span class="subtitle">' + project.subtitle + '</span>' +
            '<p>' + project.description + '</p>' +
            '<div class="tech-badges">' + techBadges + '</div>' +
            '<div style="position:absolute;right:1.5rem;bottom:1.5rem;display:flex;align-items:center;gap:0.25rem;color:var(--color-fg-subtle);">' +
              '<span class="text-xs">Learn more</span>' +
              '<svg class="icon arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>' +
            '</div>' +
          '</div>' +
        '</button>';
      list.appendChild(li);
    });

    // Project dialog
    var dialog = getEl('projectDialog');
    if (dialog) {
      var closeBtn = $('.dialog-close', dialog);
      if (closeBtn) closeBtn.addEventListener('click', function () { closeDialog('projectDialog'); });
      dialog.addEventListener('click', function (e) { if (e.target === dialog) closeDialog('projectDialog'); });
    }

    // Project card click handlers
    $$('.project-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-project');
        openProjectDialog(id);
      });
    });
  }

  function renderProjectVisual(type, accent) {
    var color = accent === 'green' ? '#00ff88' : '#ff7a18';
    var opacity = '0.15';

    if (type === 'security') {
      return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="400" height="250" fill="rgba(11,15,12,0.6)"/>' +
        '<circle cx="200" cy="125" r="80" fill="none" stroke="' + color + '" stroke-width="1" opacity="' + opacity + '"/>' +
        '<circle cx="200" cy="125" r="50" fill="none" stroke="' + color + '" stroke-width="1" opacity="' + (opacity * 1.5) + '"/>' +
        '<circle cx="200" cy="125" r="20" fill="none" stroke="' + color + '" stroke-width="1" opacity="' + opacity + '"/>' +
        '<path d="M100,125 L300,125" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>' +
        '<path d="M200,45 L200,205" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>' +
        '<rect x="185" y="110" width="30" height="30" fill="none" stroke="' + color + '" stroke-width="1" rx="4" opacity="0.4"/>' +
        '</svg>';
    } else if (type === 'financial') {
      return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="400" height="250" fill="rgba(11,15,12,0.6)"/>' +
        '<rect x="50" y="150" width="300" height="60" rx="4" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.3"/>' +
        '<rect x="50" y="80" width="200" height="40" rx="4" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.3"/>' +
        '<rect x="50" y="30" width="100" height="30" rx="4" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.3"/>' +
        '<line x1="50" y1="180" x2="350" y2="180" stroke="' + color + '" stroke-width="1" opacity="0.2"/>' +
        '<line x1="50" y1="100" x2="250" y2="100" stroke="' + color + '" stroke-width="1" opacity="0.2"/>' +
        '</svg>';
    } else if (type === 'enterprise') {
      return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="400" height="250" fill="rgba(11,15,12,0.6)"/>' +
        '<rect x="60" y="50" width="280" height="160" rx="8" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.3"/>' +
        '<rect x="80" y="70" width="240" height="120" rx="4" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.15"/>' +
        '<line x1="100" y1="100" x2="300" y2="100" stroke="' + color + '" stroke-width="1" opacity="0.1"/>' +
        '<line x1="100" y1="130" x2="300" y2="130" stroke="' + color + '" stroke-width="1" opacity="0.1"/>' +
        '<line x1="100" y1="160" x2="250" y2="160" stroke="' + color + '" stroke-width="1" opacity="0.1"/>' +
        '</svg>';
    } else {
      // automotive
      return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="400" height="250" fill="rgba(11,15,12,0.6)"/>' +
        '<circle cx="200" cy="125" r="60" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.3"/>' +
        '<circle cx="200" cy="125" r="40" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.2"/>' +
        '<rect x="170" y="100" width="60" height="50" rx="4" fill="none" stroke="' + color + '" stroke-width="1" opacity="0.4"/>' +
        '<line x1="50" y1="180" x2="350" y2="180" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>' +
        '</svg>';
    }
  }

  function openProjectDialog(id) {
    var dialog = getEl('projectDialog');
    if (!dialog) return;
    var project = DATA.projects.find(function (p) { return p.id === id; });
    if (!project) return;

    var content = $('#projectDialogContent');
    if (content) {
      var techBadges = project.technologies.slice(0, 6).map(function (t) {
        return '<span class="tech-badge">' + t + '</span>';
      }).join('');

      var archHTML = '';
      if (project.architecture) {
        if (Array.isArray(project.architecture)) {
          archHTML = '<div class="project-arch">' + project.architecture.map(function (step, i) {
            return '<span class="arch-step">' + step + (i < project.architecture.length - 1 ? '<span class="arrow">→</span>' : '') + '</span>';
          }).join('') + '</div>';
        } else {
          archHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.875rem;color:var(--color-fg-subtle);">' +
            Object.entries(project.architectureObj || project.architecture).map(function (entry) {
              return '<div style="display:flex;justify-content:space-between;gap:1rem;padding:0.25rem 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span>' + entry[0] + '</span><span style="color:var(--color-fg);text-align:right;">' + entry[1] + '</span></div>';
            }).join('') + '</div>';
        }
      }

      content.innerHTML =
        '<p class="dialog-description">' + project.subtitle + '</p>' +
        '<p>' + project.summary + '</p>' +
        '<p class="project-section-title" style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Challenge</p>' +
        '<p class="project-section-content" style="font-size:0.875rem;color:var(--color-fg-subtle);line-height:1.625;">' + project.challenge + '</p>' +
        '<p class="project-section-title" style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Solution</p>' +
        '<p class="project-section-content" style="font-size:0.875rem;color:var(--color-fg-subtle);line-height:1.625;">' + project.solution + '</p>' +
        '<p class="project-section-title" style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Architecture</p>' +
        archHTML +
        '<p class="project-section-title" style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Technologies</p>' +
        '<div class="project-arch">' + techBadges + '</div>';
    }

    openDialog('projectDialog');
  }

  /* ========================================
     SKILLS
     ======================================== */
  function initSkills() {
    var categories = getEl('skillsCategories');
    var detail = getEl('skillsDetail');
    if (!categories || !detail) return;

    // Render category buttons
    DATA.skills.forEach(function (cat, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'skill-category-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-category', cat.id);
      btn.innerHTML = '<span style="color:' + cat.color + '">●</span> ' + cat.label;
      btn.addEventListener('click', function () { showSkillCategory(cat.id); });
      categories.appendChild(btn);
    });

    // Render initial skill detail
    showSkillCategory(DATA.skills[0].id);
  }

  function showSkillCategory(id) {
    var categories = getEl('skillsCategories');
    var detail = getEl('skillsDetail');
    if (!categories || !detail) return;

    // Update active button
    $$('.skill-category-btn', categories).forEach(function (btn) {
      var isActive = btn.getAttribute('data-category') === id;
      btn.classList.toggle('active', isActive);
    });

    var cat = DATA.skills.find(function (c) { return c.id === id; });
    if (!cat) return;

    var techHTML = cat.technologies.map(function (t) {
      return '<div class="skill-item"><h4>' + t.icon + ' ' + t.name + '</h4><p>' + t.detail + '</p></div>';
    }).join('');

    detail.innerHTML =
      '<h3><span class="detail-dot" style="background-color:' + cat.color + '"></span> ' + cat.label + ' Technologies</h3>' +
      '<div class="skills-detail-grid">' + techHTML + '</div>';
  }

  /* ========================================
     DIALOG MANAGEMENT
     ======================================== */
  function openDialog(id) {
    var dialog = getEl(id);
    if (!dialog) return;
    dialog.classList.add('open');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first focusable
    var focusable = $('button, a, input, textarea, select', dialog);
    if (focusable) focusable.focus();
  }

  function closeDialog(id) {
    var dialog = getEl(id);
    if (!dialog) return;
    dialog.classList.remove('open');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // CV Preview dialog
  function initCVPreview() {
    var btn = getEl('cvPreviewBtn');
    var dialog = getEl('cvPreviewDialog');
    if (!btn || !dialog) return;

    btn.addEventListener('click', function () {
      var content = $('.dialog-cv-preview', dialog);
      if (content) {
        content.innerHTML = renderCVContent();
      }
      openDialog('cvPreviewDialog');
    });

    var closeBtn = $('.dialog-close', dialog);
    if (closeBtn) closeBtn.addEventListener('click', function () { closeDialog('cvPreviewDialog'); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeDialog('cvPreviewDialog'); });
  }

  function renderCVContent() {
    return '<h3 style="font-size:1.25rem;font-weight:600;margin-bottom:1rem;">' + DATA.personal.name + '</h3>' +
      '<p style="color:var(--color-green);margin-bottom:0.25rem;font-size:0.875rem;">' + DATA.personal.title + '</p>' +
      '<p style="color:var(--color-fg-subtle);margin-bottom:1.5rem;font-size:0.875rem;">' + DATA.personal.location + '</p>' +
      '<h4 style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Professional Summary</h4>' +
      '<p style="font-size:0.875rem;color:var(--color-fg-muted);line-height:1.625;">Practical software engineering student with hands-on experience building and testing full-stack web applications, REST APIs and database-driven systems. Strong experience with C#/.NET, JavaScript/React, Python/FastAPI, PostgreSQL/MySQL and modern development tooling, with a growing specialization in cybersecurity, secure development and vulnerability research.</p>' +
      '<h4 style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Education</h4>' +
      '<p style="font-size:0.875rem;color:var(--color-fg-muted);">Zetech University — BSc Software Engineering (Expected 2026)</p>' +
      '<h4 style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Focus Areas</h4>' +
      '<p style="font-size:0.875rem;color:var(--color-fg-muted);line-height:1.625;">Full-Stack Development, API Engineering, Cybersecurity, Secure Development, Vulnerability Research</p>' +
      '<h4 style="font-size:0.875rem;font-weight:600;color:var(--color-fg);margin-top:1.5rem;margin-bottom:0.5rem;">Skills</h4>' +
      '<p style="font-size:0.875rem;color:var(--color-fg-muted);line-height:1.625;">React, C#/.NET, Node.js, Python/FastAPI, PostgreSQL, MongoDB, Redis, Security, APIs</p>';
  }

  /* ========================================
     CONTACT FORM
     ======================================== */
  function initContactForm() {
    var form = $('#contactForm');
    if (!form) return;

    var nameEl = getEl('name');
    var emailEl = getEl('email');
    var subjectEl = getEl('subject');
    var messageEl = getEl('message');
    var submitBtn = getEl('submitBtn');
    var successMsg = getEl('successMsg');
    var errorMsg = getEl('errorMsg');

    if (!nameEl || !emailEl || !subjectEl || !messageEl || !submitBtn) return;

    // Restore from sessionStorage
    restoreForm();

    // Validate on blur
    [nameEl, emailEl].forEach(function (el) {
      el.addEventListener('blur', function () { validateField(el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      [nameEl, emailEl].forEach(function (el) {
        if (!validateField(el)) valid = false;
      });

      if (!subjectEl.value.trim()) {
        showFieldError(subjectEl, 'Subject is required');
        valid = false;
      } else {
        clearFieldError(subjectEl);
      }

      if (!messageEl.value.trim()) {
        showFieldError(messageEl, 'Message is required');
        valid = false;
      } else {
        clearFieldError(messageEl);
      }

      if (!valid) return;

      // Submit
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate submission
      setTimeout(function () {
        var endpoint = (typeof ENDPOINT !== 'undefined' && ENDPOINT) || '';

        function onSuccess() {
          successMsg.classList.remove('hidden');
          errorMsg.classList.add('hidden');
          form.reset();
          sessionStorage.removeItem('contact-form');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Sent Successfully';
          setTimeout(function () {
            submitBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Send Message';
          }, 3000);
        }

        function onFailure() {
          errorMsg.classList.remove('hidden');
          successMsg.classList.add('hidden');
          // Backup to sessionStorage
          var formData = {
            name: nameEl.value,
            email: emailEl.value,
            subject: subjectEl.value,
            message: messageEl.value,
            savedAt: new Date().toISOString(),
          };
          try { sessionStorage.setItem('contact-form', JSON.stringify(formData)); } catch (e) { /* ignore */ }
        }

        if (endpoint) {
          fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameEl.value, email: emailEl.value, subject: subjectEl.value, message: messageEl.value }),
          })
            .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
            .then(onSuccess)
            .catch(onFailure);
        } else {
          // Simulate success
          onSuccess();
        }
      }, 1200);
    });
  }

  function validateField(el) {
    var value = el.value.trim();
    if (!value) { showFieldError(el, 'This field is required'); return false; }
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showFieldError(el, 'Please enter a valid email');
      return false;
    }
    clearFieldError(el);
    return true;
  }

  function showFieldError(el, msg) {
    el.classList.add('error');
    el.setAttribute('aria-invalid', 'true');
    var errorId = el.id + '-error';
    var errorEl = getEl(errorId);
    if (errorEl) { errorEl.textContent = msg; errorEl.classList.remove('hidden'); }
  }

  function clearFieldError(el) {
    el.classList.remove('error');
    el.setAttribute('aria-invalid', 'false');
    var errorId = el.id + '-error';
    var errorEl = getEl(errorId);
    if (errorEl) errorEl.classList.add('hidden');
  }

  function restoreForm() {
    try {
      var saved = sessionStorage.getItem('contact-form');
      if (!saved) return;
      var data = JSON.parse(saved);
      var fields = ['name', 'email', 'subject', 'message'];
      var savedAt = new Date(data.savedAt);
      var hoursSince = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 48) {
        if (data.name) getEl('name').value = data.name;
        if (data.email) getEl('email').value = data.email;
        if (data.subject) getEl('subject').value = data.subject;
        if (data.message) getEl('message').value = data.message;
      } else {
        sessionStorage.removeItem('contact-form');
      }
    } catch (e) { /* ignore */ }
  }

  /* ========================================
     DIALOG CLOSE BUTTONS (global)
     ======================================== */
  function initGlobalDialogs() {
    $$('.dialog-overlay').forEach(function (overlay) {
      var closeBtn = $('.dialog-close', overlay);
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          overlay.classList.remove('open');
          overlay.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      }
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          overlay.classList.remove('open');
          overlay.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $$('.dialog-overlay.open').forEach(function (d) {
          d.classList.remove('open');
          d.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      }
    });
  }

  /* ========================================
     PARALLAX (hero scene)
     ======================================== */
  function initParallax() {
    var heroScene = getEl('heroScene');
    if (!heroScene) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var hero = $('.hero');
          if (hero && scrollY < hero.offsetHeight) {
            heroScene.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ========================================
     INIT ALL
     ======================================== */
  function init() {
    initCursor();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initReveals();
    initProgressRings();
    initSecurityDiagram();
    renderProjects();
    initSkills();
    initContactForm();
    initCVPreview();
    initGlobalDialogs();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
