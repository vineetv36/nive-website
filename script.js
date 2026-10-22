(() => {
  'use strict';

  const photos = [...document.querySelectorAll('[data-photo]')];
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('.lightbox-image');
  const title = dialog.querySelector('#lightbox-title');
  const status = dialog.querySelector('.lightbox-status');
  const previous = dialog.querySelector('.previous-button');
  const next = dialog.querySelector('.next-button');
  const close = dialog.querySelector('.close-button');
  let current = null;
  let trigger = null;
  let savedOverflow = '';

  const available = () => photos.filter(photo => photo.dataset.available === 'true');

  function markMissing(photo) {
    photo.dataset.available = 'false';
    photo.removeAttribute('href');
    photo.setAttribute('aria-disabled', 'true');
    photo.setAttribute('aria-label', `${photo.dataset.title} photograph is not yet available`);
    photo.querySelector('object, img')?.remove();
  }

  function showPhoto(photo) {
    current = photo;
    image.alt = photo.dataset.alt;
    image.src = photo.dataset.source;
    title.textContent = photo.dataset.title;
    const items = available();
    status.textContent = `${photo.dataset.title} · ${items.indexOf(photo) + 1} / ${items.length}`;
    previous.disabled = next.disabled = items.length < 2;
  }

  function move(direction) {
    const items = available();
    if (items.length) showPhoto(items[(items.indexOf(current) + direction + items.length) % items.length]);
  }

  photos.forEach(photo => {
    const source = photo.getAttribute('href');
    photo.dataset.source = source;
    // Keep a neutral fallback until the actual local file has loaded successfully.
    markMissing(photo);
    const original = new Image();
    original.alt = photo.dataset.alt;
    original.decoding = 'async';
    original.addEventListener('load', () => {
      photo.dataset.available = 'true';
      photo.href = source;
      photo.removeAttribute('aria-disabled');
      photo.setAttribute('aria-label', `View ${photo.dataset.title} photograph`);
      photo.style.setProperty('--photo-ratio', `${original.naturalWidth} / ${original.naturalHeight}`);
      photo.append(original);
    }, { once: true });
    original.addEventListener('error', () => markMissing(photo), { once: true });
    original.src = source;

    photo.addEventListener('click', event => {
      if (photo.dataset.available !== 'true') {
        event.preventDefault();
        return;
      }
      // Preserve native links for unsupported browsers and modified clicks.
      if (typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = photo;
      showPhoto(photo);
      savedOverflow = document.documentElement.style.overflow;
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = savedOverflow;
    image.removeAttribute('src');
    trigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
    if (event.key === 'Tab') {
      const buttons = [...dialog.querySelectorAll('button:not(:disabled)')];
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  image.addEventListener('error', () => {
    if (!dialog.open || !current) return;
    const failed = current;
    const items = available();
    const index = items.indexOf(failed);
    markMissing(failed);
    const remaining = available();
    if (remaining.length) showPhoto(remaining[index % remaining.length]);
    else dialog.close();
  });
})();
