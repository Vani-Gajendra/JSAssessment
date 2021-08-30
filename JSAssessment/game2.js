//Create global variables and import prompt input from package

const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const foundHat = "Yippe! You found hat, You Win";
const fellHole = "Oops! You fell into hole, You Lost";
const invalid = "Invalid Entry, Please enter u, d, l or r";
const outOfBounds = "Out of bounds";

// Create field class with constructor

class Field {
   constructor() {
       this._field = [];
       this._positionX = 0;
       this._positionY = 0;
   }

// Generate Field 

generateField(width, height, percentage) {


for(let i = 0; i < width; i++) {
   let row = [];
   for(let j = 0; j < height; j++) {
       row.push(fieldCharacter);
   }
   this._field.push(row);
   //console.log(row);
}


// Position Hat in a random place

this._field[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)] =  hat;


// Position PathCharacter at the top left corner

if (this._field[0][0] != hat) {
    this._field[0][0] = pathCharacter;
}
else {
    this._field[width - 1][height - 1] = pathCharacter;
}

// Generate Holes at random places

const holes = Math.floor((percentage / 100) * (width * height));

let count = 0;
while (count < holes) {
    let holeX = Math.floor(Math.random() * width);
    let holeY = Math.floor(Math.random() * height);

    if ((this._field[holeX][holeY] === fieldCharacter) && 
    (this._field[holeX][holeY] !== pathCharacter) && 
    (this._field[holeX][holeY] !== hat)) {
        this._field[holeX][holeY] = hole;
        count++;
    }
}
}

// Print field

print() {
    for (let i = 0; i < this._field.length; i++) {
        let row = "";
        for (let j =0; j < this._field[i].length; j++) {
            row += this._field[i][j];
        }
        console.log(row);
    }
}

//  Check next move 
checkMove(x,y) {
    
    const next = (x < 0 || y < 0) ? "" : this._field[x][y];
    
    switch (next) {
        case fieldCharacter: return true;
        case hole: console.log(fellHole); return false;
        case hat: console.log(foundHat); return true;
        default: console.log(outOfBounds); return false;
    }
}

// Check direction and move

move(direction) {
    let pathX = this._positionX;
    let pathY = this._positionY;

    switch(direction.toLowerCase()) {
        case "d": pathX++; break;
        case "u": pathX--; break;
        case "r": pathY++; break;
        case "l": pathY--; break;
        default: return invalid;
    }

    if (this.checkMove(pathX, pathY)) {
        if (this._field[pathX][pathY] === hat) return foundHat;
        this._field[pathX][pathY] = pathCharacter;
        this._positionX = pathX;
        this._positionY = pathY;
       
    }
    else {
        return false;
    }

}
}

//Play Game

const myField = new Field();
myField.generateField(10,10,15);
myField.print();

let gameOver = false;

while(!gameOver) {
    let direction = prompt('Which way? Enter u, d, l or r : ');
    let next = myField.move(direction);
 
    if ( next === foundHat) {
        gameOver = true;
    }
    
    if ( next === invalid) {
        console.log(invalid);
    }
    if ( next === false) {
        gameOver = true;
    }
    myField.print();
}
