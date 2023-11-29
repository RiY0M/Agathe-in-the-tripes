//% FONCTION DIALOGUE VIEUX %//
function dialogueWithOld(scene, agathe)
{
    // vérification des coordonnées
    if ((agathe.x >= 700 && agathe.x <= 775) && (agathe.y >= 200 && agathe.y <= 250))
    {
        // on regarde si on a déjà parlé au vieux pour lancer le premier dialogue
        if (dialogueOldPoop == 0)
        {
            // changement de l'image et du texte
            changeImgTextDialogue("../../../img/assets/old-on-poop.png", oldDialogueList[0]);

            // affichage de la zone de dialogue
            displayTextArea(dialogueArea);

            // on passe au dialogue suivant
            dialogueOldPoop++;
        }
    }
}


//$ AFFICHAGE ZONE TEXTE $//
function displayTextArea()
{
    // on indique que la zone est affichée
    isDialogueAreaDisplayed = true;
    // affichage zone de dialogue
    dialogueArea.style.visibility = "visible";
}


//$ AFFICHAGE DIALOGUE ET IMAGE $//
function changeImgTextDialogue(imagePath, text)
{
    // changement image
    document.querySelector("#dialogue-area-pp").src = imagePath;

    // changement texte
    document.querySelector("#dialogue-text").innerHTML = text;
}


//$ CHECK SI CHANGEMENT DIALOGUE $//
document.addEventListener('keypress', (event) => {
    // on regarde si on a appuyé sur la touche entrée et si un dialogue est lancé
    if (event.key === 'Enter' && isDialogueAreaDisplayed === true) {

        // si on arrive au dernier dialogue on ferme la zone d'affichage
        if (dialogueOldPoop === oldDialogueList.length) {

            dialogueArea.style.visibility = "hidden";
            isDialogueAreaDisplayed = false;
        }

        // on passe au dialogue suivant
        changeImgTextDialogue("../../../img/assets/old-on-poop.png", oldDialogueList[dialogueOldPoop]);
        dialogueOldPoop++;
    }
});