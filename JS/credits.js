import { deleteAllCookies, getCookie } from "./createCookiesFromData.js";

// Move this code (that remove necessary cookies) to a function that ends the game inside the game engine
function getCredited() {
    if(getCookie("level_id") != "8") {
        deleteAllCookies();
    }

    window.location.replace(`../HTML/credits.html`);
}
