import { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import sidebarToggle from "/images/sidebar-toggle.svg";
import dashoboard from "/images/dashboard.svg";
import settings from "/images/settings.svg";
import history from "/images/transaction-history.svg";
import help from "/images/help.svg";
interface SidebarProps {
  Username: any;
  sendDataToParent: (data: any) => void;
  activeTab: string;
  resetSearchQuery: () => void;
}
function Sidebar({
  Username,
  sendDataToParent,
  activeTab,
  resetSearchQuery,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true); // State to track if the div is expanded
  const resizableDivRef = useRef<HTMLDivElement>(null);
  const toggleDivSize = () => {
    if (resizableDivRef.current) {
      // Toggle the width based on the current state
      const newWidth = isExpanded ? "55px" : "220px";
      resizableDivRef.current.style.width = newWidth;
      setIsExpanded(!isExpanded); // Toggle the state
    }
  };
  useEffect(() => {
    setSelectedOption(activeTab);
  }, [activeTab]);

  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const handleSelection = (option: string) => {
    setSelectedOption(option);
    sendDataToParent(option);
    if (option === "History") {
      resetSearchQuery(); // Reset search query when History is selected
    }
  };

  return (
    <div ref={resizableDivRef} className="bar">
      <div className={isExpanded ? "toggleContainer" : "justifyCenter"}>
        {isExpanded && (
          <div className="username">
            <span className="poppins-regular">Hello,</span>
            <label className="poppins-semibold">{Username}</label>
          </div>
        )}
        <img
          onClick={toggleDivSize}
          src={sidebarToggle}
          className={isExpanded ? "" : "rotate180"}
          alt=""
        />
      </div>
      <div className="pagesToggle">
        <div
          className={`selection ${
            selectedOption === "Dashboard" ? "selected" : ""
          }`}
          onClick={() => handleSelection("Dashboard")}
        >
          <img
            src={dashoboard}
            className={isExpanded ? "" : "adjustImage"}
            alt="Dashboard"
          />
          {isExpanded && <span className="poppins-semibold">Dashboard</span>}
        </div>
        <div
          className={`selection ${
            selectedOption === "History" ? "selected" : ""
          }`}
          onClick={() => handleSelection("History")}
        >
          <img
            src={history}
            className={isExpanded ? "" : "adjustImage"}
            alt="History"
          />
          {isExpanded && <span className="poppins-semibold">History</span>}
        </div>
        <div
          className={`selection ${
            selectedOption === "Settings" ? "selected" : ""
          }`}
          onClick={() => handleSelection("Settings")}
        >
          <img
            src={settings}
            className={isExpanded ? "" : "adjustImage"}
            alt="Settings"
          />
          {isExpanded && <span className="poppins-semibold">Settings</span>}
        </div>
        <div
          className={`selection lastSelection ${
            selectedOption === "About" ? "selected" : ""
          }`}
          onClick={() => handleSelection("About")}
        >
          <img
            src={help}
            className={isExpanded ? "" : "adjustImage"}
            alt="About"
          />
          {isExpanded && <span className="poppins-semibold">About</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
