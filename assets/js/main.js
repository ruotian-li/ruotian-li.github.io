// Lightbox for project drawings: click (or Enter/Space) on any figure image to view it full size.
(() => {
  const imgs = document.querySelectorAll('.figs img, .lead-figure img');
  if (!imgs.length || typeof HTMLDialogElement !== 'function') return;

  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.innerHTML = '<button class="lb-close" type="button" aria-label="Close">×</button><img alt=""><p class="lb-cap"></p>';
  document.body.appendChild(dlg);
  const big = dlg.querySelector('img');
  const cap = dlg.querySelector('.lb-cap');

  imgs.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    const open = () => {
      big.src = img.dataset.full || img.currentSrc || img.src;
      big.alt = img.alt;
      const fc = img.closest('figure')?.querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : '';
      dlg.showModal();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.classList.contains('lb-close') || e.target === big) dlg.close();
  });
})();
