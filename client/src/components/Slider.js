const Slider = ({ value, onChange }) => {
    return (
      <div className="flex flex-col items-center gap-2 p-4">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-64"
        />
        <span>Brightness: {value}%</span>
      </div>
    );
  };
  
  export default Slider;