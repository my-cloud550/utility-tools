(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readStoredTheme() {
    try {
      var stored = localStorage.getItem(KEY);
      return stored === 'dark' || stored === 'light' ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function resolveTheme() {
    var stored = readStoredTheme();
    if (stored) return stored;
    return media && media.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var next = theme === 'dark' ? 'dark' : 'light';
    root.classList.toggle('dark', next === 'dark');
    root.dataset.theme = next;
    root.style.colorScheme = next;
    return next;
  }

  function setTheme(theme, persist) {
    var next = applyTheme(theme);
    if (persist !== false) {
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('ubox:theme-change', { detail: { theme: next } }));
    return next;
  }

  applyTheme(resolveTheme());

  window.__UBOX_THEME__ = {
    get: function () {
      return root.classList.contains('dark') ? 'dark' : 'light';
    },
    set: function (theme) {
      return setTheme(theme, true);
    },
    toggle: function () {
      return setTheme(this.get() === 'dark' ? 'light' : 'dark', true);
    }
  };

  if (media && media.addEventListener) {
    media.addEventListener('change', function (event) {
      if (!readStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    });
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    event.preventDefault();
    window.__UBOX_THEME__.toggle();
  });
})();
