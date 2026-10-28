const etat = { messages: [] };

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
    champ.value = "";
    afficher();
});