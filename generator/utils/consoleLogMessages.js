// those are just console log messages
export const generatorConsoleLogMessages = {
  genStart: `\n-------- [generator.js] ---------\n\nGenerating content...\n`,
  genSuccess: `\n-------- [generator.js] ---------\n\nContent generated successfully\n\n-----------------------------\n`,
  genError: `
  -----------------------------------------
  --------AI returned invalid JSON---------
  -----------------------------------------
  ------------AI Response below------------
  -----------------------------------------\n`,
};

// that's a console message from the index.js file (API)
export function logGivenParams(
  amountOfSections,
  title,
  navigation,
  additionalContext
) {
  console.log(
    `\n-------- [index.js] --------- \n\nThe params of request:\n\namountOfSections: ${amountOfSections}\ntitle: ${title}\nnavigation: ${navigation}\nadditionalContext: ${additionalContext}\n\n-----------------------------\n`
  );
}

export const wrongApiUrl = {
  header: "You should send a POST request to this endpoint",
  content:
    "If you want to generate content, you should send a POST request to this endpoint with the following JSON body: { amountOfSections: number, title: string, additionalContext: string }",
};
