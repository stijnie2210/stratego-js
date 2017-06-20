
function GameHistory(startBoard, movesJson) {
    this.startBoard = startBoard

    this.moves = []

    for (const moveData of movesJson) {
        this.moves.push(new MoveObject(moveData))
    }

    this.currentMoveIndex = this.moves.length - 1
    this.board = null
}

GameHistory.prototype.hasNext = function() {
    return this.currentMoveIndex < this.moves.length - 1
}

GameHistory.prototype.hasPrevious = function() {
    return this.currentMoveIndex > 0
}

GameHistory.prototype.build = function() {
    this.board = Object.assign(this.startBoard)

    for (const i = 0; i < this.currentMoveIndex; i++) {
        const move = this.moves[ i ]

        this.board.movePiece(move)
    }

    return this.board
}

GameHistory.prototype.render = function() {
    if (!this.board) {
        this.build()
    }

    return this.board.render()
}

GameHistory.prototype.renderNext = function() {
    this.currentMoveIndex = this.currentMoveIndex + 1
}

GameHistory.prototype.renderPrevious = function() {
    this.currentMoveIndex = this.currentMoveIndex - 1
}