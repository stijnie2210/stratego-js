
function Game(json) {
	this.id = json.id
	this.opponent = json.opponent
	this.state = STATES[ json.state ]
	this.winner = json.winner

	this.board = new Board(json.board)
	this.start_board = new Board(json.start_board)

	this.moves = []
}

Game.prototype.render = function () {
	var render = '<div class="card" game-id="' + this.id + '">'
	render += '<div class="card-content game-card">'

	if(!this.state == 0) {
		render += '<button class="refresh-game button is-medium is-info is-pulled-right"><img src="assets/img/ic_refresh_white_24dp_1x.png"></button>'
	} else {
		render += '<button class="refresh-game button is-medium is-info is-pulled-right" disabled><img src="assets/img/ic_refresh_white_24dp_1x.png"></button>'
	}

	if(this.opponent) {
	  render += '<h1 class="title">vs ' + this.opponent + '</h1>'
	  if(this.winner) {
		render += '<h1 class="title"> Game won by: ' + this.winner
	}
} else {
  render += '<h1 class="title">Wachten op een tegenstander</h1>'
}

render += '</div></div>'

switch(this.state) {
	case 0:
		render += '<div class="card"><div class="card-content start-board-card">'
		render += '<h1 class="game-state-card title">Place pieces</h1>'
		render += '</div></div>'

		render += this.board.render(true)
		break
	default:
		render += '<div class="card"><div class="card-content">'
		render += '<h1 class="game-state-card title">' + this.getNiceState() + '</h1>'
		render += '</div></div>'

		render += this.board.render(false)
		break
}

	return render
}

Game.prototype.canMove = function () {
	return this.state === STATES.my_turn
}

Game.prototype.canSee = function () {
	if (this.state === STATES.waiting_for_an_opponent) {
		return false
	}

	return true
}

Game.prototype.getNiceState = function () {
	return STATES.states[ this.state ]
}