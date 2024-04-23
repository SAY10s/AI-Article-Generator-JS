export function generateHTML(header, content) {
  return `<h2><span style="font-size: 18pt"><strong>${header}</strong></span></h2><p><br /></p><p dir="ltr">${content}</p><p><br /></p>`;
}
