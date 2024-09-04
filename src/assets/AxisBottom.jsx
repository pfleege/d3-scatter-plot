const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.ticks().map((tick, i) => (
    <g key={i} transform={`translate(${xScale(tick)}, 0)`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="white" />
      <text
        dy=".71em"
        y={innerHeight + 6}
        x="0"
        style={{ textAnchor: "middle", stroke: "white" }}
      >
        {tick}
      </text>
    </g>
  ));
};

export default AxisBottom;
