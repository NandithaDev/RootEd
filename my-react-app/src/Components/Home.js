import React, { useState } from "react";
import axios from "axios";
import BannerImage from "../Assets/home-banner-image.jpg";
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

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-image-section">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>

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
