import { VertexAI } from "@google-cloud/vertexai";
import { vertexSettings } from "./config/vertexSettings.js";
import { createPrompt } from "./utils/createPrompt.js";
import { sanitizeJson } from "./utils/sanitizeJson.js";

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

  console.log(`\n-------- [generator.js] ---------\n\nGenerating content...`);
  for await (const item of streamingResp.stream) {
    const elapsedTime = Date.now() - startTime;
    console.log(`${elapsedTime / 1000}s`);
    i++;
  }

  const aggregatedResponse = await streamingResp.response;
  const text = aggregatedResponse.candidates[0].content.parts[0].text;
  try {
    const objects = sanitizeJson(text);
    console.log(
      `\n-------- [generator.js] ---------\n\nContent generated successfully\n\n-----------------------------\n`
    );
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
