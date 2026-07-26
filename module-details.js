const MODULES = {
  'charging-port': { number: 'PART 01', name: 'Charging port', summary: 'A separate USB-C daughterboard designed for the connection that sees the most daily wear.', why: 'A damaged charging port should not require a new phone or main circuit board.', how: 'Remove the back, undo the standard screws, and exchange the compact port module.', image: 'assets/charging-port-module.png' },
  camera: { number: 'PART 02', name: 'Camera', summary: 'The lens and sensor live together in one protected, upgradeable camera block.', why: 'Camera technology improves quickly while the rest of a phone can remain perfectly capable.', how: 'A standardized footprint lets the complete camera block disconnect and lift out as one piece.' },
  buttons: { number: 'PART 03', name: 'Buttons', summary: 'Independent power and volume controls that can be serviced without disturbing other modules.', why: 'Physical controls are high-wear parts, but they are usually buried inside a sealed assembly.', how: 'Each control fits into a keyed channel and connects without solder or permanent adhesive.' },
  battery: {
    number: 'PART 04',
    name: 'Battery',
    summary: 'A protected power cell that is removable, solderless, and built for safe replacement.',
    why: 'Battery aging is one of the most common reasons an otherwise functional phone gets replaced.',
    how: 'The battery module can be secured in two ways: with screws for maximum stability, or with magnets for the easiest possible replacement.',
    images: ['assets/battery-module-exploded.png', 'assets/battery-module-exploded-labeled.png', 'assets/battery-module-static.png'],
    mountingOptions: [
      { name: 'Screws', description: 'The more stable and durable option. Replacing the battery takes more effort and skill, and requires a screwdriver.' },
      { name: 'Magnets', description: 'Faster and easier to replace with no tools required, but the attachment is more vulnerable to breaking or coming loose.' }
    ]
  },
  'phone-base': { number: 'PART 05', name: 'Phone base', summary: 'The durable outer casing that aligns, supports, and protects every replaceable module.', why: 'A reusable structure keeps the largest physical part of the phone in service across repairs and upgrades.', how: 'Keyed geometry, brass inserts, and one screw standard support repeated assembly without weakening the frame.', image: 'assets/phone-outer-casing.png' }
};

const key = new URLSearchParams(location.search).get('part');
const part = MODULES[key] || MODULES['charging-port'];
document.querySelector('#part-number').textContent = part.number;
document.querySelector('#part-name').textContent = part.name;
document.querySelector('#part-summary').textContent = part.summary;
document.querySelector('#part-why').textContent = part.why;
document.querySelector('#part-how').textContent = part.how;
document.title = `${SITE_CONFIG.brandName} — ${part.name}`;

const art = document.querySelector('#part-art');
art.dataset.part = key || 'charging-port';
if (part.images) {
  art.classList.add('battery-gallery');
  const imageDescriptions = ['exploded screw-mounted design', 'exploded magnetic design', 'assembled module'];
  art.innerHTML = part.images.map((src, index) => `<img src="${src}" alt="${part.name} ${imageDescriptions[index]}">`).join('');
} else if (part.image) {
  art.innerHTML = `<img src="${part.image}" alt="${part.name}">`;
}

if (part.mountingOptions) {
  const options = document.createElement('div');
  options.className = 'mounting-options';
  options.setAttribute('aria-label', 'Battery mounting options');
  options.innerHTML = part.mountingOptions.map((option, index) => `
    <div class="mounting-option">
      <span class="mono">OPTION 0${index + 1}</span>
      <h2>${option.name}</h2>
      <p>${option.description}</p>
    </div>
  `).join('');
  document.querySelector('.part-copy').append(options);
}
