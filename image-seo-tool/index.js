const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ExifTool } = require("exiftool-vendored");

const exiftool = new ExifTool();

const app = express();
// Keep CORS (useful for other tools), but we'll also serve the frontend from same origin
app.use(cors());
app.use(express.json());

// Serve the upload.html and any static assets from project root (same origin)
app.use(express.static(path.join(__dirname)));
// serve upload.html when user visits /upload (so GET /upload works)
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Test root route (optional)
app.get("/", (req, res) => {
  res.send("Image SEO Tool Backend Running — open /upload.html");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const {
    title = "",
    description = "",
    metaTitle = "",
    metaDescription = "",
    newName = "",
    lat,
    lon
  } = req.body;

  const filePath = req.file.path;
  const ext = path.extname(filePath);
  let outPath = filePath;

  try {
    if (newName && newName.trim()) {
      const safeBase = newName.trim().replace(/\s+/g, "_");
      const renamed = path.join(uploadDir, `${safeBase}${ext}`);
      fs.renameSync(filePath, renamed);
      outPath = renamed;
    }

    const tags = {};
    if (title) tags["XMP:Title"] = title;
    if (description) tags["XMP:Description"] = description;
    if (metaTitle) tags["DocumentName"] = metaTitle;
    if (metaDescription) tags["IPTC:Caption-Abstract"] = metaDescription;
    if (description && !tags["IPTC:Caption-Abstract"]) tags["IPTC:Caption-Abstract"] = description;

    if (lat && lon) {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      if (!Number.isNaN(latNum) && !Number.isNaN(lonNum)) {
        tags.GPSLatitude = latNum;
        tags.GPSLongitude = lonNum;
        tags.GPSLatitudeRef = latNum >= 0 ? "N" : "S";
        tags.GPSLongitudeRef = lonNum >= 0 ? "E" : "W";
      }
    }

    await exiftool.write(outPath, tags);

    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(outPath)}"`);
    res.sendFile(outPath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      } else {
        console.log("Sent edited file:", outPath);
      }
    });
  } catch (err) {
    console.error("Error processing upload:", err);
    return res.status(500).send("Failed to write metadata: " + err.message);
  }
});

process.on("exit", () => {
  exiftool.end();
});
process.on("SIGINT", () => {
  exiftool.end();
  process.exit();
});
process.on("SIGTERM", () => {
  exiftool.end();
  process.exit();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

