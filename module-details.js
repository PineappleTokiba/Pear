const MODULES = {
  'charging-port': { number: 'PART 01', name: 'Charging port', summary: 'A separate USB-C daughterboard designed for the connection that sees the most daily wear.', why: 'A damaged charging port should not require a new phone or main circuit board.', how: 'Remove the back, undo the standard screws, and exchange the compact port module.' },
  camera: { number: 'PART 02', name: 'Camera', summary: 'The lens and sensor live together in one protected, upgradeable camera block.', why: 'Camera technology improves quickly while the rest of a phone can remain perfectly capable.', how: 'A standardized footprint lets the complete camera block disconnect and lift out as one piece.' },
  buttons: { number: 'PART 03', name: 'Buttons', summary: 'Independent power and volume controls that can be serviced without disturbing other modules.', why: 'Physical controls are high-wear parts, but they are usually buried inside a sealed assembly.', how: 'Each control fits into a keyed channel and connects without solder or permanent adhesive.' },
  battery: { number: 'PART 04', name: 'Battery', summary: 'A protected power cell that is removable, solderless, and built for safe replacement.', why: 'Battery aging is one of the most common reasons an otherwise functional phone gets replaced.', how: 'A rigid caddy and spring terminals let the battery release with one tool and click securely back into place.' },
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
if (key === 'battery') {
  art.className = 'battery-stage part-detail-battery';
  art.innerHTML = `
    <div class="assembly-shadow"></div>
    <div class="battery-piece front-plate"><i></i><i></i><i></i><i></i><b class="pull-tab"></b></div>
    <div class="battery-piece cell"><span>${SITE_CONFIG.brandName}<br><small>POWERCELL</small></span></div>
    <div class="battery-piece clear-film"><span>PROTECTIVE FILM</span></div>
    <div class="battery-piece connector"><i></i><i></i><i></i></div>
    <div class="battery-piece cradle"></div>
    <div class="battery-piece back-plate"><i></i><i></i><i></i><i></i><b class="pull-tab"></b></div>
    <div class="assembly-screw screw-one"><b></b></div>
    <div class="assembly-screw screw-two"><b></b></div>
    <div class="assembly-screw screw-three"><b></b></div>
    <div class="assembly-screw screw-four"><b></b></div>
    <div class="snap-note mono">AUTO-ASSEMBLY</div>`;
} else if (part.image) {
  art.innerHTML = `<img src="${part.image}" alt="${part.name}">`;
}
