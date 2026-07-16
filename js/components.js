/**
 * NEACOL Local Site – Shared Components
 * ======================================
 * Injects the site navigation and footer into every page.
 * Edit the HTML strings here and every page updates automatically.
 *
 * Usage: each HTML page includes <script src="../js/components.js"></script>
 * and has empty <div id="site-header"></div> and <footer id="site-footer"></footer>.
 *
 * The `ROOT` variable is set per-page so relative paths resolve correctly.
 */

(function () {
  /* ─── PATH ROOT ───────────────────────────────────────────────
     Pages at root level use ROOT = ''
     Pages inside /pages/ use ROOT = '../'
     Adjust the <script> call in each page if needed.             */
  var ROOT = window.NEACOL_ROOT !== undefined ? window.NEACOL_ROOT : '';

  /* ─── ACTIVE PAGE DETECTION ─────────────────────────────────── */
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    return currentFile === href.split('/').pop() ? 'active' : '';
  }

  /* ─── NAVIGATION HTML ──────────────────────────────────────── */
  var navHTML = `
<div id="site-header">
  <!-- ── ANNOUNCEMENT BANNER ── edit text here to update sitewide ── -->
  <div class="announcement-bar" id="announcementBar">
    <span>🇨🇴</span>
    <span class="ann-text">
      <strong>NEW: Colombian Business Directory</strong> — Connect with Colombian entrepreneurs across New England.
      <a href="${ROOT}pages/directory.html">Explore the Directory →</a>
    </span>
    <button class="ann-close" onclick="document.getElementById('announcementBar').style.display='none';document.getElementById('site-header').style.setProperty('--ann-h','0px')" aria-label="Close announcement">✕</button>
  </div>
  <!-- ── MAIN NAV ─────────────────────────────────────────────────── -->
  <nav class="container nav-inner">
    <a class="nav-logo" href="${ROOT}index.html" aria-label="NEACOL home">
      <img src="https://neacol.org/wp-content/uploads/2023/03/10-removebg-preview.png"
           alt="NEACOL – New England Association for Colombian Children"
           width="auto" height="68"
           style="height:68px;width:auto;object-fit:contain;display:block;">
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-menu" id="navMenu">
      <li class="nav-item ${isActive('index.html')}">
        <a href="${ROOT}index.html">Home</a>
      </li>
      <li class="nav-item">
        <a href="#">About Us ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/who-we-are.html">Who We Are</a></li>
          <li><a href="${ROOT}pages/core-values.html">Core Values</a></li>
          <li><a href="${ROOT}pages/financials.html">Annual Reports &amp; Financials</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="#">Our Team ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/our-team.html">Our Team</a></li>
          <li><a href="${ROOT}pages/board-roles.html">Board of Directors Roles</a></li>
          <li><a href="${ROOT}pages/executive-roles.html">Executive Team Roles</a></li>
          <li><a href="${ROOT}pages/committees.html">Committee Roles</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="#">Our Work ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/areas-of-work.html">Areas of Work</a></li>
          <li><a href="${ROOT}pages/our-projects.html">Our Projects</a></li>
          <li><a href="${ROOT}pages/call-for-proposals.html">Call for Proposals</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="#">Get Involved ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/volunteer.html">Volunteer</a></li>
          <li><a href="${ROOT}pages/membership.html">Membership</a></li>
          <li><a href="${ROOT}pages/neacol-youth.html">NEACOL Youth</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="#">Support ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/donate.html">Donate</a></li>
          <li><a href="${ROOT}pages/sponsorship.html">Sponsorship</a></li>
          <li><a href="${ROOT}pages/our-supporters.html">Our Supporters</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="#">Events &amp; News ▾</a>
        <ul class="nav-dropdown">
          <li><a href="${ROOT}pages/news-events.html">Events &amp; News</a></li>
          <li><a href="${ROOT}pages/blog.html">Our Blog</a></li>
        </ul>
      </li>
      <li class="nav-item ${isActive('shop.html')}">
        <a href="${ROOT}pages/shop.html">Shop</a>
      </li>
      <li class="nav-item ${isActive('directory.html')}">
        <a href="${ROOT}pages/directory.html" style="color:var(--gold);font-weight:700;">🇨🇴 Directory</a>
      </li>
      <li class="nav-item nav-donate">
        <a href="${ROOT}pages/donate.html" class="btn btn--gold">Donate</a>
      </li>
    </ul>
  </nav>
  <span class="colombia-stripe" aria-hidden="true"></span>
</div>`;

  /* ─── FOOTER HTML ───────────────────────────────────────────── */
  var footerHTML = `
<footer id="site-footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand col -->
      <div class="footer-brand">
        <img src="https://neacol.org/wp-content/uploads/2023/03/8-compress.png" alt="NEACOL">
        <p>The New England Association for Colombian Children is a 501(c)(3) nonprofit that provides grants to projects supporting Colombian children and families in need.</p>
        <ul class="footer-contact">
          <li>📍 P.O. BOX 920573, Needham, MA 02492</li>
          <li>✉️ <a href="mailto:info@neacol.org" style="color:rgba(255,255,255,.7)">info@neacol.org</a></li>
        </ul>
        <div class="footer-social">
          <a href="https://www.facebook.com/NewEnglandAsociationForColombianChildren/" target="_blank" rel="noopener" title="Facebook">f</a>
          <a href="https://twitter.com/neacol" target="_blank" rel="noopener" title="Twitter">𝕏</a>
          <a href="https://www.youtube.com/c/NEACOL" target="_blank" rel="noopener" title="YouTube">▶</a>
        </div>
        <div class="footer-gallery">
          <img src="https://neacol.org/wp-content/uploads/2023/03/C2M2WJ-1-150x150.jpg" alt="">
          <img src="https://neacol.org/wp-content/uploads/2023/04/boy-150x150.jpg" alt="">
          <img src="https://neacol.org/wp-content/uploads/2023/03/E2AXE9-150x150.jpg" alt="">
          <img src="https://neacol.org/wp-content/uploads/2023/04/Boy-2-150x150.jpg" alt="">
        </div>
      </div>
      <!-- Site links col -->
      <div class="footer-col">
        <h4>Site</h4>
        <ul>
          <li><a href="${ROOT}index.html">Home</a></li>
          <li><a href="${ROOT}pages/who-we-are.html">Who We Are</a></li>
          <li><a href="${ROOT}pages/core-values.html">Core Values</a></li>
          <li><a href="${ROOT}pages/our-team.html">Our Team</a></li>
          <li><a href="${ROOT}pages/neacol-youth.html">NEACOL Youth</a></li>
          <li><a href="${ROOT}pages/financials.html">Financials</a></li>
          <li><a href="${ROOT}pages/shop.html">Shop</a></li>
          <li><a href="${ROOT}pages/privacy-policy.html">Privacy Policy</a></li>
        </ul>
      </div>
      <!-- Get involved col -->
      <div class="footer-col">
        <h4>Get Involved</h4>
        <ul>
          <li><a href="${ROOT}pages/volunteer.html">Volunteer</a></li>
          <li><a href="${ROOT}pages/membership.html">Membership</a></li>
          <li><a href="${ROOT}pages/donate.html">Donate</a></li>
          <li><a href="${ROOT}pages/sponsorship.html">Sponsorship</a></li>
          <li><a href="${ROOT}pages/our-supporters.html">Our Supporters</a></li>
          <li><a href="${ROOT}pages/areas-of-work.html">Areas of Work</a></li>
          <li><a href="${ROOT}pages/our-projects.html">Our Projects</a></li>
          <li><a href="${ROOT}pages/news-events.html">News &amp; Events</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} NEACOL – New England Association for Colombian Children. All rights reserved.</p>
    </div>
  </div>
</footer>`;

  /* ─── INJECT NAV ────────────────────────────────────────────── */
  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  /* ─── INJECT FOOTER ─────────────────────────────────────────── */
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  /* ─── MOBILE MENU TOGGLE ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('navToggle');
    var menu   = document.getElementById('navMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
      });
      // mobile dropdown toggles
      menu.querySelectorAll('.nav-item > a').forEach(function (a) {
        if (a.nextElementSibling && a.nextElementSibling.classList.contains('nav-dropdown')) {
          a.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
              e.preventDefault();
              a.parentElement.classList.toggle('open');
            }
          });
        }
      });
    }

    /* ── Animated counters ── */
    var counters = document.querySelectorAll('[data-counter]');
    if (counters.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el      = entry.target;
            var target  = parseInt(el.dataset.counter, 10);
            var prefix  = el.dataset.prefix  || '';
            var suffix  = el.dataset.suffix  || '';
            var dur     = 1800;
            var step    = Math.ceil(dur / target);
            var current = 0;
            var timer   = setInterval(function () {
              current += Math.max(1, Math.floor(target / 80));
              if (current >= target) { current = target; clearInterval(timer); }
              el.textContent = prefix + current.toLocaleString() + suffix;
            }, step);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { observer.observe(c); });
    }
  });

})();
