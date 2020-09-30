'use strict' // Barják László, 2020.09.29.

class Hexagon {
    static sn = 0;
    static hex = [[0, 7], [7, 0], [14, 7], [14, 39], [7, 46], [0, 39]];
    constructor() {
        this.sn = Hexagon.sn++;
    }
    drawHexagon = (x, y, color) => {
        layer1.beginPath()
        layer1.moveTo(x + Hexagon.hex[0][0], y + Hexagon.hex[0][1])
        for (let i = 1; i < Hexagon.hex.length; i++)
            layer1.lineTo(x + Hexagon.hex[i][0], y + Hexagon.hex[i][1])
        layer1.fillStyle = color;
        layer1.fill();
        //console.log(this.sn);
    }
}

let canvas = document.getElementById("canvas")
let layer1 = canvas.getContext('2d')
canvas.width = 600
canvas.height = 300
layer1.fillStyle = "grey"
layer1.fillRect(0, 0, canvas.width, canvas.height)

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
let alternate

const draw = () => {

    alternate = 1 - row % 2 * 2
    rowOfPattern = pattNow[patterns.healds[row % 2]]
    y = 4 + row * 41
    x = canvas.width / 2 - 1 - rowOfPattern.length * 8
    x = x + position * 16 - alternate * correction
    color = patterns.colors[rowOfPattern[position]]

    hexagon.drawHexagon(x, y, color);

    position = position + alternate
    console.log(position)
    if (position === rowOfPattern.length || position === -1) {
        ++row
        position = row % 2 * (pattNow[patterns.healds[row % 2]].length - 1)
    }

    timer = setTimeout(() => draw(), 30)
    if (row > canvas.height / 41 - 1) {
        clearTimeout(timer)
        row = 0
        position = 0
        alternate = 1
    }
}

draw();

canvas.addEventListener('click', () => {
    if (!row && !position) {
        layer1.fillStyle = "grey"
        layer1.fillRect(0, 0, canvas.width, canvas.height)
        draw()
    }
})
