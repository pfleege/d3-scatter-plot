const AxisLeft = ({ yScale, innerWidth }) => {
  return yScale.ticks().map((tick, i) => (
    <g key={i} transform={`translate(0, ${yScale(tick)})`}>
      {<line x2={innerWidth} stroke="white" />}
      <text dy={5} x={-6} style={{ textAnchor: "end", stroke: "white" }}>
        {tick}
      </text>
    </g>
  ));
};

export default AxisLeft;
