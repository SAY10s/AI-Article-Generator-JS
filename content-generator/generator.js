import { VertexAI } from "@google-cloud/vertexai";
import { vertexSettings } from "./generatorSettings/vertexSettings.js";
import { createPrompt } from "./generatorSettings/createPrompt.js";

const {
  authOptions,
  projectId,
  location,
  model,
  generationConfig,
  safetySettings,
} = vertexSettings;

const vertex_ai = new VertexAI({
  project: projectId,
  location: location,
  googleAuthOptions: authOptions,
});
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: generationConfig,
  safetySettings: safetySettings,
});

async function generateContent(
  amountOfSections,
  title,
  additionalContext = ""
) {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: createPrompt(amountOfSections, title, additionalContext),
            // text: "Cześć",
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
    return objects;
  } catch (error) {
    console.log(`
    -----------------------------------------
    --------AI returned invalid JSON---------
    -----------------------------------------
    ------------AI Response below------------
    -----------------------------------------\n
    ${sanitizedText}
    `);

    return { error: "AI returned invalid JSON" };
  }
}
// generateContent(2, "Historia polskiego punk rocka");
export { generateContent };
