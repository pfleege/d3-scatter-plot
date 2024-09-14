import "./App.css";
import { extent, scaleLinear, scaleOrdinal } from "d3";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import useData from "./assets/useData";
import DataMarks from "./assets/DataMarks";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
// import Dropdown from "./assets/Dropdown";
import { useState } from "react";
import ColorLegend from "./assets/ColorLegend";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 220 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 45;
const legendOffsetX = -200;

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
  // const xAxisLabel = "Sepal Length";
  const xAxisLabel = options.map(({ label, value }) =>
    selectedValueX === value ? label : null
  );

  const initialValueY = "sepal_width";
  const [selectedValueY, setSelectedValueY] = useState(initialValueY);
  const yValue = (d) => d[selectedValueY];
  // const yAxisLabel = "Sepal Width";
  const yAxisLabel = options.map(({ label, value }) =>
    selectedValueY === value ? label : null
  );

  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const colorValue = (d) => d.species;
  const legendLabel = "Species";

  if (!data) {
    return <pre>Loading data...</pre>;
  }
  // We put the console.log after the !data -guard
  // console.log(data.columns);

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
    .range(["#E6842A", "#42A5B3", "#A0B700"]);

  // console.log(colorScale.domain());
  // console.log(colorScale.range());
  console.log(selectedSpecies);
  return (
    <>
      <div className="dropdown-container">
        {/* <label htmlFor="selectX">Select X-axis:</label> */}
        <span className="dropdown-label">X-axis</span>
        <ReactDropdown
          options={options}
          /* id="selectX" */
          value={selectedValueX}
          onChange={({ value }) => setSelectedValueX(value)}
          /* placeholder="Select an option" */
        />
        {/* <label htmlFor="selectY">Select Y-axis:</label> */}
        <span className="dropdown-label">Y-axis</span>
        <ReactDropdown
          options={options}
          /* id="selectY" */
          value={selectedValueY}
          onChange={({ value }) => setSelectedValueY(value)}
          /* placeholder="Select an option" */
        />
      </div>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + 50}
            textAnchor="middle"
            fill="white"
          >
            {/* {options.map(({ option, value }) =>
              selectedValueX === value ? option : null
            )} */}
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
            {/* {options.map(({ label, value }) =>
              selectedValueY === value ? label : null
            )} */}
            {yAxisLabel}
          </text>
          <g transform={`translate(${legendOffsetX},20)`}>
            <text className="legend-label" fill="white" y={-22}>
              {legendLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              legendSpacing={25}
              tickSize={10}
              tickTextOffsetX={20}
              onHover={setSelectedSpecies}
            />
          </g>
          <DataMarks
            data={
              selectedSpecies
                ? data.filter((marks) => marks.species === selectedSpecies)
                : data
            }
            // data={data}
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
