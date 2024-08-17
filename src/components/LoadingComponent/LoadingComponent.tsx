import { useState, useEffect } from "react";
import "./LoadingComponent.css";

function LoadingComponent() {
  const [loadingDots, setLoadingDots] = useState(".");

  useEffect(() => {
    // Function to update loadingDots
    const updateDots = () => {
      setLoadingDots((prev) => {
        if (prev === "...") return ".";
        if (prev === ".") return "..";
        return "...";
      });
    };

    // Set interval to update loadingDots every 500ms
    const intervalId = setInterval(updateDots, 500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="overlayLoading">
        <div className="poppins-bold">
          <div className="overlayBoxLoading">
            <div className="alertTitleLoading">
              <span className="poppins-bold">Loading {loadingDots}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingComponent;
