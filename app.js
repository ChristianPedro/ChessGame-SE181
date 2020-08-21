var express = require('express');
var path = require('path');

//init express
var app = express();


//Variables 
var PORT = process.env.PORT || 5000;

//Create endpoint handlers
app.use(express.static(path.join(__dirname, 'public')));

//listen on port
app.listen(PORT, function() {console.log(`server started on ${PORT}`);}
);

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

function Validate(PieceObject,desiredSpot) {
    //to be implimented - still in the design process, working it out
}