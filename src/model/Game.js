import Score from './Score'

export default class Game {
    constructor(id, team1, team2, score = new Score(), order = 0) {
        this.id = id
        this.team1 = team1
        this.team2 = team2
        this.score = score
        this.order = order
    }

    asString(){
        return (this.team1?.name ?? "-/-") + "  "  + this.score.asString() + "  " + (this.team2?.name ?? "-/-")
    }
}
