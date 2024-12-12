import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";  // Import PapaParse for CSV parsing
import fs from "fs";  // File system to read the CSV files

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

// Serve videos and CSV data
app.use("/videos", express.static("videos"));
app.use("/data", express.static(path.join(__dirname, "data"))); // Ensure 'data' folder exists and contains CSV files

const videos = [
  { id: 0, direction: "North", url: "http://localhost:3000/videos/video.mp4" },
  { id: 1, direction: "South", url: "http://localhost:3000/videos/video1.mp4" },
  { id: 2, direction: "East", url: "http://localhost:3000/videos/video2.mp4" },
  { id: 3, direction: "West", url: "http://localhost:3000/videos/video3.mp4" },
];

// API to return all videos
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

// API for traffic data
app.get("/api/traffic-data", (req, res) => {
  res.json([
    { direction: "North", url: "http://localhost:3000/data/metrics_north.csv" },
    { direction: "South", url: "http://localhost:3000/data/metrics_south.csv" },
    { direction: "East", url: "http://localhost:3000/data/metrics_east.csv" },
    { direction: "West", url: "http://localhost:3000/data/metrics_west.csv" },
  ]);
});

// Event stream for traffic metrics (North)
app.get("/north-metrics", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const csvFilePath = path.join(__dirname, "data", "metrics_north.csv"); // Corrected path for North

  const rows = [];

  fs.createReadStream(csvFilePath)
    .pipe(Papa.parse(Papa.NODE_STREAM_INPUT))  // Parsing the CSV stream
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      let currentIndex = 0;

      const sendNextMetric = () => {
        const row = rows[currentIndex];
        const data = `Frame: ${row.Frame}, Vehicle Count: ${row.Vehicle_Count}, Average Speed (km/h): ${row.Average_Speed_kmph}, Queue Length (m): ${row.Queue_Length_meters}, Congestion Level: ${row.Congestion_Level}, Traffic Density: ${row.Traffic_Density_vehicles_per_meter}`;
        res.write(`data: ${data}\n\n`);

        currentIndex = (currentIndex + 1) % rows.length;
        setTimeout(sendNextMetric, 1000);
      };

      sendNextMetric();
    });

  req.on("close", () => {
    console.log("Client disconnected, ending stream.");
    res.end();
  });
});

// Event stream for traffic metrics (South)
app.get("/south-metrics", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const csvFilePath = path.join(__dirname, "data", "metrics_south.csv"); // Corrected path for South

  const rows = [];

  fs.createReadStream(csvFilePath)
    .pipe(Papa.parse(Papa.NODE_STREAM_INPUT))  // Parsing the CSV stream
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      let currentIndex = 0;

      const sendNextMetric = () => {
        const row = rows[currentIndex];
        const data = `Frame: ${row.Frame}, Vehicle Count: ${row.Vehicle_Count}, Average Speed (km/h): ${row.Average_Speed_kmph}, Queue Length (m): ${row.Queue_Length_meters}, Congestion Level: ${row.Congestion_Level}, Traffic Density: ${row.Traffic_Density_vehicles_per_meter}`;
        res.write(`data: ${data}\n\n`);

        currentIndex = (currentIndex + 1) % rows.length;
        setTimeout(sendNextMetric, 1000);
      };

      sendNextMetric();
    });

  req.on("close", () => {
    console.log("Client disconnected, ending stream.");
    res.end();
  });
});

// Event stream for traffic metrics (East)
app.get("/east-metrics", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const csvFilePath = path.join(__dirname, "data", "metrics_east.csv"); // Corrected path for East

  const rows = [];

  fs.createReadStream(csvFilePath)
    .pipe(Papa.parse(Papa.NODE_STREAM_INPUT))  // Parsing the CSV stream
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      let currentIndex = 0;

      const sendNextMetric = () => {
        const row = rows[currentIndex];
        const data = `Frame: ${row.Frame}, Vehicle Count: ${row.Vehicle_Count}, Average Speed (km/h): ${row.Average_Speed_kmph}, Queue Length (m): ${row.Queue_Length_meters}, Congestion Level: ${row.Congestion_Level}, Traffic Density: ${row.Traffic_Density_vehicles_per_meter}`;
        res.write(`data: ${data}\n\n`);

        currentIndex = (currentIndex + 1) % rows.length;
        setTimeout(sendNextMetric, 1000);
      };

      sendNextMetric();
    });

  req.on("close", () => {
    console.log("Client disconnected, ending stream.");
    res.end();
  });
});

// Event stream for traffic metrics (West)
app.get("/west-metrics", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const csvFilePath = path.join(__dirname, "data", "metrics_west.csv"); // Corrected path for West

  const rows = [];

  fs.createReadStream(csvFilePath)
    .pipe(Papa.parse(Papa.NODE_STREAM_INPUT))  // Parsing the CSV stream
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      let currentIndex = 0;

      const sendNextMetric = () => {
        const row = rows[currentIndex];
        const data = `Frame: ${row.Frame}, Vehicle Count: ${row.Vehicle_Count}, Average Speed (km/h): ${row.Average_Speed_kmph}, Queue Length (m): ${row.Queue_Length_meters}, Congestion Level: ${row.Congestion_Level}, Traffic Density: ${row.Traffic_Density_vehicles_per_meter}`;
        res.write(`data: ${data}\n\n`);

        currentIndex = (currentIndex + 1) % rows.length;
        setTimeout(sendNextMetric, 1000);
      };

      sendNextMetric();
    });

  req.on("close", () => {
    console.log("Client disconnected, ending stream.");
    res.end();
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
