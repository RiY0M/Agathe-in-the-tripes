class Maillon
{
    // ATTRIBUTS
    _id;
    _x;
    _y;
    _velX;
    _velY;
    _anim;
    _next;

    // CONSTRUCTEUR  
    constructor(id = 0, x = 0, y = 0, velX = 0, velY = 0, anim = "", next = null) {
        
        this._id = id;
        this._x = x;
        this._y = y;
        this._velX = velX;
        this._velY = velY;
        this._anim = anim;
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

    set next(val) {
        this._next = val;
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
    ajouter(id, x, y, velX, velY, anim)
    {
        // création d'un nouveau maillon
        let nouveauMaillon = new Maillon(id, x, y, velX, velY, anim, this._head);
        // la tête est le nouveau maillon
        this._head = nouveauMaillon;

        // si le maillon après la tête est nul, la tête devient la queue
        if (this._head.next == null) this._tail = this._head;
    }

    ajouterFin(nouveauMaillon)
    {
        // la queue devient le nouveau maillon
        this._tail.next = nouveauMaillon;
        this._tail = nouveauMaillon;

        // si la tête est vide, la tête est la queue
        if (this._head === null) this._head = this._tail;
    }
  
    affichage()
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

    decalage()
    {
        // on stock les données de la tête dans une variable temporaire
        let currentHead = new Maillon(this._head.id, this._head.x, this._head.y, this._head.velX, this._head.velY, this._head.anim, null);

        // on déplace la tête vers la 2e valeur
        this._head = this._head.next;

        // on ajoute notre ancienne tête en fin de queue
        this.ajouterFin(currentHead);
    }
}


let ratPath = new ListeChainee();

ratPath.ajouter(10, 150, 100, -200, 0, "left-rat");
ratPath.ajouter(9, 550, 100, 200, -200, "up-rat");
ratPath.ajouter(8, 350, 300, 0, -200, "up-rat");
ratPath.ajouter(7, 350, 350, -200, 0, "left-rat");
ratPath.ajouter(6, 500, 350, 0, 200, "down-rat");
ratPath.ajouter(5, 500, 250, -200, 0, "left-rat");
ratPath.ajouter(4, 650, 250, -200, -200, "up-rat");
ratPath.ajouter(3, 700, 300, 0, -200, "up-rat");
ratPath.ajouter(2, 700, 500, 200, 0, "right-rat");
ratPath.ajouter(1, 250, 500, 200, 200, "right-rat");
ratPath.ajouter(0, 150, 400, 0, 200, "down-rat");