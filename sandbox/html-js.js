console.log(`[html-js.js] -> HERE`);

fetch("http://localhost:8080/api", {
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
    console.log(`[html-js.js] -> data: ${json}`);
    const html = json.map((item) => {
      return `
                <h2>
                        <span style="font-size: 18pt">
                                <strong>
                                        ${item.header}
                                </strong>
                        </span>
                </h2>
                <p><br /></p>
                <p dir="ltr">
                        ${item.content}
                </p>
                
                <p><br /></p>
                `;
    });
    console.log(`[html-js.js] -> html: ${html}`);
    document.getElementById("main").innerHTML = html.join("");
  })
  .catch((error) => {
    console.error(`[html-js.js] -> error: ${error}`);
  });

console.log(`[html-js.js] -> XD`);
