import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoDetail = () => {
  const { id } = useParams(); // Assume id corresponds to video direction or unique identifier
  const [videoData, setVideoData] = useState(null);
  const [countdown, setCountdown] = useState(60); // Default countdown value

  useEffect(() => {
    // Fetch video details and metrics
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos`); // Adjust endpoint
        const metricsResponse = await axios.get(`http://localhost:3000/api/traffic-data`); // Adjust endpoint

        const video = response.data.find((v, index) => index.toString() === id);
        const metrics = metricsResponse.data.find((m, index) => index.toString() === id);

        setVideoData({
          ...video,
          ...metrics, // Merge video and traffic metrics
        });
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  if (!videoData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <video
          src={videoData.url}
          controls
          autoPlay
          muted
          loop
          style={styles.video}
        ></video>
        <h2 style={styles.directionLabel}>{videoData.direction}</h2>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <div style={styles.metrics}>
          <p><strong>Vehicle Count:</strong> {videoData.vehicleCount || "N/A"}</p>
          <p><strong>Average Speed (kmph):</strong> {videoData.averageSpeed || "N/A"}</p>
          <p><strong>Queue Length (meters):</strong> {videoData.queueLength || "N/A"}</p>
          <p><strong>Congestion Level:</strong> {videoData.congestionLevel || "N/A"}</p>
          <p><strong>Traffic Density (vehicles per meter):</strong> {videoData.trafficDensity || "N/A"}</p>
        </div>
        <div style={styles.trafficLight}>
          <img
            src="/traffic-light.png" // Replace with the actual traffic light icon path
            alt="Traffic Light"
            style={styles.trafficLightImage}
          />
        </div>
        <div style={styles.countdown}>
          <h3>Countdown:</h3>
          <p>{countdown}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
  },
  leftSection: {
    flex: 1,
    textAlign: "center",
    marginRight: "20px",
  },
  video: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "8px",
  },
  directionLabel: {
    marginTop: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  metrics: {
    marginBottom: "20px",
  },
  trafficLight: {
    textAlign: "center",
    marginBottom: "20px",
  },
  trafficLightImage: {
    width: "100px",
    height: "auto",
  },
  countdown: {
    textAlign: "center",
  },
};

export default VideoDetail;
