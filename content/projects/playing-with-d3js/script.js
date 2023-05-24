// Set the width and height of the chart
const width = 600;
const height = 400;

// Load the CSV file
d3.csv("data.csv").then((data) => {
  // Convert strings to appropriate types
  data.forEach((d) => {
    d.month = new Date(d.month);
    d.last_available_deaths = +d.last_available_deaths;
  });

  // Create scales for the axes
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.month))
    .range([50, width - 50]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.last_available_deaths)])
    .range([height - 50, 50]);

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.last_available_deaths)])
    .range([4, 16]);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Create the SVG element for the chart
  const svg = d3.select("#chart").attr("width", width).attr("height", height);

  // Create the bubbles
  const bubbles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.month))
    .attr("cy", (d) => yScale(d.last_available_deaths))
    .attr("r", (d) => radiusScale(d.last_available_deaths))
    .attr("fill", (d) => colorScale(d.city));

  // Create the SVG element for the legend
  const legend = d3.select("#legend").attr("width", width).attr("height", 100);

  // Add colors and city names to the legend
  const legendItems = legend
    .selectAll("g")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(" + (i * 100 + 50) + ", 50)");

  legendItems
    .append("circle")
    .attr("r", 5)
    .attr("fill", (d) => colorScale(d));

  legendItems
    .append("text")
    .attr("x", 10)
    .attr("y", 5)
    .text((d) => d);

  // Add axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis);

  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
});
