'use strict' // Barják László, 2020.09.29.

let canvas = document.getElementById("canvas")
let context = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 300;
const bgColor = "#808080";
context.fillStyle = bgColor;
context.fillRect(0, 0, canvas.width, canvas.height);

const patterns = {
    "hullamos": { "upper": "vvvvvsvvvv", "lower": "vvvvsvvvvv" },
    "lancos": { "upper": "vvvvsvsvvvv", "lower": "vvvvssvvvv" },
    "csikos": { "upper": "vvssssssssssvv", "lower": "vvsssssssssvv" },
    "keresztcsikos": { "upper": "vvvvvvvvvvvvvvvvv", "lower": "ssssssssssssssss" },
    "kigyohatas": { "upper": "ssssvvvvvvvsssvsssvvvvvvvssss", "lower": "ssssvvvssssssvvssssssvvvssss" },
    "keresztes": { "upper": "vvvsssvvsssvvsssvvv", "lower": "sssvvsssvvsssvvsss" },
    "colors": { "v": "white", "s": "red" },
    "healds": { "0": "upper", "1": "lower" }
}
let nameOfPattern = "kigyohatas"
const hex = [[0, 7], [7, 0], [14, 7], [14, 39], [7, 46], [0, 39]]
let row = 0, pos = 0, lengthOfPattern, timer
let pattNow = patterns[nameOfPattern]
let corr = pattNow.upper.length === pattNow.lower.length ? 4 : 0

const hexagon = (x, y, color) => {
    context.beginPath()
    context.moveTo(x + hex[0][0], y + hex[0][1])
    for (let i = 1; i < hex.length; i++)
        context.lineTo(x + hex[i][0], y + hex[i][1])
    context.fillStyle = color; context.fill()
}

const draw = () => {
    let dir = row % 2 ? -1 : 1
    let x, y = 4 + row * 41, color
    let pattern = pattNow[patterns.healds[row % 2]]
    x = 299 - pattern.length * 8
    x = x + pos * 16 + dir * corr * -1
    color = patterns.colors[pattern[pos]]
    hexagon(x, y, color)
    pos = pos + dir
    if (pos === pattern.length || pos === -1)
        pos = (++row % 2) * (patterns[nameOfPattern][patterns.healds[row % 2]].length - 1)
    timer = setTimeout(() => draw(), 50)
    if (row === 7) {
        clearTimeout(timer)
        row = 0; pos = 0
    }
};

draw();

canvas.addEventListener('click', () => {
    if (!row && !pos) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = bgColor;
        context.fill();
        draw()
    }
})