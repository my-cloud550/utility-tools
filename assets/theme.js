// UtilityBox theme manager (light/dark)
// - Applies theme from localStorage / system preference
// - Exposes window.__UBOX_SET_THEME(mode)
// - Injects a theme toggle into the sidebar (above language selector)
// - Hides/removes legacy floating toggle

(function () {
  var STORAGE_KEY = 'ubox_theme'; // 'dark' | 'light'
  var DOC = document.documentElement;

  function systemPrefersDark() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }

  function getSavedTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === 'dark' || v === 'light') return v;
    } catch (e) {}
    return null;
  }

  function setSavedTheme(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {}
  }

  function currentTheme() {
    return DOC.classList.contains('dark') ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    if (mode === 'dark') {
      DOC.classList.add('dark');
      DOC.style.colorScheme = 'dark';
    } else {
      DOC.classList.remove('dark');
      DOC.style.colorScheme = 'light';
    }
    updateToggleUIs(mode);
  }

  function resolveInitialTheme() {
    var saved = getSavedTheme();
    if (saved) return saved;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function injectBaseStyles() {
    if (document.getElementById('ubox-theme-style')) return;
    var style = document.createElement('style');
    style.id = 'ubox-theme-style';
    style.textContent = [
      'html,body{height:100%;}',
      '#uboxThemeToggle{display:none !important;}',
      'html.dark body{background-color:#0b1020 !important;}',
      'html.dark body{background-image:radial-gradient(1100px 600px at 20% 0%, rgba(59,130,246,0.18), rgba(11,16,32,0) 60%), radial-gradient(900px 520px at 80% 10%, rgba(99,102,241,0.14), rgba(11,16,32,0) 55%);}',
      'html.dark .ubox-page-bg{background:transparent !important;}',
      'html.dark input,html.dark textarea,html.dark select{background-color:#0f172a !important;color:#e5e7eb !important;border-color:#334155 !important;}',
      'html.dark input::placeholder,html.dark textarea::placeholder{color:#64748b !important;}',
      'html.dark input:focus,html.dark textarea:focus,html.dark select:focus{outline:none !important;border-color:#60a5fa !important;box-shadow:0 0 0 3px rgba(96,165,250,0.25) !important;}',
    ].join('\n');
    document.head.appendChild(style);
  }

  function removeLegacyFloatingToggle() {
    var legacy = document.getElementById('uboxThemeToggle');
    if (legacy && legacy.parentNode) legacy.parentNode.removeChild(legacy);
  }

  function isKorean() {
    var lang = (DOC.getAttribute('lang') || '').toLowerCase();
    return lang.indexOf('ko') === 0;
  }

  function iconSVG(mode) {
    // mode indicates current mode
    if (mode === 'dark') {
      // Moon
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 13.5a8.5 8.5 0 0 1-10.5 8.3A9 9 0 0 0 16.7 3 7 7 0 0 1 21 13.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    // Sun
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  }

  function getLabels(nextMode) {
    var ko = isKorean();
    if (ko) {
      return {
        title: '테마',
        action: nextMode === 'dark' ? '다크 모드' : '라이트 모드',
        hint: nextMode === 'dark' ? '어두운 화면' : '밝은 화면'
      };
    }
    return {
      title: 'Theme',
      action: nextMode === 'dark' ? 'Dark mode' : 'Light mode',
      hint: nextMode === 'dark' ? 'Dark' : 'Light'
    };
  }

  function updateToggleButton(btn, mode) {
    if (!btn) return;
    var next = mode === 'dark' ? 'light' : 'dark';
    var labels = getLabels(next);

    var icon = btn.querySelector('[data-ubox-icon]');
    var action = btn.querySelector('[data-ubox-action]');
    var hint = btn.querySelector('[data-ubox-hint]');

    if (icon) icon.innerHTML = iconSVG(mode);
    if (action) action.textContent = labels.action;
    if (hint) hint.textContent = labels.hint;

    btn.setAttribute('aria-label', labels.title + ': ' + labels.action);
  }

  function updateToggleUIs(mode) {
    updateToggleButton(document.getElementById('uboxSidebarThemeToggle'), mode);
    updateToggleButton(document.getElementById('uboxInlineThemeToggle'), mode);
  }

  function findLanguageButton(sidebarEl) {
    if (!sidebarEl) return null;

    var byId = sidebarEl.querySelector('#languageToggle');
    if (byId) return byId;

    var buttons = sidebarEl.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      var t = (buttons[i].textContent || '').trim();
      if (!t) continue;
      if (t.indexOf('Language:') === 0) return buttons[i];
      if (t.indexOf('언어:') === 0) return buttons[i];
    }
    return null;
  }

  function buildSidebarThemeButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'uboxSidebarThemeToggle';
    btn.className = 'w-full flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-900 transition';

    btn.innerHTML = [
      '<span class="flex items-center gap-2">',
      '  <span data-ubox-icon class="text-slate-700 dark:text-slate-100"></span>',
      '  <span data-ubox-action></span>',
      '</span>',
      '<span data-ubox-hint class="text-xs text-slate-400"></span>'
    ].join('');

    btn.addEventListener('click', function () {
      var mode = currentTheme();
      var next = mode === 'dark' ? 'light' : 'dark';
      setSavedTheme(next);
      applyTheme(next);
    });

    // initial label
    updateToggleButton(btn, currentTheme());
    return btn;
  }

  function ensureSidebarThemeToggle() {
    var sidebar = document.getElementById('sidebar') || document.querySelector('aside');
    if (!sidebar) return false;

    var langBtn = findLanguageButton(sidebar);
    if (!langBtn) return false;

    var parent = langBtn.parentElement;
    if (!parent) return false;

    if (parent.querySelector('#uboxSidebarThemeToggle')) return true;

    var btn = buildSidebarThemeButton();
    parent.insertBefore(btn, langBtn);
    return true;
  }

  // Inject styles as early as possible
  injectBaseStyles();

  // Apply initial theme ASAP
  applyTheme(resolveInitialTheme());

  // Expose API
  window.__UBOX_GET_THEME = function () {
    return currentTheme();
  };
  window.__UBOX_SET_THEME = function (mode) {
    if (mode !== 'dark' && mode !== 'light') return;
    setSavedTheme(mode);
    applyTheme(mode);
  };

  // Remove legacy toggle if present
  removeLegacyFloatingToggle();

  // Ensure sidebar toggle exists even if sidebar is rendered later
  var tries = 0;
  var maxTries = 20;
  var interval = setInterval(function () {
    tries += 1;
    if (ensureSidebarThemeToggle() || tries >= maxTries) {
      clearInterval(interval);
    }
  }, 250);

  var observer = new MutationObserver(function () {
    ensureSidebarThemeToggle();
    removeLegacyFloatingToggle();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // If user has not explicitly saved a theme, follow system changes.
  try {
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function () {
      if (getSavedTheme()) return;
      applyTheme(mql.matches ? 'dark' : 'light');
    };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else if (mql.addListener) mql.addListener(handler);
  } catch (e) {}
})();
