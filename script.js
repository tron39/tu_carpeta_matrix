const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fontSize =16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00FF00';
    ctx.font = `${fontSize}px 'Courier New', monospace`;

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

setInterval(draw, 33); // Aproximadamente 30 FPS
window.addEventListener('resize', resizeCanvas);