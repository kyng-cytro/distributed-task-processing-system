import express, { Express, Request, Response, NextFunction } from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import fs from "fs/promises";
import csvtojson from "csvtojson";

dotenv.config();

const PORT = process.env.PORT;

const NAME = process.env.NAME;

let IS_BUSY = false;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const upload = multer({ dest: "uploads/" });

const checkNotBusy = (_req: Request, res: Response, next: NextFunction) => {
  if (IS_BUSY) {
    return res
      .status(400)
      .json({ message: "Server is busy processing another job" });
  }
  IS_BUSY = true;
  next();
};

app.get("/", (_req: Request, res: Response) => {
  res.send({
    status: IS_BUSY ? "busy" : "active",
    uptime: process.uptime(),
  });
});

app.post(
  "/transform",
  checkNotBusy,
  upload.single("csvFile"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      IS_BUSY = false;
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const csvFilePath = req.file.path;
      const jsonArray = await csvtojson().fromFile(csvFilePath);
      await fs.unlink(csvFilePath);
      res.json(jsonArray);
    } catch (error) {
      console.error("Error transforming data:", error);
      res.status(500).json({ message: "Error transforming data" });
    } finally {
      IS_BUSY = false;
    }
  }
);

app.listen(PORT, () => {
  console.log(`${NAME} worker active on port ${PORT}`);
});
