var express = require('express');
var path = require('path');
const { request } = require('http');
const { start } = require('repl');

//init express
var app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

//Variables 
var PORT = process.env.PORT || 5000;

//Create endpoint handlers
//app.use(express.static(path.join(__dirname, 'public')));

//listen on port
//app.listen(PORT, function() {console.log(`server started on ${PORT}`);}
//);

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));

const PIECES = {
    black: {
        "king": "&#x265A;",
        "queen": "&#x265B;",
        "rook": "&#x265C;",
        "bishop": "&#x265D;",
        "knight": "&#x265E;",
        "pawn": "&#x265F;"
    },
    white: {
        "king": "&#x2654;",
        "queen": "&#x2655;",
        "rook": "&#x2656;",
        "bishop": "&#x2657;",
        "knight": "&#x2658;",
        "pawn": "&#x2659;"
    }
}

const directions = {
    carinals: [
        [0, -1], [0, 1], [-1, 0], [1, 0]
    ],
    diagonals: [
        [-1, -1], [1, -1], [-1, 1], [1, 1]
    ]
}

let all = [...directions.carinals, ...directions.diagonals]

var b = PIECES.black, w = PIECES.white;

var board = {
    a1: b.rook,
    a2: b.knight,
    a3: b.bishop,
    a4: b.queen,
    a5: b.king,
    a6: b.bishop,
    a7: b.knight,
    a8: b.rook,
    b1: b.pawn,
    b2: b.pawn,
    b3: b.pawn,
    b4: b.pawn,
    b5: b.pawn,
    b6: b.pawn,
    b7: b.pawn,
    b8: b.pawn,
    g1: w.pawn,
    g2: w.pawn,
    g3: w.pawn,
    g4: w.pawn,
    g5: w.pawn,
    g6: w.pawn,
    g7: w.pawn,
    g8: w.pawn,
    h1: w.rook,
    h2: w.knight,
    h3: w.bishop,
    h4: w.queen,
    h5: w.king,
    h6: w.bishop,
    h7: w.knight,
    h8: w.rook
}

io.on('connection', socket => {
    //console.log('user connected');
    
    socket.on('move-piece', data => {
        //console.log('move event recieved');
        let valid = validate(board[data.start], data.start, data.end);
        if(valid){
            board[data.end] = board[data.start];
        board[data.start] = "";
        io.sockets.emit('update', {
            board: board
        });
        }
    });
    socket.emit('update', {
        board: board
    });
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

class ChessGame{
    constructor(){
        this.cleanboard();
    }

    move(start, end){
        let piece = this.gameboard[start];
        this.remove(start);
        this.gameboard[end] = piece;
    }

    add(pos, pieceid){
        if(!this.gameboard[pos]){
            this.gameboard[pos] = pieceid
        }
    }

    remove(pos){
        delete this.gameboard[pos];
    }

    cleanboard(){
        this.gameboard = {};
    }

}

const games = {};

function getRoom(key){
    if(!games[key]){
        games[key] = new ChessGame();
    }
    return games[key];
}

app.get('/room/:key', function(req, res){
    res.send(getRoom(req.params.key));
});


//Piece Class
class Piece{
    constructor(id,timesMoved,title,color){
        this.pieceId = id;
        this.timesMoved = timesMoved;
        this.title = title;
        this.color = color;
    }
    //Setter methods
    setId(id) {
        this.pieceId = id;
    }

    upTimesMoved(){
        this.timesMoved++;
    }
    setTitle(title){
        this.title = title;
    }

    //Getter Methods
    getId(){
        return this.pieceId;
    }
    getTimesMoved(){
        return this.timesMoved;
    }
    getTitle(){
        return this.title;
    }
    getColor(){
        return this.color;
    }
}

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const knightMoves = [
    [-1, -2], [1, -2],
    [-2, -1], [-2, 1],
    [-1, 2], [1, 2],
    [2, -1], [2, 1]
]

const pawnMoves = {
    black: [
        [0, 1], [-1, 1], [1, 1]
    ],
    white: [
        [0, -1], [-1, -1], [1, -1]
    ]
}

function getPosition(cellid){
    let[x, y] = cellid.split('');
    return [rows.indexOf(x)+1, parseInt(y)];
}

function validate(pieceObject, startPosition, desiredSpot) {
    //to be implimented - still in the design process, working it out
    let validSpaces = [];
    let start = getPosition(startPosition);
    let end = getPosition(desiredSpot);
    switch(pieceObject){
        case b.queen: case w.queen:
            for(let d of all){
                validSpaces.push(...walk(d, start, undefined))
            }
            break;
        case b.rook: case w.rook:
            for(let d of directions.carinals){
                validSpaces.push(...walk(d, start, undefined))
            }
            break;
        case b.knight: case w.knight:
            for(let d of knightMoves){
                let positions = walk(d, start, undefined, 1)
                if(positions.length){
                    validSpaces.push(positions[0])
                }
                //validSpaces.push(...positions);
            }
            break;
        case b.bishop: case w.bishop:
            for(let d of directions.diagonals){
                validSpaces.push(...walk(d, start, undefined))
            }
            break;
        case b.king: case w.king:
            for(let d of all){
                let positions = walk(d, start, undefined, 1)
                if(positions.length){
                    validSpaces.push(positions[0])
                }
            }
            //console.log(validSpaces);
            break;
        case b.pawn: case w.pawn:
            validSpaces = pawnValidate(startPosition, desiredSpot);
            break;
    }
    validSpaces = Array.from(new Set(validSpaces));
    //validSpaces = validSpaces.filter(s => !isFriendly(startPosition, desiredSpot));
    let [posX, posY] = getPosition(desiredSpot);
    let valid = validSpaces.filter(s => s[0] === posX && s[1] === posY).length > 0;
    console.log(valid, validSpaces, getPosition(desiredSpot));
    return valid;
}

function isOutOfBounds(pos){
    let [x, y] = pos;
    return 0 >= x|| x > 8 || 0 >= y || y > 8;
}

function walk(direction, position, history, maxDistance, counter = 0) {
    //console.log(maxDistance, history.length)
    if(counter > maxDistance){
        //console.log(history.length);
        return history;
    }
    if (!history) {
        history = [];
    } else {
        history.push(position);
    }

    let [x, y] = position;
    x += direction[0];
    y += direction[1];
    //console.log([x, y]);

    // Traverse until out of bounds
    if (isOutOfBounds([x, y])) {
        return history;
    }

    // If a piece occupies this spot, return immediately
    if (board[`${rows[x-1]}${y}`]) {
        history.push([x, y]);
        //console.log('ran into piece');
        return history;
    }

    // Keep walking
    walk(direction, [x, y], history, maxDistance, counter+1);
    return history;
}

function isFriendly(start, end) {
    return isWhitePiece(start) === isWhitePiece(end)
}

function isempty(position){
    return board[position];
}

function isWhitePiece(piece) {
    let p = board[piece];
    //document.getElementById(piece).innerHTML;
    let valid = Object.values(PIECES.white).includes(p);
    console.log(p, PIECES.white, valid);
    return valid;
}

function pawnValidate(startPosition, desiredSpot){
    let validSpaces = [];
    let white = isWhitePiece(startPosition);
    let directions = white ? pawnMoves.white : pawnMoves.black;
    let [x, y] = getPosition(startPosition);
    let startRow = white ? 7 : 2;

    for(let d of directions){
        let pos = move([x, y], d, 1);
        if(!isOutOfBounds(pos)){
            validSpaces.push(pos);
        }
    }
    //console.log(validSpaces[0]);
    let [frontX, frontY] = validSpaces[0];
    if(board[`${rows[frontX-1]}${frontY}`]){
        validSpaces.shift();
        return validSpaces;
    }
    if(y === startRow){
        let [bonusX, bonusY] = move([x, y], directions[0], 2);
        if(!board[`${rows[bonusX-1]}${bonusY}`]){
            validSpaces.push([bonusX, bonusY]);
        }
    }
    return validSpaces;
    //return validSpaces.filter(s => s !== undefined);
}

function move(start, direction, amount){
    let [y, x] = start;
    x += direction[0]*amount;
    y += direction[1]*amount;
    return [y, x];
}