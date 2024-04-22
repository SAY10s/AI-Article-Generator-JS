import express, { json } from "express";
import { generateContent } from "./content-generator/generator.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(json());

app.get("/api", (req, res) => {
  res.json({
    content: "To get, a powinno być POST",
  });
});

app.post("/api", async (req, res) => {
  const data = req.body;
  console.log("\n\ndata: " + data.amountOfSections + " " + data.title + "\n\n");
  const additionalContext = data.additionalContext || "";
  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );
  res.json(content);
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
