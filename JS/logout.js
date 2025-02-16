import { supprimeTousLesCookies } from "./createCookiesFromData.js";

const btnDecoAgree = document.querySelector("#deconnexion-agree-button");

btnDecoAgree.addEventListener("click", () => {
    supprimeTousLesCookies();
    window.location.replace("index.html");
});
