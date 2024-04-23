// generates HTML from the data array in format used on TechStudio website
export function generateHTML(dataArray) {
  let html = dataArray.map((item) => {
    return `<h2><span style="font-size: 18pt"><strong>${item.header}</strong></span></h2><p><br /></p><p dir="ltr">${item.content}</p><p><br /></p>`;
  });
  return html;
}
