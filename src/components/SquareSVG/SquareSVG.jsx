const SquareSVG = ({ infill }) => {
  return (
    <div style={{width: '25px', height: 'auto', margin: '0 auto'}}>
      <svg version="1.1" viewBox="0 0 100 100">
        <rect
          width="100%"
          height="100%"
          stroke="black"
          fill={infill}
          strokeWidth="10"
        />
      </svg>
    </div>
  );
};

export default SquareSVG;
