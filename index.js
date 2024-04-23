import express, { json } from "express";
import { generateContent } from "./generator/generator.js";
import cors from "cors";
import {
  logGivenParams,
  wrongApiUrl,
} from "./generator/utils/consoleLogMessages.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());

app.get("/generate", async (req, res) => {
  res.json(wrongApiUrl);
});

app.post("/generate", async (req, res) => {
  const data = req.body;
  const additionalContext = data.additionalContext || "";

  logGivenParams(data.amountOfSections, data.title, additionalContext);

  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );

  res.json(content);
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});
