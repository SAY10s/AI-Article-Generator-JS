const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    content:
      "Narodziny polskiego punka datuje się na rok 1978, kiedy to powstały zespoły takie jak Kryzys, Tilt i Deadlock. Zespoły te, inspirowane zachodnim punkiem, wyrażały bunt wobec szarej rzeczywistości PRL-u, tworząc muzykę o surowym brzmieniu i tekstach pełnych gniewu i frustracji. W 1980 roku powstał zespół Dezerter, który szybko stał się jednym z najważniejszych przedstawicieli polskiego punka. Ich teksty, poruszające tematy polityczne i społeczne, rezonowały z ówczesną sytuacją w Polsce, a koncerty charakteryzowały się niesamowitą energią. Wraz z wprowadzeniem stanu wojennego w 1981 roku, punk stał się jeszcze bardziej radykalny, a teksty piosenek nabrały jeszcze większego znaczenia. Zespoły takie jak KSU, TZN Xenna czy Moskwa, jawnie krytykowały system komunistyczny, stając się symbolem oporu wobec władzy. Mimo represji ze strony władz i cenzury, punk rozwijał się, powstawały kolejne zespoły, a koncerty przyciągały tłumy młodych ludzi spragnionych wolności i buntu. Złoty wiek polskiego punka to okres niezwykłej kreatywności, energii i zaangażowania, który pozostawił trwały ślad w historii polskiej muzyki i kultury.",
  });
});

app.post("/api", (req, res) => {
  const data = req.body;
  res.json({ message: `Oto twój prompt: ${data.prompt}` });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
