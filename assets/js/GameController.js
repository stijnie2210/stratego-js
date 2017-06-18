
function GameController() {
    var self = this

    this.service = new GameProvider()
    this.user = null
    this.game = null
    this.games = null
    this.startPieces = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "," "], 
    [" ", " ", " ", " ", " ", " ", " ", " ", " "," "], 
    [" ", " ", " ", " ", " ", " ", " ", " ", " "," "], 
    [" ", " ", " ", " ", " ", " ", " ", " ", " "," "]
    ]
    this.gameList = null

    self.sounds = {
        'intro': new Audio('assets/wav/intro.mp3'),
    };

    self.sounds.intro.volume = '0.02'
    self.sounds.intro.play();

    this.create = function () {
        this.service.requestGame(true, function (json) {
            self.game = new Game(json)

            var render = self.game.render()

            $('.container').html(render)
        })
    }

    this.find = function (gameId) {
        this.service.find(gameId, function (json) {
            self.game = new Game(json)

            if (!self.game.canSee()) {
                return
            }

            var render = self.game.render()

            $('.container').html(render)
        })
    }

    this.newGame = function(ai) {
        this.service.requestGame(ai, function(json) {
            alert('Game requested successfully!')
            $('.refresh').click()
            self.game = new Game(json)

            if(!self.game.canSee()) {
                return
            }

            self.updateListeners()
        })
    }

    self.deleteGames = function() {
        var sure = confirm('Are you sure you want to delete all games?')
        if(sure) {
            this.service.deleteGameList(function(json) {
                alert('All games deleted successfully!')
                self.renderGameList()
            })
        }
    }

    this.renderGameList = function() {
        this.service.getGameList(function(json) {
            self.gameList = new GameList(json)
            
            var html = self.gameList.render()

            $('.container').html(html)

            self.updateListeners()
        })
    }

    this.renderUserInfo = function() {
        this.service.getInfo(function(json) {
            self.user = new User(json)

            var html = self.user.render()

            $('.container').html(html)

            self.updateListeners()
        })
    }

    this.addStartPiece = function(x, y, piece) {
        var TYPES = {
            O: 'blue.png',
            F: 'red_F.png',
            B: 'red_B.png',
            S: 'red_S.png',
            ' ': 'image_grass.png',
            1: 'red_1.png',
            2: 'red_2.png',
            3: 'red_3.png',
            4: 'red_4.png',
            5: 'red_5.png',
            6: 'red_6.png',
            7: 'red_7.png',
            8: 'red_8.png',
            9: 'red_9.png',
        }
        var x = x
        var y = y -1
        var pieceData = piece

        var emptyPiece = $('.empty-start-piece[data-isClickedEmpty]')

        switch(x) {
            case "7":
            self.startPieces[0][parseInt(y)] = piece.type

            emptyPiece.attr('type', piece.type)
            emptyPiece.html('<img src="assets/img/' + TYPES[piece.type] + '">')

            $('.start-piece[data-isClickedStart]').remove()
            $('.start-piece').removeAttr('data-isClickedStart')
            $(emptyPiece).removeAttr('data-isClickedEmpty')
            $(emptyPiece).removeClass('empty-start-piece')

            break

            case "8":
            self.startPieces[1][parseInt(y)] = piece.type

            emptyPiece.attr('type', piece.type)
            emptyPiece.html('<img src="assets/img/' + TYPES[piece.type] + '">')

            $('.start-piece[data-isClickedStart]').remove()
            $('.start-piece').removeAttr('data-isClickedStart')
            $(emptyPiece).removeAttr('data-isClickedEmpty')
            $(emptyPiece).removeClass('empty-start-piece')

            break

            case "9":
            self.startPieces[2][parseInt(y)] = piece.type

            emptyPiece.attr('type', piece.type)
            emptyPiece.html('<img src="assets/img/' + TYPES[piece.type] + '">')

            $('.start-piece[data-isClickedStart]').remove()
            $('.start-piece').removeAttr('data-isClickedStart')
            $(emptyPiece).removeAttr('data-isClickedEmpty')
            $(emptyPiece).removeClass('empty-start-piece')

            break

            case "10":
            self.startPieces[3][parseInt(y)] = piece.type

            emptyPiece.attr('type', piece.type)
            emptyPiece.html('<img src="assets/img/' + TYPES[piece.type] + '">')

            $('.start-piece[data-isClickedStart]').remove()
            $('.start-piece').removeAttr('data-isClickedStart')
            $(emptyPiece).removeAttr('data-isClickedEmpty')
            $(emptyPiece).removeClass('empty-start-piece')

            break

            default:
            console.log(x)
            break
        }
    }

    this.sendStartBoard = function(id, board) {
        var jsonboard = JSON.stringify(board)
        this.service.startBoard(id, board, function() {
            alert('Board sent successfully!')
            self.find(self.game.id)
        })
    }

    this.movePiece = function(id, startCoordinates, moveCoordinates) {

        var DESTROYEDSTATES = {
            true: 'was',
            false: 'was not'
        }

        var PIECES = {
            F: 'Flag',
            B: 'Bomb',
            S: 'Spy',
            1: 'Marshal',
            2: 'General',
            3: 'Colonel',
            4: 'Major',
            5: 'Leutenant',
            6: 'Captain',
            7: 'Sergeant',
            8: 'Miner',
            9: 'Explorer',
        }

        var postData = 
        {
            square: {
                row: startCoordinates.x - 1,
                column: startCoordinates.y - 1
            },
            square_to: {
                row: moveCoordinates.x - 1,
                column: moveCoordinates.y - 1
            }
        }
        this.service.postMove(id, postData, function(json) {
            self.find(id)
            switch(json.moves[0].type) {
                case "move":
                break
                case "attack":
                alert("You attacked the opponent! Your opponent's piece was a: " + PIECES[json.moves[0].defender] + ". Your opponent " + DESTROYEDSTATES[json.moves[0].defender_destroyed] + " destroyed.")
            }

            switch(json.moves[1].type) {
                case "move":
                break
                case "attack":
                alert("You were attacked by the opponent! Your opponent's piece was a: " + PIECES[json.moves[1].attacker] + ". Your " + PIECES[json.moves[1].defender] + " " + DESTROYEDSTATES[json.moves[1].defender_destroyed] + " destroyed.")
            }
        })
    }

    self.updateListeners()
}

GameController.prototype.updateListeners = function() {
    var self = this

    self.canSendBoard = function() {
        // Check if board can be send

        if($('.empty-start-piece').length != 0) {
            return false
        }

        return true
    }

    self.loadPage = function() {
        var tempHtml = '<div class="card">'
        tempHtml += '<div class="card-content">'
        tempHtml += '<button class="load-list button is-large is-info is-loading">Loading</button>'
        tempHtml += '</div></div>'
        $('.container').html(tempHtml)
    }

    self.move = function() {
        if(!self.game.winner && self.game.state != 4) {
            var x = $(this).attr('data-x')
            var y = $(this).attr('data-y')
            var type = $(this).attr('type')

            var clickedPiece = $('.clickable-piece[data-isClicked]')[0]
            if(clickedPiece)
                self.movePiece($('.card').attr('game-id') , clickedPiece.dataset, $(this)[0].dataset)
        }
    }

    ClickListener.registerListener('newGame', function() {
        self.newGame(false)
    })

    ClickListener.registerListener('delete-games', function() {
        self.deleteGames()
    })

    ClickListener.registerListener('newAIgame', function() {
        self.newGame(true)
    })

    ClickListener.registerListener('refresh', function() {
        $(this).children().hide()
        $(this).addClass('is-loading')
        self.renderGameList()
    })

    ClickListener.registerListener('refresh-game', function() {
        $(this).children().hide()
        $(this).addClass('is-loading')
        self.find(self.game.id)
    })

    ClickListener.registerListener('game', function() {
        var gameId = $(this).attr('game-id')
        var gameState = $(this).attr('game-state')

        if(gameState != 1) {
            self.loadPage()
        }

        self.find(gameId)
    })

    ClickListener.registerListener('clickable-piece', function() {
        if(!self.game.winner || self.game.state != 4) {
            var x = $(this).attr('data-x')
            var y = $(this).attr('data-y')
            var type = $(this).attr('type')

            $('.clickable-piece').removeAttr('data-isClicked')
            $(this).attr('data-isClicked', true)
        }

    })

    ClickListener.registerListener('empty-piece', self.move)

    ClickListener.registerListener('opponent-piece', self.move)

    ClickListener.registerListener('start-piece', function() {
        $(this).removeAttr('data-isClickedEmpty')
        $('.start-piece').removeAttr('data-isClickedStart')

        var x = $(this).attr('data-x')
        var y = $(this).attr('data-y')
        var type = $(this).attr('data-type')

        $(this).attr('data-isClickedStart', true)
    })

    ClickListener.registerListener('empty-start-piece', function() {
        // Placing the pieces on the board

        $('.empty-start-piece').removeAttr('data-isClickedEmpty')

        $(this).attr('data-isClickedEmpty', true)

        var x = $(this).attr('data-x')
        var y = $(this).attr('data-y')
        var type = $(this).attr('data-type')

        var clickedPiece = $('.start-piece[data-isClickedStart]')[0]
        if(clickedPiece) {
            self.addStartPiece(x, y, clickedPiece.dataset)
            self.clickPiece(x, y)
        }

        $('.start-piece').removeAttr('data-isClickedStart')

         // Check if board can be send
        if($('.start-piece').length == 0) {
            if(self.canSendBoard()) {
                $('.start-board-card').prepend('<button class="send-board button is-success is-pulled-right">Send Board</button>')
            }
        }
    })

    ClickListener.registerListener('send-board', function() {
        $(this).children().hide()
        $(this).addClass('is-loading')

        self.sendStartBoard(self.game.id, self.startPieces)
    })

    ClickListener.registerListener('info', function() {
        self.loadPage()
        
        self.renderUserInfo()
    })

    ClickListener.registerListener('gamelistlink', function() {
        self.loadPage()

        self.renderGameList()
    })
}