import { generateHTML } from "../../generator/utils/generateHTML.js";

fetch("http://localhost:8080/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amountOfSections: 5,
    title: "Czy moja firma potrzebuje strony internetowej?",
    additionalContext: "Each section must be really long.",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    let json = JSON.parse(data);
    const html = json.map((item) => {
      return generateHTML(item.header, item.content);
    });
    document.getElementById("main").innerHTML = html.join("");
  })
  .catch((error) => {
    console.error(`[website]: ${error}`);
    document.getElementById(
      "main"
    ).innerHTML = `<p>An error occured!</p><p>${error}</p>`;
  });
