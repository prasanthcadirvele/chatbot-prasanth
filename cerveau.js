export function repondre(texte, regles = []) {
    const message = texte.toLowerCase();
    for (const regle of regles) {
        if (message.includes(regle.motCle)) {
            return regle.reponse;
        }
    }
    return "Je n'ai pas compris. Essayez avec un autre mot.";
}