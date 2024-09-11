import "./App.css";
import { extent, scaleLinear } from "d3";
import useData from "./assets/useData";
import DataMarks from "./assets/DataMarks";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
import Dropdown from "./assets/Dropdown";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 200 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 45;

function App() {
  const data = useData();
  console.log(data);
  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const xValue = (d) => d.sepal_length;
  const xAxisLabel = "Sepal Length";
  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <>
      <Dropdown />
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
