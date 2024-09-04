import "./App.css";
import useData from "./assets/useData";

function App() {
  const data = useData();
  console.log(data);
  if (!data) {
    return <pre>Loading data...</pre>;
  }
  return (
    <>
      <pre>The data has been loaded!</pre>
    </>
  );
}

export default App;
