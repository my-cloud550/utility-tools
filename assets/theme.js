// Global theme helper (light/dark)
// - Adds/removes `dark` class on <html>
// - Persists choice in localStorage
// - Provides optional bindings for:
//   - [data-theme-toggle] (toggles light/dark)
//   - [data-theme-set="light"|"dark"] (explicit set)
//
// This file is intentionally vanilla JS (no build step).

(function () {
  var KEY = 'ubox_theme';
  var STYLE_ID = 'ubox-dark-contrast-fixes';

  function safeGetItem(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }

  function safeSetItem(k, v) {
    try { localStorage.setItem(k, v); } catch (e) {}
  }

  function prefersDark() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }

  function getTheme() {
    var saved = safeGetItem(KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return prefersDark() ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', theme);
    safeSetItem(KEY, theme);
    // notify listeners
    try {
      document.dispatchEvent(new CustomEvent('ubox:theme', { detail: { theme: theme } }));
    } catch (e) {}
  }

  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  // Inject CSS fixes once.
  // These are scoped to React tool pages (#root) so the language hub page stays unchanged.
  function injectDarkFixStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = "\
/* Dark-mode contrast fixes (scoped to React tools in #root) */\
html.dark #root .bg-white,\
html.dark #root .bg-slate-50,\
html.dark #root .bg-slate-100,\
html.dark #root .bg-slate-200,\
html.dark #root .bg-blue-50,\
html.dark #root .bg-indigo-50,\
html.dark #root .bg-emerald-50,\
html.dark #root .bg-amber-50 {\
  background-color: rgba(15, 23, 42, 0.92) !important;\
}\
\
html.dark #root .border-slate-100,\
html.dark #root .border-slate-200,\
html.dark #root .border-slate-300,\
html.dark #root .border-blue-100,\
html.dark #root .border-blue-200 {\
  border-color: rgba(148, 163, 184, 0.20) !important;\
}\
\
html.dark #root input,\
html.dark #root textarea,\
html.dark #root select {\
  background-color: rgba(2, 6, 23, 0.55) !important;\
  color: #e2e8f0 !important;\
  border-color: rgba(148, 163, 184, 0.24) !important;\
}\
\
html.dark #root input::placeholder,\
html.dark #root textarea::placeholder {\
  color: rgba(148, 163, 184, 0.65) !important;\
}\
\
html.dark #root .text-slate-900,\
html.dark #root .text-slate-800,\
html.dark #root .text-slate-700 {\
  color: #e2e8f0 !important;\
}\
\
html.dark #root .text-slate-600,\
html.dark #root .text-slate-500 {\
  color: rgba(203, 213, 225, 0.88) !important;\
}\
\
html.dark #root .text-slate-400 {\
  color: rgba(148, 163, 184, 0.92) !important;\
}\
\
/* So the mobile/top bars that used light grays don't look out of place */\
html.dark #root .bg-slate-300,\
html.dark #root .bg-slate-200 {\
  background-color: rgba(15, 23, 42, 0.96) !important;\
}\
";
    document.head.appendChild(style);
  }

  function setActiveThemeButtons(theme) {
    var btns = document.querySelectorAll('[data-theme-set]');
    if (!btns || !btns.length) return;

    btns.forEach(function (btn) {
      var t = btn.getAttribute('data-theme-set');
      var active = t === theme;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
      btn.classList.toggle('is-inactive', !active);
    });
  }

  function bindThemeControls() {
    // toggle buttons
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
      });
    });

    // explicit set buttons
    var setters = document.querySelectorAll('[data-theme-set]');
    setters.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var t = el.getAttribute('data-theme-set');
        if (t === 'dark' || t === 'light') applyTheme(t);
      });
    });

    // sync initial state
    setActiveThemeButtons(getTheme());
  }

  // Apply theme immediately (prevents flicker)
  applyTheme(getTheme());
  // Styles can be added immediately too.
  injectDarkFixStyles();

  // Bind controls after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeControls);
  } else {
    bindThemeControls();
  }

  // Keep segmented buttons in sync if other scripts toggle theme
  document.addEventListener('ubox:theme', function (ev) {
    var t = (ev && ev.detail && ev.detail.theme) ? ev.detail.theme : getTheme();
    setActiveThemeButtons(t);
  });

  // Optional public API
  window.UBoxTheme = {
    get: getTheme,
    set: applyTheme,
    toggle: toggleTheme,
  };
})();
