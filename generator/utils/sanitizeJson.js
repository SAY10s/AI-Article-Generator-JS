// this function deletes all new lines etc. from the stringified JSON data, so it can be parsed into a valid JSON object. It also replaces some markdown-like syntax with HTML tags. It keeps new lines etc in the content of the JSON object.
export function sanitizeJson(data) {
  try {
    let splitData = data.split('"');
    splitData = splitData.map((element, index) => {
      if (index % 4 === 3) {
        let returnElement = element.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        returnElement = returnElement.replace(/\*/g, "<br>");
        returnElement = returnElement.replace(/(\d+)\./g, "\n$1.");
        returnElement = returnElement.replace(/\n\n/g, "\n");
        returnElement = returnElement.replace(/[\n\t\r]/g, "<br>");
        returnElement = returnElement.replace(/<br><br>/g, "<br>");
        return returnElement;
      } else {
        return element.replace(/[\n\t\r]/g, " ").replace(/\s+/g, "");
      }
    });
    data = splitData.join('"');
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
}
