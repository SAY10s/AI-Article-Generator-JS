import express, { json } from "express";
import { generateContent } from "./generator/generator.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());

app.get("/generate", async (req, res) => {
  res.json({
    header: "You should send a POST request to this endpoint",
    content:
      "If you want to generate content, you should send a POST request to this endpoint with the following JSON body: { amountOfSections: number, title: string, additionalContext: string }",
  });
});

app.post("/generate", async (req, res) => {
  const data = req.body;
  const additionalContext = data.additionalContext || "";
  console.log(
    `\n-------- [index.js] --------- \n\nThe params of request:\n\namountOfSections: ${data.amountOfSections}\ntitle: ${data.title}\nadditionalContext: ${additionalContext}\n\n-----------------------------\n
    `
  );
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
