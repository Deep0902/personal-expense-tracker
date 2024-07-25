import { useState, useRef } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the div is expanded
  const resizableDivRef = useRef<HTMLDivElement>(null);

  const toggleDivSize = () => {
    if (resizableDivRef.current) {
      // Toggle the width based on the current state
      const newWidth = isExpanded ? "40px" : "200px";
      resizableDivRef.current.style.width = newWidth;
      setIsExpanded(!isExpanded); // Toggle the state
    }
  };

  return (
    <div onClick={toggleDivSize} ref={resizableDivRef} className="bar">
        
    </div>
  );
}

export default Sidebar;
