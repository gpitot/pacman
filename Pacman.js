

class Pacman extends Character {
    constructor(x, y, id, sprites) {
        super(x, y, id, sprites[0]);

        this.score = 0;
        this.sprites = {
            normal : [sprites[0], sprites[1]],
            angry : [sprites[2], sprites[3]]
        };
        this.animIndex = 0;
        this.rotation = 0;
        this.energy = false;

        this.direction = 'd';
        
    }

    setDirection(key) {
        this.direction = key;
    }


    move(map, key) {
        let newX = this.x;
        let newY = this.y;

        if (key === 'w') {
            newY -= 1;
            this.rotation = 270;
        } else if (key==='s') {
            newY += 1;
            this.rotation = 90;
        } else if (key === 'a') {
            newX -= 1;
            this.rotation = 180;
        } else if (key === 'd') {
            newX += 1;
            this.rotation = 0;
        }

        

        if (super.move(map, newX, newY)) {
            this.animIndex += 1;
            if (this.animIndex >= this.sprites.normal.length) {
                this.animIndex = 0;
            }

            if (this.energy) {
                this.img = this.sprites.angry[this.animIndex];
            } else {
                this.img = this.sprites.normal[this.animIndex];
            }
            
        }

       
        
        if (map[newY][newX] === 2) {
            this.score += 1;
            return;
        }

        if (map[newY][newX] === 3) {
            this.score += 10;
            this.setEnergy();
            return;
        }
        //check if it equals a ghost here
    }

   


    setEnergy() {
        this.energy = true;
        setTimeout(() => {
            this.energy = false;
        }, 3000);
    }
}