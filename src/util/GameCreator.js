import Score from "../model/Score"

export function createGames(group) {
    const teamCount = group ? group.teams.length : 0

    if (teamCount < 2) return []

    const pairings = getTeamParings(teamCount)
    const games = []

    pairings.forEach(pairing => {
        games.push({
            team1Id: group.teams[pairing.first - 1].id,
            team2Id: group.teams[pairing.second - 1].id,
            score: new Score()
        })
    })

    return games

}

export function getTeamParings(numberOfTeams) {
    switch (numberOfTeams) {
        case 2:
            return [
                { first: 1, second: 2 }
            ]
        case 3:
            return [
                { first: 1, second: 2 },
                { first: 2, second: 3 },
                { first: 3, second: 1 }
            ]
        case 4:
            return [
                { first: 2, second: 1 },
                { first: 3, second: 4 },
                { first: 4, second: 2 },
                { first: 1, second: 3 },
                { first: 4, second: 1 },
                { first: 2, second: 3 }
            ]
        case 5:
            return [
                { first: 1, second: 4 },
                { first: 2, second: 5 },
                { first: 3, second: 1 },
                { first: 4, second: 2 },
                { first: 5, second: 3 },
                { first: 1, second: 2 },
                { first: 4, second: 5 },
                { first: 3, second: 2 },
                { first: 1, second: 5 },
                { first: 4, second: 3 }
            ]
        case 6:
            return [
                { first: 1, second: 2 },
                { first: 3, second: 4 },
                { first: 5, second: 6 },
                { first: 1, second: 3 },
                { first: 2, second: 5 },
                { first: 6, second: 4 },
                { first: 3, second: 5 },
                { first: 1, second: 4 },
                { first: 2, second: 6 },
                { first: 1, second: 5 },
                { first: 6, second: 3 },
                { first: 2, second: 4 },
                { first: 1, second: 6 },
                { first: 5, second: 4 },
                { first: 2, second: 3 }
            ]
    }
}