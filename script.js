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

snake.insertFirst({x: 26, y: 30});
snake.insertFirst({x: 25, y: 30});
snake.insertFirst({x: 24, y: 30});
snake.insertFirst({x: 23, y: 30});
snake.insertFirst({x: 22, y: 30});
snake.insertFirst({x: 21, y: 30});
snake.insertFirst({x: 20, y: 30});

snake.printList();

for (let i = 0; i < snake.size; i++) {
    let coord = snake.getAt(i);
    console.log("coordinate: " + coord.x + ", " + coord.y);
    
}
