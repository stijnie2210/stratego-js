function GameController(provider) {
    var self = this;

    self.provider = provider;
    self.games = [];

    self.buildBoard = function() {
        var render = "<div>";
        render += "<table border='1' class='pieces'>";

        for(var i = 0; i < 10; i++) {
            render += "<tr>";

            for(var j = 0; j < 10; j++) {
                render += "<td></td>";
            }

            render += "</tr>";
        }
        render += "</table>";
        render += "</div>";

        return render;
    }
}