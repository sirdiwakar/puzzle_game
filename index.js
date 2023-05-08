const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "static")));

// Route for serving the main.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "main.html"));
});

// Route for serving individual room HTML files
app.get("/room/:roomNumber", (req, res) => {
  const roomNumber = req.params.roomNumber;
  res.sendFile(
    path.join(__dirname, "templates", "rooms", `room${roomNumber}.html`)
  );
});

app.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "auth.html"));
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
