
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Temporary sample data
let sites = [
  { id: 1, name: "Chennai Central", location: "Chennai", status: "Active" },
  { id: 2, name: "Madurai Branch", location: "Madurai", status: "Pending" },
  { id: 3, name: "Pondicherry Site", location: "Puducherry", status: "Active" },
];

// Test route
app.get("/", (req, res) => {
  res.send("Site Operations Dashboard API is running!");
});

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    totalSites: sites.length,
    totalInstallations: 80,
    completedInstallations: 55,
    pendingInstallations: 25,
  });
});

// Get all sites
app.get("/api/sites", (req, res) => {
  res.json(sites);
});

// Add a site
app.post("/api/sites", (req, res) => {
  const { name, location, status } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      message: "Site name and location are required.",
    });
  }

  const nextId =
    sites.length > 0
      ? Math.max(...sites.map((site) => site.id)) + 1
      : 1;

  const newSite = {
    id: nextId,
    name: name.trim(),
    location: location.trim(),
    status: status === "Pending" ? "Pending" : "Active",
  };

  sites.push(newSite);
  res.status(201).json(newSite);
});

// Update a site
app.put("/api/sites/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, location, status } = req.body;

  const site = sites.find((item) => item.id === id);

  if (!site) {
    return res.status(404).json({ message: "Site not found." });
  }

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      message: "Site name and location are required.",
    });
  }

  site.name = name.trim();
  site.location = location.trim();
  site.status = status === "Pending" ? "Pending" : "Active";

  res.json(site);
});

// Delete a site
app.delete("/api/sites/:id", (req, res) => {
  const id = Number(req.params.id);
  const existingSite = sites.some((site) => site.id === id);

  if (!existingSite) {
    return res.status(404).json({ message: "Site not found." });
  }

  sites = sites.filter((site) => site.id !== id);
  res.json({ message: "Site deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
