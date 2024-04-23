export function sanitizeJson(data) {
  try {
    let splitData = data.split('"');
    splitData.forEach((element, index) => {
      console.log(index + ": " + element);
    });
    splitData = splitData.map((element, index) => {
      if (index % 4 === 3) {
        return element.replace(/[\n\t\r]/g, "<br>");
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
