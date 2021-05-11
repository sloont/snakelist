class Game {
    constructor(snake) {
        this.snake = snake;
        this.gameboard = document.getElementById("game");
        this.direction = "down";
        this.timeout = 400;
        
    }

    createGameboard = () => {
        let countX = 0;
        let countY = 0;

        let pixel = document.createElement("div");

        pixel.classList.add("pixel-white");
        pixel.id = "x" + countX + "y" + countY;
        this.gameboard.appendChild(pixel);

        for (let i = 1; i < (30*30); i++) {
            
            const pixel = document.createElement("div");

            countX++;

            if (i !== 0 && i % 30 === 0) {
                countY++;
                countX = 0;
            }
            if (countY % 2 === 0) {

                if (i % 2 === 0) {
                    pixel.classList.add("pixel-white");
                } else {
                    pixel.classList.add("pixel-gray");
                }
            } else {

                if (i % 2 === 0) {
                    pixel.classList.add("pixel-gray");
                } else {
                    pixel.classList.add("pixel-white");
                }
            }

            
            pixel.id = "x" + countX + "y" + countY;
            this.gameboard.appendChild(pixel);

            
        }
    }

    createSnake = () => {
        this.snake.unshift({x: 14, y: 11});
        this.snake.unshift({x: 14, y: 12});
        this.snake.unshift({x: 14, y: 13});
        this.snake.unshift({x: 14, y: 14});
    }

    displaySnake = () => {
        for (let i = 0; i < this.snake.size; i++) {

            let coord = this.snake.coordAt(i);
            //console.log("coordinate: " + coord.x + ", " + coord.y);

            let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);
            snakePiece.classList.add("snake");
        }
    }

    randomCoord = () => {
        let randX = Math.floor(Math.random() * 30);
        let randY = Math.floor(Math.random() * 30);
        return {x: randX, y: randY};
    }

    placeFood = () => {
        let food, coord;

        //reroll food if within snake
        do {
            console.log("placed new food");
            coord = this.randomCoord();
            food = document.getElementById("x" + coord.x + "y" + coord.y);
        
        } while (food.classList.contains("snake"));
        
        food.classList.add("food");
    }

    nextLocation = () => {
        if (this.direction == "up") {
            return {x: this.snake.head.coord.x, y: this.snake.head.coord.y - 1}
        }
        if (this.direction == "right") {
            return {x: this.snake.head.coord.x + 1, y: this.snake.head.coord.y}
        }
        if (this.direction == "down") {
            return {x: this.snake.head.coord.x, y: this.snake.head.coord.y + 1}
        }
        if (this.direction == "left") {
            return {x: this.snake.head.coord.x - 1, y: this.snake.head.coord.y}
        }
    }

    moveSnake = (next) => { //call nextLocation() as the parameter
        this.snake.unshift(next);
        const oldTail = document.getElementById("x" + this.snake.tail.coord.x + "y" + this.snake.tail.coord.y);
        oldTail.classList.remove("snake");
        this.snake.pop();
    }

    growSnake = (next) => { //call nextLocation() as the parameter
        const nextPixel = document.getElementById("x" + next.x + "y" + next.y);
        this.snake.unshift(next);
        nextPixel.classList.remove("food");
    }

    deadSnake = () => {
        for (let i = 0; i < this.snake.size; i++) {

            let coord = this.snake.coordAt(i);
            //console.log("coordinate: " + coord.x + ", " + coord.y);

            let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);
            snakePiece.classList.remove("snake");
            snakePiece.classList.add("dead-snake");
        }
    }
    
    refresh = () => {
        
        //save the object with the next location coords (NOT A NODE)
        const next = this.nextLocation();
        
        //end game if you go out of bounds
        if (next.x === 30 || next.y === 30 || next.x === -1 || next.y === -1) {
            this.deadSnake();
            console.log("you lose!");
            return;
        }

        if (this.snake.size > 4 && this.snake.size <= 7) {
            this.timeout = 300;
        }

        if (this.snake.size > 7 && this.snake.size <= 10) {
            this.timeout = 200;
        }

        if (this.snake.size > 10 && this.snake.size <= 16) {
            this.timeout = 150;
        }

        if (this.snake.size > 16) {
            this.timeout = 100;
        }

        

        //find the pixel in the gameboard with the matching id
        const nextPixel = document.getElementById("x" + next.x + "y" + next.y);

        //if the next pixel is food
        if (nextPixel.classList.contains("food")) {
            this.growSnake(next);
            this.placeFood();

        } else if (nextPixel.classList.contains("snake")) {
            this.moveSnake(next);
            this.deadSnake();
            console.log("you lose!");
            return;
        } else {
            this.moveSnake(next);
        }

        this.displaySnake();

        return setTimeout(() => {this.refresh()}, this.timeout);
    }

    playGame = () => {
        this.createGameboard();
        this.createSnake();
        this.placeFood();
        this.displaySnake();

        document.addEventListener("keydown", e => {
            const next = this.nextLocation();

            if (e.key == 'w' && next.x !== this.snake.head.coord.x) {
                this.direction = "up";
                console.log("up");
            }
            if (e.key == 's' && next.x !== this.snake.head.coord.x) {
                this.direction = "down";
                console.log("down");
            }
            if (e.key == 'a' && next.y !== this.snake.head.coord.y) {
                this.direction = "left";
                console.log("left");
            }
            if (e.key == 'd' && next.y !== this.snake.head.coord.y) {
                this.direction = "right";
                console.log("right");
            }
        });

        setTimeout(() => {this.refresh()}, this.timeout);

        
    }
    
}

const game = new Game(new Snake());
game.playGame();