/**
 * Creates a prompt for generating sections of an article.
 * @param {number} amountOfSections - The number of sections to generate.
 * @param {string} title - The title of the article.
 * @param {string} [additionalContext=""] - Additional context for the prompt.
 * @returns {string} - The generated prompt.
 */
export function createPrompt(
  amountOfSections,
  title,
  language = "polish",
  additionalContext = ""
) {
  let firstPartOfPrompt = "";
  if (amountOfSections == 1) {
    firstPartOfPrompt = `two sections`;
  } else {
    firstPartOfPrompt = `${amountOfSections + 1} sections`;
  }

  // let languageSpecificationPart = "";
  // if (language === "english" || language === "English") {
  //   languageSpecificationPart = ` in ${language} language. Remember to keep output in the format given in the first part of the prompt.`;
  // } else {
  //   languageSpecificationPart = ` in ${language} language.`;
  // }

  let languageSpecificationPart = ` in ${language} language. Remember to keep output in the format given in the first part of the prompt.`;

  return `The output must be a JSON file in the given format: [{\"header\": \"first header\", \"content\": \"content of the first section\"}, {\"header\": \"second header\", \"content\": \"content of the second section\"}, (...)]. Content of each section must be at least 2000 characters long. Each section must be really long. Never start sentence with bold followed by colon. Don't list anything. Paragraph must always be written as continuous text. Generate ${firstPartOfPrompt} for an article titled \'${title}\'  ${languageSpecificationPart} Last section must be a summary. Make the summary at least as long as the other sections. ${additionalContext}. Title of each section must contain minimum of 4 words.`;
}
