/* ==========================
   D3 Animated Background
========================== */

function createBackground() {

document.getElementById("background").innerHTML = "";

const width = window.innerWidth;
const height = document.body.scrollHeight;

const svg = d3.select("#background")
.append("svg")
.attr("width", width)
.attr("height", height);

const nodes = d3.range(100).map(() => ({
x: Math.random() * width,
y: Math.random() * height,
vx: (Math.random() - 0.5) * 0.4,
vy: (Math.random() - 0.5) * 0.4
}));

const linesGroup = svg.append("g");
const circlesGroup = svg.append("g");

const circles = circlesGroup
.selectAll("circle")
.data(nodes)
.enter()
.append("circle")
.attr("r", 2.5)
.attr("fill", "#3b82f6");

function drawLines(){

const lines = [];

for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

const dx = nodes[i].x - nodes[j].x;
const dy = nodes[i].y - nodes[j].y;

const distance = Math.sqrt(dx*dx + dy*dy);

if(distance < 130){

lines.push({
x1:nodes[i].x,
y1:nodes[i].y,
x2:nodes[j].x,
y2:nodes[j].y
});

}

}

}

const link = linesGroup
.selectAll("line")
.data(lines);

link.enter()
.append("line")
.merge(link)
.attr("x1", d => d.x1)
.attr("y1", d => d.y1)
.attr("x2", d => d.x2)
.attr("y2", d => d.y2)
.attr("stroke", "#2563eb")
.attr("stroke-opacity", 0.12);

link.exit().remove();

}

function animate(){

nodes.forEach(node => {

node.x += node.vx;
node.y += node.vy;

if(node.x <= 0 || node.x >= width)
node.vx *= -1;

if(node.y <= 0 || node.y >= height)
node.vy *= -1;

});

circles
.attr("cx", d => d.x)
.attr("cy", d => d.y);

drawLines();

requestAnimationFrame(animate);

}

animate();

}

createBackground();

window.addEventListener("resize", createBackground);

/* ==========================
   Animated Counters
========================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const updateCounter = () => {

const target = +counter.dataset.target;
const count = +counter.innerText;

const increment = target / 80;

if(count < target){

counter.innerText =
Math.ceil(count + increment);

setTimeout(updateCounter,20);

}else{

counter.innerText = target;

}

};

updateCounter();

});

/* ==========================
   Certificate Popup
========================== */

const certImages =
document.querySelectorAll(".cert-img");

const popup =
document.createElement("div");

popup.id = "imagePopup";

popup.innerHTML = `
<div class="popup-content">
<span class="close-popup">&times;</span>
<img id="popupImage">
</div>
`;

document.body.appendChild(popup);

certImages.forEach(img => {

img.addEventListener("click", () => {

document
.getElementById("popupImage")
.src = img.src;

popup.style.display = "flex";

});

});

document
.querySelector(".close-popup")
.addEventListener("click", () => {

popup.style.display = "none";

});

popup.addEventListener("click", e => {

if(e.target === popup){

popup.style.display = "none";

}

});

/* ==========================
   Navbar Active Link
========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop =
section.offsetTop - 150;

if(pageYOffset >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add("active");

}

});

});

/* ==========================
   Scroll Reveal
========================== */

const revealElements =
document.querySelectorAll(
".skill-card,.about-card,.contact-box"
);

const revealOnScroll = () => {

revealElements.forEach(el => {

const windowHeight =
window.innerHeight;

const revealTop =
el.getBoundingClientRect().top;

if(revealTop < windowHeight - 100){

el.classList.add("show");

}

});

};

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();
