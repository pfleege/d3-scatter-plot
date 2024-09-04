import "./App.css";
import { extent, scaleLinear } from "d3";
import useData from "./assets/useData";
import DataMarks from "./assets/DataMarks";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

function App() {
  const data = useData();
  console.log(data);
  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const xValue = (d) => d.sepal_length;
  const yValue = (d) => d.sepal_width;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <DataMarks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}

export default App;
