/**
 * Portfolio Logic & Interaction
 * Organized for future Vue.js migration
 */

// --- STATE MANAGEMENT ---
const state = {
    isLoggedIn: false,
    currentX: 0,
    animatedX: 0,
    speed: 0.08
};

// --- DOM ELEMENTS ---
const container = document.getElementById('master-container');
const loginScreen = document.getElementById('login-screen');
const modal = document.getElementById('portfolio-modal');
const modalBody = document.getElementById('modal-body-content');
const dots = document.querySelectorAll('.dot');
const layers = document.querySelectorAll('.parallax-layer');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');

// --- DATA SOURCE ---
const portfolioData = {
    system: `
        <h3 class="text-3xl font-black mb-4">Sistem Informasi Manajemen</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center font-bold"><img src="assets/1.png"></a></div>
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center 
            font-bold"><img src="assets/2.png"></div>
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center font-bold"><img src="assets/3.png"></div>
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center font-bold"><img src="assets/4.png"></div>
        </div>
        <p class="mt-4 text-gray-600">HTML, CSS, Javascript, PHP, MySQL, Vue, Laravel, React</p>
    `,
    design: `
        <h3 class="text-3xl font-black mb-4">Gallery Desain Kemasan</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/5.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/6.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/7.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/8.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/9.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/10.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/11.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/12.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/13.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/14.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/15.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/16.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/17.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/18.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/19.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/20.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/21.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/22.jpg"></div>
            <div class="aspect-square bg-gray-100 rounded-lg"><img src="assets/23.jpg"></div>
        </div>
        <p class="mt-4 text-gray-600">Koleksi desain kemasan untuk industri.</p>
    `,
    story: `
        <h3 class="text-3xl font-black mb-4">Kumpulan Cerita Pendek</h3>
        <div class="space-y-4">
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Setengah Kilometer" - 2014</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Di Tempat yang Jauh" - 2016</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Gedung Bermata Sayu (Meteoroid)" - 2016</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Cortado Satu Banding Satu" - 2016</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Jejak Asap" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Bird in a Cage" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Valium" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Klandestin" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Skeleton" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"A Lump in The Throat" - 2017</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Rollercoaster" - 2018</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Di Tengah Pandemi" - 2020</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Terminal" - 2020</div>
            <div class="p-4 border-l-4 border-yellow-400 bg-gray-50 italic">"Lintah" - 2020</div>
        </div>
    `,
    general: `<h3 class="text-2xl font-black">Archive sedang diperbarui...</h3>`
};

// --- FUNCTIONS ---

/** Login dengan input apapun */
function checkLogin() {
    const u = usernameInput.value;
    const p = passwordInput.value;
    
    if (u.trim() !== "" && p.trim() !== "") {
        state.isLoggedIn = true;
        loginScreen.style.opacity = "0";
        setTimeout(() => loginScreen.style.display = "none", 800);
        container.style.opacity = "1";
        
        // Mulai animasi jika di desktop
        if(window.innerWidth >= 1024) animate();
    } else {
        errorMsg.classList.remove('hidden');
    }
}

/** Modal Handlers */
function openPortfolio(category) {
    modalBody.innerHTML = portfolioData[category] || portfolioData.general;
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function closeModal(e) {
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 400);
}

/** Parallax Animation Loop */
function animate() {
    if (window.innerWidth < 1024 || !state.isLoggedIn) return;
    
    state.animatedX += (state.currentX - state.animatedX) * state.speed;
    container.style.transform = `translateX(-${state.animatedX}px)`;
    
    layers.forEach(l => {
        const s = l.getAttribute('data-speed');
        l.style.transform = `translateX(${state.animatedX * s}px)`;
    });
    
    // Update Active Dot
    const idx = Math.round(state.animatedX / window.innerWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    
    requestAnimationFrame(animate);
}

// --- EVENT LISTENERS ---

/** Tombol Enter Support */
const handleEnter = (e) => { if(e.key === "Enter") checkLogin(); };
usernameInput.addEventListener('keypress', handleEnter);
passwordInput.addEventListener('keypress', handleEnter);

/** Desktop Horizontal Scroll */
window.addEventListener('wheel', (e) => {
    if (!state.isLoggedIn || window.innerWidth < 1024) return;
    e.preventDefault();
    state.currentX = Math.max(0, Math.min(state.currentX + e.deltaY, window.innerWidth * 3));
}, { passive: false });

/** Reset position on Resize */
window.addEventListener('resize', () => {
    if(window.innerWidth < 1024) {
        container.style.transform = "none";
    }
});