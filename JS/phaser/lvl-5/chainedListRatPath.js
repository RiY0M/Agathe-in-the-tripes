class Maillon
{
    // ATTRIBUTS
    _id;
    _x;
    _y;
    _velX;
    _velY;
    _anim;
    _prev;
    _next;

    // CONSTRUCTEUR  
    constructor(id = 0, x = 0, y = 0, velX = 0, velY = 0, anim = "", prev = null, next = null) {
        
        this._id = id;
        this._x = x;
        this._y = y;
        this._velX = velX;
        this._velY = velY;
        this._anim = anim;
        this._prev = prev;
        this._next = next;
    }

    // GETTERS
    get id() {
        return this._id;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get velX() {
        return this._velX;
    }

    get velY() {
        return this._velY;
    }

    get anim() {
        return this._anim;
    }

    get prev() {
        return this._prev;
    }

    get next() {
        return this._next;
    }

    // SETTERS
    set id(val) {
        this._id = val;
    }

    set x(val) {
        this._x = val;
    }

    set y(val) {
        this._y = val;
    }

    set velX(val) {
        this._velX = val;
    }

    set velY(val) {
        this._velY = val;
    }

    set anim(val) {
        this._anim = val;
    }

    set prev(val) {
        this._prev = val;
    }

    set next(val) {
        this._next = val;
    }

    // METHODES
    switchAnim()
    {
        switch (this._anim) {

            case "left-rat":
                return "right-rat";

            case "right-rat":
                return "left-rat";

            case "up-rat":
                return "down-rat";

            case "down-rat":
                return "up-rat"
        
            default:
                break;
        }
    }
}
  
  
class ListeChainee
{
    // ATTRIBUTS
    _head;
    _tail;

    // GETTERS
    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    // SETTERS
    set head(val) {
        this._head = val;
    }

    set tail(val) {
        this._tail = val;
    }
    
    // METHODES
    estVide()
    {
        // La liste est vide si la tête vaut null
        return this._head == null;
    }

    ajouter(id, x, y, velX, velY, anim)
    {
        // liste vide : tete et fin correspondent au nouveau maillon
        if (this.estVide())
        {
            let nouveauMaillon = new Maillon(id, x, y, velX, velY, anim);
            this._head = nouveauMaillon;
            this._tail = this._head;
        }

        // liste non-vide : nouveau maillon se place en tete
        else
        {
            // création d'un nouveau maillon
            let nouveauMaillon = new Maillon(id, x, y, velX, velY, anim, null, this._head);
            // la tête est le nouveau maillon
            this._head.prev = nouveauMaillon;
            this._head = nouveauMaillon;
        }
    }

    ajouterFin(nouveauMaillon)
    {
        // liste vide : tete et fin correspondent au nouveau maillon
        if (this.estVide())
        {
            this._tail = nouveauMaillon;
            this._head = this._tail;
        }

        // liste non-vide : nouveau maillon se place en tete
        else
        {
            //attribution d'un prev et next
            nouveauMaillon.prev = this._tail;
            nouveauMaillon.next = null;

            // la queue est le nouveau maillon
            this._tail.next = nouveauMaillon;
            this._tail = nouveauMaillon;
        }
    }
  
    affichageLog()
    {
        // le premier maillon est la tête
        let current = this._head;

        while (current != null) {

            // affichage des valeurs du maillon
            console.log("{id: ", current.id, ", x: ", current.x, ", y: ", current.y, ", velX: ", current.velX, ", velY: ", current.velY, ", anim: ", current.anim, '}');
            // on regarde le maillon d'après
            current = current.next;
        }
    }

    affichageGraph()
    {
        // graphique
        let graph = "";
        let row = "";

        // le premier maillon est la tête
        let current = this._head;

        while (current != null) {

            if (current.id < 10) row += "+---+     "
            else row += "+----+     ";
            
            // affichage de l'id du maillon
            graph += "| " + current.id + " | <-> ";

            // on regarde le maillon d'après
            current = current.next;
        }

        console.log(' ' + row, '\n', graph.slice(0, -4), '\n', row);
    }

    decalage()
    {
        // on stock les données de la tête dans une variable temporaire
        let currentHead = new Maillon(this._head.id, this._head.x, this._head.y, this._head.velX, this._head.velY, this._head.anim, this._tail, null);

        // on déplace la tête vers la 2e valeur
        this._head = this._head.next;
        this._head.prev = null;

        // on ajoute notre ancienne tête en fin de queue
        this.ajouterFin(currentHead);
    }

    // inversedDecalage()
    // {
    //     // on stock les données de la queue dans une variable temporaire
    //     let currentTail = new Maillon(this._tail.id, this._tail.x, this._tail.y, this._tail.velX, this._tail.velY, this._tail.anim, null);

    //     // on déplace la queue vers la 2e valeur
    //     this._head = this._tail.next;

    //     // on ajoute notre ancienne queue en tête
    //     this.ajouter(currentTail);
    // }

    // switchOrder()
    // {
    //     // création d'une nouvelle liste chainée
    //     let inversedRathPath = new ListeChainee();

    //     // on regarde le premier maillon (la tête)
    //     let current = this._head;

    //     while (current != null) {
    //         // ajout du nouveau maillon
    //         inversedRathPath.ajouter(current.id, this._tail.x, this._tail.y, current.velX * (-1), current.velY * (-1), current.switchAnim());

    //         // on regarde le maillon d'après
    //         current = current.next;
    //     }

    //     return inversedRathPath;
    // }
}


let ratPath = new ListeChainee();

ratPath.ajouter(11, 150, 100, -200, 0, "left-rat");
ratPath.ajouter(10, 550, 100, 200, -200, "up-rat");
ratPath.ajouter(9, 350, 300, 0, -200, "up-rat");
ratPath.ajouter(8, 350, 350, -200, 0, "left-rat");
ratPath.ajouter(7, 500, 350, 0, 200, "down-rat");
ratPath.ajouter(6, 500, 250, -200, 0, "left-rat");
ratPath.ajouter(5, 650, 250, -200, -200, "up-rat");
ratPath.ajouter(4, 700, 300, 0, -200, "up-rat");
ratPath.ajouter(3, 700, 400, 200, -200, "up-rat");
ratPath.ajouter(2, 600, 500, 200, 0, "right-rat");
ratPath.ajouter(1, 250, 500, 200, 200, "right-rat");
ratPath.ajouter(0, 150, 400, 0, 200, "down-rat");

ratPath.decalage();
ratPath.affichageGraph();