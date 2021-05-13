

const createGameboard = () => {
    
    const gameboard = document.getElementById("game");
    let countX = 0;
    let countY = 0;

    let pixel = document.createElement("div");

    pixel.classList.add("pixel");
    pixel.id = "x" + countX + "y" + countY;
    gameboard.appendChild(pixel);

    for (let i = 1; i < (30*30); i++) {
        
        const pixel = document.createElement("div");

        countX++;

        if (i !== 0 && i % 30 === 0) {
            countY++;
            countX = 0;
        }
        pixel.classList.add("pixel");
        pixel.id = "x" + countX + "y" + countY;
        gameboard.appendChild(pixel);

    }
    
    
};

const resetGame = () => {
    
    document.getElementById("game").textContent = '';
    try {
        document.getElementById("game-over").classList.remove("visible");
    } catch (TypeError) {};
    
    createGameboard();
    
};

const disableButtons = () => {
    const buttons = document.getElementsByTagName("button");
    for (let each of buttons) {
        each.disabled = true;
    }
}

const enableButtons = () => {
    const buttons = document.getElementsByTagName("button");
    for (let each of buttons) {
        each.disabled = false;
    }
}

createGameboard();

const gridlinesBtn = document.getElementById("gridlinesBtn");
gridlinesBtn.addEventListener("click", () => {
    const game = document.getElementById("game");
    game.classList.toggle("no-grid");
    if (game.classList.contains("no-grid")) {
        document.getElementsByClassName("score-header")[0].textContent += " x 1.5";
    } else {
        document.getElementsByClassName("score-header")[0].textContent = "SCORE";
    }
});

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () => {
    resetGame();
    const game = new Game(new Snake());
    disableButtons();
    game.playGame();
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    enableButtons();
    document.getElementById("score-points").textContent = 0;
});

