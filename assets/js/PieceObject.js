
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

function Piece(json, x, y) {
    this.type = json || ' '
    this.x = x || ''
    this.y = y || ''
}

Piece.prototype.render = function () {
    // Put water in the right coordinates

    if((this.x == 4 || this.x == 5) && (this.y == 2 || this.y == 3 || this.y == 6 || this.y == 7)) {
        return '<td style="height: 14px;" class="water-piece" type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/water.png"></td>'

    }

    // render pieces by type, give them right classes and attributes

    switch(this.type) {
        case ' ':
            return '<td class="empty-piece" type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'
        case 'O':
            return '<td class="opponent-piece" type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'
        case 'B':
            return '<td type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'
        case 'F':
            return '<td type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'
        default:
            return '<td class="clickable-piece" type="' + this.type + '" data-x="' + (this.x +1) + '" data-y="' + (this.y+1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'

    }
}

Piece.prototype.renderStartPiece = function() {
    switch(this.type) {
        case ' ':
            return '<td class="empty-start-piece" data-type="' + this.type + '" data-x="' + (this.x + 1) + '" data-y="' + (this.y + 1) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'
        default:
            return '<td class="' + this.type + ' start-piece" data-type="' + this.type + '" data-x="' + (this.x) + '" data-y="' + (this.y) + '"><img src="assets/img/' + TYPES[this.type] + '"></td>'

    }
}