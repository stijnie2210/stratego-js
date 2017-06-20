
function Board(json) {
    this.startPieces = []
    this.build(json)
}

Board.prototype.build = function(boardJson) {
    this.pieces = []

    for (var rowIndex = 0; rowIndex < 10; rowIndex++) {
        this.pieces[rowIndex] = []

        for (var columnIndex = 0; columnIndex < 10; columnIndex++) {
            var pieceData = boardJson && boardJson[ rowIndex ][ columnIndex ] || ' '

            this.pieces[rowIndex][columnIndex] = new Piece(pieceData, rowIndex, columnIndex)
        }
    }
}

Board.prototype.setTile = function(x, y, piece) {
    if (!this.pieces[ x ]) {
        this.pieces[ x ] = []
    }

    this.pieces[ x ][ y ] = piece
}

Board.prototype.movePiece = function(move) {
    const square = move.square
    const squareTo = move.squareTo

    const piece = this.getTile(square.column, oldSquare.row)

    this.setTile(squareTo.column, squareTo.row, piece)
    this.setTile(square.column, square.row, null)
}

Board.prototype.getTile = function(x, y) {
    return this.pieces[x, y]
}

Board.prototype.render = function (needPieces) {
    var render = '<div id="wrapper">'

    if(needPieces) {
        this.loadPieces()
        render += '<div id="board_pieces" class="column">' 
        render += '<table class="start-board" border="1">'

        var j = 0

        for(var i = 0; i < this.startPieces.length; i++) {
            //render += '<tr>'

            if((i % 5) == 2) {
                render += '<tr>'
            }

            render += this.startPieces[i].renderStartPiece()

            if((i % 1) == 5) {
                render += '</tr>'
            }

        }
        render += '</table>'
        render += '</div>'
    }

    render += '<div id="gameboard" class="column">'
    render += '<table class="gameboard" border="1">'

    for (var i = 0; i < 10; i++) {
        render += '<tr>'

        for (var j = 0; j < 10; j++) {
            if(needPieces) {
                if(this.pieces[i][j].x > 5) {
                    render += this.pieces[i][j].renderStartPiece()
                } else {
                    render += this.pieces[i][j].render()
                }
            } else {
                render += this.pieces[i][j].render()
            }
        }

        render += '</tr>'
    }

    render += '</table>'

    render += '</div>'

    render += '</div>'

    return render
}

Board.prototype.loadPieces = function() {

    for(var j = 0; j < 8; j++) {
        this.startPieces.push(new Piece(9, '', ''))
    }

    for(var j = 0; j < 6; j++) {
        this.startPieces.push(new Piece('B', '', ''))
    }

    for(var j = 0; j < 5; j++) {
        this.startPieces.push(new Piece(8, '', ''))
    }

    for(var j = 0; j < 4; j++) {
        this.startPieces.push(new Piece(7, '', ''))
    }

    for(var j = 0; j < 4; j++) {
        this.startPieces.push(new Piece(6, '', ''))
    }

    for(var j = 0; j < 4; j++) {
        this.startPieces.push(new Piece(5, '', ''))
    }

    for(var j = 0; j < 3; j++) {
        this.startPieces.push(new Piece(4, '', ''))
    }

    for(var j = 0; j < 2; j++) {
        this.startPieces.push(new Piece(3, '', ''))
    }

    this.startPieces.push(new Piece(2, '', ''))
    this.startPieces.push(new Piece(1, '', ''))
    this.startPieces.push(new Piece('F', '', ''))
    this.startPieces.push(new Piece('S', '', ''))
}