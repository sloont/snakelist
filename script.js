let direction = "right";
let snakeHead = {x: 26, y: 30};
let mostRecent;

let countX = 0;
let countY = 0;

for (let i = 0; i < (40*40); i++) {
    const game = document.getElementById("game");
    const pixel = document.createElement("div");

    countX++;
    if (i !== 0 && i % 40 === 0) {
        countY++;
        countX = 0;
    }
    
    pixel.classList.add("pixel");
    pixel.id = "x" + countX + "y" + countY;
    game.appendChild(pixel);

    
}

const snake = new LinkedList();



snake.printList();


const displaySnake = (linkedList) => {
    for (let i = 0; i < linkedList.size; i++) {
        let coord = linkedList.getAt(i);
        console.log("coordinate: " + coord.x + ", " + coord.y);
        let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);
        snakePiece.classList.add("snake");
    }
    
}

//The tail of the snake is the head of the linked list
//The head of the snake we should be able to keep track of without a doubly linked list.
/////////////We should always know the data in the head of the snake because of the player controls
/////////////We just keep track of the coordinate entry

const initSnake = (linkedList) => {
    linkedList.insertFirst({x: 26, y: 30});
    linkedList.insertFirst({x: 25, y: 30});
    linkedList.insertFirst({x: 24, y: 30});
    linkedList.insertFirst({x: 23, y: 30});
    linkedList.insertFirst({x: 22, y: 30});
    linkedList.insertFirst({x: 21, y: 30});
    linkedList.insertFirst({x: 20, y: 30});
}

const growSnake = (linkedList, coord) => {
    linkedList.insertLast(coord);
}

const moveSnake = (linkedList, coord) => {
    linkedList.insertLast(coord);
    let oldHead = linkedList.head.data;
    let removeSnake = document.getElementById("x"+ oldHead.x + "y" + oldHead.y);
    removeSnake.classList.remove("snake");
    linkedList.removeAt(0);
}

const randomCoord = () => {
    let randX = Math.floor(Math.random() * 40);
    let randY = Math.floor(Math.random() * 40);
    return {x: randX, y: randY};
}

const placeFood = () => {
    let food, coord;
    
    //reroll food if within snake
    do {

        console.log("placed new food");
        coord = randomCoord();
        food = document.getElementById("x" + coord.x + "y" + coord.y);

    } while (food.classList.contains("snake"));

    food.classList.add("food");
}

const nextCoord = (coord, direct) => {
    mostRecent = snakeHead;

    if (direct == "right") {
        return snakeHead = {x: coord.x + 1, y: coord.y}
    }
    if (direct == "up") {
        return snakeHead = {x: coord.x, y: coord.y - 1}
    }
    if (direct == "down") {
        return snakeHead = {x: coord.x, y: coord.y + 1}
    }
    if (direct == "left") {
        return snakeHead = {x: coord.x - 1, y: coord.y}
    }
}

const playGame = (linkedList) => {
    setInterval(() => {
        moveSnake(linkedList, nextCoord(snakeHead, direction));
        displaySnake(linkedList);
        console.log(snakeHead);
    }, 2000);
}

document.addEventListener("keydown", (e) => {
    if (e.key == 'w' && snakeHead.x !== (mostRecent.x)) {
        direction = "up";
        console.log("up");
    }
    if (e.key == 's' && snakeHead.x !== (mostRecent.x)) {
        direction = "down";
        console.log("down");
    }
    if (e.key == 'a' && snakeHead.y !== (mostRecent.y)) {
        direction = "left";
        console.log("left");
    }
    if (e.key == 'd' && snakeHead.y !== (mostRecent.y)) {
        direction = "right";
        console.log("right");
    }
})

initSnake(snake);
displaySnake(snake);
placeFood();
playGame(snake);


