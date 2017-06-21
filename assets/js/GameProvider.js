const API_BASE_URL = 'https://strategoavans.herokuapp.com/api/'
const API_TOKEN = '5EQencpHg5Z6Rt1DpPLDyCCQJAtwfJbt'

function GameProvider() {
	var self = this

	while(localStorage.getItem('api-key') === null) {
		var key = prompt('Enter your API key')

		if(key.length == 32) {
			localStorage.setItem('api-key', key)
		} else {
			continue
		}
	}

	if(localStorage.getItem('api-key') != API_TOKEN) {
		
	} else {
		localStorage.setItem('api-key', API_TOKEN)
	}

	self.buildUrl = function (path) {
		return API_BASE_URL + path + '?api_key=' + localStorage.getItem('api-key')
	}

	self.getToken = function () {
		return localStorage.getItem('api-key')
	}

	self.setToken = function (token, callback) {
		if (token == "default") {
			self.token = null

			return
		}

		localStorage.setItem('api-key') = token

		if (callback) callback()
	}

self.getInfo = function (callback) {
	$.ajax({
		url: self.buildUrl('users/me'),
		method: 'get',
		success: callback,
	})
}

self.getGameList = function (callback) {
	$.ajax({
		url: self.buildUrl('games'),
		method: 'get',
		success: callback,
	})
}

self.find = function (gameId, callback) {
	$.ajax({
		url: self.buildUrl('games/' + gameId),
		method: 'get',
		success: callback,
	})
}

self.deleteGameList = function (callback) {
	$.ajax({
		url: self.buildUrl('games'),
		method: 'delete',
		success: callback,
	})
}

self.requestGame = function (ai, callback) {
	$.ajax({
		url: self.buildUrl('games'),
		method: 'post',
		contentType: 'application/json',
		data: JSON.stringify({ "ai": ai }),
		success: callback,
		error: function(xhr, exception) {
			alert(xhr.responseJSON.message)
		}
	})
}

self.postMove = function (gameId, moveData, callback) {
	$.ajax({
		url: self.buildUrl('games/' + gameId + '/moves'),
		method: 'post',
		contentType: 'application/json',
		data: JSON.stringify(moveData),
		success: callback,
		error: function(xhr, exception) {
			$('.clickable-piece').removeAttr('data-isClicked')
			var message = xhr.responseJSON.message
			alert(xhr.responseJSON.message)
		}
	})
}

self.getMoves = function (gameId, callback) {
	$.ajax({
		url: self.buildUrl('games/' + gameId + '/moves'),
		method: 'get',
		success: callback,
	})
}

self.startBoard = function (gameId, board, callback) {
	$.ajax({
		url: self.buildUrl('games/' + gameId + '/start_board'),
		method: 'post',
		contentType: 'application/json',
		data: JSON.stringify(board),
		success: callback,
		error: function(xhr, exception) {
			console.log(xhr)
			alert(xhr.responseJSON.message)
		}
	})
}
}