

class Ghost extends Character {
    constructor(x, y, id, img) {
        super(x, y, id, img);
        this.currentDirection = 0;
        this.origin = {
            x : x,
            y : y
        }
    }


    move(map, pacman) {
        //ghost moves in random direction, preferring that of getting nearer to pacman

        //get possible movmenets

        //up, down, left, right

        let directions = [];
        let prefer = 5;

        if (super.movePossible(map, this.x, this.y+1)) {
            directions.push(0);

            if (this.y < pacman.y && !pacman.energy) {
                this.pushChoices(directions, 0, prefer);
            }

            if (this.currentDirection === 0) {
                this.pushChoices(directions, 0, prefer);
            }  
        } 

        if (super.movePossible(map, this.x, this.y-1)) {
            directions.push(1);

            if (this.y > pacman.y && !pacman.energy) {
                this.pushChoices(directions, 1, prefer);
            }

            if (this.currentDirection === 1) {
                this.pushChoices(directions, 1, prefer);
            }
        } 

        if (super.movePossible(map, this.x-1, this.y)) {
            directions.push(2);

            if (this.x > pacman.x && !pacman.energy) {
                this.pushChoices(directions, 2, prefer);
            }

            if (this.currentDirection === 2) {
                this.pushChoices(directions, 2, prefer);
            }
        } 

        if (super.movePossible(map, this.x+1, this.y)) {
            directions.push(3);

            if (this.x < pacman.x && !pacman.energy) {
                this.pushChoices(directions, 3, prefer);
            }

            if (this.currentDirection === 3) {
                this.pushChoices(directions, 3, prefer);
            }
        } 
        

        const choice = directions[Math.floor(Math.random()*directions.length)];
        let newX = this.x;
        let newY = this.y;
        switch (choice) {
            case 0: 
                newY = this.y + 1;
                break;

            case 1: 
                newY = this.y - 1;
                break;

            case 2: 
                newX = this.x - 1;
                break;

            case 3: 
                newX = this.x + 1;
                break;
        }
        
        super.move(map, newX, newY);
        this.currentDirection = choice;
    }

    checkCollision(pacman) {
        return (this.x === pacman.x && this.y === pacman.y);
    }



    pushChoices(arr, choice, num) {
        for (let i=0;i<num;i++) {
            arr.push(choice);
        }
    }
}