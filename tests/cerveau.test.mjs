import { test } from "node:test";
import assert from "node:assert/strict";
import { repondre } from "../cerveau.js";

const regles = [
    { motCle: "bonjour", reponse: "Salut !" },
    { motCle: "prix", reponse: "Nos pizzas coûtent entre 10 et 16 euros." },
    { motCle: "livraison", reponse: "Livraison disponible." }
];

test("répond à un mot-clé connu", () => {
    assert.equal(repondre("bonjour", regles), "Salut !");
});

test("trouve le mot-clé au milieu d'une phrase, même en majuscules", () => {
    assert.equal(repondre("Quel est le PRIX svp?", regles), "Nos pizzas coûtent entre 10 et 16 euros.");
});

test("donne une réponse par défaut si rien ne correspond", () => {
    assert.match(repondre("météo", regles), /pas compris/);
});


test("répond correctement quand le mot-clé livraison est présent dans une phrase", () => {
    assert.equal(repondre("Est-ce que vous faites la livraison ce soir ?", regles), "Livraison disponible.");
});