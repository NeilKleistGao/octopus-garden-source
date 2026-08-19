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

  function init() {
    initOctopusIcon();
    initVisitorLocation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
