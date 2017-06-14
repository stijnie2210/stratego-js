const API_BASE_URL = 'https://strategoavans.herokuapp.com/api/';
const API_TOKEN = '5EQencpHg5Z6Rt1DpPLDyCCQJAtwfJbt';
const API_TOKEN_TIM = '';

function GameProvider() {
    var self = this;

    self.buildUrl = function(path) {
        var token = self.token || API_TOKEN;
        return API_BASE_URL + path + '?api_key=' + token;
    }

    self.getToken = function() {
        return self.token || API_TOKEN;
    }

    self.setToken = function(token, callback) {
        if(token == "default") {
            self.token = null;
            return;
        }

        self.token = token;

        if(callback) callback();
    }

    self.getInfo = function(callback) {
        $.ajax({
            url: self.buildUrl('users/me'),
            method: 'get',
            success: callback,
        });
    }

    self.getGameList = function(callback) {
        $.ajax({
            url: self.buildUrl('games'),
            method: 'get',
            success: callback,
        });
    }

    self.deleteGameList = function(callback) {
        $.ajax({
            url: self.buildUrl('games'),
            method: 'delete',
            success: callback,
        });
    }

    self.requestGame = function(ai, callback) {
        $.ajax({
            url: self.buildUrl('games'),
            method: 'post',
            data: {"ai": ai },
            success: callback,
        });
    }

    self.postMove = function(gameId, moveData, callback) {
        $.ajax({
            url: self.buildUrl('games/' + gameId + '/moves' ),
            method: 'post',
            data: moveData,
            success: callback,
        })
    }

    self.getMoves = function(gameId, callback) {
        $.ajax({
            url: self.buildUrl('games/' + gameId + '/moves'),
            method: 'get',
            success: callback,
        })
    }

    self.startBoard = function(gameId, board, callback) {
        $.ajax({
            url: self.buildUrl('games/' + gameId + '/startboard'),
            method: 'post',
            data: board,
            success: callback,
        })
    }
}