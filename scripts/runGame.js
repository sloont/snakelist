const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () => {
    const game = new Game(new Snake());
    game.playGame();
})

