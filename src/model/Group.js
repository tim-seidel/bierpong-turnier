export default class Group {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.teams = []
        this.games = []
        this.isVisible = true
    }

    hasStarted() {
        let ret = false
        this.games.forEach(game => {
            if (game.score.isValid()) ret = true
        })
        return ret
    }

    calculateStandings() {
        this.calculateResults()
        this.teams.sort(this.sortTeams)
        this.games.sort((g1, g2) => g1.order - g2.order)
    }

    calculateResults() {
        this.teams.forEach(team => {
            team.games = 0
            team.points = 0
            team.beersGood = 0
            team.beersBad = 0
        })

        this.games.forEach(game => {
            if (!game.score.isValid()) return

            game.team1.games++
            game.team2.games++
            game.team1.beersGood += (game.score.beers2 ?? 0)
            game.team2.beersGood += (game.score.beers1 ?? 0)
            game.team1.beersBad += (game.score.beers1 ?? 0)
            game.team2.beersBad += (game.score.beers2 ?? 0)

            if (game.score.beers1 < game.score.beers2) {
                game.team1.points++
            }
            if (game.score.beers2 < game.score.beers1) {
                game.team2.points++
            }
        })
    }

    sortTeams(t1, t2) {
        let compare = t2.points - t1.points
        if (compare === 0) {
            compare = (t2.beersGood - t2.beersBad) - (t1.beersGood - t1.beersBad)
        }
        if (compare === 0) {
            compare = t2.beersGood - t1.beersGood
        }
        if (compare === 0) {
            compare = t2.beersBad - t1.beersBad
        }
        if (compare === 0) {
            compare = t1.games - t2.games
        }
        return compare
    }
}
