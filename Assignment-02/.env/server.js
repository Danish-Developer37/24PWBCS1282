const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.url} - ${new Date().toLocaleString()}`
    );
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// Invalid Route Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});