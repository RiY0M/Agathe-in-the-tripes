// délai avant affichage mort
let delayBeforeDeathScreen = 0;

// mort du perso
let youAreDeadCheh = false;


// affichage écran de mort
function displayDeathScreen()
{
    youAreDeadCheh = true;
    if (delayBeforeDeathScreen < 50) delayBeforeDeathScreen++;
    if (delayBeforeDeathScreen == 50) document.querySelector("#game-over").style.display = "initial";
}