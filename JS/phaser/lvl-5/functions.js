//% FONCTION DIALOGUE VIEUX %//
function dialogueWithOld(scene, agathe)
{
    // vérification des coordonnées
    if ((agathe.x >= 700 && agathe.x <= 775) && (agathe.y >= 200 && agathe.y <= 250))
    {
        // on regarde si on a déjà parlé au vieux pour lancer le premier dialogue
        if (dialogueOldPoop == 0)
        {
            // on indique à qui on parle
            talkingTo = "oldOnPoop";

            // changement de l'image et du texte
            changeImgTextDialogue("../../../img/assets/old-on-poop.png", oldDialogueList[0]);

            // affichage de la zone de dialogue
            displayTextArea(dialogueArea);

            // on passe au dialogue suivant
            dialogueOldPoop++;
        }
    }
}


//% FONCTION DIALOGUE PIERRE POUDREUSE %//
function dialogueWithStrangeRock()
{
    // on regarde si on a déjà parlé à la pierre pour lancer le premier dialogue
    if (strangeRockDialogue == 0)
    {
        // on indique à qui on parle
        talkingTo = "strangeRock";

        // changement de l'image et du texte
        changeImgTextDialogue("../../../img/assets/powder-rock.png", strangeRockDialogueList[0]);

        // affichage de la zone de dialogue
        displayTextArea(dialogueArea);

        // on passe au dialogue suivant
        strangeRockDialogue++;
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

        switch (talkingTo) {

            //% DIALOGUE VIEUX %//
            case "oldOnPoop":
                // si on arrive au dernier dialogue on ferme la zone d'affichage
                if (dialogueOldPoop === oldDialogueList.length) {

                    dialogueArea.style.visibility = "hidden";
                    isDialogueAreaDisplayed = false;

                    // mise à jour des objets en notre possession
                    updateStickNumber();

                    // vérification des objets en notre possession
                    updateObjectifs();

                    // on affiche les objetcifs
                    displayObjectifs();
                }

                // on passe au dialogue suivant
                changeImgTextDialogue("../../../img/assets/old-on-poop.png", oldDialogueList[dialogueOldPoop]);
                dialogueOldPoop++;
                break;

            
            //% DIALOGUE PIERRE %//
            case "strangeRock":
                // si on arrive au dernier dialogue on ferme la zone d'affichage
                if (strangeRockDialogue === strangeRockDialogueList.length) {

                    dialogueArea.style.visibility = "hidden";
                    isDialogueAreaDisplayed = false;
                }

                // on passe au dialogue suivant
                changeImgTextDialogue("../../../img/assets/powder-rock.png", strangeRockDialogueList[strangeRockDialogue]);
                strangeRockDialogue++;
                break;


            default:
                break;
        }
    }
});


//$ AFFICHAGE DES OBJETCFIS $//
function displayObjectifs()
{
    document.querySelector("#lvl5-objectifs").style.visibility = "visible";
}


//$ MISE A JOUR DU NOMBRE DE STICKS $//
function updateStickNumber()
{
    // stockage du nombre
    let stickNumber = document.querySelector("#lvl5-objectifs-sticks").innerHTML;

    // modification de la valeur
    stickNumber = (stickNumber.substring(0, stickNumber.length - 4)) + sticksGathered + (stickNumber.substring(stickNumber.length - 3, stickNumber.length));
    
    // attribution de la valeur
    document.querySelector("#lvl5-objectifs-sticks").innerHTML = stickNumber;
}


//$ VERIF SI OBJECTIFS ATTEINTS $//
function updateObjectifs()
{
    // si on a le bon nombre de sticks
    if (sticksGathered === 5) document.querySelector("#lvl5-objectifs-sticks").style.textDecorationLine = "line-through";

    // si on a la poudre
    if (hasPowder) document.querySelector("#lvl5-objectifs-powder").style.textDecorationLine = "line-through";

    // si on a le fil
    if (hasString) document.querySelector("#lvl5-objectifs-string").style.textDecorationLine = "line-through";

    // si on a le briquet
    if (hasLighter) document.querySelector("#lvl5-objectifs-lighter").style.textDecorationLine = "line-through";
}