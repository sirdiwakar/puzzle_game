const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();
app.use(cookieParser());
app.use(express.json());

const port = 3000;

async function restrictUsers(req, res, next) {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.redirect("/auth");
  }

  try {
    // Make a request to your backend API to verify the token
    const response = await axios.get("http://localhost:8000/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      // redirect to login page
      return res.redirect("/auth");
    }

    next(); // Proceed to the protected route
  } catch (error) {
    // Handle any error that occurred during the verification process
    console.error("Token verification error:", error);
    return res.redirect("/auth");
  }
}

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "static")));

app.get("/user-info", restrictUsers, async (req, res) => {
  try {
    token = req.cookies.token;
    response = await axios.get("http://localhost:8000/core/user_info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.log(e);
    console.log("Error getting user info");
    res.redirect("/auth");
  }
});

app.post("/validate", restrictUsers, async (req, res) => {
  data = req.body;
  token = req.cookies.token;
  try {
    resp = await axios.post(
      "http://localhost:8000/core/validate_room",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: "application/json",
        },
      }
    );
    data = resp.data;
    if (!data["valid"])
      res.json({ success: false, message: "Invalid password" }, 404);
    else res.json({ success: true, message: "Valid password" }, 200);
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error validating password" }, 500);
  }
});

app.post("/register", async (req, res) => {
  try {
    // Forward the JSON data from the HTML to the backend API
    const backendResponse = await axios.post(
      "http://localhost:8000/auth/register",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );
    if (backendResponse.status !== 201) {
      // Handle any error that occurred during the registration process
      console.error("Registration error:", backendResponse.data.message);
      return res
        .status(500)
        .json({ success: false, message: "Registration failed" });
    }

    // Return a success response to the HTML file
    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    // Handle any error that occurred during the registration process
    console.error("Registration error:", error.message);
    if (error.response.data.message === "User already exists") {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

app.get("/game_over", restrictUsers, async (req, res) => {
  try {
    resp = await axios.get("http://localhost:8000/core/game_over", {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    console.log(resp.data)
    res.json(resp.data);
  } catch (e) {
    console.log(e);
    res.json(
      { success: false, message: "Error getting game over status" },
      500
    );
  }
});

// Route for serving the main.html file
app.get("/", restrictUsers, (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "main.html"));
});

// Route for serving individual room HTML files
app.get("/room/:roomNumber", restrictUsers, (req, res) => {
  const roomNumber = req.params.roomNumber;
  res.sendFile(
    path.join(__dirname, "templates", "rooms", `room${roomNumber}.html`)
  );
});

app.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "auth.html"));
});

app.post("/login", async (req, res) => {
  try {
    // Forward the JSON data from the HTML to the backend API
    const backendResponse = await axios.post(
      "http://localhost:8000/auth/login",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    // Assuming the backend response contains the JWT token
    const jwtToken = backendResponse.data.token;

    // Set the JWT token as a cookie
    res.cookie("token", jwtToken, { httpOnly: true });

    // Return a success response to the HTML file
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    // Handle any error that occurred during the login process
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "aboutus.html"));
});

app.get("/tic-tac-toe", restrictUsers, (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "tic-tac-toe.html"));
});

app.get("/password", restrictUsers, (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "password-input.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
