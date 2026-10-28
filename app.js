import { repondre } from "./cerveau.js";

const etat = { messages: [], regles: [] };

const formulaire = document.querySelector("#formulaire");
const champ = document.querySelector("#message");
const historique = document.querySelector("#historique");
const statut = document.querySelector("#statut");

function afficher() {
    historique.replaceChildren();
    for (const m of etat.messages) {
        const li = document.createElement("li");
        li.textContent = m.role + " : " + m.texte;
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

chargerRegles();