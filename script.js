// Анимация появления контента после загрузки
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('fade-out');
    
    setTimeout(() => {
        loader.style.display = 'none';
        document.querySelector('header').style.opacity = '1';
        document.querySelector('.content').style.opacity = '1';
    }, 1000);
});

// Фоновые частицы
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray;

// Настройки частиц
const numberOfParticles = 100;

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Отражение от краев
    if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
    }
};

Particle.prototype.draw = function() {
    ctx.fillStyle = 'rgba(0,255,136,0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
init();
animate();

// Проигрывание аудио
const audio = new Audio('./audio.mp3');
audio.loop = true;
audio.volume = 0.4;

document.addEventListener('click', () => {
    audio.play().catch(e => console.log('Аудио не может быть проиграно без взаимодействия.'));
}, { once: true });
