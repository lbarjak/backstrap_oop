'use strict' // Barják László, 2020.09.29.

class Hexagon {
    static sn = 0;
    static hex = [[0, 7], [7, 0], [14, 7], [14, 39], [7, 46], [0, 39]];
    constructor() {
        this.sn = Hexagon.sn++;
    }
    drawHexagon = (x, y, color) => {
        context.beginPath()
        context.moveTo(x + Hexagon.hex[0][0], y + Hexagon.hex[0][1])
        for (let i = 1; i < Hexagon.hex.length; i++)
            context.lineTo(x + Hexagon.hex[i][0], y + Hexagon.hex[i][1])
        context.fillStyle = color;
        context.fill();
        //console.log(this.sn);
    }
}

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

let hexagon = new Hexagon();

let nameOfPattern = "kigyohatas"
let pattNow = patterns[nameOfPattern]
let correction = pattNow.upper.length === pattNow.lower.length ? 4 : 0
let timer
let x
let y
let color
let rowOfPattern
let row = 0
let position = 0
let alternate = 1

const draw = () => {

    rowOfPattern = pattNow[patterns.healds[row % 2]]//0 felső, 1 alsó
    y = 4 + row * 41
    x = canvas.width / 2 - 1 - rowOfPattern.length * 8
    x = x + position * 16 - alternate * correction
    color = patterns.colors[rowOfPattern[position]]

    hexagon.drawHexagon(x, y, color);

    position = position + alternate//oda-vissza
    console.log(position);
    if (position === rowOfPattern.length || position === -1) {
        ++row
        position = row % 2 * (rowOfPattern.length - 1)//a sor eleje vagy vége
        alternate = 1 - row % 2 * 2// 1 vagy -1, előre vagy hátra
    }

    timer = setTimeout(() => draw(), 30)
    if (row > canvas.height / 41 - 1) {
        clearTimeout(timer)
        row = 0
        position = 0
        alternate = 1
    }
};

draw();

canvas.addEventListener('click', () => {
    if (!row && !position) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = bgColor;
        context.fill();
        draw()
    }
})
