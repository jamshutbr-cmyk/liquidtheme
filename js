(function () {
  const STORAGE_KEYS = {
    bgUrl: 'customBgUrl',
    glassBlur: 'customGlassBlur',
    opacityContainer: 'customOpacityContainer',
    opacityNav: 'customOpacityNav',
    accent: 'customAccent'
  };

  function applyCssVariable(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function applyAllSettings(settings) {
    if (settings.bgUrl) {
      document.body.style.setProperty('background-image', 'url(' + settings.bgUrl + ')', 'important');
    }
    if (settings.glassBlur) {
      applyCssVariable('--glass-blur', settings.glassBlur + 'px');
      applyCssVariable('--header-blur', settings.glassBlur + 'px');
      applyCssVariable('--misc-glass-blur', settings.glassBlur + 'px');
    }
    if (settings.opacityContainer) applyCssVariable('--opacity-container', settings.opacityContainer);
    if (settings.opacityNav) applyCssVariable('--opacity-nav', settings.opacityNav);
    if (settings.accent) {
      applyCssVariable('--accent', settings.accent);
      updateScrollbarColor(settings.accent);
      updateSelectionColor(settings.accent);
    }
  }

  function loadSettings() {
    const s = {};
    try {
      s.bgUrl = localStorage.getItem(STORAGE_KEYS.bgUrl);
      s.glassBlur = localStorage.getItem(STORAGE_KEYS.glassBlur);
      s.opacityContainer = localStorage.getItem(STORAGE_KEYS.opacityContainer);
      s.opacityNav = localStorage.getItem(STORAGE_KEYS.opacityNav);
      s.accent = localStorage.getItem(STORAGE_KEYS.accent);
    } catch (e) {}
    return s;
  }

  function saveSettings(settings) {
    try {
      const setOrRemove = (key, val) => val ? localStorage.setItem(key, val) : localStorage.removeItem(key);
      setOrRemove(STORAGE_KEYS.bgUrl, settings.bgUrl);
      setOrRemove(STORAGE_KEYS.glassBlur, settings.glassBlur);
      setOrRemove(STORAGE_KEYS.opacityContainer, settings.opacityContainer);
      setOrRemove(STORAGE_KEYS.opacityNav, settings.opacityNav);
      setOrRemove(STORAGE_KEYS.accent, settings.accent);
    } catch (e) {}
  }

  let savedSettings = loadSettings();
  applyAllSettings(savedSettings);

  function updateScrollbarColor(color) {
    let style = document.getElementById('custom-scrollbar-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-scrollbar-style';
      document.head.appendChild(style);
    }
    style.textContent = 'html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb { background-color: ' + color + ' !important; }';
  }

  function updateSelectionColor(color) {
    let style = document.getElementById('custom-selection-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-selection-style';
      document.head.appendChild(style);
    }
    style.textContent = 'html::selection, body::selection, *::selection { background-color: ' + color + ' !important; color: #fff !important; } html::-moz-selection, body::-moz-selection, *::-moz-selection { background-color: ' + color + ' !important; color: #fff !important; }';
  }

  function showSettingsModal() {
    const existing = document.getElementById('customSettingsModal');
    if (existing) existing.remove();

    const currentBlur = savedSettings.glassBlur || getComputedStyle(document.documentElement).getPropertyValue('--glass-blur').replace('px', '').trim() || '8';
    const currentOpacityContainer = savedSettings.opacityContainer || getComputedStyle(document.documentElement).getPropertyValue('--opacity-container').trim() || '0.7';
    const currentOpacityNav = savedSettings.opacityNav || getComputedStyle(document.documentElement).getPropertyValue('--opacity-nav').trim() || '0.8';
    const currentAccent = savedSettings.accent || getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff0015';

    const overlay = document.createElement('div');
    overlay.id = 'customSettingsModal';

    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.innerHTML = '<h3>Оформление форума</h3>';

    const bgLabel = document.createElement('label');
    bgLabel.textContent = 'Фоновая картинка (URL)';
    modal.appendChild(bgLabel);
    const bgInput = document.createElement('input');
    bgInput.type = 'url';
    bgInput.placeholder = 'https://...';
    bgInput.value = savedSettings.bgUrl || '';
    modal.appendChild(bgInput);

    const blurLabel = document.createElement('label');
    blurLabel.textContent = 'Размытие стёкол: ' + currentBlur + 'px';
    modal.appendChild(blurLabel);
    const blurInput = document.createElement('input');
    blurInput.type = 'range';
    blurInput.min = '0';
    blurInput.max = '20';
    blurInput.step = '1';
    blurInput.value = currentBlur;
    blurInput.addEventListener('input', function () {
      blurLabel.textContent = 'Размытие стёкол: ' + this.value + 'px';
      applyCssVariable('--glass-blur', this.value + 'px');
      applyCssVariable('--header-blur', this.value + 'px');
      applyCssVariable('--misc-glass-blur', this.value + 'px');
    });
    modal.appendChild(blurInput);

    const opContLabel = document.createElement('label');
    opContLabel.textContent = 'Прозрачность блоков: ' + currentOpacityContainer;
    opContLabel.style.marginTop = '10px';
    modal.appendChild(opContLabel);
    const opContInput = document.createElement('input');
    opContInput.type = 'range';
    opContInput.min = '0.1';
    opContInput.max = '1';
    opContInput.step = '0.05';
    opContInput.value = currentOpacityContainer;
    opContInput.addEventListener('input', function () {
      opContLabel.textContent = 'Прозрачность блоков: ' + this.value;
      applyCssVariable('--opacity-container', this.value);
    });
    modal.appendChild(opContInput);

    const opNavLabel = document.createElement('label');
    opNavLabel.textContent = 'Прозрачность меню: ' + currentOpacityNav;
    opNavLabel.style.marginTop = '10px';
    modal.appendChild(opNavLabel);
    const opNavInput = document.createElement('input');
    opNavInput.type = 'range';
    opNavInput.min = '0.1';
    opNavInput.max = '1';
    opNavInput.step = '0.05';
    opNavInput.value = currentOpacityNav;
    opNavInput.addEventListener('input', function () {
      opNavLabel.textContent = 'Прозрачность меню: ' + this.value;
      applyCssVariable('--opacity-nav', this.value);
    });
    modal.appendChild(opNavInput);

    const accentLabel = document.createElement('label');
    accentLabel.textContent = 'Акцентный цвет';
    accentLabel.style.marginTop = '10px';
    modal.appendChild(accentLabel);
    const accentInput = document.createElement('input');
    accentInput.type = 'color';
    accentInput.value = currentAccent;
    accentInput.addEventListener('input', function () {
      applyCssVariable('--accent', this.value);
      updateScrollbarColor(this.value);
      updateSelectionColor(this.value);
    });
    modal.appendChild(accentInput);

   const authorLink = document.createElement('div');
   authorLink.style.cssText = 'margin-top: 15px; text-align: center; font-size: 13px;';
      authorLink.innerHTML = 'Создатель: <a href="https://t.me/pr0stoy4elovek/" target="_blank" style="color:var(--accent); text-decoration: underline;">t.me/pr0stoy4elovek</a>';
modal.appendChild(authorLink);

    const btnRow = document.createElement('div');
    btnRow.className = 'btn-row';
    btnRow.style.display = 'flex';
    btnRow.style.justifyContent = 'flex-end';
    btnRow.style.gap = '8px';
    btnRow.style.marginTop = '20px';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn-reset';
    resetBtn.textContent = 'Сбросить всё';
    resetBtn.onclick = () => {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      location.reload();
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-cancel';
    cancelBtn.textContent = 'Отмена';
    cancelBtn.onclick = () => overlay.remove();

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-save';
    saveBtn.textContent = 'Сохранить';
    saveBtn.onclick = () => {
      const newSettings = {
        bgUrl: bgInput.value.trim() || null,
        glassBlur: blurInput.value,
        opacityContainer: opContInput.value,
        opacityNav: opNavInput.value,
        accent: accentInput.value
      };
      applyAllSettings(newSettings);
      saveSettings(newSettings);
      savedSettings = newSettings;
      overlay.remove();
    };

    btnRow.appendChild(resetBtn);
    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(saveBtn);
    modal.appendChild(btnRow);
    overlay.appendChild(modal);

    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', onKey);
      }
    });
    document.body.appendChild(overlay);
    bgInput.focus();
  }

  function addSettingsButton() {
    if (document.querySelector('a.p-navEl-link[data-nav-id="customSettings"]')) return;
    const navList = document.querySelector('.p-nav-list');
    if (!navList) return;
    const sampleLink = document.querySelector('.p-nav-list a.p-navEl-link');
    if (!sampleLink) return;
    const sampleLi = sampleLink.closest('li');
    if (!sampleLi) return;
    const newLi = sampleLi.cloneNode(true);
    const newLink = newLi.querySelector('a.p-navEl-link');
    newLink.href = 'javascript:void(0)';
    newLink.setAttribute('data-nav-id', 'customSettings');
    newLink.removeAttribute('data-xf-key');
    newLink.classList.remove('p-navEl-link--splitMenu');
    const textSpan = newLink.querySelector('.p-navEl-linkText') || newLink.querySelector('span');
    if (textSpan) textSpan.textContent = 'Настройки';
    newLink.addEventListener('click', e => {
      e.preventDefault();
      showSettingsModal();
    });
    navList.appendChild(newLi);
  }

  function init() {
    addSettingsButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let attempts = 0;
  const retryTimer = setInterval(() => {
    attempts++;
    init();
    if (attempts >= 20) clearInterval(retryTimer);
  }, 500);

  const navContainer = document.querySelector('.p-nav-list');
  if (navContainer) {
    const observer = new MutationObserver(() => init());
    observer.observe(navContainer, { childList: true, subtree: false });
  } else {
    const bodyObserver = new MutationObserver(() => {
      const nav = document.querySelector('.p-nav-list');
      if (nav) {
        init();
        const innerObserver = new MutationObserver(() => init());
        innerObserver.observe(nav, { childList: true, subtree: false });
        bodyObserver.disconnect();
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
