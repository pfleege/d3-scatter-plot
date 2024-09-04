import "./App.css";
import { extent } from "d3";
import useData from "./assets/useData";

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
    .range([0, innerWidth]);

  return (
    <>
      <pre>The data has been loaded!</pre>
    </>
  );
}

export default App;
