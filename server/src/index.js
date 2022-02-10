import express from "express";
import cors from "cors";

const app = express();
const PORT = 3010;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
