import { deleteAllCookies } from "./createCookiesFromData.js";

const btnDecoAgree = document.querySelector("#deconnexion-agree-button");

btnDecoAgree.addEventListener("click", () => {
    deleteAllCookies();
    window.location.replace("index.html");
});
