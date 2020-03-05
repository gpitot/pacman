

class Character {
    constructor(x, y, id, img) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.img = img;
    }

    move(map, newX, newY) {

        if (map[newY][newX] === 0) return false;

        if (newX < 0) {
            newX = 18;
        }

        if (newX > 18) {
            newX = 0;
        }

        this.x = newX;
        this.y = newY;
        return true;
    }

    movePossible(map, newX, newY) {
        return (map[newY][newX] !== 0);
    }
}