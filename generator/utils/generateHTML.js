// generates HTML from the data array in format used on TechStudio website
export function generateHTML(dataArray) {
  let dataJSArray = JSON.parse(dataArray);

  let html = "";
  html += `<div class='my-4 sm:w-9/12 md:w-1/3 border-2 border-color-[#d9d9d9]' style='padding: 20px;'><ol>`;
  let contentsList = dataJSArray.map((item, index) => {
    return `<li><a href='#a${index + 1}'>${item.header}</a></li>`;
  });
  html += contentsList.join("");
  html += `</ol></div>`;
  let articles = dataJSArray.map((item, index) => {
    return `<div style='position: relative;'><div id='a${
      index + 1
    }' style='position: absolute; top: -150px;'></div></div><h2><span style='font-size: 18pt'><strong>${
      item.header
    }</strong></span></h2><p><br /></p><p dir='ltr'>${
      item.content
    }</p><p><br /></p>`;
  });
  html += articles.join("");
  return html;
}
