(function () {
  var KEY = 'ubox_theme';

  function getPreferred() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'dark' || saved === 'light') return saved;
    var prefersDark = false;
    try { prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
    return prefersDark ? 'dark' : 'light';
  }

  function apply(theme) {
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    window.dispatchEvent(new CustomEvent('ubox:theme', { detail: { theme: theme } }));
  }

  function toggle() {
    var cur = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    apply(cur === 'dark' ? 'light' : 'dark');
  }

  // apply ASAP
  apply(getPreferred());

  // expose
  window.UboxTheme = { apply: apply, toggle: toggle, key: KEY };
})();