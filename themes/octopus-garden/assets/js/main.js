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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOctopusIcon);
  } else {
    initOctopusIcon();
  }
})();
