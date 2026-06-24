import { deleteAllCookies, getCookie } from "./createCookiesFromData.js";

// todo: Move this code (that remove necessary cookies) to a function that ends the game inside the game engine
function getCredited() {
    if(getCookie("level_id") != "8") {
        deleteAllCookies(); // TODO: not remove token
    }

    window.location.replace(`../HTML/credits.html`);
}
