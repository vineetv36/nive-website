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

  const work = document.querySelector('.selected-work');
  const cards = [...work.querySelectorAll('.work-card')];
  const filters = [...work.querySelectorAll('.work-filter')];
  const surprise = work.querySelector('.surprise');
  const canOpenDialog = typeof dialog.showModal === 'function';
  // Keep the full album library browsable without JavaScript or dialog support.
  if (canOpenDialog) work.classList.add('gallery-enhanced');
  work.querySelector('.work-filters').hidden = false;
  surprise.hidden = !canOpenDialog;

  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let slot = 0;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) card.dataset.slot = String(slot++ % 9 + 1);
    });
    work.querySelector('#filter-status').textContent = `${slot} ${slot === 1 ? 'album' : 'albums'} shown`;
  }));

  function openPhoto(photo, focusTarget = photo) {
    trigger = focusTarget;
    showPhoto(photo);
    savedOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    close.focus();
  }

  surprise.addEventListener('click', () => {
    const choices = cards.filter(card => !card.hidden)
      .map(card => card.querySelector('[data-photo]'))
      .filter(photo => photo.dataset.available !== 'false');
    if (choices.length) openPhoto(choices[Math.floor(Math.random() * choices.length)], surprise);
  });

  // Featured covers and album thumbnails can refer to the same original.
  function available() {
    const unique = new Map();
    photos.filter(photo => photo.dataset.album === current?.dataset.album && photo.dataset.available !== 'false')
      .forEach(photo => {
        if (!unique.has(photo.dataset.source)) unique.set(photo.dataset.source, photo);
      });
    return [...unique.values()].sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
  }

  function markMissing(photo) {
    photos.filter(item => item.dataset.source === photo.dataset.source).forEach(item => {
      item.dataset.available = 'false';
      item.removeAttribute('href');
      item.setAttribute('aria-disabled', 'true');
      item.setAttribute('aria-label', `${item.dataset.title} photograph ${item.dataset.index} is not available`);
      item.querySelector('img')?.remove();
    });
  }

  function showPhoto(photo) {
    current = photo;
    image.style.opacity = '0';
    image.setAttribute('aria-busy', 'true');
    image.alt = photo.dataset.alt;
    image.src = photo.dataset.source;
    title.textContent = photo.dataset.title;
    const items = available();
    const index = items.findIndex(item => item.dataset.source === photo.dataset.source);
    status.textContent = `${photo.dataset.title} · ${index + 1} / ${items.length}`;
    previous.disabled = next.disabled = items.length < 2;
  }

  function move(direction) {
    const items = available();
    const index = items.findIndex(item => item.dataset.source === current.dataset.source);
    if (items.length) showPhoto(items[(index + direction + items.length) % items.length]);
  }

  photos.forEach(photo => {
    photo.dataset.source = photo.getAttribute('href');
    const preview = photo.querySelector('img');
    photo.style.setProperty('--photo-ratio', `${preview.getAttribute('width')} / ${preview.getAttribute('height')}`);
    const loaded = () => {
      if (preview.isConnected) photo.dataset.available = 'true';
    };
    const failed = () => {
      // Derivatives are optional: retry the untouched original if a preview is absent.
      if (!preview.dataset.originalFallback) {
        preview.dataset.originalFallback = 'true';
        preview.src = photo.dataset.source;
      } else {
        markMissing(photo);
      }
    };
    preview.addEventListener('load', loaded);
    preview.addEventListener('error', failed);
    if (preview.complete) {
      if (preview.naturalWidth) loaded();
      else failed();
    }

    photo.addEventListener('click', event => {
      if (photo.dataset.available === 'false') {
        event.preventDefault();
        return;
      }
      // Preserve ordinary original-image links and modified clicks.
      if (!canOpenDialog || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openPhoto(photo);
    });
  });

  image.addEventListener('load', () => {
    image.style.opacity = '1';
    image.removeAttribute('aria-busy');
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
    image.removeAttribute('aria-busy');
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
    const items = available();
    const index = Math.max(0, items.findIndex(item => item.dataset.source === current.dataset.source));
    markMissing(current);
    const remaining = available();
    if (remaining.length) showPhoto(remaining[index % remaining.length]);
    else dialog.close();
  });
})();
