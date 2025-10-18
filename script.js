 const goBtn = document.querySelector('.go-btn');
const text = document.getElementById('text');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const music = document.getElementById('music');
const diyaLeft = document.getElementById('diyaLeft');
const diyaRight = document.getElementById('diyaRight');
const video = document.getElementById('diwali-video');
const videoContainer = document.querySelector('.video-container');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];
function createFirework(x, y) {
    const colors = ['#ffcc00', '#ff6600', '#ff3366', '#66ccff', '#99ff66', '#cc33ff', '#ff99cc'];
    for (let i = 0; i < 70; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animateFireworks);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

function flickerDiyas() {
    const beatInterval = 300;
    setInterval(() => {
        const intensity = Math.random() * 0.6 + 0.5;
        diyaLeft.style.boxShadow = `0 0 ${40 * intensity}px #ffcc00`;
        diyaRight.style.boxShadow = `0 0 ${40 * intensity}px #ffcc00`;
        diyaLeft.style.opacity = intensity;
        diyaRight.style.opacity = intensity;
    }, beatInterval);
}

function randomSkyFireworks() {
    setInterval(() => {
        // Create fireworks across the entire screen, including corners
        createFirework(
            Math.random() * canvas.width, // Full width
            Math.random() * canvas.height // Full height
        );
    }, 500);
}

goBtn.addEventListener('click', () => {
    goBtn.style.display = 'none';
    text.style.display = 'block';
    videoContainer.style.display = 'block';
    diyaLeft.style.display = 'block';
    diyaRight.style.display = 'block';
    music.play().catch(error => console.log('Audio playback failed:', error));
    video.play().catch(error => console.log('Video playback failed:', error));
    flickerDiyas();
    createFirework(canvas.width / 2, canvas.height / 2); // Initial firework at center
    randomSkyFireworks();
});

animateFireworks();