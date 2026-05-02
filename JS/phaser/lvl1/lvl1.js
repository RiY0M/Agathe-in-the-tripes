import { frameRate } from "../constants";

function update()
{


    //? DENTS N°1 -> 100 frames ?//
    // toute les 100 frames (2s)
    if (retractingTeethLoop % (frameRate*2) == 0) {
        // on check les dents n°1 du chemin
        movingTeeth1.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth1Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};

                // sound-effect
                music = this.sound.add("teeth");
                music.volume -= 0.3;
                music.play();
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth1Up = !isMovingTeeth1Up;
    }


    //? DENTS N°2 -> 100 frames delay ?//
    // toute les 100 frames (2s)
    if (retractingTeethLoop % (frameRate*2) == frameRate) {
        // on check les dents n°2 du chemin
        movingTeeth3.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth3Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};

                // sound-effect
                music = this.sound.add("teeth");
                music.volume -= 0.3;
                music.play();
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth3Up = !isMovingTeeth3Up;
    }


    //? DENTS N°3 -> 50 frames ?//
    // toutes les 50 frames (1s)
    if (retractingTeethLoop % frameRate == 0) {
        // on check les dents n°3 du chemin
        movingTeeth2.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth2Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};

                // sound-effect
                music = this.sound.add("teeth");
                music.volume -= 0.3;
                music.play();
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth2Up = !isMovingTeeth2Up;
    }


    //? DENTS N°4 -> ?? frames ?//
    // toutes les ? frames (?s)
    if (retractingTeethLoop % randomDelay == 0) {

        // on check les dents n°4 du chemin
        movingTeeth4.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth4Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};

                // sound-effect
                music = this.sound.add("teeth");
                music.volume -= 0.3;
                music.play();
            }

            // changement valeur aléatoire déclenchement dents n°4 
            randomDelay = Math.floor(Math.random() * (250 - 25 + 1) + 25);
        });
        // on inverse le statut haut-bas
        isMovingTeeth4Up = !isMovingTeeth4Up;
    }


    // boucle en fonction du timer de l'invincibilité allant de 0.0 à 4.9
    let timer = invicibility / 10 % 5;

    // la moitié du temps on passe en rouge
    if ((timer >= 0 && timer <= 1.25) || (timer >= 2.5 && timer <= 3.75)) agathe.setTint(0xFFFFFF);
    else agathe.setTint(0xFF0000);


    // si le lancement de l'invincibilité est lancé
    if (start3sCoolDown) {

        if (invicibility == 150) {
            // sound-effect
            music = this.sound.add("damage");
            music.play();
        }

        // on lance la décrémentation des 150 frames (150 frames = 3s)
        invicibility--;
        // on rend agathe invincible
        isInvicible = true;
    }

    // si les 3s d'invincibilité sont écoulées
    if (invicibility == 0) {
        // on enlève l'effet d'immortalité à agathe
        isInvicible = false;
        // on arrête le chorno
        start3sCoolDown = false;
        // on réinitialise le compteur de frames
        invicibility = 150;
    }

    // vérification de notre vie
    if (nbHearts == 0) displayDeathScreen();
}
