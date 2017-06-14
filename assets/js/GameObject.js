function Game (gameList, id, status, localplayerId, opponentId) {
    this.gamelist = gameList;
    this.id = id;
    this.status = status;
    this.localplayer = localplayerId;
    this.opponentId = opponentId;
}

Game.prototype.renderPiecies = function() {
    var render = "<div class='board'<h3>Uw speelbord</h3>";

    
}

Game.prototype.render = function() {
    var self = this;
    var render = "<div class='gameboard' data-game-id'" + self.id + "'><h4>spel #" + self.id + "</h4>";

    
}