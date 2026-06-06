/* ==================================
   D3 Animated Network Background
================================== */

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#background")
.append("svg")
.attr("width", width)
.attr("height", height);

const nodes = d3.range(90).map(() => ({
x: Math.random() * width,
y: Math.random() * height,
vx: (Math.random() - 0.5) * 0.5,
vy: (Math.random() - 0.5) * 0.5
}));

function drawBackground(){

svg.selectAll("*").remove();

for(let i = 0; i < nodes.length; i++){

for(let j = i + 1; j < nodes.length; j++){

const dx = nodes[i].x - nodes[j].x;
const dy = nodes[i].y - nodes[j].y;

const distance = Math.sqrt(dx * dx + dy * dy);

if(distance < 130){

svg.append("line")
.attr("x1", nodes[i].x)
.attr("y1", nodes[i].y)
.attr("x2", nodes[j].x)
.attr("y2", nodes[j].y)
.style("stroke", "#3b82f6")
.style("stroke-opacity", 0.15);

}

}

}

svg.selectAll("circle")
.data(nodes)
.enter()
.append("circle")
.attr("cx", d => d.x)
.attr("cy", d => d.y)
.attr("r", 2)
.style("fill", "#60a5fa");

}

function animateBackground(){

nodes.forEach(node => {

node.x += node.vx;
node.y += node.vy;

if(node.x < 0 || node.x > width){
node.vx *= -1;
}

if(node.y < 0 || node.y > height){
node.vy *= -1;
}

});

drawBackground();

requestAnimationFrame(animateBackground);

}

drawBackground();
animateBackground();

/* ==================================
   Statistics Counter
================================== */

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");

let current = 0;

const increment = target / 80;

const updateCounter = () => {

if(current < target){

current += increment;

counter.innerText = Math.ceil(current);

requestAnimationFrame(updateCounter);

}else{

counter.innerText = target;

}

};

updateCounter();

});

};

const statsSection = document.querySelector("#stats");

let statsStarted = false;

window.addEventListener("scroll", () => {

if(!statsStarted){

const position = statsSection.getBoundingClientRect().top;

if(position < window.innerHeight - 100){

startCounters();

statsStarted = true;

}

}

});

/* ==================================
   Certificate Popup Viewer
================================== */

const certImages = document.querySelectorAll(".cert-img");

const popup = document.createElement("div");
popup.classList.add("popup");

const popupImage = document.createElement("img");

popup.appendChild(popupImage);

document.body.appendChild(popup);

certImages.forEach(img => {

img.addEventListener("click", () => {

popupImage.src = img.src;

popup.classList.add("active");

});

});

popup.addEventListener("click", () => {

popup.classList.remove("active");

});

/* ==================================
   Scroll Reveal Animation
================================== */

const revealElements = document.querySelectorAll(
".skill-card, .service-card, .project-card, .certificate-card, .about-card, .contact-box, .stats-card"
);

const revealOnScroll = () => {

revealElements.forEach(el => {

const windowHeight = window.innerHeight;

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){

el.style.opacity = "1";
el.style.transform = "translateY(0)";

}

});

};

revealElements.forEach(el => {

el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all .7s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* ==================================
   Navbar Active Link
================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 150;

if(pageYOffset >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}

});

});

/* ==================================
   Smooth Page Load
================================== */

window.addEventListener("load", () => {

document.body.style.opacity = "1";

});
