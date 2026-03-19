document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    // Animate hamburger icon (optional simple transform)

});

// Hero slider
(function() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const slidesWrap = slider.querySelector('.slides');
    const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const indicators = Array.from(document.querySelectorAll('#hero-indicators .indicator'));
    let current = 0;
    let interval = null;

    function goTo(index) {
        index = (index + slides.length) % slides.length;
        slidesWrap.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((i, idx) => i.classList.toggle('active', idx === index));
        current = index;
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    nextBtn.addEventListener('click', function(e){ e.preventDefault(); next(); restart(); });
    prevBtn.addEventListener('click', function(e){ e.preventDefault(); prev(); restart(); });

    indicators.forEach((btn, idx) => {
        btn.addEventListener('click', function(){ goTo(idx); restart(); });
    });

    function start() {
        interval = setInterval(next, 3500);
    }
    function stop() {
        clearInterval(interval);
        interval = null;
    }
    function restart() { stop(); start(); }

    // initialize
    goTo(0);
    start();
})();

// Filter tabs for marketplace
(function(){
    const tabs = Array.from(document.querySelectorAll('.filter-tab'));
    const cards = Array.from(document.querySelectorAll('.nft-card'));
    if (!tabs.length || !cards.length) return;

    function setActive(tab){
        tabs.forEach(t => t.classList.toggle('active', t === tab));
    }

    function applyFilter(filter){
        if (filter === 'all') {
            cards.forEach(c => c.classList.remove('hidden'));
            return;
        }
        cards.forEach(c => {
            const cat = (c.dataset.category || '').toLowerCase();
            c.classList.toggle('hidden', cat !== filter);
        });
    }

    tabs.forEach(tab => {
        let f = tab.dataset.filter;
        if (!f) {
            f = tab.textContent.trim().toLowerCase().replace(/\s+/g,'-');
            tab.dataset.filter = f;
        }
        tab.addEventListener('click', function(e){
            e.preventDefault();
            setActive(tab);
            applyFilter(f);
        });
    });

    // initialize: apply active tab filter on load
    const active = tabs.find(t => t.classList.contains('active')) || tabs[0];
    if (active) applyFilter(active.dataset.filter || 'all');
})();

  // Toggle descriptions show/hide additional cards
  (function(){
    const btn = document.getElementById('toggle-desc');
    if (!btn) return;
    const extra = Array.from(document.querySelectorAll('.descriptions .desc-card.hidden'));
    let open = false;

    btn.addEventListener('click', function(e){
      e.preventDefault();
      open = !open;
      extra.forEach(el => el.classList.toggle('hidden', !open));
      btn.textContent = open ? 'Ver menos' : 'Ver más';
    });
  })();


// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
  if (localStorage.getItem("ageConfirmed") != "true") {
    ageModal.style.display = "flex";
  } else {
    ageModal.style.display = "none";
  }
});

yesBtn.addEventListener("click", () => {
  localStorage.setItem("ageConfirmed", "true");
  ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
  alert("DostÄ™p zabroniony. Strona tylko dla osÃ³b 18+");
  window.close();
  window.location.href = "https://www.google.es";
});

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      warn.style.display = "none";
    } else {
      warn.style.display = "";
    }
  });
}


const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
city.addEventListener("click", toggleCont);
function toggleCont() {
  city.classList.toggle("active");
  Array.from(cont).forEach((el) => {
    el.style.display = el.style.display === "block" ? "none" : "block";
  });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}
