document.addEventListener('DOMContentLoaded', function() {
    // Background image is static and set in CSS: `.hero-bg { background-image: url("images/fondo.jpg"); }`
    // To change the page background as the developer, replace the file at `images/fondo.jpg`
    // or update the CSS rule in `styles.css` to point to a different path.




    /**
     * MOSK PARTE
     */
    const canvas = document.getElementById("techno-bg");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const PARTICLE_COUNT = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 0.7 + 0.2,
                angle: Math.random() * 360
            });
        }
    }
    createParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;

            ctx.fillStyle = "rgba(233,69,96,0.8)";
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#E94560";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }
    drawParticles();


    /* ==========================================
       2) CARRUSEL 3D PROFESIONAL
       ========================================== */
    class Carousel {
        constructor(container, options = {}) {
            this.container = container;
            this.track = container.querySelector('.carousel-track');
            this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
            this.prevBtn = container.querySelector('.prev');
            this.nextBtn = container.querySelector('.next');
            this.indicatorsContainer = container.querySelector('.carousel-indicators');

            this.current = 0;
            this.interval = options.interval || 5000;
            this.autoplay = null;

            this.init();
            this.bindEvents();
            this.startAutoplay();
        }

        init() {
            this.renderIndicators();
        }

        renderIndicators() {
            this.indicators = this.slides.map((_, i) => {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', () => this.goTo(i));
                this.indicatorsContainer.appendChild(dot);
                return dot;
            });
        }

        goTo(index) {
            this.slides[this.current].classList.remove('active');
            this.indicators[this.current].classList.remove('active');

            this.current = (index + this.slides.length) % this.slides.length;

            this.slides[this.current].classList.add('active');
            this.indicators[this.current].classList.add('active');

            this.track.style.transform = `translateX(-${this.current * 100}%) rotateY(${this.current * 4}deg)`;
        }

        next() { this.goTo(this.current + 1); }
        prev() { this.goTo(this.current - 1); }

        bindEvents() {
            this.nextBtn.addEventListener('click', () => this.next());
            this.prevBtn.addEventListener('click', () => this.prev());
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }

        startAutoplay() {
            this.autoplay = setInterval(() => this.next(), this.interval);
        }

        stopAutoplay() {
            clearInterval(this.autoplay);
        }
    }

    // Inicializar el carrusel
    const carouselContainer = document.querySelector('.carousel');
    if (carouselContainer) {
        console.log('Carousel container found, initializing...');
        new Carousel(carouselContainer);
        console.log('Carousel initialized');
    } else {
        console.log('Carousel container not found!');
    }

});
/* ===========================
   FOOTER: Año automático
=========================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===========================
   NEWSLETTER (simulado)
=========================== */
document.getElementById("newsletterForm").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if(!email){
        alert("Por favor ingresa un correo válido.");
        return;
    }
    alert("¡Gracias! " + email + " fue agregado (simulado).");
    this.reset();
});

/* ===========================
   CONTACTOS localStorage
=========================== */
function cargarContactos(){
  const lista = document.getElementById("listaContactos");
  lista.innerHTML = "";
  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

  contactos.forEach((c,i)=>{
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${c.nombre}</strong><br>
        <span style="color:#bbb">${c.correo}</span>
      </div>
      <button onclick="eliminarContacto(${i})"
        style="padding:6px 12px;background:#ff3b6b;border:none;border-radius:6px;color:white;cursor:pointer">
        Eliminar
      </button>
    `;
    lista.appendChild(li);
  });
}

document.getElementById("contactForm").addEventListener("submit",function(e){
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if(!nombre || !correo) return;

  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  contactos.push({nombre,correo});
  localStorage.setItem("contactos",JSON.stringify(contactos));

  this.reset();
  cargarContactos();
});

function eliminarContacto(i){
  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  contactos.splice(i,1);
  localStorage.setItem("contactos",JSON.stringify(contactos));
  cargarContactos();
}

// Inicializar al cargar
cargarContactos();
/* ---------- CARRUSEL CONTINUO E INFINITO: Playlists semanales ---------- */
const track = document.querySelector(".slider-track");
const speed = 1; // velocidad del slider

let offset = 0;

function moveSlider() {
    offset -= speed;

    const firstCard = track.children[0];
    const cardWidth = firstCard.offsetWidth + 25; // +gap

    // Cuando la primera card sale totalmente de pantalla...
    if (Math.abs(offset) >= cardWidth) {
        track.appendChild(firstCard); // ...la mandamos al final
        offset += cardWidth; // ...y corregimos offset
    }

    track.style.transform = `translateX(${offset}px)`;

    requestAnimationFrame(moveSlider);
}

moveSlider();
