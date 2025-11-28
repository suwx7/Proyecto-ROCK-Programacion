document.addEventListener('DOMContentLoaded', function() {

    /**
     * MOSK PARTE
     */
    const canvas = document.getElementById("techno-bg");
    const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;

    let particles = [];
    const PARTICLE_COUNT = 80;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createParticles() {
        if (!ctx) return;
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
        if (!ctx) return;
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
            this.nextBtn && this.nextBtn.addEventListener('click', () => this.next());
            this.prevBtn && this.prevBtn.addEventListener('click', () => this.prev());
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

    const carouselContainer = document.querySelector('.carousel');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }

    /* ===========================
       FOOTER: Año automático
    ============================ */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ===========================
       NEWSLETTER
    ============================ */
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            if (!email) {
                alert("Por favor ingresa un correo válido.");
                return;
            }
            alert("¡Gracias! " + email + " fue agregado (simulado).");
            this.reset();
        });
    }

    // =======================
    // CONTACTOS (CORREGIDO)
    // =======================

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const telefono = document.getElementById("telefono").value.trim();

            if (!nombre || !correo || !telefono) return;

            const nuevoContacto = { nombre, correo, telefono };

            let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
            contactos.push(nuevoContacto);
            localStorage.setItem("contactos", JSON.stringify(contactos));

            form.reset();
            mostrarContactos();
        });
    }

    function mostrarContactos() {
        const lista = document.getElementById("listaContactos");
        if (!lista) return;

        lista.innerHTML = "";

        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        contactos.forEach((c, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${c.nombre}</strong><br>
                    ${c.correo}<br>
                    ${c.telefono}
                </div>
                <button class="btn-delete" data-index="${index}">X</button>
            `;
            lista.appendChild(li);
        });

        document.querySelectorAll(".btn-delete").forEach(btn =>
            btn.addEventListener("click", () => eliminarContacto(btn.dataset.index))
        );
    }

    function eliminarContacto(index) {
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.splice(index, 1);
        localStorage.setItem("contactos", JSON.stringify(contactos));
        mostrarContactos();
    }

    // Ejecutar al cargar
    mostrarContactos();

});