const gameOver = '<div id="game-over"><div class="opacity-background"><div class="game-over-text">YOU  DIED</div></div></div>';

const createGameboard = () => {
    
    const gameboard = document.getElementById("game");
    let countX = 0;
    let countY = 0;

    let pixel = document.createElement("div");

    pixel.classList.add("pixel");
    pixel.id = "x" + countX + "y" + countY;
    gameboard.appendChild(pixel);

    for (let i = 1; i < (30*30); i++) {
        
        pixel = document.createElement("div");

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
    
    document.getElementById("game").innerHTML = gameOver;
    try {
        document.getElementById("game-over").classList.remove("visible");
    } catch (TypeError) {};
    
    createGameboard();
    
};

const disableButton = (button) => {
    button.classList.add("disabled");
    button.classList.add("recentClick");
    
}

const enableButton = (button) => {
    button.classList.remove("disabled");
    try{
        button.classList.remove("recentClick");
    }
    catch (TypeError) {};
    
}

createGameboard();

const gridlinesBtn = document.getElementById("grid-btn");
gridlinesBtn.addEventListener("click", () => {

    
    console.log("grid button clicked");

    const game = document.getElementById("game");
    game.classList.toggle("no-grid");

    if (game.classList.contains("no-grid")) {
        document.getElementsByClassName("score-header")[0].textContent += " x 1.5";
    } else {
        document.getElementsByClassName("score-header")[0].textContent = "SCORE";
    }
    
});

const playBtn = document.getElementById("play-btn");
playBtn.addEventListener("click", () => {

    if (checkForClicked(playBtn) && !playBtn.classList.contains("disabled")) {
    
        console.log("play button clicked");

        removeClick(resetBtn);
        removeClick(gridlinesBtn);

        
        const game = new Game(new Snake());
        disableButton(resetBtn);
        disableButton(gridlinesBtn);
        disableButton(playBtn);
        game.playGame();
    }


});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    if (checkForClicked(resetBtn) && !resetBtn.classList.contains("disabled")) {
    
        console.log("reset button clicked");

        enableButton(playBtn);
        enableButton(gridlinesBtn);
        disableButton(resetBtn);
        document.getElementById("score-points").textContent = 0;
        resetGame();
    }
});

const checkForClicked = (link) => {
    if (!link.classList.contains("recentClick")) {
        link.classList.add("recentClick");
        return true;
    }
    else {
        return false;
    }
};

const removeClick = (link) => {             //do we need this anymore?

    link.classList.remove("recentClick");
};