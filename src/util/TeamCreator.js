import { v4 as uuid } from 'uuid'

export function createTeamsFromPlayers(players) {
    if (!players || players.length === 0) return []

    const teams = []

    const t_count = players.length / 2
    for (let t = 0; t < t_count; t++) {
        teams.push({
            id: uuid(),
            name: players[2 * t] + " + " + players[2 * t + 1]
        })
    }

    if (t_count % 2 === 1) {
        teams.push({
            id: uuid(),
            name: players[t_count - 1]
        })
    }

    return teams
}

export function createTeamsFromCount(teamCount) {
    const teams = []
    for (let t = 0; t < teamCount; t++) {
        teams.push({
            id: uuid(),
            name: "Team " + (t + 1)
        })
    }

    return teams
}

export function createTeamsFromNames(names) {
    if (!names || names.length === 0) return []

    const teams = []
    names.forEach(n => {
        teams.push({
            id: uuid(),
            name: n
        })
    })

    return teams
}