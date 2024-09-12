import "./App.css";
import { extent, scaleLinear } from "d3";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import useData from "./assets/useData";
import DataMarks from "./assets/DataMarks";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
// import Dropdown from "./assets/Dropdown";
import { useState } from "react";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 200 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 45;

function App() {
  const data = useData();

  const initialValueX = "sepal_length";
  const [selectedValueX, setSelectedValueX] = useState(initialValueX);
  const xValue = (d) => d[selectedValueX];
  // const xAxisLabel = "Sepal Length";

  const initialValueY = "sepal_width";
  const [selectedValueY, setSelectedValueY] = useState(initialValueY);
  const yValue = (d) => d[selectedValueY];
  // const yAxisLabel = "Sepal Width";

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

  const options = [
    {
      option: "Petal Length",
      value: "petal_length",
    },
    {
      option: "Petal Width",
      value: "petal_width",
    },
    {
      option: "Sepal Length",
      value: "sepal_length",
    },
    {
      option: "Sepal Width",
      value: "sepal_width",
    },
    {
      option: "Species",
      value: "species",
    },
  ];

  return (
    <>
      {/* <label htmlFor="selectX">Select X-axis:</label> */}
      <span className="dropDownLabel">X-axis</span>
      <ReactDropdown
        options={options}
        /* id="selectX" */
        value={selectedValueX}
        onChange={setSelectedValueX}
        placeholder="Select an option"
      />
      {/* <label htmlFor="selectY">Select Y-axis:</label> */}
      <span className="dropDownLabel">Y-axis</span>
      <ReactDropdown
        options={options}
        /* id="selectY" */
        value={selectedValueY}
        onChange={setSelectedValueY}
        placeholder="Select an option"
      />
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
            {options.map(({ option, value }) =>
              selectedValueX === value ? option : null
            )}
            {/* {xAxisLabel} */}
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
            {options.map(({ option, value }) =>
              selectedValueY === value ? option : null
            )}
            {/* {yAxisLabel} */}
          </text>
          <DataMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
