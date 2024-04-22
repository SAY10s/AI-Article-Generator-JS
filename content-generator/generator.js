import { VertexAI } from "@google-cloud/vertexai";
import { vertexSettings } from "./generatorSettings/vertexSettings.js";
import { createPrompt } from "./generatorSettings/createPrompt.js";

const { authOptions, projectId, location, model, generationConfig } =
  vertexSettings;

const vertex_ai = new VertexAI({
  project: projectId,
  location: location,
  googleAuthOptions: authOptions,
});
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: generationConfig,
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

async function generateContent() {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: createPrompt(2, "Jak wybrać samochód?"),
          },
        ],
      },
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  let i = 0;
  const startTime = Date.now();

  for await (const item of streamingResp.stream) {
    const elapsedTime = Date.now() - startTime;
    console.log(`${i} minęło ${elapsedTime / 1000} s`);
    i++;
  }

  const aggregatedResponse = await streamingResp.response;
  const text = aggregatedResponse.candidates[0].content.parts[0].text;
  const sanitizedText = text
    .replace(/[\n\t\r]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/,\s*]$/, "]");

  try {
    const objects = JSON.parse(sanitizedText);
    console.log(objects);
  } catch (error) {
    console.log("AI returned invalid JSON");
    console.log(`AI's response: ${sanitizedText}`);
  }
}

generateContent();
