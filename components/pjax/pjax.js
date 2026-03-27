// PJAX navigation: swaps #pjax-root via fetch + History API so persistent
// components (like the music player) keep running between page navigations.
(() => {
  if (window.__pjaxEnabled) return;
  window.__pjaxEnabled = true;

  const ROOT_SELECTOR = "#pjax-root";
  const LOADED_SCRIPTS = new Set(
    Array.from(document.querySelectorAll("script[src]")).map((s) => s.src),
  );
  const STYLE_LOADS = new Map(
    Array.from(document.querySelectorAll('link[rel="stylesheet"][href]')).map(
      (l) => [l.href, Promise.resolve()],
    ),
  );

  let inFlight = null;
  let navigationToken = 0;

  function isModifiedClick(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  }

  function shouldHandleLink(a) {
    if (!a) return false;
    if (a.hasAttribute("download")) return false;
    if (a.getAttribute("target") === "_blank") return false;
    if (a.dataset.noPjax === "true") return false;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return false;
    }
    return true;
  }

  function resolveUrl(href, baseHref) {
    try {
      return new URL(href, baseHref || window.location.href);
    } catch {
      return null;
    }
  }

  function sameOrigin(url) {
    return url && url.origin === window.location.origin;
  }

  function dispatchNavigate(url) {
    window.dispatchEvent(
      new CustomEvent("site:navigate", { detail: { url: String(url) } }),
    );
  }

  function dispatchNavigateEnd(url, detail) {
    window.dispatchEvent(
      new CustomEvent("site:navigate:end", {
        detail: { url: String(url), ...(detail || {}) },
      }),
    );
  }

  function syncSeoHead(nextDoc, baseUrl, targetUrl) {
    const head = document.head;
    if (!head) return;

    // meta[name="description"]
    const nextDesc = nextDoc.querySelector('meta[name="description"]');
    const nextDescContent = nextDesc?.getAttribute("content") || "";
    const currentDesc = head.querySelector('meta[name="description"]');
    if (nextDescContent) {
      if (currentDesc) currentDesc.setAttribute("content", nextDescContent);
      else {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        meta.setAttribute("content", nextDescContent);
        head.appendChild(meta);
      }
    } else if (currentDesc) {
      currentDesc.remove();
    }

    // OpenGraph tags: replace existing meta[property^="og:"] entirely.
    head.querySelectorAll('meta[property^="og:"]').forEach((m) => m.remove());
    const ogTags = Array.from(
      nextDoc.querySelectorAll('meta[property^="og:"]'),
    );
    for (const tag of ogTags) {
      const prop = tag.getAttribute("property");
      const content = tag.getAttribute("content");
      if (!prop || !content) continue;
      const meta = document.createElement("meta");
      meta.setAttribute("property", prop);
      meta.setAttribute("content", content);
      head.appendChild(meta);
    }

    // Canonical: replace existing link[rel="canonical"].
    head.querySelectorAll('link[rel="canonical"]').forEach((l) => l.remove());
    const nextCanonical = nextDoc.querySelector('link[rel="canonical"][href]');
    if (nextCanonical) {
      const hrefAttr = nextCanonical.getAttribute("href");
      const resolved = resolveUrl(hrefAttr, baseUrl);
      if (resolved) {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", resolved.href);
        head.appendChild(link);
      }
    } else if (targetUrl) {
      // Optional fallback: keep DOM consistent even if pages don't define canonicals yet.
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", String(targetUrl));
      head.appendChild(link);
    }
  }

  function syncBodyAttrs(nextDoc) {
    const body = document.body;
    const nextBody = nextDoc.body;
    if (!body || !nextBody) return;

    const attrs = [
      "data-page",
      "data-bg-blobs",
      "data-bg-stickers",
      "data-bg-sticker-color",
      "data-bg-sticker-layer",
      "data-bg-sticker-opacity",
    ];

    for (const attr of attrs) {
      if (nextBody.hasAttribute(attr)) {
        body.setAttribute(attr, nextBody.getAttribute(attr) || "");
      } else {
        body.removeAttribute(attr);
      }
    }
  }

  function waitForStylesheet(link, timeoutMs) {
    return new Promise((resolve) => {
      let settled = false;

      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      link.addEventListener("load", finish, { once: true });
      link.addEventListener("error", finish, { once: true });
      setTimeout(finish, timeoutMs);
    });
  }

  async function loadMissingStyles(doc, baseUrl) {
    const links = Array.from(
      doc.querySelectorAll('link[rel="stylesheet"][href]'),
    );

    const pending = [];
    for (const link of links) {
      const hrefAttr = link.getAttribute("href");
      const resolved = resolveUrl(hrefAttr, baseUrl);
      if (!resolved) continue;

      const href = resolved.href;
      if (STYLE_LOADS.has(href)) {
        pending.push(STYLE_LOADS.get(href));
        continue;
      }

      const el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = href;
      const loadPromise = waitForStylesheet(el, 3000);
      STYLE_LOADS.set(href, loadPromise);
      pending.push(loadPromise);
      document.head.appendChild(el);
    }

    if (pending.length > 0) {
      await Promise.all(pending);
    }
  }

  function loadScriptSequential(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function loadMissingScripts(doc, baseUrl) {
    const scripts = Array.from(doc.querySelectorAll("script[src]"));
    for (const s of scripts) {
      const srcAttr = s.getAttribute("src");
      const resolved = resolveUrl(srcAttr, baseUrl);
      if (!resolved) continue;
      if (LOADED_SCRIPTS.has(resolved.href)) continue;
      LOADED_SCRIPTS.add(resolved.href);
      await loadScriptSequential(resolved.href);
    }
  }

  function removeLightboxOverlays() {
    document
      .querySelectorAll(".lightbox-overlay, .gd-lightbox-overlay")
      .forEach((overlay) => overlay.remove());
  }

  async function navigateTo(url, opts) {
    const options = opts || {};
    const push = options.push !== false;
    const targetUrl = String(url);
    const currentUrl = window.location.href;

    if (targetUrl === currentUrl && !options.force) {
      dispatchNavigateEnd(targetUrl, {
        title: document.title,
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
      return;
    }

    const currentRoot = document.querySelector(ROOT_SELECTOR);
    if (!currentRoot) {
      window.location.href = targetUrl;
      return;
    }

    const token = ++navigationToken;

    if (inFlight) {
      try {
        inFlight.abort();
      } catch {
        // ignore
      }
    }
    const controller = new AbortController();
    inFlight = controller;

    dispatchNavigate(targetUrl);

    let text = "";
    try {
      const res = await fetch(targetUrl, {
        signal: controller.signal,
        headers: { "X-Requested-With": "pjax" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      text = await res.text();
    } catch (err) {
      if (
        controller.signal.aborted ||
        err?.name === "AbortError" ||
        token !== navigationToken
      ) {
        return;
      }

      // Fallback to full navigation if fetch fails.
      console.error("PJAX fetch failed:", err);
      window.location.href = targetUrl;
      return;
    } finally {
      if (inFlight === controller) inFlight = null;
    }

    if (token !== navigationToken) return;

    const parser = new DOMParser();
    const nextDoc = parser.parseFromString(text, "text/html");
    const nextRoot = nextDoc.querySelector(ROOT_SELECTOR);
    if (!nextRoot) {
      window.location.href = targetUrl;
      return;
    }

    // Update title (robust extraction for SEO + reliable PJAX swaps)
    const nextTitle = nextDoc.querySelector("title")?.textContent?.trim();
    if (nextTitle) document.title = nextTitle;
    syncSeoHead(nextDoc, targetUrl, targetUrl);

    // Load page CSS/JS before swapping (reduces flashes + ensures init code exists).
    await loadMissingStyles(nextDoc, targetUrl);
    await loadMissingScripts(nextDoc, targetUrl);
    if (token !== navigationToken) return;

    // History: set URL before swapping so relative assets resolve correctly.
    if (push) {
      history.pushState({ pjax: true }, "", targetUrl);
    }

    syncBodyAttrs(nextDoc);

    // Swap content while preserving the existing root container.
    // Replacing the node can break references/styles tied to the original element.
    removeLightboxOverlays();
    currentRoot.innerHTML = nextRoot.innerHTML;

    // Reset scroll
    window.scrollTo(0, 0);

    dispatchNavigateEnd(targetUrl, {
      title: document.title,
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      bg: {
        blobs: document.body?.getAttribute("data-bg-blobs"),
        stickers: document.body?.getAttribute("data-bg-stickers"),
        stickerColor: document.body?.getAttribute("data-bg-sticker-color"),
        stickerLayer: document.body?.getAttribute("data-bg-sticker-layer"),
        stickerOpacity: document.body?.getAttribute("data-bg-sticker-opacity"),
      },
    });
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    if (isModifiedClick(e)) return;
    const a = e.target.closest("a");
    if (!shouldHandleLink(a)) return;

    const url = resolveUrl(a.getAttribute("href"), window.location.href);
    if (!sameOrigin(url)) return;

    if (url.href === window.location.href) {
      return;
    }

    // Same-page hash links: allow default behavior.
    if (
      url.hash &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    ) {
      return;
    }

    e.preventDefault();
    navigateTo(url.href, { push: true });
  });

  window.addEventListener("popstate", () => {
    // When going back/forward, load the URL in place.
    navigateTo(window.location.href, { push: false });
  });
})();
