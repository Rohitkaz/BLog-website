import express from "express";
import router from "./middlewares/router.js";
import connect from "./middlewares/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import posts from "./models/post.js";
import multer from "multer";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import contentschema from "./models/contentschema.js";
//app.use("/", router);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../my-project/public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
    console.log(req.body);
  },
});
const upload = multer({ storage: storage });
app.post("/image", upload.single("image"), async function (req, res, next) {
  const blogcnt = JSON.parse(req.body.blogcnt);

  const post = new posts({
    maintitle: req.body.maintitle,
    description: req.body.description,
    content: blogcnt,
    image: req.file.filename,
    author: req.body.author,
  });
  await post.save();
});

app.get("/image", async (req, res) => {
  // const images = await imgupload.find({ author: "ROHIT" });
  const post = await posts.find({ author: "ROHIT" });
  res.status(200).send(post);
});

connect().then(() => {
  app.listen(8000, () => {
    console.log("listening for requests");
  });
});
