window.onload = function(){
    var header = document.getElementById("test");
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    repoURL = decodeURIComponent(params[0]);
    getData(repoURL+"/stats/participation", participation);
    //getData(repoURL+"/stats/contributors", contributers);
};
function contributers(data){
    console.log(data);
}
function participation(data){
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 550 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    console.log(data);
    // append the svg object to the body of the page
    var svg = d3.select("#test")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .domain([0, height])     
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    var histogram = d3.histogram()
        .value(function(d) { return d; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(52)); // then the numbers of bins

    var bins = histogram(data.all);
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

    svg.append("g")
        .call(d3.axisLeft(y));
        svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x1) + "," + y(d.length) + ")"; })
          //.attr("width", function(d) { console.log(d);return 4*(x(d.x1) - x(d.x0)) ; })
          .attr("width", function(d) { console.log(d);return x(d.x1) - x(d.x0) ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")
}
function getData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(variable) {
        if (this.status == 200) {
            data = JSON.parse(this.response);
            variable = data;
            callback(variable);
        }
    };
    xhr.onerror = function() {
        console.log("darn, not found");
    };
    xhr.open('GET', url, true);
    xhr.send();
}