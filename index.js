import express, { json } from "express";
import { generateContent } from "./content-generator/generator.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

app.use(json());

app.get("/api", (req, res) => {
  res.json({
    content: "To get, a powinno być POST",
  });
});

app.post("/test", async (req, res) => {
  res.json([
    {
      header: "Woda - źródło życia",
      content:
        "Woda jest niezbędnym elementem życia na Ziemi. Stanowi około 60% masy ciała człowieka i bierze udział w wielu ważnych procesach fizjologicznych. Woda jest rozpuszczalnikiem dla wielu substancji, w tym składników odżywczych, hormonów i produktów przemiany materii. Transportuje te substancje do komórek i usuwa z nich produkty przemiany materii. Woda reguluje również temperaturę ciała poprzez pocenie się i parowanie. Picie odpowiedniej ilości wody jest ważne dla utrzymania zdrowia. Woda pomaga zapobiegać odwodnieniu, które może prowadzić do zmęczenia, bólów głowy i zaparć. Woda również pomaga utrzymać prawidłową pracę nerek i układu pokarmowego. Woda jest również ważna dla zdrowia psychicznego. Picie odpowiedniej ilości wody może pomóc poprawić nastrój, koncentrację i pamięć. Woda może również pomóc zmniejszyć stres i niepokój. Ogólnie rzecz biorąc, woda jest niezbędna dla zdrowia i dobrego samopoczucia. Picie odpowiedniej ilości wody jest ważne dla utrzymania prawidłowego funkcjonowania organizmu i zapobiegania chorobom.",
    },
    {
      header: "Zanieczyszczenie wody",
      content:
        "Zanieczyszczenie wody jest poważnym problemem na całym świecie. Zanieczyszczenie wody może być spowodowane przez wiele czynników, w tym ścieki przemysłowe i komunalne, spływy z pól uprawnych i wycieki ropy naftowej. Zanieczyszczenie wody może mieć negatywny wpływ na zdrowie ludzi, ekosystemy i gospodarkę. Zanieczyszczenie wody może powodować wiele chorób, w tym choroby układu pokarmowego, choroby skóry i choroby układu oddechowego. Zanieczyszczenie wody może również prowadzić do zatrucia metalami ciężkimi, które może powodować uszkodzenia mózgu, nerek i innych narządów. Zanieczyszczenie wody może również mieć negatywny wpływ na ekosystemy. Zanieczyszczenia mogą zabijać ryby i inne zwierzęta wodne, a także niszczyć siedliska. Zanieczyszczenie wody może również prowadzić do zakwitów glonów, które mogą blokować światło słoneczne i tlen, co może prowadzić do śmierci ryb i innych organizmów wodnych. Zanieczyszczenie wody może również mieć negatywny wpływ na gospodarkę. Zanieczyszczenie wody może utrudnić korzystanie z wody do celów rekreacyjnych, takich jak pływanie i wędkowanie. Zanieczyszczenie wody może również utrudnić korzystanie z wody do celów przemysłowych, takich jak chłodzenie i produkcja. Zanieczyszczenie wody jest poważnym problemem, który ma negatywny wpływ na zdrowie ludzi, ekosystemy i gospodarkę. Ważne jest, aby podjąć kroki w celu zapobiegania zanieczyszczeniu wody i ochrony naszych zasobów wodnych.",
    },
    {
      header: "Ochrona zasobów wodnych",
      content:
        "Ochrona zasobów wodnych jest ważna dla utrzymania zdrowia ludzi, ekosystemów i gospodarki. Istnieje wiele sposobów ochrony zasobów wodnych, w tym: * **Oczyszczanie ścieków:** Ścieki przemysłowe i komunalne mogą być oczyszczane w oczyszczalniach ścieków, aby usunąć zanieczyszczenia. * **Kontrola spływów z pól uprawnych:** Spływy z pól uprawnych mogą być kontrolowane za pomocą takich środków, jak tarasy i pasy buforowe. * **Zapobieganie wyciekom ropy naftowej:** Wycieki ropy naftowej można zapobiegać poprzez stosowanie odpowiednich procedur i technologii. * **Ochrona mokradeł:** Mokradła odgrywają ważną rolę w oczyszczaniu wody. Ochrona mokradeł może pomóc zapobiegać zanieczyszczeniu wody. * **Oszczędzanie wody:** Oszczędzanie wody może pomóc zmniejszyć ilość ścieków i spływów z pól uprawnych. Ochrona zasobów wodnych jest ważna dla utrzymania zdrowia ludzi, ekosystemów i gospodarki. Podejmując kroki w celu ochrony zasobów wodnych, możemy pomóc zapewnić, że będziemy mieć czystą wodę do picia, rekreacji i innych celów.",
    },
  ]);
});

app.post("/api", async (req, res) => {
  const data = req.body;
  console.log("\n\ndata: " + data.amountOfSections + " " + data.title + "\n\n");
  const additionalContext = data.additionalContext || "";
  const content = await generateContent(
    data.amountOfSections,
    data.title,
    additionalContext
  );
  console.log("Content: " + content);
  res.json(content);
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
