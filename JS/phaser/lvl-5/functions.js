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


//% FONCTION DIALOGUE MINEUR %//
function dialogueWithMinor(scene, agathe)
{
    // vérification des coordonnées
    if ((agathe.x >= 0 && agathe.x <= 65) && (agathe.y >= 150 && agathe.y <= 200))
    {
        // on regarde si on a déjà parlé au vieux pour lancer le premier dialogue
        if (dialogueMinor == 0)
        {
            // on indique à qui on parle
            talkingTo = "minor";

            // changement de l'image et du texte
            changeImgTextDialogue("../../../img/assets/angry-minor-pickaxe.png", dialogueMinorList[0]);

            // affichage de la zone de dialogue
            displayTextArea(dialogueArea);

            // on passe au dialogue suivant
            dialogueMinor++;
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
    if (event.key === 'Enter' && isDialogueAreaDisplayed === true && dialogueMinor !== 5) {

        switch (talkingTo) {

            //% DIALOGUE VIEUX %//
            case "oldOnPoop":
                // si on arrive au dernier dialogue on ferme la zone d'affichage
                if (dialogueOldPoop === oldDialogueList.length) {

                    dialogueArea.style.visibility = "hidden";
                    isDialogueAreaDisplayed = false;

                    // on enlève les bordures noires
                    blackBorders.children.entries.forEach(border => {
                        border.disableBody(true, true);
                    });
                    document.querySelector("#game-canvas").style.backgroundColor = "#36393e";

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


            //% DIALOGUE MINEUR %//
            case "minor":
                
                // si on arrive au dernier dialogue on ferme la zone d'affichage
                if (dialogueMinor === dialogueMinorList.length && hasPickaxe === true) {

                    dialogueArea.style.visibility = "hidden";
                    isDialogueAreaDisplayed = false;
                }

                // on passe au dialogue suivant
                changeImgTextDialogue("../../../img/assets/angry-minor-pickaxe.png", dialogueMinorList[dialogueMinor]);
                dialogueMinor++;


                // on ajoute un eventListener au moment ou le choix de dialogue est affiché
                if (dialogueMinor == 5) {

                    //$ CHANGEMENT IMG SKIP $//
                    document.querySelector("#enter-key").src = "../../../img/mouse.png";

                    //$ CHECK SI ON CLIQUE SUR UNE DES PROPOSITIONS DU MINEUR $//
                    let answer1 = document.querySelector(".minor-answer-1");        // réponse 1
                    let answer2 = document.querySelector(".minor-answer-2");        // réponse 2

                    // action click réponse 1 (mauvaise réponse)
                    answer1.addEventListener("click", () => {
                        // on perd une vie
                        nbHearts--;
                        reloadNbHearts();

                        // changement du texte
                        dialogueMinorList[5] = "Hein ? Tu te fiches de moi ?<br>T'as pas du bien comprendre la question, je vais te la reposer...";
                        
                        // changement visuel de texte
                        changeImgTextDialogue("../../../img/assets/angry-minor-pickaxe.png", dialogueMinorList[dialogueMinor]);

                        // on repose la question
                        dialogueMinor = 4;

                        // changement image skip
                        displayEnterKey();
                    });

                    // action click réponse 2 (bonne réponse)
                    answer2.addEventListener("click", () => {
                        // changement du texte
                        dialogueMinorList[5] = "Ah oui oui oui oui oui !<br>Bien trouvé gamine !<br>Tiens, tu as mérité ma pioche !";

                        // changement visuel de texte
                        changeImgTextDialogue("../../../img/assets/angry-minor-pickaxe.png", dialogueMinorList[dialogueMinor]);
                        dialogueMinor++;

                        // changement image skip
                        displayEnterKey();

                        // on donne la pioche au joueur
                        hasPickaxe = true;
                    });
                }
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


//$ CHANGEMENT IMG SKIP VERSION CLASSIQUE $//
function displayEnterKey()
{
    document.querySelector("#enter-key").src = "../../../img/enter-key.png";
}