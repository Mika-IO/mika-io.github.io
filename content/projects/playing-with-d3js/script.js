// Set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read the data
d3.csv("sp_data.csv").then(function (data) {
  // Format the data
  data.forEach(function (d) {
    d.last_available_deaths = +d.last_available_deaths;
  });

  // Group the data by city
  const nestedData = d3.group(data, (d) => d.city);

  // Set the x and y scales
  const x = d3.scaleBand().range([0, width]).padding(0.2);
  const y = d3.scaleLinear().range([height, 0]);

  // Set the domains for the x and y scales
  x.domain(
    data.map(function (d) {
      return d.month;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.last_available_deaths;
    }),
  ]);

  // Add the x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "12px");

  // Add the y-axis
  svg.append("g").call(d3.axisLeft(y)).style("font-size", "12px");

  // Add the bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return x(d.month);
    })
    .attr("y", function (d) {
      return y(d.last_available_deaths);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.last_available_deaths);
    })
    .style("fill", function (d) {
      if (d.city === "São Paulo") {
        return "steelblue";
      } else {
        return "gray";
      }
    });

  // Add chart title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Covid Deaths in São Paulo through the time");

  // Add x-axis label
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("month");

  // Add y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("death number");
});
