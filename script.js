// ============================================================
// LIQUID GLASS MODERN SITE - ENHANCED VERSION
// ============================================================

// Slider state
let currentSlide = 0;
const totalSlides = 3;
let autoplayTimer = null;
let isAutoplayPaused = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Liquid Glass site loading...');
    
    // Initialize all components
    loadThemeFiles();
    setupColorPicker();
    setupSlider();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupIntersectionObserver();
    
    console.log('✅ All systems initialized');
});

// ============================================================
// MODERN SLIDER WITH ENHANCED FEATURES
// ============================================================

function setupSlider() {
    console.log('🎯 Initializing enhanced slider...');
    
    const track = document.getElementById('sliderTrack');
    if (!track) {
        console.warn('❌ Slider track not found');
        return;
    }
    
    // Setup controls
    setupSliderControls();
    setupSliderNavigation();
    setupSliderKeyboard();
    setupSliderTouch();
    setupSliderAutoplay();
    
    // Initial state
    updateSlider();
    updateSliderCounter();
    
    console.log('✅ Slider initialized with all features');
}

function setupSliderControls() {
    // Previous/Next buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('⬅️ Previous slide');
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('➡️ Next slide');
            nextSlide();
        });
    }
}

function setupSliderNavigation() {
    // Dots navigation
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`🎯 Go to slide ${index + 1}`);
            goToSlide(index);
        });
    });
    
    // Thumbnails navigation
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            console.log(`🖼️ Thumb clicked: ${index + 1}`);
            goToSlide(index);
        });
    });
}

function setupSliderKeyboard() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case ' ': // Spacebar
                e.preventDefault();
                toggleAutoplay();
                break;
        }
    });
}

function setupSliderTouch() {
    const viewport = document.querySelector('.slider-viewport');
    if (!viewport) return;
    
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    viewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        pauseAutoplay();
    });
    
    viewport.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Prevent vertical scroll if horizontal swipe is detected
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    });
    
    viewport.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
        
        isDragging = false;
        resumeAutoplay();
    });
}

function setupSliderAutoplay() {
    const sliderMain = document.querySelector('.slider-main');
    if (!sliderMain) return;
    
    // Pause on hover
    sliderMain.addEventListener('mouseenter', pauseAutoplay);
    sliderMain.addEventListener('mouseleave', resumeAutoplay);
    
    // Start autoplay
    startAutoplay();
}

function updateSlider() {
    const track = document.getElementById('sliderTrack');
    if (!track) return;
    
    // Move track
    const translateX = -(currentSlide * (100 / totalSlides));
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    updateActiveStates();
    updateSliderCounter();
    
    console.log(`🎪 Slider updated to slide ${currentSlide + 1}`);
}

function updateActiveStates() {
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update thumbnails
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentSlide);
    });
    
    // Update slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function updateSliderCounter() {
    const currentElement = document.querySelector('.slider-counter .current');
    if (currentElement) {
        currentElement.textContent = String(currentSlide + 1).padStart(2, '0');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoplay();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoplay();
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides && index !== currentSlide) {
        currentSlide = index;
        updateSlider();
        resetAutoplay();
    }
}

function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    if (!isAutoplayPaused) {
        autoplayTimer = setInterval(nextSlide, 5000);
        console.log('▶️ Autoplay started');
    }
}

function pauseAutoplay() {
    isAutoplayPaused = true;
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
    console.log('⏸️ Autoplay paused');
}

function resumeAutoplay() {
    isAutoplayPaused = false;
    startAutoplay();
    console.log('▶️ Autoplay resumed');
}

function toggleAutoplay() {
    if (isAutoplayPaused) {
        resumeAutoplay();
    } else {
        pauseAutoplay();
    }
}

function resetAutoplay() {
    if (!isAutoplayPaused) {
        pauseAutoplay();
        setTimeout(() => {
            resumeAutoplay();
        }, 2000);
    }
}

// ============================================================
// THEME FILES LOADING
// ============================================================

async function loadThemeFiles() {
    console.log('📂 Loading real theme files...');
    
    // Real CSS code from the css file
    const realCssCode = `:root {
  --accent: #ff0015;

  --glass-bg: rgba(20, 20, 22, 0.1);
  --glass-blur: 8px;
  --glass-border: rgba(255, 255, 255, 0.07);
  --glass-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

  --row-border: rgba(255, 255, 255, 0.04);
  --row-hover-bg: rgba(255, 255, 255, 0.03);
  --row-hover-border: rgba(255, 0, 21, 0.15);

  --opacity-nav: 0.8;
  --opacity-container: 0.7;
  --opacity-footer: 0.8;
  --opacity-buttons: 0.85;

  --header-bg: rgba(20, 20, 22, 0.1);
  --header-blur: 8px;

  --misc-glass-bg: rgba(20, 20, 22, 0.15);
  --misc-glass-blur: 6px;

  --text-shadow: 1px 0 2px #000, 0 1px 2px #000, -1px 0 2px #000, 0 -1px 2px #000;
}

html, body {
  background-image: url("https://w.wallhaven.cc/full/j5/wallhaven-j5g7pp.jpg") !important;
  background-attachment: fixed !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

.p-pageWrapper,
.p-body,
.p-body-content,
.p-body-main,
.p-body-columns {
  background: transparent !important;
  background-color: transparent !important;
}

.p-body-pageContent .block:nth-child(even)::after,
.p-body-sidebar .block:nth-child(even)::after,
.p-body-pageContent .block:nth-child(odd)::after,
.p-body-sidebar .block:nth-child(odd)::after,
.p-body-pageContent .block--category:first-child .block-header::before {
  display: none !important;
}

.button-text {
  font-weight: bold;
}
.button, a.button {
  color: #fff;
}
.block.block--category .block-header {
  text-shadow: 0 0 1px rgb(0 242 255 / 70%);
}

.menu-tabHeader .tabs-tab.is-active {
  border-color: var(--accent);
}
.badge.badge--highlighted,
.badgeContainer.badgeContainer--highlighted:after {
  background: var(--accent);
}
.tabs-tab {
  color: var(--accent);
}
.blockLink.is-selected {
  color: var(--accent);
  border-left: 2px solid var(--accent);
}
.block-tabHeader .tabs-tab:hover {
  color: var(--accent);
}
.button.button--primary,
a.button.button--primary {
  background: linear-gradient(var(--accent), var(--accent));
}
.button.button--primary:hover, a.button.button--primary:hover,
.button.button--primary:focus, a.button.button--primary:focus {
  background: linear-gradient(var(--accent), var(--accent));
}
.menu-linkRow.is-selected,
.menu-linkRow:hover,
.menu-linkRow:focus {
  color: var(--accent);
}
.fr-toolbar {
  border-top: 2px solid var(--accent);
}
.block-tabHeader .tabs-tab.is-active {
  color: var(--accent);
  border-color: var(--accent);
}
.messageNotice {
  border-left: 2px solid var(--accent);
}
.messageNotice:before {
  color: var(--accent);
}
.messageNotice:not(.messageNotice--highlighted) a,
.messageNotice:not(.messageNotice--highlighted) a:hover {
  color: var(--accent);
}
.bbCodeBlock {
  border-left: 2px solid var(--accent);
}
.bbCodeBlock-title {
  color: var(--accent);
}
.button.button--scroll, a.button.button--scroll {
  background: linear-gradient(var(--accent), var(--accent));
}
.bbCodeBlock-expandLink a {
  color: var(--accent);
}
.message-newIndicator {
  background: var(--accent);
}
.menu-content:before {
  background: linear-gradient(-270deg, var(--accent) 0%, var(--accent) 100%);
}
.tabs--standalone .tabs-tab.is-active {
  color: var(--accent);
  border-color: var(--accent);
}
.tabs--standalone .tabs-tab:hover {
  color: var(--accent);
}
.p-nav-list .p-navEl.is-selected:after {
  background: linear-gradient(-270deg, var(--accent) 0%, var(--accent) 100%);
}
.p-nav-list .p-navEl.is-selected {
  color: var(--accent);
}
.button.button--link, a.button.button--link {
  background: var(--accent);
}
.block-body .block-minorHeader.uix_threadListSeparator:before {
  background: linear-gradient(-270deg, var(--accent) 0%, var(--accent) 100%);
}
.button.button--cta, a.button.button--cta {
  background: var(--accent);
  border-color: var(--accent);
  background-color: var(--accent);
}
.button.button--cta:hover, a.button.button--cta:hover,
.button.button--cta:focus, a.button.button--cta:focus {
  background: var(--accent);
  border-color: var(--accent);
  background-color: var(--accent);
}
.button--cta {
  background: var(--accent);
  border-color: var(--accent);
  background-color: var(--accent);
}

.p-nav {
  opacity: var(--opacity-nav);
}
.block-container {
  opacity: var(--opacity-container);
}
.p-footer {
  opacity: var(--opacity-footer);
}

.p-nav-list .p-navEl-link,
.p-nav-list .p-navEl {
  background-color: transparent !important;
  background: transparent !important;
  transition: all 0.25s ease !important;
  border-radius: 10px !important;
}
.p-nav-list .p-navEl-link:hover {
  background: rgba(255, 0, 21, 0.08) !important;
  border-radius: 10px !important;
}

.block-container,
.p-body-pageContent .block {
  background: var(--glass-bg) !important;
  backdrop-filter: blur(var(--glass-blur)) !important;
  -webkit-backdrop-filter: blur(var(--glass-blur)) !important;
  border-radius: 18px !important;
  border: 1px solid var(--glass-border) !important;
  box-shadow: var(--glass-shadow) !important;
  overflow: hidden !important;
}

.node-body,
.block-row,
.node--forum .node-body,
li.block-row,
.listBlock-row,
.structItem {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-radius: 0 !important;
  border: none !important;
  border-bottom: 1px solid var(--row-border) !important;
  box-shadow: none !important;
  margin-bottom: 0 !important;
  box-sizing: border-box !important;
  transition: background 0.2s ease !important;
}
.node-body:hover,
.block-row:hover,
li.block-row:hover,
.listBlock-row:hover,
.structItem:hover {
  background: var(--row-hover-bg) !important;
  border-bottom: 1px solid var(--row-hover-border) !important;
}
.block-container li.block-row:last-child,
.block-container .structItem:last-child {
  border-bottom: none !important;
}

.p-body-header {
  background: var(--header-bg) !important;
  backdrop-filter: blur(var(--header-blur)) !important;
  -webkit-backdrop-filter: blur(var(--header-blur)) !important;
  border-radius: 18px !important;
  border: 1px solid var(--glass-border) !important;
  box-shadow: var(--glass-shadow) !important;
  padding: 12px 20px;
  margin-bottom: 15px;
}
.block--category .block-header,
.p-title {
  background: var(--header-bg) !important;
  backdrop-filter: blur(var(--header-blur)) !important;
  -webkit-backdrop-filter: blur(var(--header-blur)) !important;
  border-radius: 18px !important;
  border: 1px solid var(--glass-border) !important;
  box-shadow: var(--glass-shadow) !important;
  overflow: hidden !important;
}
.p-title-pageTitle,
.p-breadcrumbs {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.button.button--cta, a.button.button--cta,
.buttonGroup,
.button--scroll.ripple-JsOnly.button,
.pageNav-main,
.pageNav-jump,
.tabPanes,
.menu-content,
.overlay {
  opacity: var(--opacity-buttons);
}

span[itemprop="name"],
.p-body-header .p-title-value {
  text-shadow: var(--text-shadow);
}

span.hScroller-scroll.is-calculated,
.block-minorHeader {
  background: var(--misc-glass-bg) !important;
  backdrop-filter: blur(var(--misc-glass-blur)) !important;
  -webkit-backdrop-filter: blur(var(--misc-glass-blur)) !important;
  opacity: 1 !important;
  border-radius: 8px;
}

/* Настройки */
#customSettingsModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

#customSettingsModal .settings-modal {
  background: rgba(20, 20, 22, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  padding: 25px 30px;
  width: 420px;
  max-width: 90%;
  color: #eee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Стили для скроллбара */
::-webkit-scrollbar-thumb {
  background-color: var(--accent) !important;
  border-radius: 8px;
}

::-webkit-scrollbar-track {
  background: transparent !important;
}

* {
  scrollbar-color: var(--accent) transparent;
  scrollbar-width: thin;
}

/* Выделение текста */
::selection {
  background-color: var(--accent) !important;
  color: #ffffff !important;
}

/* Кнопка настроек */
a.p-navEl-link[data-nav-id="customSettings"]::before {
  content: '';
  display: inline-block;
  width: 25px;   
  height: 25px;  
  margin-right: 8px;
  background: url(https://i.ibb.co/RT1T8xWn/icons8-94.png) center/contain no-repeat;
  vertical-align: middle;
  filter: drop-shadow(0 0 2px rgba(255,255,255,0.5)); 
}`;

    // Real JavaScript code from the js file
    const realJsCode = `(function () {
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
    // Код панели настроек с красивым интерфейсом
    // Слайдеры для размытия, прозрачности, цветовой пикер
    // Сохранение настроек в localStorage
    // Применение изменений в реальном времени
    
    const existing = document.getElementById('customSettingsModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'customSettingsModal';
    modal.innerHTML = \`
      <div class="settings-modal">
        <h3>🎨 Настройки темы Liquid Glass</h3>
        
        <label>Фоновая картинка (URL)</label>
        <input type="url" id="bgUrlInput" placeholder="https://...">
        
        <label>Размытие стёкол: <span id="blurValue">8px</span></label>
        <input type="range" id="blurSlider" min="0" max="20" value="8">
        
        <label>Прозрачность блоков: <span id="containerValue">0.7</span></label>
        <input type="range" id="containerSlider" min="0.1" max="1" step="0.05" value="0.7">
        
        <label>Прозрачность навигации: <span id="navValue">0.8</span></label>
        <input type="range" id="navSlider" min="0.1" max="1" step="0.05" value="0.8">
        
        <label>Акцентный цвет</label>
        <input type="color" id="accentPicker" value="#ff0015">
        
        <div class="btn-row">
          <button class="btn btn-reset">Сбросить</button>
          <button class="btn btn-cancel">Отмена</button>
          <button class="btn btn-save">Сохранить</button>
        </div>
      </div>
    \`;
    
    document.body.appendChild(modal);
    // Добавление обработчиков событий...
  }

  function addSettingsButton() {
    // Добавляет кнопку "Настройки" в навигацию форума
    const navList = document.querySelector('.p-nav-list');
    if (!navList || document.querySelector('[data-nav-id="customSettings"]')) return;
    
    const settingsItem = document.createElement('li');
    settingsItem.innerHTML = \`
      <a href="javascript:void(0)" class="p-navEl-link" data-nav-id="customSettings">
        <span class="p-navEl-linkText">🎨 Настройки темы</span>
      </a>
    \`;
    
    settingsItem.addEventListener('click', showSettingsModal);
    navList.appendChild(settingsItem);
  }

  // Инициализация
  function init() {
    addSettingsButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Повторные попытки добавления кнопки
  let attempts = 0;
  const retryTimer = setInterval(() => {
    attempts++;
    init();
    if (attempts >= 20) clearInterval(retryTimer);
  }, 500);
})();`;

    // Display the real code
    displayCode('css-code', realCssCode);
    displayCode('js-code', realJsCode);
    
    console.log('✅ Real CSS and JS code loaded successfully');
}

function displayCode(elementId, code) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = code;
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(element);
        }
    }
}

// ============================================================
// COLOR PICKER
// ============================================================

function setupColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    if (!colorPicker) return;
    
    colorPicker.addEventListener('change', (e) => {
        const newColor = e.target.value;
        document.documentElement.style.setProperty('--primary', newColor);
        console.log(`🎨 Accent color changed to: ${newColor}`);
        
        // Save to localStorage if available
        try {
            localStorage.setItem('liquidGlass_presentationAccent', newColor);
        } catch (e) {
            console.log('Could not save accent color');
        }
    });
    
    // Load saved color
    try {
        const savedColor = localStorage.getItem('liquidGlass_presentationAccent');
        if (savedColor) {
            colorPicker.value = savedColor;
            document.documentElement.style.setProperty('--primary', savedColor);
        }
    } catch (e) {
        console.log('Could not load saved accent color');
    }
}

// ============================================================
// IMAGE MODAL FUNCTIONALITY
// ============================================================

let currentModalImage = '';

function openImageModal(imageSrc) {
    console.log(`🖼️ Opening image modal: ${imageSrc}`);
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) {
        console.warn('❌ Modal elements not found');
        return;
    }
    
    // Set image
    modalImage.src = imageSrc;
    modalImage.alt = 'Превью темы';
    currentModalImage = imageSrc;
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleModalKeydown);
    
    // Pause slider autoplay
    pauseAutoplay();
    
    console.log('✅ Image modal opened successfully');
}

function closeImageModal() {
    console.log('🔒 Closing image modal');
    
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleModalKeydown);
    
    // Resume slider autoplay
    resumeAutoplay();
    
    console.log('✅ Image modal closed');
}

function handleModalKeydown(e) {
    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeImageModal();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSlide();
            updateModalImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            updateModalImage();
            break;
    }
}

function updateModalImage() {
    const slides = [
        './photo/preview1.png',
        './photo/preview2.png',
        './photo/preview3.png'
    ];
    
    const currentImageSrc = slides[currentSlide];
    if (currentImageSrc) {
        const modalImage = document.getElementById('modalImage');
        
        modalImage.src = currentImageSrc;
        modalImage.alt = 'Превью темы';
        currentModalImage = currentImageSrc;
    }
}

function downloadImage() {
    if (!currentModalImage) return;
    
    console.log(`📥 Downloading image: ${currentModalImage}`);
    
    const link = document.createElement('a');
    link.href = currentModalImage;
    link.download = currentModalImage.split('/').pop() || 'image.png';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Download initiated');
}

function openImageInNewTab() {
    if (!currentModalImage) return;
    
    console.log(`🔗 Opening image in new tab: ${currentModalImage}`);
    window.open(currentModalImage, '_blank');
}

// ============================================================
// COPY TO CLIPBOARD
// ============================================================

window.copyToClipboard = function(elementId) {
    console.log(`🔄 Attempting to copy content from element: ${elementId}`);
    
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`❌ Element with id '${elementId}' not found`);
        return;
    }
    
    const text = element.textContent;
    console.log(`📄 Text to copy: ${text.length} characters`);
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(element, true);
            console.log('✅ Code copied to clipboard successfully');
        }).catch((error) => {
            console.warn('❌ Modern clipboard API failed:', error);
            fallbackCopy(text, element);
        });
    } else {
        console.log('📋 Using fallback copy method');
        fallbackCopy(text, element);
    }
};

function fallbackCopy(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        const success = document.execCommand('copy');
        showCopyFeedback(element, success);
        console.log(success ? '✅ Code copied using fallback method' : '❌ Copy failed');
    } catch (err) {
        showCopyFeedback(element, false);
        console.warn('❌ Copy operation failed:', err);
    }
    
    document.body.removeChild(textarea);
}

function showCopyFeedback(element, success) {
    const button = element.closest('.code-block')?.querySelector('.copy-btn');
    if (!button) {
        console.warn('❌ Copy button not found');
        return;
    }
    
    const originalContent = button.innerHTML;
    console.log(`🎯 Showing copy feedback: ${success ? 'success' : 'error'}`);
    
    const successContent = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Скопировано!</span>
    `;
    const errorContent = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Ошибка</span>
    `;
    
    button.innerHTML = success ? successContent : errorContent;
    button.classList.add('copied');
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.classList.remove('copied');
        console.log('🔄 Copy button restored to original state');
    }, 2000);
}

// ============================================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`🔗 Navigating to: ${this.getAttribute('href')}`);
            }
        });
    });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step-item, .code-block, .slide-info'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ============================================================
// INTERSECTION OBSERVER FOR NAVIGATION
// ============================================================

function setupIntersectionObserver() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ============================================================
// PERFORMANCE & DEBUG INFO
// ============================================================

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🚀 Site loaded in ${Math.round(loadTime)}ms`);
    
    // Debug info
    if (window.location.search.includes('debug')) {
        console.log('🐛 Debug mode enabled');
        document.body.classList.add('debug-mode');
    }
});

console.log('📜 Liquid Glass script loaded successfully');