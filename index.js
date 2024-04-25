import express, { json } from "express";
import { generateContent } from "./generator/generator.js";
import cors from "cors";
import {
  logGivenParams,
  wrongApiUrl,
} from "./generator/utils/consoleLogMessages.js";
import { generateHTML } from "./generator/utils/generateHTML.js";

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

  //stringified JSON object with the generated content
  res.json(content);
});
app.post("/generateHTML", async (req, res) => {
  const data = req.body;
  const additionalContext = data.additionalContext || "";

  logGivenParams(data.amountOfSections, data.title, additionalContext);

  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );

  const html = generateHTML(content);
  //stringified JSON object with the generated content
  res.json({ html: html });
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});
