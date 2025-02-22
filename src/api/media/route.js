const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cuid = require("cuid");
const path = require("path");
const authentication = require("../../middleware/authentication");

const responseError = require("../../error/responseError");

const router = express.Router();

const mediaFolder = path.join(__dirname, "../../../media");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, mediaFolder),
  filename: (req, file, cb) => {
    // Get extension safely
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext);

    // Sanitize filename: remove special characters, replace spaces, and trim dots
    const sanitizedFilename = baseName
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_\-]/g, "") // Keep only safe characters
      .replace(/^\.|\.+$/g, "") // Prevent hidden files
      .toLowerCase(); // Normalize case

    cb(null, `${cuid()}_${sanitizedFilename}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new responseError(400, "Only images are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const buildFileUrl = (req, file) =>
  // in development
  `${req.protocol}://${req.get("host")}/media/${file}`;

// in production use https
// `https://${req.get("host")}/media/${file}`;

// Upload image
router.post("/", authentication, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: true,
      message: "No file uploaded",
      status: "error",
      statusCode: 400,
      success: false,
    });
  }

  const imageUrl = buildFileUrl(req, req.file.filename);
  res.status(201).json({
    data: { imageUrl },
    error: false,
    message: "success upload image",
    status: "success",
    statusCode: 201,
    success: true,
  });
});

// List images with pagination
router.get("/", (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const size = Math.max(parseInt(req.query.size) || 9, 1);
  const start = (page - 1) * size;
  const end = start + size;

  fs.readdir(mediaFolder, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: "Unable to fetch images",
        status: "error",
        statusCode: 500,
        success: true,
      });
    }

    const fileUrls = files.reverse().map((file) => buildFileUrl(req, file));
    res.status(200).json({
      currentPage: page,
      totalItems: files.length,
      perPage: size,
      totalPage: Math.ceil(files.length / size),
      images: fileUrls.slice(start, end),
      error: false,
      message: "success get image",
      status: "success",
      statusCode: 201,
      success: true,
    });
  });
});

// Delete image
router.delete("/", authentication, (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({
      error: true,
      message: "Image URL is required",
      status: "error",
      statusCode: 400,
      success: true,
    });
  }

  try {
    const filename = path.basename(new URL(imageUrl).pathname);
    const filePath = path.join(mediaFolder, filename);

    if (!filePath.startsWith(mediaFolder)) {
      return res.status(400).json({
        error: true,
        message: "Invalid file path",
        status: "error",
        statusCode: 500,
        success: false,
      });
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: "File not found",
          status: "error",
          statusCode: 404,
          success: false,
        });
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: true,
            message: "Failed to delete file",
            status: "error",
            statusCode: 500,
            success: false,
          });
        }

        res.status(200).json({
          error: false,
          message: "success delete image",
          status: "success",
          statusCode: 200,
          success: true,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: true,
      message: "Invalid URL",
      status: "error",
      statusCode: 400,
      success: false,
    });
  }
});

module.exports = router;
