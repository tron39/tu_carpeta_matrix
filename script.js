const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const textColor = getComputedStyle(document.body).color; // Obtener el color del texto actual
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px 'Fira Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = Math.random() < 0.8 ? 1 : 0; // Simula código binario
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);
    drops.length = columns;
    drops.fill(1);
}

function typeWriter(elemento, texto, velocidad = 50) {
    let i = 0;
    const txt = texto;
    const speed = velocidad;

    function escribir() {
        if (i < txt.length) {
            elemento.textContent += txt.charAt(i);
            i++;
            setTimeout(escribir, speed);
        }
    }

    elemento.textContent = ''; // Limpiar el contenido inicial
    escribir();
}

document.addEventListener('DOMContentLoaded', () => {
    const textosConsola = document.querySelectorAll('.console-text');
    textosConsola.forEach(textoElemento => {
        const textoCompleto = textoElemento.textContent;
        textoElemento.textContent = ''; // Asegurarse de que esté vacío inicialmente
        typeWriter(textoElemento, textoCompleto);
    });

    document.body.classList.add('loaded'); // Para la transición de página

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = 'Tema Oscuro';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Tema Oscuro';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Tema Claro';
        }
    });
});

setInterval(draw, 33); // Aproximadamente 30 FPS
window.addEventListener('resize', resizeCanvas);

// Interceptar los clics en los enlaces para iniciar la transición de salida
document.querySelectorAll('a').forEach(link => {
    if (link.href.startsWith(window.location.origin) && link.href !== window.location.href && !link.getAttribute('target')) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.body.classList.remove('loaded'); // Iniciar el fundido de salida
            const href = this.getAttribute('href');
            setTimeout(() => {
                window.location.href = href; // Redirigir después de la transición
            }, 300); // Esperar un poco más que la duración de la transición CSS
        });
    }
});