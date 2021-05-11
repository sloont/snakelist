class Game {
    constructor(snake) {
        this.snake = snake;
        this.gameboard = document.getElementById("game");
        this.direction = "down";
        this.timeout = 1000;
        
    }

    createGameboard = () => {
        let countX = 0;
        let countY = 0;

        for (let i = 0; i < (40*40); i++) {
            
            const pixel = document.createElement("div");

            countX++;
            if (i !== 0 && i % 40 === 0) {
                countY++;
                countX = 0;
            }
            
            pixel.classList.add("pixel");
            pixel.id = "x" + countX + "y" + countY;
            this.gameboard.appendChild(pixel);

            
        }
    }

    createSnake = () => {
        this.snake.unshift({x: 19, y: 16});
        this.snake.unshift({x: 19, y: 17});
        this.snake.unshift({x: 19, y: 18});
        this.snake.unshift({x: 19, y: 19});
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
        let randX = Math.floor(Math.random() * 40);
        let randY = Math.floor(Math.random() * 40);
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
    
    refresh = () => {
            
            

        console.log(this.timeout);
        
        //save the object with the next location coords (NOT A NODE)
        const next = this.nextLocation();
        
        //end game if you go out of bounds
        if (next.x === 40 || next.y === 40 || next.x === -1 || next.y === -1) {
            console.log("you lose!");
            return setTimeout(() => {this.refresh()}, this.timeout);
        }

        if (this.snake.size > 4) {
            this.timeout = 300;
        }

        //find the pixel in the gameboard with the matching id
        const nextPixel = document.getElementById("x" + next.x + "y" + next.y);

        //currently end game based on snake size
        if (this.snake.size >= 8) {
            
            return setTimeout(() => {this.refresh()}, this.timeout);
        }

        //if the next pixel is food
        if (nextPixel.classList.contains("food")) {
            this.growSnake(next);
            this.placeFood();

        } else {
            this.moveSnake(next);
        }

        this.displaySnake();

        return setTimeout(() => {this.refresh()}, this.timeout);
    }

    playGame = () => {
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

        setTimeout(() => {this.refresh()}, 1000);

        
    }
    
}

const game = new Game(new Snake());
game.createGameboard();
game.createSnake();
game.placeFood();
game.displaySnake();

game.playGame();