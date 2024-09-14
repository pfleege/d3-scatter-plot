import "./App.css";
import { extent, scaleLinear, scaleOrdinal } from "d3";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import useData from "./assets/useData";
import DataMarks from "./assets/DataMarks";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
import { useState } from "react";
import ColorLegend from "./assets/ColorLegend";

const width = 960;
const height = 500;
const margin = { top: 20, right: 170, bottom: 70, left: 100 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 45;
const legendOffsetX = 730;

const options = [
  {
    value: "petal_length",
    label: "Petal Length",
  },
  {
    value: "petal_width",
    label: "Petal Width",
  },
  {
    value: "sepal_length",
    label: "Sepal Length",
  },
  {
    value: "sepal_width",
    label: "Sepal Width",
  },
  {
    value: "species",
    label: "Species",
  },
];

function App() {
  const data = useData();

  const initialValueX = "sepal_length";
  const [selectedValueX, setSelectedValueX] = useState(initialValueX);
  const xValue = (d) => d[selectedValueX];
  const xAxisLabel = options.map(({ label, value }) =>
    selectedValueX === value ? label : null
  );

  const initialValueY = "sepal_width";
  const [selectedValueY, setSelectedValueY] = useState(initialValueY);
  const yValue = (d) => d[selectedValueY];
  const yAxisLabel = options.map(({ label, value }) =>
    selectedValueY === value ? label : null
  );

  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const colorValue = (d) => d.species;
  const legendLabel = "Species";

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#ffcc00", "#ff2f00", "#002aff"]);

  return (
    <>
      <div className="dropdown-container">
        <span className="dropdown-label">X-axis</span>
        <ReactDropdown
          options={options}
          value={selectedValueX}
          onChange={({ value }) => setSelectedValueX(value)}
        />
        <span className="dropdown-label">Y-axis</span>
        <ReactDropdown
          options={options}
          value={selectedValueY}
          onChange={({ value }) => setSelectedValueY(value)}
        />
      </div>
      <svg className="svgCanvas" height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + 50}
            textAnchor="middle"
            fill="white"
          >
            {xAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <text
            className="axis-label"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
            textAnchor="middle"
            fill="white"
          >
            {yAxisLabel}
          </text>
          <g transform={`translate(${legendOffsetX}, 40)`}>
            <text className="legend-label" fill="white" y={-22}>
              {legendLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              legendSpacing={25}
              tickSize={7}
              tickTextOffsetX={20}
              onHover={setSelectedSpecies}
            />
            <text className="legend-info" fill="white" x={-10} y={80}>
              Hover over to filter data
            </text>
          </g>
          <DataMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            opacity={selectedSpecies ? 0.2 : 1}
          />
          <DataMarks
            data={
              selectedSpecies
                ? data.filter((marks) => marks.species === selectedSpecies)
                : data
            }
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
