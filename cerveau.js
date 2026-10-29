export function repondre(texte, regles = []) {
    const message = texte.toLowerCase();
    for (const regle of regles) {
        const cles = regle.motsCles || [regle.motCle];
        if (cles.some(mot => message.includes(mot))) {
            return regle.reponse;
        }
    }
    return "Je n'ai pas compris. Essayez avec un autre mot.";
}