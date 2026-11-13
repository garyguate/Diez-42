(() => {
  const root = document.documentElement;
  const body = document.body;
  const storage = window.localStorage;
  const settingsPanel = document.querySelector("[data-settings-panel]");
  const settingsToggle = document.querySelector("[data-settings-toggle]");
  const settingsClose = document.querySelector("[data-settings-close]");
  const transparencyRange = document.querySelector("[data-transparency-range]");
  const blurRange = document.querySelector("[data-blur-range]");
  const languageOptions = Array.from(document.querySelectorAll("[data-language-option]"));
  const themeOptions = Array.from(document.querySelectorAll("[data-theme-option]"));
  const translatable = Array.from(document.querySelectorAll("[data-text-en]"));
  const ariaLabels = Array.from(document.querySelectorAll("[data-aria-en]"));
  const supportedLanguages = ["en", "es", "pt-BR", "de", "ar", "uk"];
  const storagePrefix = "diez42-review";

  const getStored = (key, fallback) => storage.getItem(`${storagePrefix}-${key}`) || fallback;
  const setStored = (key, value) => storage.setItem(`${storagePrefix}-${key}`, value);
  const datasetSuffix = (lang) => lang.toLowerCase();

  const normalizeLanguage = (lang) => supportedLanguages.includes(lang) ? lang : "en";
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const normalizeTheme = (theme) => ["system", "day", "night"].includes(theme) ? theme : "day";

  const setPressed = (buttons, attribute, activeValue) => {
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset[attribute] === activeValue));
    });
  };

  const readText = (element, prefix, lang) => {
    return element.getAttribute(`${prefix}-${datasetSuffix(lang)}`) || element.getAttribute(`${prefix}-en`) || "";
  };

  const applyLanguage = (lang) => {
    const next = normalizeLanguage(lang);
    root.lang = next;
    root.dir = next === "ar" ? "rtl" : "ltr";
    if (next === "ar") document.title = "Diez42 | ترحيب ومساعدة عملية في مالقة";
    else if (next === "uk") document.title = "Diez42 | Практична допомога в Малазі";
    else document.title = "Diez42 | Welcome and practical help in Málaga";
    const pageHeading = document.querySelector("main h1[data-text-en]");
    if (pageHeading) document.title = readText(pageHeading, "data-text", next) + " | Diez42";
    storage.setItem("diez42-lang", next);
    document.querySelectorAll("[data-program-card]").forEach((card) => {
      card.lang = next;
      const image = card.querySelector("img");
      const source = readText(image, "data-src", next);
      if (source && image.getAttribute("src") !== source) image.src = source;
      image.alt = readText(card.querySelector("h3"), "data-text", next) + " — Diez42";
    });
    translatable.forEach((element) => {
      element.textContent = readText(element, "data-text", next);
    });
    ariaLabels.forEach((element) => {
      element.setAttribute("aria-label", readText(element, "data-aria", next));
    });
    settingsToggle?.setAttribute(
      "aria-label",
      next === "ar" ? "فتح الإعدادات" : next === "uk" ? "Відкрити налаштування" : next === "de" ? "Einstellungen öffnen" : next === "es" ? "Abrir ajustes" : next === "pt-BR" ? "Abrir ajustes" : "Open settings"
    );
    settingsClose?.setAttribute(
      "aria-label",
      next === "ar" ? "إغلاق الإعدادات" : next === "uk" ? "Закрити налаштування" : next === "de" ? "Einstellungen schließen" : next === "es" ? "Cerrar ajustes" : next === "pt-BR" ? "Fechar ajustes" : "Close settings"
    );
    setPressed(languageOptions, "languageOption", next);
    setStored("language", next);
  };

  const applyTheme = (theme) => {
    const preference = normalizeTheme(theme);
    const next = preference === "system" ? (colorScheme.matches ? "night" : "day") : preference;
    root.dataset.reviewTheme = next;
    setPressed(themeOptions, "themeOption", preference);
    setStored("theme", preference);
  };

  const applyGlass = () => {
    const alpha = Math.max(64, Math.min(94, Number(transparencyRange?.value || 82))) / 100;
    const blur = Math.max(8, Math.min(28, Number(blurRange?.value || 18)));
    root.style.setProperty("--glass-alpha", alpha.toFixed(2));
    root.style.setProperty("--glass-blur", `${blur}px`);
    setStored("transparency", String(Math.round(alpha * 100)));
    setStored("blur", String(blur));
  };

  const openSettings = () => {
    settingsPanel.hidden = false;
    body.classList.add("settings-open");
    settingsPanel.querySelector("button, input")?.focus();
  };

  const closeSettings = () => {
    settingsPanel.hidden = true;
    body.classList.remove("settings-open");
    settingsToggle?.focus();
  };

  const updateStickyCta = () => {
    const hero = document.querySelector(".hero");
    const threshold = hero ? hero.offsetHeight - 120 : 420;
    body.classList.toggle("show-sticky-cta", window.scrollY > threshold);
  };

  const initReveal = () => {
    const items = Array.from(document.querySelectorAll(".reveal"));
    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    items.forEach((item) => observer.observe(item));
  };


  const initHeroPhotos = () => {
    const slides = Array.from(document.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = 0;
    let paused = motion.matches;
    let timer;
    const showNext = () => {
      const next = (active + 1) % slides.length;
      if (!slides[next].complete || !slides[next].naturalWidth) return;
      slides[active].classList.remove("is-active");
      slides[next].classList.add("is-active");
      active = next;
    };
    const schedule = () => {
      window.clearInterval(timer);
      if (!paused && !document.hidden) timer = window.setInterval(showNext, 7000);
    };
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", () => { paused = motion.matches; schedule(); });
    schedule();
  };

  colorScheme.addEventListener("change", () => {
    if (getStored("theme", "day") === "system") applyTheme("system");
  });

  settingsToggle?.addEventListener("click", openSettings);
  settingsClose?.addEventListener("click", closeSettings);
  settingsPanel?.addEventListener("click", (event) => {
    if (event.target === settingsPanel) closeSettings();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && settingsPanel && !settingsPanel.hidden) closeSettings();
  });

  languageOptions.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.languageOption));
  });
  themeOptions.forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeOption));
  });
  transparencyRange?.addEventListener("input", applyGlass);
  blurRange?.addEventListener("input", applyGlass);
  window.addEventListener("scroll", updateStickyCta, { passive: true });
  window.addEventListener("resize", updateStickyCta);

  if (transparencyRange) transparencyRange.value = getStored("transparency", "82");
  if (blurRange) blurRange.value = getStored("blur", "18");
  applyGlass();
  applyTheme("system");
  applyLanguage(storage.getItem("diez42-lang") || getStored("language", "en"));
  initHeroPhotos();
  initReveal();
  updateStickyCta();
})();
