//% FONCTION DIALOGUE VIEUX %//
function dialogueWithOld(scene, agathe)
{
    // vérification des coordonnées
    if ((agathe.x >= 700 && agathe.x <= 775) && (agathe.y >= 200 && agathe.y <= 250))
    {
        // on regarde si on a déjà parlé au vieux pour lancer le premier dialogue
        if (dialogueOldPoop == 0)
        {
            // console.log("should display area");
            displayTextArea(dialogueArea);
            dialogueOldPoop++;
        }
    }
}


//$ AFFICHAGE ZONE TEXTE $//
function displayTextArea()
{
    dialogueArea.style.visibility = "visible";
}