const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('[data-faq-button]').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.parentElement.querySelector('.faq-answer');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

const cookieBanner = document.querySelector('[data-cookie-banner]');
if (cookieBanner) {
  const accepted = sessionStorage.getItem('cookies-accepted');
  if (accepted === 'yes') cookieBanner.classList.add('hidden');
  const button = cookieBanner.querySelector('[data-cookie-accept]');
  button?.addEventListener('click', () => {
    sessionStorage.setItem('cookies-accepted', 'yes');
    cookieBanner.classList.add('hidden');
  });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

if (menuToggle && mobileMenu) {
  const closeMobileMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  mobileMenuClose?.addEventListener('click', closeMobileMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}
