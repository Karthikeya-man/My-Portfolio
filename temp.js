
// Cursor Glow
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => { navLinks.classList.remove('active'); });
});

// Typewriter Effect
const phrases = [
    "I build machine learning models.",
    "I turn data into intelligent solutions.",
    "I learn fast. I build faster.",
    "I'm the AI developer of tomorrow."
];
let i = 0, j = 0;
let currentPhrase = [];
let isDeleting = false, isEnd = false;
const textDisplay = document.getElementById('typewriter');

function loop() {
    isEnd = false;
    textDisplay.innerHTML = currentPhrase.join('');
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]); j++;
            textDisplay.innerHTML = currentPhrase.join('');
        }
        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j]); j--;
            textDisplay.innerHTML = currentPhrase.join('');
        }
        if (j == phrases[i].length) { isEnd = true; isDeleting = true; }
        if (isDeleting && j === 0) { currentPhrase = []; isDeleting = false; i++; if (i === phrases.length) i = 0; }
    }
    const spedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (150 - 100) + 100;
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
    setTimeout(loop, time);
}
loop();

// Robot Speech Bubble
const speechBubble = document.getElementById('speech-bubble');
let currentTimeout;

function typeText(element, text, speed, callback) {
    let idx = 0;
    element.innerText = '';
    function type() {
        if (idx < text.length) {
            element.innerHTML += text.charAt(idx);
            idx++;
            currentTimeout = setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

setTimeout(() => {
    speechBubble.style.opacity = '1';
    typeText(speechBubble, 'Hi! 👋', 50, () => {
        currentTimeout = setTimeout(() => {
            typeText(speechBubble, 'I\'m Karthikeya\'s AI companion!', 30, () => {
                currentTimeout = setTimeout(() => {
                    typeText(speechBubble, 'Welcome to the portfolio 🚀', 30, () => {
                        currentTimeout = setTimeout(() => {
                            speechBubble.style.opacity = '0';
                        }, 3000);
                    });
                }, 1000);
            });
        }, 1500);
    });
}, 500);

// Particle Canvas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = 'rgba(30, 144, 255, 0.4)'; ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(); particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                ctx.beginPath(); ctx.strokeStyle = `rgba(30, 144, 255, ${0.15 - distance / 800})`;
                ctx.lineWidth = 1; ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });

// Skills Data
const skillsData = [
    { name: 'Machine Learning', percent: 88, icon: '🧠', cat: 'ai' },
    { name: 'Deep Learning', percent: 80, icon: '🔥', cat: 'ai' },
    { name: 'Natural Language Processing', percent: 75, icon: '🗣️', cat: 'ai' },
    { name: 'Computer Vision', percent: 72, icon: '👁️', cat: 'ai' },
    { name: 'Model Deployment', percent: 70, icon: '🚀', cat: 'ai' },
    { name: 'Python', percent: 92, icon: '🐍', cat: 'programming' },
    { name: 'SQL', percent: 78, icon: '🗄️', cat: 'programming' },
    { name: 'JavaScript (basics)', percent: 65, icon: '⚡', cat: 'programming' },
    { name: 'C/C++', percent: 70, icon: '⚙️', cat: 'programming' },
    { name: 'Pandas & NumPy', percent: 90, icon: '🐼', cat: 'data' },
    { name: 'Data Visualization', percent: 82, icon: '📊', cat: 'data' },
    { name: 'Feature Engineering', percent: 78, icon: '🛠️', cat: 'data' },
    { name: 'Jupyter Notebooks', percent: 95, icon: '📓', cat: 'data' },
    { name: 'Git & GitHub', percent: 85, icon: '🐙', cat: 'tools' },
    { name: 'Streamlit', percent: 80, icon: '👑', cat: 'tools' },
    { name: 'VS Code', percent: 95, icon: '💻', cat: 'tools' },
    { name: 'Google Colab', percent: 90, icon: '☁️', cat: 'tools' },
    { name: 'Hugging Face', percent: 72, icon: '🤗', cat: 'tools' }
];

const skillsGrid = document.getElementById('skillsGrid');
function renderSkills(filter = 'all') {
    skillsGrid.innerHTML = '';
    skillsData.forEach(skill => {
        if (filter === 'all' || skill.cat === filter) {
            const card = document.createElement('div');
            card.className = 'skill-card glass reveal active';
            card.innerHTML = `
                        <div class="skill-header">
                            <span class="skill-icon">${skill.icon}</span>
                            <span style="flex:1">${skill.name}</span>
                            <span class="text-blue">${skill.percent}%</span>
                        </div>
                        <div class="skill-bar-bg">
                            <div class="skill-bar-fill" style="width: ${skill.percent}%"></div>
                        </div>
                    `;
            skillsGrid.appendChild(card);
        }
    });
}
renderSkills();

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderSkills(e.target.dataset.filter);
    });
});

// Scroll Observer
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            if (entry.target.classList.contains('about-stats') && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const counters = document.querySelectorAll('.stat-num');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 50;
                    let c = 0;
                    const updateCounter = () => {
                        c += increment;
                        if (c < target) {
                            counter.innerText = Math.ceil(c) + '+';
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCounter();
                });
            }

            if (entry.target.id === 'skillsGrid' || entry.target.classList.contains('skill-card')) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill');
                fills.forEach(fill => {
                    const targetWidth = fill.parentElement.previousElementSibling.lastElementChild.textContent.replace('%', '');
                    fill.style.width = targetWidth + '%';
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
observer.observe(document.querySelector('.about-stats'));

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    btn.innerText = 'Sending...';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('successMsg').style.display = 'flex';
        e.target.reset();
    }, 1000);
});

// Active Nav Link
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) { current = section.getAttribute('id'); }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) { a.classList.add('active'); }
    });
});
