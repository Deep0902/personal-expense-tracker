import { useState, useEffect } from "react";
import "./ScrollTop.css";
import scrollTopImg from "/images/scroll-top-1.svg";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`ScrollTop ${isVisible ? "visible" : ""}`}
      onClick={handleScrollTop}
    >
      <img src={scrollTopImg} alt="Scroll to Top" />
    </div>
  );
}

export default ScrollTop;
