import { v4 as uuid } from 'uuid'
import Team from '../model/Team'

export function createTeamsFromPlayers(players) {
    if (!players || players.length === 0) return []

    const teams = []
    const t_count = Math.floor(players.length / 2)

    for (let t = 0; t < t_count; t++) {
        teams.push(new Team(
            uuid(),
            players[2 * t] + " + " + players[2 * t + 1]
        ))
    }

    if (players.length % 2) {
        teams.push(new Team(
            uuid(),
            players[t_count - 1]
        ))
    }

    return teams
}

export function createTeamsFromCount(teamCount) {
    const teams = []
    for (let t = 0; t < teamCount; t++) {
        teams.push(new Team(uuid(), "Team " + (t + 1)))
    }

    return teams
}

export function createTeamsFromNames(names) {
    if (!names || names.length === 0) return []

    const teams = []
    names.forEach(n => {
        teams.push(new Team(uuid(), n))
    })

    return teams
}