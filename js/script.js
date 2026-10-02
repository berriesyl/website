(function () {
  const root = document.documentElement;
  const cvBtn = document.getElementById('cvDownloadBtn');
  const langButtons = document.querySelectorAll('#langSwitch button');
  const cvFiles = {
    tr: 'assets/cv/Berra-Soyler-CV-TR.pdf',
    en: 'assets/cv/Berra-Soyler-CV-EN.pdf'
  };

  function setLang(lang) {
    root.setAttribute('lang', lang);
    langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    cvBtn.setAttribute('href', cvFiles[lang]);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  let initial = 'tr';
  try { initial = localStorage.getItem('lang') || initial; } catch (e) {}
  if (!cvFiles[initial]) initial = 'tr';
  setLang(initial);

  langButtons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('header[id], section[id]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      navLinks.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.getElementById('year').textContent = new Date().getFullYear();
})();
