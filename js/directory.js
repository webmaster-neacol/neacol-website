/**
 * NEACOL Colombian Business Directory – Data-Driven Renderer
 * ============================================================
 * Reads data/directory.json and renders the Featured + All Businesses
 * grids, the category/location filters, and the hero stats.
 *
 * To add, edit, or remove a business listing: edit data/directory.json.
 * This file only renders whatever is in that JSON — no HTML changes needed.
 */
(function () {
  var ROOT = window.NEACOL_ROOT !== undefined ? window.NEACOL_ROOT : '';
  var DATA_URL = ROOT + 'data/directory.json';

  var SOCIAL_TITLES = {
    facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn',
    twitter: 'Twitter', google: 'Google', github: 'GitHub'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function featuredCardHTML(b) {
    var tags = (b.tags || []).map(function (t) { return '<span class="scard__cat">' + esc(t) + '</span>'; }).join('');
    var meta = (b.meta || []).map(function (m) {
      return '<span class="scard__meta-item">' + esc(m.icon) + ' ' + esc(m.text) + '</span>';
    }).join('');
    var social = (b.social || []).map(function (s) {
      var title = SOCIAL_TITLES[s.platform] || s.platform;
      return '<a href="' + esc(s.url) + '" title="' + esc(title) + '">' + esc(s.label) + '</a>';
    }).join('');
    var sampleNote = b.sample ? ' <em style="font-size:.8rem;color:var(--gray-mid);">(Sample listing)</em>' : '';

    return (
      '<div class="scard" data-cat="' + esc(b.category) + '" data-loc="' + esc(b.location) + '" data-name="' + esc(b.name) + '">' +
        '<div class="scard__ribbon">⭐ FEATURED</div>' +
        '<div class="scard__header">' +
          '<div class="scard__logo">' + esc(b.icon) + '</div>' +
          '<div>' +
            '<div class="scard__name">' + esc(b.name) + '</div>' +
            '<div class="scard__tagline">' + esc(b.tagline) + '</div>' +
            '<div class="scard__cats"><span class="scard__cat">' + esc(b.category) + '</span>' + tags + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="scard__body">' +
          '<p class="scard__desc">' + esc(b.description) + sampleNote + '</p>' +
          '<div class="scard__meta">' + meta + '</div>' +
          '<div class="scard__actions">' +
            '<a href="' + esc(b.website) + '" class="scard__visit">Visit Business</a>' +
            '<div class="scard__social">' + social + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function basicCardHTML(b) {
    var sampleNote = b.sample ? ' <em style="font-size:.78rem;opacity:.7">(Sample)</em>' : '';
    return (
      '<div class="bcard" data-cat="' + esc(b.category) + '" data-loc="' + esc(b.location) + '" data-name="' + esc(b.name) + '">' +
        '<div class="bcard__top">' +
          '<div class="bcard__icon">' + esc(b.icon) + '</div>' +
          '<div><div class="bcard__name">' + esc(b.name) + '</div><div class="bcard__cat">' + esc(b.category) + '</div></div>' +
        '</div>' +
        '<p class="bcard__desc">' + esc(b.description) + sampleNote + '</p>' +
        '<div class="bcard__foot">' +
          '<span class="bcard__loc">📍 ' + esc(b.location) + ', MA</span>' +
          '<a href="' + esc(b.website) + '" class="bcard__link">View →</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderFilters(meta) {
    var catSelect = document.getElementById('dirCatFilter');
    var locSelect = document.getElementById('dirLocFilter');
    var pillsWrap = document.getElementById('dirFilterPills');

    (meta.categories || []).forEach(function (cat) {
      var opt = document.createElement('option');
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });

    (meta.locations || []).forEach(function (loc) {
      var opt = document.createElement('option');
      opt.textContent = loc;
      locSelect.appendChild(opt);
    });

    var allPill = document.createElement('button');
    allPill.className = 'filter-pill active';
    allPill.dataset.cat = '';
    allPill.textContent = 'All';
    pillsWrap.appendChild(allPill);

    var PILL_ICONS = {
      'Food & Beverage': '🍽', 'Professional Services': '💼', 'Technology': '💻',
      'Beauty & Personal Care': '💅', 'Real Estate': '🏠', 'Health & Wellness': '🏥',
      'Finance & Accounting': '💰', 'Construction & Trades': '🔨', 'Arts & Culture': '🎭', 'Education': '📚'
    };
    (meta.pinnedCategories || meta.categories || []).forEach(function (cat) {
      var pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.dataset.cat = cat;
      pill.textContent = (PILL_ICONS[cat] ? PILL_ICONS[cat] + ' ' : '') + cat;
      pillsWrap.appendChild(pill);
    });
  }

  function renderStats(meta, listings) {
    var featured = listings.filter(function (b) { return b.type === 'featured'; });
    var cities = {};
    listings.forEach(function (b) { if (b.location) cities[b.location] = true; });

    document.getElementById('dirStatBusinesses').textContent = listings.length + '+';
    document.getElementById('dirStatCities').textContent = Object.keys(cities).length;
    document.getElementById('dirStatCategories').textContent = (meta.categories || []).length;
    document.getElementById('dirStatSponsored').textContent = featured.length;
  }

  function wireUpFiltering() {
    var searchInput    = document.getElementById('dirSearch');
    var catSelect      = document.getElementById('dirCatFilter');
    var locSelect      = document.getElementById('dirLocFilter');
    var pills          = document.querySelectorAll('.filter-pill');
    var sponsoredCards = Array.from(document.querySelectorAll('#sponsoredGrid .scard'));
    var basicCards     = Array.from(document.querySelectorAll('#basicGrid .bcard'));
    var noResults      = document.getElementById('noResults');
    var sponsoredCount = document.getElementById('sponsoredCount');
    var basicCount     = document.getElementById('basicCount');
    var activeCat      = '';

    function norm(s) { return (s || '').toLowerCase().replace(/&amp;/g, '&'); }

    function run() {
      var q   = norm(searchInput.value);
      var cat = norm(activeCat || catSelect.value);
      var loc = norm(locSelect.value);
      var sc = 0, bc = 0;
      function ok(c) {
        return (!q   || norm(c.textContent).includes(q))
            && (!cat || norm(c.dataset.cat || '').includes(cat))
            && (!loc || norm(c.dataset.loc || '').includes(loc));
      }
      sponsoredCards.forEach(function (c) { var s = ok(c); c.style.display = s ? '' : 'none'; if (s) sc++; });
      basicCards.forEach(function (c) { var s = ok(c); c.style.display = s ? '' : 'none'; if (s) bc++; });
      sponsoredCount.textContent = sc + ' business' + (sc !== 1 ? 'es' : '');
      basicCount.textContent     = bc + ' business' + (bc !== 1 ? 'es' : '');
      noResults.style.display    = (sc + bc === 0) ? 'block' : 'none';
    }

    searchInput.addEventListener('input', run);
    catSelect.addEventListener('change', function () {
      activeCat = '';
      pills.forEach(function (p) { p.classList.remove('active'); });
      document.querySelector('.filter-pill[data-cat=""]').classList.add('active');
      run();
    });
    locSelect.addEventListener('change', run);
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        activeCat = this.dataset.cat;
        pills.forEach(function (p) { p.classList.remove('active'); });
        this.classList.add('active');
        catSelect.value = activeCat;
        run();
      });
    });

    run();
  }

  function render(data) {
    var meta = data.meta || {};
    var listings = (data.listings || []).filter(function (b) { return b && b.id; });
    var featured = listings.filter(function (b) { return b.type === 'featured'; });
    var basic    = listings.filter(function (b) { return b.type !== 'featured'; });

    renderFilters(meta);
    renderStats(meta, listings);

    document.getElementById('sponsoredGrid').innerHTML = featured.map(featuredCardHTML).join('');
    document.getElementById('basicGrid').innerHTML     = basic.map(basicCardHTML).join('');
    document.getElementById('sponsoredCount').textContent = featured.length + ' business' + (featured.length !== 1 ? 'es' : '');
    document.getElementById('basicCount').textContent     = basic.length + ' business' + (basic.length !== 1 ? 'es' : '');

    wireUpFiltering();
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(DATA_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error('Failed to load directory data:', err);
        var grid = document.getElementById('sponsoredGrid');
        if (grid) {
          grid.innerHTML = '<p style="padding:24px;color:var(--gray-mid);">Unable to load the business directory right now. Please try again later.</p>';
        }
      });
  });
})();
