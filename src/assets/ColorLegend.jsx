const ColorLegend = ({
  colorScale,
  legendSpacing = 20,
  tickSize = 5,
  tickTextOffsetX = 20,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      key={domainValue}
      transform={`translate(0,${i * legendSpacing})`}
      onMouseOver={() => console.log("Hello!")}
    >
      <circle r={tickSize} fill={colorScale(domainValue)}></circle>
      <text x={tickTextOffsetX} dy="0.32em" fill="white">
        {domainValue}
      </text>
    </g>
  ));

export default ColorLegend;
