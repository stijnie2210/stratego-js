function GameList(json) {
	this.games = []

	for (const gameData of json) {
		this.games.push(new Game(gameData))
	}
}

GameList.prototype.render = function() {
	var html = '<div class="gamelist">' 
	html += '<div class="card"><div class="card-content">'
	html += '<button class="refresh button is-medium is-info is-pulled-right"><img src="assets/img/ic_refresh_white_24dp_1x.png"></button>'
	html +='<h1 class="title games-header">Games:</h1>'
	html += '</div></div> <br>'
	html += '<ul class="gamelist">'

	for(var i = 0; i < this.games.length; i++) {
		html += '<a>'
		html += '<div class="card game" game-id=' + this.games[i].id + ' game-state=' + this.games[i].state + '>'
		if(this.games[i].opponent) {
			html += '<header class="card-header"><p class="card-header-title"> vs ' + this.games[i].opponent + '</p></header>'
		} else {
			html += '<header class="card-header"><p class="card-header-title">Open</p></header>'
		}
		html += '<div class="card-content">'
		html += '<li>' + this.games[i].getNiceState() + '</li>'

		if(this.games[i].winner) {
			html += '<li>Winner: ' + this.games[i].winner + '</li>'
		}
		
		html += '</div></div>'
		html += '</a>'
		html += '<br>'
	}

	html += '</ul></div>' 

	return html
}