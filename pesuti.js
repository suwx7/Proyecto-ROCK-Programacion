document.addEventListener('DOMContentLoaded', function() {

    /* MOSKA = */
    const canvas = document.getElementById("techno-bg");
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (canvas && ctx) {
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let particles = [];
        const PARTICLE_COUNT = 80;

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speed: Math.random() * 0.7 + 0.2
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
    }

    /* NAGGETT = */

    const playButtons = document.querySelectorAll(".play-btn");
    let currentAudio = null;

    playButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const audioSrc = btn.getAttribute("data-audio");

            if (!audioSrc) return;

            // Si ya hay uno sonando, lo pausamos
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }

            const audio = new Audio(audioSrc);
            audio.play();
            currentAudio = audio;
        });
    });


    /* BRIAN = */

    // Footer – año automático
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Newsletter fake
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

    // Contactos
    const form = document.getElementById("contactForm");
    const lista = document.getElementById("listaContactos");

    function mostrarContactos() {
        if (!lista) return;

        lista.innerHTML = "";
        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        contactos.forEach((c, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${c.nombre}</strong><br>
                    ${c.correo}
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

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();

            if (!nombre || !correo) return;

            const nuevoContacto = { nombre, correo };

            let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
            contactos.push(nuevoContacto);
            localStorage.setItem("contactos", JSON.stringify(contactos));

            form.reset();
            mostrarContactos();
        });
    }

    mostrarContactos();


    /* =  TIAGO  = */





});