//          var express = require('express');
//          var path = require('path');
//          const { request } = require('http');

//init express
//          var app = express();

const http = require('http').Server(app);

const socket = require('socket.io')(http);

//Variables 
//          var PORT = process.env.PORT || 5000;

//Create endpoint handlers
//app.use(express.static(path.join(__dirname, 'public')));

//listen on port
//app.listen(PORT, function() {console.log(`server started on ${PORT}`);}
//);

//app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));

var express = require('express');
var path = require('path');

//init express
var app = express();
const server = require('http').createServer(app);

var io = require('socket.io').listen(server);

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));


//Variables 
var PORT = process.env.PORT || 5000;
server.listen(PORT);

io.on('connect', socket => {
    console.log('connect');
    socket.on('joinroom', (roomcode) => {
      socket.join(roomcode, () => {
        io.to(roomcode).emit('new user');
      });
      console.log(`joining room ${roomcode}`)
    });
  
  });



app.get('/room', (req, res) => res.sendFile(__dirname+'/chessIndex.html'));
  






//Create endpoint handlers
app.use(express.static(path.join(__dirname, 'public')));


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
socket.on('test', data => {
    console.log(`message recieved: ${data.test}`)
});

socket.on('connection', socket => {
    //console.log('user connected');
    
    socket.on('move-piece', data => {
        //console.log('move event recieved');
        board[data.end] = board[data.start];
        board[data.start] = "";
        socket.emit('update', {
            board: board
        });
    });
    socket.emit('update', {
        board: board,
    });
});

// http.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`)
// });

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

class game{
    constructor(){
    this.activeBoard={
    'A':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'B':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'C':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'D':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'E':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'F':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'G':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'},
    'H':{1:'Empty',2:'Empty',3:'Empty',4:'Empty',5:'Empty',6:'Empty',7:'Empty',8:'Empty'}};
    }

    validate(start,finish,piece){
        var startCol=start.slice(0,1).toUpperCase();
        var startRow=start.slice(1,2);
        var finishCol=finish.slice(0,1).toUpperCase();
        var finishRow=finish.slice(1,2);
        console.log(startCol,startRow);
        console.log(finishCol, finishRow);
        if(piece==b.pawn || piece==w.pawn){
            if(startRow==2 || startRow==8){
                if(finishCol==startCol && finishRow-startRow==2 || finishCol==startCol && finishRow-startRow==1){
                    console.log('executing')
                    console.log(this.activeBoard[startCol][startRow]);
                    this.activeBoard[finishCol][finishRow]=piece;
                    this.activeBoard[startCol][startRow]='Empty';
                    console.log(this.activeBoard[startCol][startRow]);
                    console.log(this.activeBoard[finishCol][finishRow]);
                    return 'True';
                }
                else{
                    return 'False';
                }
            }
            else{
                if(finishCol==startCol && finishRow-startRow==1){
                    console.log('executing')
                    console.log(this.activeBoard[startCol][startRow]);
                    this.activeBoard[finishCol][finishRow]=piece;
                    this.activeBoard[startCol][startRow]='Empty';
                    console.log(this.activeBoard[startCol][startRow]);
                    console.log(this.activeBoard[finishCol][finishRow]);
                    return 'True';
                }
                else{
                    return 'False';
            }
        }
        //if pawn can move down one or two spaces through dict ------------Done
        //if rook can move through dict or accross dict x
        //if king move one in any direction x
        //if knight + or - 2 in ascii plus or minus 1 for second Dict
        //if bishop + 1 -1 or +1, -1 -1 or +1, ect
        //if queen combine rook and bishop
    }

}}

g=new game();
//console.log(g.activeBoard.B[8]);
console.log(g.validate('a2','a4',b.pawn));
console.log("-----------------");
console.log(g.validate('b2','b4',b.pawn));
console.log("-----------------");
console.log(g.validate('c2','c3',w.pawn));
console.log("-----------------");
console.log(g.validate('c2','d4',w.pawn));
