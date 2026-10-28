import { test } from "node:test";
import assert from "node:assert/strict";
import { repondre } from "../cerveau.js";

const regles = [
    { motCle: "bonjour", reponse: "Salut !" },
    { motCle: "prix", reponse: "25 euros." }
];

test("répond à un mot-clé connu", () => {
    assert.equal(repondre("bonjour", regles), "Salut !");
});

test("trouve le mot-clé au milieu d'une phrase, même en majuscules", () => {
    assert.equal(repondre("Quel est le PRIX svp?", regles), "25 euros.");
});

test("donne une réponse par défaut si rien ne correspond", () => {
    assert.match(repondre("météo", regles), /pas compris/);
});

// Test supplémentaire que tu ajoutes toi-même :
test("répond correctement même s'il y a des espaces superflus", () => {
    assert.equal(repondre("  prix  ", regles), "25 euros.");
});