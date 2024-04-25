fetch("http://localhost:8080/generateHTML", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amountOfSections: 8,
    title: "SEO co to jest - Optymalizacja I Pozycjonowanie Stron",
    additionalContext: "",
    language: "german",
    // navigation: true,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("main").innerHTML = data.html;
  })
  .catch((error) => {
    console.error(`[website]: ${error}`);
    document.getElementById(
      "main"
    ).innerHTML = `<p>An error occured!</p><p>${error}</p>`;
  });
