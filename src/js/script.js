/**
 * script.js — Interatividade do site Nexus Studio.
 * ------------------------------------------------------------
 * Responsabilidades:
 *  - Atualizar o ano no rodapé dinamicamente
 *  - Ativar scroll suave para âncoras internas (fallback)
 *  - Destacar link ativo na navegação conforme scroll
 *  - Marcar header como "scrolled" para efeito visual
 *  - Expor pequenos utilitários de acessibilidade
 * ------------------------------------------------------------
 * @module app
 */
(function () {
  'use strict';

  /* ============================================================
   * CONFIG
   * ============================================================ */
  const CONFIG = {
    SELECTORS: {
      ano: '#ano',
      header: '.site-header',
      navLinks: '.nav a[href^="#"]',
      sections: 'main section[id]'
    },
    CLASSES: {
      headerScrolled: 'is-scrolled',
      navActive: 'is-active'
    },
    SCROLL: {
      headerThreshold: 12,
      sectionOffset: 120
    }
  };

  /* ============================================================
   * UTILITÁRIOS DE DOM
   * ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ============================================================
   * 1. ANO DINÂMICO NO FOOTER
   * ============================================================ */
  function atualizarAno() {
    const el = $(CONFIG.SELECTORS.ano);
    if (!el) {
      return;
    }
    el.textContent = new Date().getFullYear();
  }

  /* ============================================================
   * 2. SCROLL SUAVE (fallback para navegadores antigos)
   * ============================================================ */
  function ativarScrollSuave() {
    const links = $$(CONFIG.SELECTORS.navLinks);

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
          return;
        }

        const target = document.querySelector(href);
        if (!target) {
          return;
        }

        event.preventDefault();

        const top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          CONFIG.SCROLL.sectionOffset;

        window.scrollTo({
          top,
          behavior: 'smooth'
        });

        // Atualiza foco para acessibilidade
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ============================================================
   * 3. HEADER COM EFEITO DE SCROLL
   * ============================================================ */
  function ativarHeaderScroll() {
    const header = $(CONFIG.SELECTORS.header);
    if (!header) {
      return;
    }

    const onScroll = () => {
      const scrolled = window.scrollY > CONFIG.SCROLL.headerThreshold;
      header.classList.toggle(CONFIG.CLASSES.headerScrolled, scrolled);
    };

    // Debounce básico
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            onScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    onScroll();
  }

  /* ============================================================
   * 4. DESTAQUE DE LINK ATIVO CONFORME SCROLL
   * ============================================================ */
  function ativarNavAtiva() {
    const links = $$(CONFIG.SELECTORS.navLinks);
    const sections = $$(CONFIG.SELECTORS.sections);
    if (!links.length || !sections.length) {
      return;
    }

    // Suporte a IntersectionObserver (com fallback)
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const map = new Map();
    links.forEach((link) => {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        map.set(id.slice(1), link);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const link = map.get(entry.target.id);
          if (!link) {
            return;
          }

          links.forEach((l) => l.classList.remove(CONFIG.CLASSES.navActive));
          link.classList.add(CONFIG.CLASSES.navActive);
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ============================================================
   * 5. FOCO VISÍVEL PARA NAVEGAÇÃO POR TECLADO
   * ============================================================ */
  function ativarFocoTeclado() {
    const html = document.documentElement;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        html.classList.add('is-keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      html.classList.remove('is-keyboard-nav');
    });
  }

  /* ============================================================
   * 6. INICIALIZAÇÃO
   * ============================================================ */
  function init() {
    atualizarAno();
    ativarScrollSuave();
    ativarHeaderScroll();
    ativarNavAtiva();
    ativarFocoTeclado();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();