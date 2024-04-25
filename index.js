import express, { json } from "express";
import { generateContent } from "./generator/generator.js";
import cors from "cors";
import { logGivenParams } from "./generator/utils/consoleLogMessages.js";
import { generateHTML } from "./generator/utils/generateHTML.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());

//returns JSON with generated HTML
app.post("/generateHTML", async (req, res) => {
  const data = req.body;
  const additionalContext = data.additionalContext || "";
  const navigation = data.navigation || false;

  logGivenParams(
    data.amountOfSections,
    data.title,
    data.navigation || false,
    additionalContext
  );

  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );

  const html = generateHTML(content, navigation);
  res.json({ html: html });
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});
