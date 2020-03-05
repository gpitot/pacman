class Map {

    constructor(map, canvas, pacman) {
        this.map = map;
        this.pacman = pacman;
        this.ghosts = [];
        this.gameOver = false;

        this.square = {
            width: 40, 
            height: 40
        }
        this.dot = {
            small : 4,
            big : 10
        }

        canvas.width = map[0].length * this.square.width;
        canvas.height = (map.length * this.square.height) + 100; //for score
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.font = "24px Arial";
    }


    addGhost(ghost) {
        this.ghosts.push(ghost);
    }

    makeMove(e) {
        if (this.gameOver) return;
        //move pacman
        //move ghosts
        this.pacman.setDirection(e.key);       
    }


    moveTimer() {

        const timer = setInterval(()=> {
            if (this.gameOver) {
                clearInterval(timer);
            }
            
            this.drawTile(this.pacman.x, this.pacman.y, null);
            this.pacman.move(this.map, this.pacman.direction);
            this.drawTile(this.pacman.x, this.pacman.y, this.pacman);
            this.checkFood();
            this.displayScore();
            

            this.ghosts.forEach((ghost) => {

                if (ghost.checkCollision(this.pacman)) {
                    if (this.pacman.energy) {
                        ghost.x = ghost.origin.x;
                        ghost.y = ghost.origin.y;
                    } else {
                        this.displayEndScreen();
                    }
                }
                
                this.drawTile(ghost.x, ghost.y, null);
                ghost.move(this.map, this.pacman);
                this.drawTile(ghost.x, ghost.y, ghost);
    
                if (ghost.checkCollision(this.pacman)) {
                    if (this.pacman.energy) {
                        ghost.x = ghost.origin.x;
                        ghost.y = ghost.origin.y;
                    } else {
                        this.displayEndScreen();
                    }
                }
            });
        }, 400);
        
    }

    checkFood() {
        const pacmanPos = this.map[this.pacman.y][this.pacman.x]
        if (pacmanPos === 2 || pacmanPos === 3) {
            this.map[this.pacman.y][this.pacman.x] = 1;
        }
    }

    

    



    drawTile(x, y, char=null) {
        if (char===null) {
            const digit = this.map[y][x];
            if (digit === 0) {
                this.ctx.fillStyle = "lightblue";

                if (this.gameOver) {
                    this.ctx.fillStyle = "red";
                }

                this.ctx.fillRect(x*this.square.width, y*this.square.width, this.square.width, this.square.height);
                return;
            }
            if (digit === 1) {
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(x*this.square.width, y*this.square.height, this.square.width, this.square.height);
                return;
            }
            if (digit === 2) {
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(x*this.square.width, y*this.square.height, this.square.width, this.square.height);
        
                this.ctx.fillStyle = "white";
                this.ctx.beginPath();
                this.ctx.arc(x*this.square.width + (this.square.width / 2), y*this.square.height + (this.square.height / 2), this.dot.small, 0, 2 * Math.PI, false);
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                return;
            }
            if (digit === 3) {
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(x*this.square.width, y*this.square.height, this.square.width, this.square.height);
        
                this.ctx.fillStyle = "white";
                this.ctx.beginPath();
                this.ctx.arc(x*this.square.width + (this.square.width / 2), y*this.square.height + (this.square.height / 2), this.dot.big, 0, 2 * Math.PI, false);
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                return;
            }
        }

        if (char.rotation !== undefined) {
            
            const center = {
                x : (x*this.square.width + (this.square.width/2)),
                y : (y*this.square.height + (this.square.height/2)),
            }
            
            
            this.ctx.save();
            this.ctx.translate(center.x, center.y);
            this.ctx.rotate(char.rotation * (Math.PI/180));

            this.ctx.drawImage(char.img, -(this.square.width / 2), -(this.square.height / 2), this.square.width, this.square.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(char.img, x*this.square.width, y*this.square.height, this.square.width, this.square.height);
        }
        
        
        return;
    }

    drawMap() {
        for (let y =0; y<this.map.length;y++) {
            for (let x =0;x<this.map[y].length;x++) {
                this.drawTile(x, y);
            }
        }

        this.drawTile(this.pacman.x, this.pacman.y, this.pacman);
        this.ghosts.forEach((ghost) => {
            this.drawTile(ghost.x, ghost.y, ghost);
        });

        this.displayScore();
    }


    displayScore() {
        const score = this.pacman.score;
        const width = this.canvas.width;
        
        
        this.ctx.clearRect(0, this.canvas.height - 100, width, 100);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score: ${score}`, 15, this.canvas.height - 55);
    }


    displayEndScreen() {
        this.gameOver = true;
        this.drawMap();

    }

}