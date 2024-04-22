import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load credentials from credentials.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const credentialsPath = path.resolve(__dirname, "./credentials.json");
const credentialsFile = fs.readFileSync(credentialsPath, "utf8");
const credentials = JSON.parse(credentialsFile);

// Extract credentials
const privateKey = credentials.private_key;
const clientEmail = credentials.client_email;
const projectId = credentials.project_id;

const location = "europe-central2";
const model = "gemini-1.0-pro-001";

//generationConfig
const maxOutputTokens = 8192;
const temperature = 0.9;
const topP = 1;

const safetySettings = [
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
];

export const vertexSettings = {
  authOptions: {
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  },
  projectId: projectId,
  location: location,
  model: model,
  generationConfig: {
    maxOutputTokens: maxOutputTokens,
    temperature: temperature,
    topP: topP,
  },
  safetySettings: safetySettings,
};
