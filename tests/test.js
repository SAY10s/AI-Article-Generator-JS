import fs from "fs/promises";

try {
  let data = await fs.readFile("./plain.txt", "utf8");

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
  splitData = splitData.join('"');
  await fs.writeFile("final.json", splitData, "utf8");
} catch (err) {
  console.error("An error occurred:", err);
}
