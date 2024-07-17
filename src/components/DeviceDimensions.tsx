import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeviceDimensions = () => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
      <button
        onClick={() => {
          navigate("/personal-expense-tracker");
        }}
      >Homepage</button>
    </div>
  );
};

export default DeviceDimensions;
