const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
require("dotenv").config();

// error middleware
const responseError = require("../error/responseError");
const errorMiddleware = require("../error/errorMiddleware");

// utilities
const apiDelay = require("../utilities/apiDelay");
const rateLimit = require("../utilities/rateLimit");
const visitCounterMiddleware = require("../utilities/visitCounter");
// router
const authRoute = require("../api/auth/route");
const userRoute = require("../api/user/route");
const categoryRoute = require("../api/category/route");
const articleRoute = require("../api/article/route");
const teamCategoryRoute = require("../api/teamCategory/route");
const teamRoute = require("../api/team/route");
const partnerRoute = require("../api/partner/route");
const companyInfoRoute = require("../api/companyInfo/route");
const subscribeRoute = require("../api/subscribe/route");
const contactUsRoute = require("../api/contactUs/route");
const mediaRoute = require("../api/media/route");
const galleryRoute = require("../api/gallery/route");
const programCategory = require("../api/programCategory/route");
const programRoute = require("../api/program/route");
const metricRoute = require("../api/metric/route");
const homeImageRoute = require("../api/homeImage/route");

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://devideindonesia.netlify.app",
  "https://cmsdevide.netlify.app",
  "https://theideindonesia.id",
  "https://cms.theideindonesia.id",
];

// General CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    // origin : "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400,
  }),
);

app.options("*", cors());

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for media files, explicitly allowing frontend origins
app.use(
  "/media",
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
  express.static(path.join(__dirname, "../../media")), // Serve media files
);

// delay
// app.use(apiDelay);
// limit request from one IP address per second
// app.use(rateLimit);
app.use(visitCounterMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/media", express.static(path.join(__dirname, "../../media")));

// router
app.use(authRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/article", articleRoute);
app.use("/teamcategory", teamCategoryRoute);
app.use("/team", teamRoute);
app.use("/partner", partnerRoute);
app.use("/companyinfo", companyInfoRoute);
app.use("/subscribe", subscribeRoute);
app.use("/contactus", contactUsRoute);
app.use("/media", mediaRoute);
app.use("/gallery", galleryRoute);
app.use("/programcategory", programCategory);
app.use("/program", programRoute);
app.use("/metric", metricRoute);
app.use("/homeimage", homeImageRoute);

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new responseError(404, `${endpoint} url not found!`));
});

app.use(errorMiddleware);

module.exports = app;
