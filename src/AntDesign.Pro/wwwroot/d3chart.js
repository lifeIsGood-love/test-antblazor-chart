//demo4  解决需要点击两次才还原的问题
function drawLineChart() {
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const data = [
        { x: 0, y: 5 },
        { x: 1, y: 10 },
        { x: 2, y: 7 },
        { x: 3, y: 12 },
        { x: 4, y: 8 }
    ];

    x.domain([0, d3.max(data, d => d.x)]);
    y.domain([0, d3.max(data, d => d.y)]);

    const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y));

    // Draw the line
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Draw the X axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Draw the Y axis
    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    const brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", brushEnded);

    g.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushEnded(event) {
        const selection = event.selection;
        if (!selection) return;

        const [x0, x1] = selection.map(x.invert);
        x.domain([x0, x1]);

        g.select(".brush").call(brush.move, null);

        g.select("path")
            .transition()
            .duration(750)
            .attr("d", line);
    }

    const zoom = d3.zoom()
        .scaleExtent([1, 32])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
        const transform = event.transform;
        const zx = transform.rescaleX(x);
        const zy = transform.rescaleY(y);

        g.select("path").attr("d", line.x(d => zx(d.x)).y(d => zy(d.y)));

        g.select(".x.axis").call(d3.axisBottom(zx));
        g.select(".y.axis").call(d3.axisLeft(zy));
    }

    window.resetChart = function() {
        // Reset the zoom transform to the identity (initial state)
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);

        // Reset the X and Y domains and redraw the line
        x.domain([0, d3.max(data, d => d.x)]);
        y.domain([0, d3.max(data, d => d.y)]);

        g.select("path")
            .transition()
            .duration(750)
            .attr("d", line);

        g.select(".x.axis").call(d3.axisBottom(x));
        g.select(".y.axis").call(d3.axisLeft(y));
    }
}



// demo3 5个点的图，局部放大缩小并可以还原，需点击两次才能还原
// function drawLineChart() {
//     const svg = d3.select("#chart")
//         .append("svg")
//         .attr("width", 600)
//         .attr("height", 400);

//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     const width = +svg.attr("width") - margin.left - margin.right;
//     const height = +svg.attr("height") - margin.top - margin.bottom;

//     const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     const x = d3.scaleLinear().range([0, width]);
//     const y = d3.scaleLinear().range([height, 0]);

//     const data = [
//         { x: 0, y: 5 },
//         { x: 1, y: 10 },
//         { x: 2, y: 7 },
//         { x: 3, y: 12 },
//         { x: 4, y: 8 }
//     ];

//     x.domain([0, d3.max(data, function(d) { return d.x; })]);
//     y.domain([0, d3.max(data, function(d) { return d.y; })]);

//     const line = d3.line()
//         .x(function(d) { return x(d.x); })
//         .y(function(d) { return y(d.y); });

//     g.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 1.5)
//         .attr("d", line);

//     const brush = d3.brushX()
//         .extent([[0, 0], [width, height]])
//         .on("end", brushEnded);

//     g.append("g")
//         .attr("class", "brush")
//         .call(brush);

//     function brushEnded(event) {
//         const selection = event.selection;
//         if (!selection) return;

//         const [x0, x1] = selection.map(x.invert);
//         x.domain([x0, x1]);

//         g.select(".brush").call(brush.move, null);

//         g.select("path")
//             .transition()
//             .duration(750)
//             .attr("d", line);
//     }

//     const zoom = d3.zoom()
//         .scaleExtent([1, 32])
//         .translateExtent([[0, 0], [width, height]])
//         .extent([[0, 0], [width, height]])
//         .on("zoom", zoomed);

//     svg.call(zoom);

//     function zoomed(event) {
//         const transform = event.transform;
//         const zx = transform.rescaleX(x);
//         g.select("path").attr("d", line.x(function(d) { return zx(d.x); }));
//     }

//     window.resetChart = function() {
//         x.domain([0, d3.max(data, function(d) { return d.x; })]);
//         y.domain([0, d3.max(data, function(d) { return d.y; })]);

//         svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);

//         g.select("path")
//             .transition()
//             .duration(750)
//             .attr("d", line);
//     }
// }

// demo2 曲线图放大缩小
// function drawChart() {
//     const svg = d3.select("#chart").append("svg")
//         .attr("width", 600)
//         .attr("height", 400);

//     const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//     const width = +svg.attr("width") - margin.left - margin.right;
//     const height = +svg.attr("height") - margin.top - margin.bottom;

//     const x = d3.scaleLinear().range([0, width]);
//     const y = d3.scaleLinear().range([height, 0]);

//     const g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     const data = d3.range(100).map(function(d) {
//         return {x: d, y: Math.sin(d / 10)};
//     });

//     x.domain(d3.extent(data, function(d) { return d.x; }));
//     y.domain([-1, 1]);

//     const line = d3.line()
//         .x(function(d) { return x(d.x); })
//         .y(function(d) { return y(d.y); });

//     g.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 1.5)
//         .attr("d", line);

//     // 添加 brush 以实现局部选择功能
//     const brush = d3.brushX()
//         .extent([[0, 0], [width, height]])
//         .on("end", brushEnded);

//     g.append("g")
//         .attr("class", "brush")
//         .call(brush);

//     function brushEnded(event) {
//         const selection = event.selection;
//         if (!selection) return;

//         const [x0, x1] = selection.map(x.invert);
//         x.domain([x0, x1]);

//         g.select(".brush").call(brush.move, null); // 清除选择区域

//         g.select("path")
//             .transition()
//             .duration(750)
//             .attr("d", line);
        
//         svg.transition()
//             .duration(750)
//             .call(zoom.transform, d3.zoomIdentity
//                 .scale(width / (x1 - x0))
//                 .translate(-x0, 0));
//     }

//     const zoom = d3.zoom()
//         .scaleExtent([1, 32])
//         .translateExtent([[0, 0], [width, height]])
//         .extent([[0, 0], [width, height]])
//         .on("zoom", zoomed);

//     svg.call(zoom);

//     function zoomed(event) {
//         const transform = event.transform;
//         const zx = transform.rescaleX(x);
//         g.select("path").attr("d", line.x(function(d) { return zx(d.x); }));
//         g.select(".x-axis").call(d3.axisBottom(zx));
//     }
// }
// demo1,简单的圆图
// function drawChart() {
//     // 选择要绘图的 DOM 元素
//     var svg = d3.select("#chart")
//         .append("svg")
//         .attr("width", 500)
//         .attr("height", 300);

//     // 在此处添加绘图逻辑
//     svg.append("circle")
//         .attr("cx", 250)
//         .attr("cy", 150)
//         .attr("r", 100)
//         .style("fill", "steelblue");
// }


