$(document).ready(function() {
    var gameProvider = new GameProvider();
    var gameController = new GameController(gameProvider);
    gameProvider.getInfo(function(result) {
        console.log(result);
    });

    $('body').html(gameController.buildBoard());
});