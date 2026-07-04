// Ensure ScrollTrigger engine registers instantly before calculations run
gsap.registerPlugin(ScrollTrigger);

// Particle Setup Engine
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mood = 'rain'; 

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = mood === 'rain' ? -10 : Math.random() * canvas.height + (mood === 'sunrise' ? 0 : canvas.height);
        this.size = mood === 'rain' ? Math.random() * 2 + 1 : mood === 'sunrise' ? Math.random() * 2.5 + 1 : Math.random() * 4 + 2;
        this.speedY = mood === 'rain' ? Math.random() * 5 + 4 : mood === 'sunrise' ? (Math.random() * 0.4 - 0.2) : -(Math.random() * 1.0 + 0.4);
        this.speedX = mood === 'rain' ? -0.4 : Math.random() * 0.8 - 0.4;
        this.color = mood === 'rain' ? 'rgba(148, 163, 184, 0.25)' : mood === 'sunrise' ? 'rgba(253, 224, 71, 0.4)' : 'rgba(244, 63, 94, 0.45)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (mood === 'rain' && this.y > canvas.height) this.reset();
        if (mood === 'blossom' && this.y < -10) this.reset();
        if (mood === 'sunrise' && (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)) this.reset();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (mood === 'blossom') {
            ctx.ellipse(this.x, this.y, this.size, this.size * 1.4, Math.PI / 4, 0, Math.PI * 2);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
    }
}

for(let i = 0; i < 70; i++) { particles.push(new Particle()); }

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
}
loop();

// Scene 1 Run Configuration
gsap.to(".scene1-text", {
    opacity: 1,
    y: 0,
    stagger: 1.5,
    duration: 1.2,
    ease: "power2.out",
    onComplete: () => {
        document.getElementById('crack-line').style.transform = 'scaleY(1)';
    }
});

// Scene 2 Environment Controller
ScrollTrigger.create({
    trigger: "#scene-2",
    start: "top 70%",
    onEnter: () => {
        mood = 'sunrise';
        document.body.className = "font-sans text-slate-100 overflow-x-hidden selection:bg-rose-500/30 bg-phase-sunrise";
        gsap.to("#scene-2", { opacity: 1, duration: 1.2 });
    },
    onLeaveBack: () => {
        mood = 'rain';
        document.body.className = "font-sans text-slate-100 overflow-x-hidden selection:bg-rose-500/30 bg-phase-dark";
    }
});

// Scene 3 Entrance Properties
gsap.to(".promise-card", {
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top 70%"
    },
    opacity: 1,
    y: 0,
    stagger: 0.3,
    duration: 1.0,
    ease: "power3.out"
});

// Scene 4 Polaroid Placement Trigger
gsap.to(".polaroid-pic", {
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top 65%"
    },
    opacity: 1,
    scale: 1,
    stagger: 0.4,
    duration: 1.2,
    ease: "back.out(1.5)"
});

// Scene 5 Blossom State & Safe Typing Loop Controller
ScrollTrigger.create({
    trigger: "#scene-5",
    start: "top 60%",
    onEnter: () => {
        mood = 'blossom';
        document.body.className = "font-sans text-slate-800 overflow-x-hidden selection:bg-rose-500/30 bg-phase-blossom";
        
        const monitor = document.getElementById('typewriter-box');
        if(monitor.innerHTML === "") {
            const stringArray = [
                "I'm not here because I'm afraid of losing you.",
                "I'm here because I still choose you.",
                "Every single day."
            ];
            stringArray.forEach((textLine, pos) => {
                setTimeout(() => {
                    let pNode = document.createElement('p');
                    pNode.className = "transition-opacity duration-1000 opacity-0 font-light text-slate-800 text-xl md:text-2xl";
                    if(pos === 2) pNode.className = "transition-all duration-1000 opacity-0 font-medium text-rose-600 text-2xl md:text-3xl";
                    pNode.innerText = textLine;
                    monitor.appendChild(pNode);
                    setTimeout(() => pNode.classList.remove('opacity-0'), 50);
                }, pos * 2200);
            });
        }
    },
    onLeaveBack: () => {
        mood = 'sunrise';
        document.body.className = "font-sans text-slate-100 overflow-x-hidden selection:bg-rose-500/30 bg-phase-sunrise";
    }
});

// Scene 6 Bridge Construction Builder Engine
gsap.to(".bridge-plank", {
    scrollTrigger: {
        trigger: "#bridge-planks-wrapper",
        start: "top 75%"
    },
    opacity: 1,
    x: 0,
    stagger: 0.3,
    duration: 0.7,
    ease: "power2.out"
});

// Scene 7 Envelope Scale Handler
gsap.to("#letter-envelope", {
    scrollTrigger: {
        trigger: "#scene-7",
        start: "top 55%"
    },
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out"
});

// Final Phase Target Transition Point
ScrollTrigger.create({
    trigger: "#scene-final",
    start: "top 50%",
    onEnter: () => {
        mood = 'none';
        document.body.className = "font-sans text-slate-900 overflow-x-hidden bg-phase-final";
        const fHeart = document.getElementById('final-heart-node');
        fHeart.classList.remove('opacity-0');
        fHeart.classList.add('heart-pulsing');
        
        const fTextTarget = document.getElementById('final-script-target');
        if(fTextTarget.innerHTML === "") {
            setTimeout(() => {
                fTextTarget.innerHTML = `<p class="transition-opacity duration-1000 font-light text-stone-600">"Every beautiful story deserves another chapter..."</p>`;
                setTimeout(() => {
                    fTextTarget.innerHTML += `<p class="transition-opacity duration-1000 font-medium text-stone-900 mt-2">Only if both hearts choose to write it together.</p>`;
                    setTimeout(() => {
                        document.getElementById('cta-btn').classList.remove('hidden');
                    }, 1000);
                }, 2000);
            }, 1000);
        }
    }
});

// Final Interaction Handler Script
document.getElementById('cta-btn').addEventListener('click', function() {
    this.style.display = 'none';
    const interactBox = document.getElementById('hearts-interact');
    interactBox.classList.remove('hidden');
    interactBox.classList.add('flex');
    
    gsap.to(interactBox.children[0], { x: 80, duration: 3.5, ease: "power2.inOut" });
    gsap.to(interactBox.children[1], { x: -80, duration: 3.5, ease: "power2.inOut" });
});

// Safe Audio Switch Logic
const audioNode = document.getElementById('bg-music');
const toggleBtn = document.getElementById('audio-toggle');
toggleBtn.addEventListener('click', () => {
    if (audioNode.paused) {
        audioNode.play().catch(() => console.log("User interaction context path resolved."));
        toggleBtn.innerText = "⏸️ Pause Music";
    } else {
        audioNode.pause();
        toggleBtn.innerText = "🎵 Play Music";
    }
});
