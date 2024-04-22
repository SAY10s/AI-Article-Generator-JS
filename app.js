process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { VertexAI } = require("@google-cloud/vertexai");

const authOptions = {
  credentials: {
    client_email: "311134615011-compute@developer.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQ2X3JiaPbjtcv\n7d1EOVQM4T5ll5ip2YNaM2VNxJy3DV9azbtIhRdUrss/VUmjCakLQeVPXYQcjDlB\nsPRGPpX4Ds6DXZIUmtpEYNRRUo/Dc9h8Xuz6Eec7I9GXHGjg8s26rr6nv2uYapJi\n5urCOLYpLq+ac7MjyVB5Y1kVjsEEDebqpi7JXGGsy/eTJfa8Fr7m+HddlU9bb63V\nZEf9PJHEIb2JCxxAGk2HGLF+Gx7E7fTJKkPnOYXq1rMiTZJ5lKOPsnjmokWmrLHd\nzP1CeXB3GoOu1wtG9B8mi7KfeFpDGxx8s7Pzc0jox2wRBjK/bnA5kIv4SZN+PDhA\nhFx7x4C1AgMBAAECggEAGv59jGrar8J87FA/mPWa+EY1yS5IuG1plaNOfPiEdAGJ\nuWQdiKBRNWwZT6CPsb/KJm8YO0OgU4tJTEUZsamduy/4v9B8lOa1/wAP+UnlVJM4\n4Expr2HYhBObX793i9m+PxqegHKUruDZdmiX384yN0z2PA2n0iCPYv01Erz+lC4X\nCsiCGq1Kua1rMPKWDJnfUYuu0xamwz8A+OcEeieqkLGlzO3bJ3TLrw6BYxNNTqWR\ndrU/QJjw0Xsd5fAFlhFHm87jx5U9nbJpwzok8PnVHrKehQgfCJy21y884PzhwH++\nRZLu9RkY3pUtB2IjzV0ApiIW67hJhQLj/Zg7wwvEyQKBgQDqn841vFlF5Au8vr8k\nSClzcppHxL0UzVEoJVrRcjecUIX97icVbxsr6AHbte9/M/SaP3xDQRzMNgY4Dj5q\n4EtlegDGKWVYtZ9vlZhbo6OtlQCdfs4DeLlCCdyh62CHrCZkX1feNryB6odSn7KK\n+4WeEoD+eqCjXYj8rgPzJn2eSQKBgQDj4ImYrvsK1K0xswGC/KbrJAIuF8a6MwnK\nhx/tzrvzpmtuiH0S9q88dnVBuy87FLTWfbh9mt8ZNYXUVCtV7QTr0ZrVNyLp77qN\nEZ7c5YXQhwGC483x+JAe0xOgOCGP1WqqhT1LhHwl94CFYKOrSTcpoAIUa9C3seUq\nlpE0M96/DQKBgQDPCzCkuM4q39//sm/oa4mwqBw/YvzcY4bPn48yLtGmLmTfvY5d\n2ssmhrlFEpsDLG0YxRc6HjZ0euQoCWHJXJ8MMIqIVDVr//JvPJrTm2cwIcIGOcVA\nyQLqpNs/Q//OGftTLdPTc4gMOVMrdWPQQ78YzAlrB/nD0CG3oTQ5GOlXiQKBgQDP\nkUfEfB7Pzsmz64oE9n5U0Yfq1F2AXd0dTdgXlag+V+ij1k+XZnxYZs6IASkUd9gB\nSKM0Rk3ReJ9euQyASFWjOFoAvShgTq1usg4yyB8Lwu3te/Or5O3iJgJKftaTXaK7\nkII0t4keTEQVOeHbs+U7VTSPxWVo7fIAyQWat2S+QQKBgQCgBqHm1lGR0zrFFvxZ\nIgWbtAgo9gbdDorWfuw7B90JeQxyeIDxV15iRdfeybNEDi0vciKZm6uvll61qJZs\nGokCuioI+ThRM8a7vHjCkt03VCE8w+ETuBfUbJv/PslINc0w0xvE/P5fvy5iEntd\nb0lq1Fm/KM5a+YStUgT/Uj3s8A==\n-----END PRIVATE KEY-----\n",
  },
};
// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: "content-ai-generator-420613",
  location: "europe-central2",
  googleAuthOptions: authOptions,
});
const model = "gemini-1.0-pro-001";

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.9,
    topP: 1,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

async function generateContent() {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `The output must be a JSON file in the given format: [{\"header\": \"first header\", \"content\": \"content of the first section\"}, {\"header\": \"second header\", \"content\": \"content of the second section\"}, (...)]. Content of each section must be at least 2000 characters long.

input: Generate 2 sections for an article titled \'Historia polskiego punk rocka\'  in polish language. 
output: [
{
\"header\": \"Początki buntu: Punk rock w PRL-u (1978-1981)\",
\"content\": \"Narodziny polskiego punk rocka przypadają na schyłkowy okres PRL-u, czas napięć społecznych, kryzysu gospodarczego i rosnącego niezadowolenia z komunistycznego reżimu. Inspiracją dla pierwszych polskich punków były zachodnie zespoły, takie jak Sex Pistols, The Clash czy Ramones, których muzyka i teksty wyrażały bunt przeciwko establishmentowi, konformizmowi i niesprawiedliwości społecznej. W Polsce, gdzie panowała cenzura i represje, punk rock stał się formą oporu wobec systemu, sposobem na wyrażenie frustracji i gniewu młodego pokolenia.

Pierwsze polskie zespoły punkowe, takie jak Kryzys, Tilt, Dezerter czy KSU, powstawały w dużych miastach, takich jak Warszawa, Kraków czy Wrocław. Ich muzyka była prosta, surowa i energetyczna, a teksty często zawierały krytykę systemu, władzy, cenzury i życia w PRL-u. Koncerty punkowe, organizowane w klubach studenckich, domach kultury czy prywatnych mieszkaniach, stawały się miejscem spotkań młodzieży, która nie identyfikowała się z oficjalną kulturą i propagandą.

Wczesny polski punk rock charakteryzował się różnorodnością stylistyczną. Kryzys, z Robertem Brylewskim na czele, łączył punk rock z elementami reggae i jazzu, tworząc unikalne brzmienie. Tilt, z charyzmatycznym wokalistą Tomaszem Lipińskim, prezentował bardziej klasyczny punk rock, z prostymi, melodyjnymi utworami i tekstami o tematyce społecznej. Dezerter, z kolei, wyróżniał się agresywnym, hardcore\'owym brzmieniem i tekstami o tematyce antywojennej i antytotalitarnej. KSU, pochodzący z Ustrzyk Dolnych, wnosił do polskiego punk rocka elementy folku i muzyki góralskiej, tworząc oryginalne połączenie.

Wczesny polski punk rock nie był jedynie zjawiskiem muzycznym, ale także kulturowym i społecznym. Punkowcy wyróżniali się swoim wyglądem, ubiorem, fryzurami i zachowaniem, które było wyrazem buntu przeciwko konformizmowi i szarości życia w PRL-u. Punk rock stał się symbolem nonkonformizmu, niezależności i sprzeciwu wobec systemu.

Mimo represji ze strony władz, cenzury i utrudnień w organizacji koncertów, polski punk rock rozwijał się dynamicznie, zyskując coraz większą popularność wśród młodzieży. W 1981 roku, tuż przed wprowadzeniem stanu wojennego, odbył się pierwszy ogólnopolski festiwal punkowy w Jarocinie, który stał się symbolem siły i znaczenia polskiego punk rocka.\"
},
{
\"header\": \"Punk rock w podziemiu: Lata stanu wojennego (1982-1989)\",
\"content\": \"Wprowadzenie stanu wojennego w grudniu 1981 roku brutalnie przerwało rozwój polskiego punk rocka. Zespoły zostały zmuszone do zejścia do podziemia, koncerty były zakazane, a muzycy i fani narażeni na represje ze strony władz. Mimo trudnych warunków, polski punk rock nie zniknął, a wręcz przeciwnie, stał się jeszcze bardziej radykalny i zaangażowany politycznie.

W latach 80. powstało wiele nowych zespołów punkowych, takich jak Siekiera, Moskwa, Abaddon, Post Regiment czy Armia. Ich muzyka była często agresywna, hałaśliwa i eksperymentalna, a teksty wyrażały gniew, frustrację i bunt wobec stanu wojennego, represji i komunistycznego systemu. Koncerty odbywały się w konspiracji, w prywatnych mieszkaniach, piwnicach czy opuszczonych budynkach, a informacje o nich przekazywane były pocztą pantoflową.

Punk rock stał się wówczas nie tylko formą muzycznego wyrazu, ale także sposobem na życie, postawą etyczną i polityczną. Punkowcy angażowali się w działalność opozycyjną, kolportowali ulotki, malowali antykomunistyczne graffiti i uczestniczyli w demonstracjach. Punk rock stał się symbolem oporu wobec systemu, nadziei na zmianę i walki o wolność.

W latach 80. polski punk rock rozwijał się w kilku kierunkach. Siekiera, z charyzmatycznym wokalistą Tomaszem Adamskim, prezentowała awangardowy, post-punkowy styl, z elementami industrialu i noise\'u. Moskwa, z Pawłem Gumolą na czele, grała szybki, melodyjny punk rock z tekstami o tematyce społecznej i politycznej. Abaddon, z kolei, wyróżniał się mrocznym, hardcore\'owym brzmieniem i tekstami o tematyce egzystencjalnej. Post Regiment, z wokalistą Dominikiem Pyrzyna, łączył punk rock z elementami reggae i ska, tworząc unikalne brzmienie. Armia, z Tomaszem Budzyńskim na czele, prezentowała bardziej poetycki i refleksyjny styl, z elementami rocka gotyckiego i muzyki folkowej.

Mimo represji i trudnych warunków, polski punk rock w latach 80. rozwijał się dynamicznie, stając się ważnym głosem sprzeciwu wobec komunistycznego systemu i symbolem walki o wolność.\"
},]

input: Generate 2 sections for an article titled \'Najlepsze kluby piłkarskie\'  in polish language. 
output:
`,
          },
        ],
      },
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  let i = 0;
  const startTime = Date.now();

  for await (const item of streamingResp.stream) {
    const text = item.candidates[0].content.parts[0].text;
    const elapsedTime = Date.now() - startTime;
    console.log(i + " minęło", elapsedTime / 1000, "s");
    i++;
  }

  const aggregatedResponse = await streamingResp.response;
  const text = aggregatedResponse.candidates[0].content.parts[0].text;
  const sanitizedText = text.replace(/[\n\t\r]/g, " ");

  const objects = JSON.parse(sanitizedText);
  console.log(objects);
}

generateContent();
