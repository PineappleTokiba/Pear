const SITE_CONFIG = {
  brandName: 'Pear',
};

const brandToken = /\{\{BRAND_NAME\}\}/g;
const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode;
while ((textNode = textNodes.nextNode())) {
  if (textNode.nodeValue.includes('{{BRAND_NAME}}')) {
    textNode.nodeValue = textNode.nodeValue.replace(brandToken, SITE_CONFIG.brandName);
  }
}

document.querySelectorAll('[content], [aria-label], [alt]').forEach(element => {
  ['content', 'aria-label', 'alt'].forEach(attribute => {
    const value = element.getAttribute(attribute);
    if (value?.includes('{{BRAND_NAME}}')) {
      element.setAttribute(attribute, value.replace(brandToken, SITE_CONFIG.brandName));
    }
  });
});

document.title = document.title.replace(brandToken, SITE_CONFIG.brandName);
document.querySelectorAll('[data-brand-initial]').forEach(element => {
  element.textContent = SITE_CONFIG.brandName.charAt(0).toLowerCase();
});

const form = document.querySelector('#waitlist-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const message = form.querySelector('.form-message');
  message.textContent = `You’re in. We’ll keep ${email.value} posted.`;
  form.reset();
});

const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.count);
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1100, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, { threshold: .6 });
counters.forEach(counter => observer.observe(counter));

document.querySelectorAll('.part-row').forEach(row => {
  row.addEventListener('click', () => {
    const wasActive = row.classList.contains('active');
    document.querySelectorAll('.part-row, .part-detail').forEach(item => item.classList.remove('active'));
    if (!wasActive) {
      row.classList.add('active');
      document.querySelector(`[data-detail="${row.dataset.part}"]`).classList.add('active');
    }
  });
});

const menu = document.querySelector('.menu-button');
menu?.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!isOpen));
  document.querySelector('.desktop-nav').classList.toggle('mobile-open');
});
