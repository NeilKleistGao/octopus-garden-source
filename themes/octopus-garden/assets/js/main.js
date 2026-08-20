(function () {
  const colors = [
    '#e6717b',
    '#e7829c',
    '#ffdb94',
    '#94b252',
    '#4a92de',
    '#e6aae6',
    '#ef927b',
    '#39a2de',
  ];

  function initOctopusIcon() {
    const icon = document.querySelector('.site-icon');
    if (!icon) return;

    const paths = icon.querySelectorAll('path');

    icon.addEventListener('mouseenter', function () {
      const color = colors[Math.floor(Math.random() * colors.length)];
      paths.forEach(function (p) {
        p.style.fill = color;
      });
    });
  }

  function initVisitorLocation() {
    const el = document.getElementById('visitor-location');
    if (!el) return;

    const lang = document.documentElement.lang || 'zh-CN';

    fetch('https://ipwho.is/?lang=' + encodeURIComponent(lang))
      .then(function (res) {
        if (!res.ok) throw new Error('ipwho.is ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data.success) return;
        const parts = [data.city, data.region, data.country].filter(Boolean);
        if (parts.length === 0) return;
        el.textContent = el.dataset.label + ' ' + parts.join(' · ');
        el.hidden = false;
      })
      .catch(function () {
        // 查询失败时保持隐藏
      });
  }

  function initGameCarousel() {
    const gallery = document.querySelector('.game-gallery');
    if (!gallery) return;

    const items = Array.from(gallery.querySelectorAll('.carousel-item'));
    const panels = Array.from(gallery.querySelectorAll('.game-panel'));
    const prev = gallery.querySelector('.carousel-prev');
    const next = gallery.querySelector('.carousel-next');

    function select(item) {
      items.forEach(function (i) {
        i.classList.toggle('active', i === item);
      });
      const target = document.getElementById(item.dataset.target);
      panels.forEach(function (p) {
        p.hidden = p !== target;
      });
      item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        select(item);
      });
    });

    function step(dir) {
      const idx = items.findIndex(function (i) {
        return i.classList.contains('active');
      });
      select(items[(idx + dir + items.length) % items.length]);
    }

    prev.addEventListener('click', function () {
      step(-1);
    });
    next.addEventListener('click', function () {
      step(1);
    });
  }

  function initDecorColors() {
    // 取自 pokemon-crystal-legacy.txt 调色板
    const palette = [
      '#de81bd', '#e6aae6', '#bdaae6', '#7b8ade',
      '#4a92de', '#39a2de', '#73bade',
      '#94b252', '#adc363', '#7ba24a',
      '#ffdb94', '#f7c384', '#ef927b',
      '#e7829c', '#e6717b', '#c6616b',
    ];

    document.querySelectorAll('[data-random-color]').forEach(function (el) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      el.style.setProperty('--c', color);
    });
  }

  function init() {
    initOctopusIcon();
    initVisitorLocation();
    initGameCarousel();
    initDecorColors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
