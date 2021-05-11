for (let i = 0; i < (40*40); i++) {
    const game = document.getElementById("game");
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    game.appendChild(pixel);
}
