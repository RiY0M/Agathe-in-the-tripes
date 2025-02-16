import { getCookie } from "./createCookiesFromData.js";

// Move this code (that remove necessary cookies) to a function that ends the game inside the game engine
function getCredited() {
    if(getCookie("level_id") != "8") {
        document.cookie = `level_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        document.cookie = `hpRemain=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        document.cookie = `nbDynamite=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    // Changement map
    window.location.replace(`./credits.html`);
}
