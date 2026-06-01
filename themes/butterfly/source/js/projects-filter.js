(function () {
  'use strict';

  function init() {
    const chips = document.querySelectorAll('#project-tag-filter .tag-chip');
    const items = document.querySelectorAll('.project-item');
    if (!chips.length || !items.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const tag = chip.getAttribute('data-tag');

        chips.forEach(function (c) { c.classList.remove('tag-chip--active'); });
        chip.classList.add('tag-chip--active');

        items.forEach(function (item) {
          const tags = (item.getAttribute('data-tags') || '').split(',');
          if (tag === 'all' || tags.indexOf(tag) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
