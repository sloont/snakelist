

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

createGameboard();

const gridlinesBtn = document.getElementById("gridlinesBtn");
gridlinesBtn.addEventListener("click", () => {
    document.getElementById("game").classList.toggle("no-grid");
});

const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () => {
    resetGame();
    const game = new Game(new Snake());
    game.playGame();
});


