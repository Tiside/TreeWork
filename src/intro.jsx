//
// import { useEffect, useRef } from "react";
import "./Css/intro.css"
export default function Intro() {
    return(
        <>
        </>
    )
//     const canvasRef = useRef(null);
//     const h1Ref = useRef(null);
//     const pRef  = useRef(null);
//     const wrapRef = useRef(null);
//
//
//     function fancyType(el, text, opts = {}) {
//         return new Promise((resolve) => {
//             if (!el) return resolve();
//             const cps = opts.cps ?? 22;
//             const jitter = opts.jitter ?? 0.25;
//             const group = opts.group ?? 1;
//             el.classList.add("typing");
//             el.innerHTML = "";
//             const frag = document.createDocumentFragment();
//             const spans = [];
//             for (const ch of text) {
//                 const s = document.createElement("span");
//                 s.className = "char";
//                 s.textContent = ch === " " ? "\u00A0" : ch;
//                 frag.appendChild(s);
//                 spans.push(s);
//             }
//             el.appendChild(frag);
//
//             let i = 0;
//             const baseDelay = 1000 / Math.max(1, cps);
//             (function tick() {
//                 for (let k = 0; k < group && i < spans.length; k++, i++) {
//                     requestAnimationFrame(() => spans[i].classList.add("in"));
//                 }
//                 if (i < spans.length) {
//                     const r = 1 + (Math.random() * 2 - 1) * jitter;
//                     setTimeout(tick, baseDelay * r);
//                 } else {
//                     el.classList.remove("typing");
//                     resolve();
//                 }
//             })();
//         });
//     }
//
//     function typeText(el, text, cps = 30) {
//         return new Promise((resolve) => {
//             let i = 0;
//             el.textContent = "";
//             const delay = 1000 / Math.max(1, cps);
//             const id = setInterval(() => {
//                 el.textContent += text.charAt(i++);
//                 if (i >= text.length) {
//                     clearInterval(id);
//                     resolve();
//                 }
//             }, delay);
//         });
//     }
//
//     useEffect(() => {
//
//         const canvas = canvasRef.current;
//         const h1 = h1Ref.current;
//         const p  = pRef.current;
//         const wrap = wrapRef.current;
//
//         class Tree {
//             constructor(canvasEl) {
//                 this.C = canvasEl;
//                 this.c = this.C.getContext("2d");
//                 this.S = window.devicePixelRatio || 1;
//                 this.W = 800;
//                 this.H = 800;
//                 this.branches = [];
//                 this.darkTheme = false;
//                 this.decaying = false;
//                 this.floorY = 685;
//                 this.fruit = [];
//                 this.gravity = 0.098;
//                 this.loopDelay = 500;
//                 this.loopEnd = +new Date();
//                 this.maxGenerations = 10;
//                 this.rafId = null;
//                 this.init();
//             }
//             get allBranchesComplete() {
//                 return this.branches.some(b => b.progress >= 1 && b.generation === this.maxGenerations);
//             }
//             get allFruitComplete() {
//                 return this.fruit.length && this.fruit.every(f => f.progress === 1);
//             }
//             get allFruitFalling() {
//                 return this.fruit.length && this.fruit.every(f => f.timeUntilFall <= 0);
//             }
//             get lastGeneration() {
//                 const gens = this.branches.map(b => b.generation);
//                 return gens[gens.length - 1];
//             }
//             get trunk() {
//                 return {
//                     angle: 0, angleInc: 20, decaySpeed: 0.0625, diameter: 10,
//                     distance: 120, distanceFade: 0.2, generation: 1, growthSpeed: 0.04,
//                     hadBranches: false, progress: 0, x1: 400, y1: 680, x2: 400, y2: 560
//                 };
//             }
//             draw() {
//                 const c = this.c;
//                 c.clearRect(0, 0, this.W, this.H);
//                 const color = this.darkTheme ? "hsl(223,10%,90%)" : "hsl(223,10%,10%)";
//                 c.strokeStyle = color; c.fillStyle = color;
//                 this.branches.forEach(b => {
//                     c.lineWidth = b.diameter;
//                     c.beginPath();
//                     c.moveTo(b.x1, b.y1);
//                     c.lineTo(b.x1 + (b.x2 - b.x1) * b.progress, b.y1 + (b.y2 - b.y1) * b.progress);
//                     c.stroke();
//                 });
//                 this.fruit.forEach(f => {
//                     c.beginPath(); c.arc(f.x, f.y, f.r * f.progress, 0, 2*Math.PI); c.fill();
//                 });
//             }
//             grow() {
//                 const now = +new Date();
//                 if (!this.branches.length && now - this.loopEnd > this.loopDelay) this.branches.push(this.trunk);
//                 if (!this.allBranchesComplete) {
//                     this.branches.forEach(b => {
//                         if (b.progress < 1) {
//                             b.progress += b.growthSpeed;
//                             if (b.progress >= 1) {
//                                 b.progress = 1;
//                                 if (b.generation === this.maxGenerations) {
//                                     this.fruit.push({
//                                         decayFrames: 18, decayTime: 150, progress: 0, speed: 0.04,
//                                         timeUntilFall: Math.round(Math.random()*300), x: b.x2, y: b.y2,
//                                         r: 4 + Math.round(Math.random()*2), restitution: 0.2*(1 - b.y2/this.floorY), yVelocity: 0
//                                     });
//                                 }
//                             }
//                         } else if (!b.hadBranches && b.generation < this.maxGenerations) {
//                             b.hadBranches = true;
//                             const lean = 5;
//                             const angleLeft  = b.angle - (b.angleInc + (Math.round(Math.random()*10)-5));
//                             const angleRight = b.angle + (b.angleInc + (Math.round(Math.random()*10)-5));
//                             const distance = b.distance * (1 - b.distanceFade);
//                             const generation = b.generation + 1;
//                             const left = {
//                                 angle: angleLeft, angleInc: b.angleInc, decaySpeed: b.decaySpeed,
//                                 diameter: Math.floor(b.diameter*0.9), distance, distanceFade: b.distanceFade,
//                                 generation, growthSpeed: b.growthSpeed, hadBranches: false, progress: 0,
//                                 x1: b.x2, y1: b.y2,
//                                 x2: b.x2 + Math.sin(angleLeft*Math.PI/180)*distance,
//                                 y2: b.y2 - Math.cos(angleLeft*Math.PI/180)*distance
//                             };
//                             const right = { ...left,
//                                 angle: angleRight,
//                                 x2: b.x2 + Math.sin(angleRight*Math.PI/180)*distance,
//                                 y2: b.y2 - Math.cos(angleRight*Math.PI/180)*distance
//                             };
//                             this.branches.push(left, right);
//                         }
//                     });
//                 }
//                 if (!this.allFruitComplete) {
//                     this.fruit.forEach(f => { if (f.progress < 1) f.progress += f.speed; });
//                 }
//                 if (this.allBranchesComplete && this.allFruitComplete) this.decaying = true;
//             }
//             decay() {
//                 if (this.fruit.length) {
//                     this.fruit = this.fruit.filter(f => f.decayTime > 0);
//                     this.fruit.forEach(f => {
//                         if (f.timeUntilFall <= 0) {
//                             f.y += f.yVelocity; f.yVelocity += this.gravity;
//                             const bottom = this.floorY - f.r;
//                             if (f.y >= bottom) { f.y = bottom; f.yVelocity *= -f.restitution; }
//                             f.decayTime--;
//                         } else f.timeUntilFall--;
//                     });
//                 }
//                 if (this.allFruitFalling || !this.fruit.length) {
//                     this.branches = this.branches.filter(b => b.progress > 0);
//                     this.branches.forEach(b => { if (b.generation === this.lastGeneration) b.progress -= b.decaySpeed; });
//                 }
//             }
//             init() {
//                 const { C, c, W, H, S } = this;
//                 C.width = W * S; C.height = H * S; c.scale(S, S);
//                 c.lineCap = "round"; c.lineJoin = "round";
//                 const loop = () => {
//                     this.draw();
//                     if (this.decaying) this.decay(); else this.grow();
//                     this.rafId = requestAnimationFrame(loop);
//                 };
//                 loop();
//             }
//             destroy() { if (this.rafId) cancelAnimationFrame(this.rafId); }
//         }
//
//         const tree = new Tree(canvas);
//
//         const t1 = setTimeout(async () => {
//             wrap.classList.add("show");
//
//             const H1 = "Welcome to TreeWork";
//             const P  = "Are you ready to start your journey with us and create projects that make life easier?";
//
//             await fancyType(h1, H1, { cps: 18, jitter: 0.2, group: 1 });
//             await new Promise(r => setTimeout(r, 400));
//             await typeText(p, P, 26);
//
//             await new Promise(r => setTimeout(r, 2000));
//             wrap.style.transition = "opacity 1.2s ease";
//             canvas.style.transition = "opacity 1.2s ease";
//             wrap.style.opacity = "0";
//             canvas.style.opacity = "0";
//             const t2 = setTimeout(() => {
//                 tree.destroy();
//                 onFinish?.();
//             }, 1200);
//
//             cleanup.push(() => clearTimeout(t2));
//         }, 5000);
//
//         const cleanup = [() => tree.destroy(), () => clearTimeout(t1)];
//         return () => cleanup.forEach(fn => fn());
//     }, [onFinish]);
//
//     return (
//         <>
//             <div className="intro-overlay">
//                 <canvas ref={canvasRef} role="img"
//                         aria-label="A tree growing until it bears fruit, dropping its fruit, shrinking, and repeating the cycle" />
//             </div>
//             <div className="welcome" ref={wrapRef}>
//                 <h1 id="type-h1" ref={h1Ref}></h1>
//                 <p id="type-p" ref={pRef}></p>
//             </div>
//         </>
//     );
}
