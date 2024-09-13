const DataMarks = ({
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
}) => {
  return data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={10}
      fill={colorScale(colorValue(d))}
    />
  ));
};

export default DataMarks;
