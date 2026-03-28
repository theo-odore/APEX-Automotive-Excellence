const slides = [
    {
        bg: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=2000&q=85&auto=format&fit=crop',
        accent: '#E8C547', accent2: '#FF7A1C', accentAlpha: 'rgba(232,197,71,0.7)',
        badge: 'NOW AVAILABLE',
        h1: 'PHANTOM', h2: 'GT COUPE', h3: '2025',
        subtitle: 'Raw power. Surgical precision. An icon reborn for those who demand more than the road can offer.',
        btn: 'Configure Yours',
        stats: [
            { n: '0–60 mph', v: '2.8', u: 'SEC' },
            { n: 'Top Speed', v: '342', u: 'KM/H' },
            { n: 'Horsepower', v: '740', u: 'BHP' },
            { n: 'Torque', v: '900', u: 'N·M' },
        ],
        ticker: ['PHANTOM GT COUPE 2025', 'TWIN-TURBO V8 ENGINE', '340 KM/H TOP SPEED', '0-100 IN 2.8 SECONDS', 'CARBON FIBRE CHASSIS', 'LIMITED EDITION']
    },
    {
        bg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=85&auto=format&fit=crop',
        accent: '#FF4D1C', accent2: '#FFAB00', accentAlpha: 'rgba(255,77,28,0.7)',
        badge: 'TRACK EDITION',
        h1: 'VORTEX', h2: 'RS SPORT', h3: 'PRO',
        subtitle: 'Circuit-tuned aerodynamics. Active suspension intelligence. Built for the uncompromising.',
        btn: 'Book Test Drive',
        stats: [
            { n: '0–60 mph', v: '2.4', u: 'SEC' },
            { n: 'Top Speed', v: '380', u: 'KM/H' },
            { n: 'Horsepower', v: '920', u: 'BHP' },
            { n: 'Downforce', v: '1200', u: 'KG' },
        ],
        ticker: ['VORTEX RS SPORT PRO', 'ACTIVE AERO PACKAGE', '380 KM/H UNRESTRICTED', 'CERAMIC BRAKE SYSTEM', 'MOTORSPORT DNA', 'ORDER NOW']
    },
    {
        bg: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=2000&q=85&auto=format&fit=crop',
        accent: '#00D4FF', accent2: '#7B2FFF', accentAlpha: 'rgba(0,212,255,0.7)',
        badge: 'ELECTRIC ERA',
        h1: 'NEXUS', h2: 'EV HYPER', h3: 'X1',
        subtitle: 'Zero emissions. Zero compromise. Five hundred miles of silence and pure electrical fury.',
        btn: 'Pre-Order Today',
        stats: [
            { n: '0–60 mph', v: '1.9', u: 'SEC' },
            { n: 'Range', v: '500', u: 'MILES' },
            { n: 'Power', v: '1020', u: 'HP' },
            { n: 'Charge', v: '18', u: 'MIN' },
        ],
        ticker: ['NEXUS EV HYPER X1', '1020 HP ELECTRIC MOTOR', '500 MILE RANGE', '18 MINUTE FAST CHARGE', 'ZERO EMISSIONS', 'FUTURE OF DRIVING']
    },
    {
        bg: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=2000&q=85&auto=format&fit=crop',
        accent: '#A8FF3E', accent2: '#00FF99', accentAlpha: 'rgba(168,255,62,0.7)',
        badge: 'HERITAGE LINE',
        h1: 'LEGACY', h2: 'TOURING', h3: 'V12',
        subtitle: 'Forty years of craftsmanship distilled into one transcendent grand touring experience.',
        btn: 'Discover Heritage',
        stats: [
            { n: '0–60 mph', v: '3.5', u: 'SEC' },
            { n: 'Top Speed', v: '310', u: 'KM/H' },
            { n: 'Engine', v: '6.5', u: 'LITRE' },
            { n: 'Weight', v: '1680', u: 'KG' },
        ],
        ticker: ['LEGACY TOURING V12', 'HAND-CRAFTED INTERIOR', '6.5L NATURALLY ASPIRATED', 'BESPOKE COMMISSION', 'SINCE 1985', 'TIMELESS EXCELLENCE']
    }
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let cur = 0, prev = -1, transitioning = false;
const total = slides.length;

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const bgTrack = document.getElementById('bg-track');
const bgA = document.getElementById('bg-a');
const bgB = document.getElementById('bg-b');
const colorTint = document.getElementById('color-tint');
const navAccX = document.getElementById('nav-accent-x');
const badgeDot = document.getElementById('badge-dot');
const badgeText = document.getElementById('badge-text');
const hlSolid = document.getElementById('hl-solid');
const hlOutline = document.getElementById('hl-outline');
const hlGrad = document.getElementById('hl-gradient');
const subtitle = document.getElementById('subtitle');
const btnPrimary = document.getElementById('btn-primary');
const statsRows = document.getElementById('stats-rows');
const statsLabel = document.getElementById('stats-card-label');
const ctrCur = document.getElementById('ctr-cur');
const dotNav = document.getElementById('dot-nav');
const tickTrack = document.getElementById('ticker-track');
const tickLabel = document.getElementById('ticker-label');
const transLine = document.getElementById('trans-line');
const contentInner = document.getElementById('content-inner');
const bottomRight = document.getElementById('bottom-right');
const statsCard = document.getElementById('stats-card');

// ─── COLOR THEMING ────────────────────────────────────────────────────────────
function applyPalette(s) {
    document.documentElement.style.setProperty('--accent', s.accent);
    document.documentElement.style.setProperty('--accent2', s.accent2);
    document.documentElement.style.setProperty('--accent-alpha', s.accentAlpha);
    colorTint.style.background = s.accent;
    hlGrad.style.background = `linear-gradient(90deg, ${s.accent} 0%, ${s.accent2} 100%)`;
    hlGrad.style.webkitBackgroundClip = 'text';
    hlGrad.style.backgroundClip = 'text';
    hlGrad.style.webkitTextFillColor = 'transparent';
    btnPrimary.style.background = s.accent;
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function buildTicker(s) {
    tickTrack.innerHTML = '';
    const items = [...s.ticker, ...s.ticker, ...s.ticker, ...s.ticker];
    items.forEach((t, i) => {
        const sp = document.createElement('span');
        sp.textContent = t;
        tickTrack.appendChild(sp);
        if (i < items.length - 1) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.textContent = '◆';
            tickTrack.appendChild(dot);
        }
    });
    // Reset animation
    tickTrack.style.animation = 'none';
    tickTrack.offsetHeight;
    tickTrack.style.animation = `ticker-scroll ${slides[cur].ticker.length * 5}s linear infinite`;
}

// ─── STATS CARD ───────────────────────────────────────────────────────────────
function buildStats(s) {
    statsRows.innerHTML = '';
    s.stats.forEach(st => {
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `<span class="stat-name">${st.n}</span><span class="stat-val">${st.v}<span class="stat-unit">${st.u}</span></span>`;
        statsRows.appendChild(row);
    });
}

// ─── DOT NAV ─────────────────────────────────────────────────────────────────
function buildDotNav() {
    dotNav.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot-nav-item' + (i === cur ? ' active' : '');
        d.dataset.i = i;
        d.addEventListener('click', () => goTo(i));
        dotNav.appendChild(d);
    }
}
function updateDotNav() {
    dotNav.querySelectorAll('.dot-nav-item').forEach((d, i) => {
        d.classList.toggle('active', i === cur);
    });
}

// ─── BG SLIDE ────────────────────────────────────────────────────────────────
let bgAisLeft = true; // bg-a on left slot, bg-b on right slot

function initBgs() {
    bgA.style.backgroundImage = `url('${slides[0].bg}')`;
    bgB.style.backgroundImage = `url('${slides[1] ? slides[1].bg : slides[0].bg}')`;
    bgA.style.transform = 'scale(1.08)';
    bgB.style.transform = 'scale(1.08)';
    bgTrack.style.transform = 'translateX(0)';
    startZoom(bgA);
}

let zoomAnim = null;
function startZoom(el) {
    if (zoomAnim) cancelAnimationFrame(zoomAnim);
    let start = null;
    const DURATION = 8000;
    const fromScale = 1.0;
    const toScale = 1.08;
    function tick(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / DURATION, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.style.transform = `scale(${fromScale + (toScale - fromScale) * ease})`;
        if (p < 1) zoomAnim = requestAnimationFrame(tick);
    }
    zoomAnim = requestAnimationFrame(tick);
}

// ─── CONTENT TRANSITION (pan down/up) ────────────────────────────────────────
function panContent(direction, then) {
    // direction: 'down' = exit downward, 'up' = exit upward
    const yOut = direction === 'down' ? '40px' : '-40px';

    // Force reflow pattern — no CSS class toggling
    contentInner.style.transition = 'none';
    bottomRight.style.transition = 'none';
    contentInner.style.opacity = '1';
    contentInner.style.transform = 'translateY(0px)';
    bottomRight.style.opacity = '1';
    bottomRight.style.transform = 'translateY(0px)';
    contentInner.offsetHeight; // forced reflow

    // Animate out
    contentInner.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
    bottomRight.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
    contentInner.style.opacity = '0';
    contentInner.style.transform = `translateY(${yOut})`;
    bottomRight.style.opacity = '0';
    bottomRight.style.transform = `translateY(${yOut})`;

    setTimeout(() => {
        then();

        // Reset positions for entering from opposite side (no transition yet)
        const yIn = direction === 'down' ? '-40px' : '40px';
        contentInner.style.transition = 'none';
        bottomRight.style.transition = 'none';
        contentInner.style.opacity = '0';
        contentInner.style.transform = `translateY(${yIn})`;
        bottomRight.style.opacity = '0';
        bottomRight.style.transform = `translateY(${yIn})`;
        contentInner.offsetHeight; // forced reflow

        // Animate in
        contentInner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        bottomRight.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        contentInner.style.opacity = '1';
        contentInner.style.transform = 'translateY(0px)';
        bottomRight.style.opacity = '1';
        bottomRight.style.transform = 'translateY(0px)';
    }, 400);
}

// ─── GO TO SLIDE ─────────────────────────────────────────────────────────────
function goTo(index, dir) {
    if (transitioning || index === cur) return;
    transitioning = true;

    const direction = dir || (index > cur ? 'down' : 'up');
    const nextSlide = slides[index];
    const goingRight = index > cur;

    prev = cur;
    cur = index;

    // Flash transition line
    const lineX = goingRight ? '100vw' : '0';
    transLine.style.left = goingRight ? '-2px' : '100vw';
    transLine.style.opacity = '1';
    transLine.style.transition = `left 0.4s ease, opacity 0.2s ease`;
    transLine.offsetHeight;
    transLine.style.left = goingRight ? '100vw' : '-2px';
    setTimeout(() => transLine.style.opacity = '0', 300);

    // Update BG track
    // The track holds 2 slides: we always put current in left slot, next in right
    if (goingRight) {
        // loading nextSlide into right slot, slide track left
        bgB.style.backgroundImage = `url('${nextSlide.bg}')`;
        bgB.style.transform = 'scale(1.0)';
        bgTrack.style.transform = 'translateX(-100vw)';
        setTimeout(() => {
            startZoom(bgB);
            // reset: move b to left, load future slide in right
            setTimeout(() => {
                bgA.style.backgroundImage = bgB.style.backgroundImage;
                bgA.style.transform = bgB.style.transform;
                bgTrack.style.transition = 'none';
                bgTrack.style.transform = 'translateX(0)';
                bgTrack.offsetHeight;
                bgTrack.style.transition = 'transform 1.1s cubic-bezier(0.77,0,0.175,1)';
                // preload next-next
                const nn = slides[(cur + 1) % total];
                bgB.style.backgroundImage = `url('${nn.bg}')`;
                bgB.style.transform = 'scale(1.0)';
            }, 1150);
        }, 600);
    } else {
        // going left: put nextSlide in left slot, shift track right back
        bgB.style.backgroundImage = bgA.style.backgroundImage;
        bgB.style.transform = bgA.style.transform;
        bgA.style.backgroundImage = `url('${nextSlide.bg}')`;
        bgA.style.transform = 'scale(1.0)';
        bgTrack.style.transition = 'none';
        bgTrack.style.transform = 'translateX(-100vw)';
        bgTrack.offsetHeight;
        bgTrack.style.transition = 'transform 1.1s cubic-bezier(0.77,0,0.175,1)';
        bgTrack.style.transform = 'translateX(0)';
        setTimeout(() => startZoom(bgA), 600);
    }

    // Content pan
    panContent(direction, () => {
        const s = slides[cur];
        hlSolid.textContent = s.h1;
        hlOutline.textContent = s.h2;
        hlGrad.textContent = s.h3;
        subtitle.textContent = s.subtitle;
        badgeText.textContent = s.badge;
        btnPrimary.textContent = s.btn;
        applyPalette(s);
        buildStats(s);
        buildTicker(s);
        updateDotNav();
        ctrCur.textContent = String(cur + 1).padStart(2, '0');
    });

    setTimeout(() => { transitioning = false; }, 1200);
}

function next() { goTo((cur + 1) % total, 'down'); }
function prev_slide() { goTo((cur - 1 + total) % total, 'up'); }

// ─── KEYBOARD ────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev_slide();
});

// ─── SCROLL ──────────────────────────────────────────────────────────────────
let wheelBusy = false;
window.addEventListener('wheel', e => {
    e.preventDefault();
    if (wheelBusy) return;
    wheelBusy = true;
    if (e.deltaY > 0) next(); else prev_slide();
    setTimeout(() => wheelBusy = false, 1400);
}, { passive: false });

// ─── SWIPE ────────────────────────────────────────────────────────────────────
let touchStartY = 0, touchStartX = 0;
window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
}, { passive: true });
window.addEventListener('touchend', e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dy) > Math.abs(dx)) {
        if (dy > 40) next(); else if (dy < -40) prev_slide();
    } else {
        if (dx > 40) next(); else if (dx < -40) prev_slide();
    }
}, { passive: true });

// ─── MOUSE PARALLAX ───────────────────────────────────────────────────────────
let mouseX = 0.5, mouseY = 0.5;
let currentBg = () => bgTrack.style.transform.includes('-100') ? bgB : bgA;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

(function parallaxLoop() {
    const dx = (mouseX - 0.5) * 22;
    const dy = (mouseY - 0.5) * 14;
    const activeBg = bgTrack.style.transform.includes('-100vw') ? bgB : bgA;
    const current = activeBg.style.transform || 'scale(1.08)';
    const scaleMatch = current.match(/scale\(([^)]+)\)/);
    const sc = scaleMatch ? scaleMatch[1] : '1.08';
    activeBg.style.transform = `scale(${sc}) translate(${dx * -0.4}px, ${dy * -0.4}px)`;
    requestAnimationFrame(parallaxLoop);
})();

// ─── CLOCK ────────────────────────────────────────────────────────────────────
function updateClock() {
    const n = new Date();
    const pad = v => String(v).padStart(2, '0');
    document.getElementById('nav-time').textContent =
        `${pad(n.getHours())}.${pad(n.getMinutes())}.${pad(n.getSeconds())}`;
}
setInterval(updateClock, 1000);
updateClock();

// ─── LOADER ───────────────────────────────────────────────────────────────────
function runLoader() {
    return new Promise(resolve => {
        const bar = document.getElementById('loader-bar');
        const pct = document.getElementById('loader-pct');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 12 + 4;
            if (p >= 100) { p = 100; clearInterval(interval); }
            bar.style.width = p + '%';
            pct.textContent = Math.round(p) + '%';
            if (p === 100) setTimeout(resolve, 300);
        }, 80);
    });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
    // Preload first image
    await new Promise(r => {
        const img = new Image();
        img.onload = r; img.onerror = r;
        img.src = slides[0].bg;
    });

    await runLoader();

    // Hide loader
    const loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.7s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 700);

    // Apply first slide
    const s = slides[0];
    hlSolid.textContent = s.h1;
    hlOutline.textContent = s.h2;
    hlGrad.textContent = s.h3;
    subtitle.textContent = s.subtitle;
    badgeText.textContent = s.badge;
    btnPrimary.textContent = s.btn;
    applyPalette(s);
    buildStats(s);
    buildTicker(s);
    buildDotNav();
    ctrCur.textContent = '01';
    document.getElementById('ctr-tot').textContent = String(total).padStart(2, '0');

    // Init backgrounds
    initBgs();

    // Entrance animation for content
    contentInner.style.opacity = '0';
    contentInner.style.transform = 'translateY(30px)';
    bottomRight.style.opacity = '0';
    bottomRight.style.transform = 'translateY(30px)';
    contentInner.style.transition = 'none';
    bottomRight.style.transition = 'none';
    contentInner.offsetHeight;

    setTimeout(() => {
        contentInner.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        bottomRight.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
        contentInner.style.opacity = '1';
        contentInner.style.transform = 'translateY(0)';
        bottomRight.style.opacity = '1';
        bottomRight.style.transform = 'translateY(0)';
    }, 100);
}

init();