$(document).ready(function() {
	var gameController = new GameController()

	var tempHtml = '<div class="card">'
	tempHtml += '<div class="card-content">'
	tempHtml += '<button class="load-list button is-large is-info is-loading">Loading</button>'
	tempHtml += '</div></div>'
	$('.container').html(tempHtml)
	
	gameController.renderGameList()
})