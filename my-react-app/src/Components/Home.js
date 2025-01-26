import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BannerImage from "../Assets/home-banner-image.png";
import RizzImage from "../Assets/rizz-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const [pickupLine, setPickupLine] = useState(""); // State for the pickup line

  const fetchPickupLine = async () => {
    console.log("Button clicked!");
    console.log("Button clicked, fetching pickup line...");
    try {
      const response = await axios.get("http://127.0.0.1:5000/get-pickup-line");
      console.log("Response received:", response.data);
      setPickupLine(response.data.pickup_line);
    } catch (error) {
      console.error("Error fetching pickup line:", error);
    }
  };

  const rizzImageRef = useRef(null);
  const backgroundImageRef = useRef(null);

  const handleScroll = () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY;

    // Apply different speeds and scaling to the two images
    if (rizzImageRef.current && backgroundImageRef.current) {

      rizzImageRef.current.style.transformOrigin = "top center"; 
      // Keep the zoom point at the top center

// Calculate the new scale with a smaller increment, clamped to a maximum
const maxScale = 1.001; // Limit the maximum zoom to 1.2x the original size
const scale = Math.min(1 + scrollPosition * 0.0002, maxScale); // Smaller increment for slower zoom

// Apply the transform with clamped scale
rizzImageRef.current.style.transform = `translateY(${scrollPosition * 0.6}px) scale(${scale})`;
      


 }
  };

  useEffect(() => {
    // Attach the scroll event listener
    const scrollHandler = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="home-container"> {/* Added wrapper div for all content */}
      <div className="scroll-container">
        {/* Background image */}
        <div ref={backgroundImageRef} className="background-image"></div>
  
        {/* "RIZZ" image */}
        <div ref={rizzImageRef} className="rizz-image">
          <img src={RizzImage} alt="RIZZ 3D Image" />
        </div>
      </div>
  
      {/* <div className="home-banner-container">
        <div className="home-image-section">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div> */}
  
      <div className="home-text-section">
        <h1 className="primary-heading">No rizz? No worry !!</h1>
        <p>{pickupLine}</p> {/* Display the fetched pickup line */}
        <button className="primary-button" onClick={fetchPickupLine}>
          Get a pickup line Now <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
