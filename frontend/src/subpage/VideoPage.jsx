import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";

const VideoPage = ({ category }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/videos?category=${category}`
        );
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [category]);

  return (
    <div className="video-page" style={styles.videoPage}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          videoId={video.id}
          direction={video.direction}
          videoSrc={video.url}
        />
      ))}
    </div>
  );
};

const styles = {
  videoPage: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Adjust layout
    gap: '1rem',
    padding: '2rem',
  },
};

export default VideoPage;
