fetch("http://localhost:8080/generateHTML", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amountOfSections: 5,
    title: "Czy moja firma potrzebuje strony internetowej?",
    additionalContext:
      "Each section must be really long. Use as much markodwn as you can.",
    navigation: true,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // console.log(data.html);
    document.getElementById("main").innerHTML = data.html;
  })
  .catch((error) => {
    console.error(`[website]: ${error}`);
    document.getElementById(
      "main"
    ).innerHTML = `<p>An error occured!</p><p>${error}</p>`;
  });
