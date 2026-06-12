const express = require("express");

const app = express();

// Middleware para entender formato json
app.use(express.json());

// ver si funciona
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


module.exports = app;