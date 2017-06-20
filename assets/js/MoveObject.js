
var MOVE_TYPES = {
	attack: 'attack',
	move: 'move'
}

function MoveObject(json) {
    this.square = json.square
    this.squareTo = json.square_to
    this.type = json.type

    if (json.type === MOVE_TYPES.attack) {
        this.attacker = json.attacker
        this.attackerDestroyed = json.attacker_destroyed
        this.defender = json.defender
        this.defenderDestroyed = json.defender_destroyed
    }

    this.previousMove = null
    this.nextMove = null
}