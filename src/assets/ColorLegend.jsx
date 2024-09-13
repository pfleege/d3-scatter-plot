const ColorLegend = ({ colorScale }) => {
  return colorScale.domain().map((domainValue) => {
    return (
      <g key={domainValue}>
        <circle r={7} fill={colorScale(domainValue)}></circle>
        <text fill="white">{domainValue}</text>
      </g>
    );
  });
};

export default ColorLegend;
