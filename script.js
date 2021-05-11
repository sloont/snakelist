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
