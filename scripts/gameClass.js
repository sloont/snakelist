class Game {
    constructor(snake) {
        this.snake = snake;
        
        this.direction = "down";
        this.timeout = 250;
        this.score = 0;
        this.refreshCount = 0;
        
        this.gameover = false;
        
    }

    createSnake = () => {
        this.snake.unshift({x: 14, y: 11});
        this.snake.unshift({x: 14, y: 12});
        this.snake.unshift({x: 14, y: 13});
        this.snake.unshift({x: 14, y: 14});
    }

    displaySnake = () => {
        
        if (this.snake.size >= 56) {
            for (let i = 0; i < this.snake.size; i++) {

                let coord = this.snake.coordAt(i);
                let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);

                snakePiece.classList.add("snake");
                snakePiece.classList.remove(snakePiece.classList.item(2)); //we really only need this for i = 57 but browser should ignore after
                snakePiece.classList.add("green-snake");
                
            }

        } else {

            for (let i = 0; i < this.snake.size; i++) {
                
                let coord = this.snake.coordAt(i);
                let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);
                

                snakePiece.classList.add("snake");
                snakePiece.classList.remove(snakePiece.classList.item(2));
                snakePiece.classList.add("snake" + Math.floor(i/7));
                
            }
            
            
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
        
        } while (food.classList.contains("snake") || (coord.x == 14 && coord.y == 11));
        
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
        oldTail.classList.remove(oldTail.classList.item(1));
        this.snake.pop();
    }

    updateScore = () => {
        const scorePoints = document.getElementById("score-points");
        if (this.snake.size === 4) {
            return scorePoints.textContent = this.score;
        }
        
        this.score = (this.snake.size * this.snake.size) * 53 - this.refreshCount;
        if (document.getElementById("game").classList.contains("no-grid")) {
            return scorePoints.textContent = Math.floor(this.score * 1.5);
        }

        return scorePoints.textContent = this.score;
    }

    growSnake = (next) => { //call nextLocation() as the parameter
        const nextPixel = document.getElementById("x" + next.x + "y" + next.y);
        this.snake.unshift(next);
        nextPixel.classList.remove("food");
        this.updateScore();
    }

    deadSnake = () => {
        for (let i = 0; i < this.snake.size; i++) {
            setTimeout(() => {
                let coord = this.snake.coordAt(i);
    
                let snakePiece = document.getElementById("x" + coord.x + "y" + coord.y);
                snakePiece.classList.remove("snake");
                snakePiece.classList.remove(snakePiece.classList.item(1));
                snakePiece.classList.add("dead-snake");
                
                
            }, 200);
            
        }
        setTimeout(() => {
            const gameOver = document.getElementById("game-over");
            gameOver.classList.add("visible");
            document.getElementById("resetBtn").disabled = false;
        }, 800)

        this.gameover = true;
    }
    
    refresh = () => {
        
        //save the object with the next location coords (NOT A NODE)
        const next = this.nextLocation();
        
        //end game if you go out of bounds
        if (next.x === 30 || next.y === 30 || next.x === -1 || next.y === -1) {
            this.deadSnake();
            return;
        }

        if (this.snake.size > 5 && this.snake.size <= 10) {
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
            this.updateScore();

        } else if (nextPixel.classList.contains("snake")) {
            //this.moveSnake(next); do we need this?
            this.deadSnake();
            this.updateScore();
            return;

        } else {
            this.moveSnake(next);
        }

        this.displaySnake();
        this.refreshCount++;
        

        return setTimeout(() => {this.refresh()}, this.timeout);
    }

    listener = (e) => {

        const next = this.nextLocation();

        if (this.gameover == true) {
            document.removeEventListener("keydown", this.listener);
        }

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
    }

    playGame = () => {

        this.score = 0;
        this.gameover = false;
        
        this.createSnake();
        this.placeFood();
        this.displaySnake();

        document.addEventListener("keydown", this.listener);

        setTimeout(() => {this.refresh()}, this.timeout);

        //this doesn't work it fires at the beginning of the game
        //console.log("Good Job! Your score was " + this.score);
        
    }
    
}

