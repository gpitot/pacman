



const canvas = document.querySelector('canvas');



const img_urls = [
    [4, 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c314.png'],
    [5, 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c314.png'],
    [6 , 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c314.png'],
    [7 , 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c314.png'],
    [8 , './pacman.png'],
    [9, './pacman_open.png'],
    [10, './pacman_angry.png'],
    [11, './pacman_open_angry.png']
];

let imgs = {};
let loadedImages = 0;
img_urls.forEach((url) => {
    let img = new Image();
    img.src = url[1];

    imgs[url[0]] = img;

    img.onload = function() {
        loadedImages += 1;
        if (loadedImages === img_urls.length - 1) {
            beginGame();
        }
    }

});


const map_area = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 3, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0],
    [1, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0],
    [1, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 3, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];





function beginGame() {
  
    let map = new Map(map_area, canvas, new Pacman(9, 3, 8, [imgs['8'], imgs['9'], imgs['10'], imgs['11']]));
    map.addGhost(new Ghost (1, 1, 4, imgs['4']));
    map.addGhost(new Ghost (17, 1, 5, imgs['5']));
    map.addGhost(new Ghost (17, 17, 6, imgs['6']));
    map.addGhost(new Ghost (1, 17, 7, imgs['7']));
    
    map.drawMap();
    map.moveTimer();

    document.addEventListener('keydown', function(e) {map.makeMove(e)}); 
}   



/*
0 is wall
1 is space
2 is small dot
3 is big dot

4 is red ghost
5 is blue ghost
6 is yellow ghost
7 is pink ghost

8 is pacman
*/




