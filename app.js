import { repondre } from "./cerveau.js";

const etat = { messages: [], regles: [] };

const formulaire = document.querySelector("#formulaire");
const champ = document.querySelector("#message");
const historique = document.querySelector("#historique");
const statut = document.querySelector("#statut");
const btnEffacer = document.querySelector("#effacer");
const compteur = document.querySelector("#compteur");

function afficher() {
    historique.replaceChildren();
    for (const m of etat.messages) {
        const li = document.createElement("li");
        li.textContent = m.role + " : " + m.texte;

        // Attribution d'une classe CSS selon l'expéditeur
        if (m.role === "Vous") {
            li.classList.add("message-user");
        } else {
            li.classList.add("message-bot");
        }

        historique.append(li);
    }
}

formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    const texte = champ.value.trim();
    if (texte === "") {
        statut.textContent = "Écrivez un message avant d'envoyer.";
        return;
    }
    statut.textContent = "";
    etat.messages.push({ role: "Vous", texte });
    etat.messages.push({ role: "Bot", texte: repondre(texte, etat.regles) });
    champ.value = "";
    compteur.textContent = `0 / 200`;
    afficher();
});

async function chargerRegles() {
    try {
        const reponse = await fetch("regles.json");
        if (!reponse.ok) throw new Error("HTTP " + reponse.status);
        etat.regles = await reponse.json();
    } catch {
        statut.textContent = "Le service ne répond pas. Le chatbot répondra moins bien.";
    }
}

btnEffacer.addEventListener("click", () => {
    etat.messages = [];
    statut.textContent = "";
    compteur.textContent = `0 / 200`;
    afficher();
});

champ.addEventListener("input", () => {
    compteur.textContent = `${champ.value.length} / 200`;
});

chargerRegles();