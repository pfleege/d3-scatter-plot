const DataMarks = ({ data, xScale, yScale, xValue, yValue }) => {
  return data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
      fill={"aquamarine"}
    />
  ));
};

export default DataMarks;
