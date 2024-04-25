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
  let content = await tempHelper(res, req);
  res.json(content);
});

//returns JSON with generated HTML
app.post("/generateHTML", async (req, res) => {
  let content = await tempHelper(res, req);
  const html = generateHTML(content);
  res.json({ html: html });
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});

async function tempHelper(res, req) {
  const data = req.body;
  const additionalContext = data.additionalContext || "";

  logGivenParams(data.amountOfSections, data.title, additionalContext);

  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );

  //stringified JSON object with the generated content
  return content;
}
