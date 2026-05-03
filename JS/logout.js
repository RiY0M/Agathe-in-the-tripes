import { deleteAllCookies } from "./createCookiesFromData.js";

const btnDecoAgree = document.getElementById("logout-agree-button");

btnDecoAgree.addEventListener("click", () => {
    deleteAllCookies();
    window.location.replace("../HTML/index.html");
});
