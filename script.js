const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#background")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const nodes = d3.range(80).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height
}));

svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 2)
    .style("fill", "#3b82f6");

for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){

        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;

        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 140){

            svg.append("line")
                .attr("x1", nodes[i].x)
                .attr("y1", nodes[i].y)
                .attr("x2", nodes[j].x)
                .attr("y2", nodes[j].y)
                .style("stroke", "#2563eb")
                .style("stroke-opacity", 0.15);
        }
    }
}
