const DataMarks = ({
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
  opacity = 1,
}) => {
  return data.map((d, i) => (
    <circle
      className="dataMark"
      key={i}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={15}
      fill={colorScale(colorValue(d))}
      opacity={opacity}
    />
  ));
};

export default DataMarks;
