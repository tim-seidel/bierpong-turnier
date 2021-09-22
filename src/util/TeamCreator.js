import { v4 as uuid } from 'uuid'
import Team from '../model/Team'
import {randomizePlayers, randomizeTeams} from "./Randomizer";

export function createTeamsFromPlayers(players) {
    if (!players || players.length === 0) return []

    const randomized = randomizePlayers(players)

    const teams = []
    const t_count = Math.floor(randomized.length / 2)

    for (let t = 0; t < t_count; t++) {
        teams.push(new Team(
            uuid(),
            randomized[2 * t] + " + " + randomized[2 * t + 1]
        ))
    }

    if (randomized.length % 2) {
        teams.push(new Team(
            uuid(),
            randomized[t_count - 1]
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

    const randomized = randomizeTeams(names)

    const teams = []
    randomized.forEach(name => {
        teams.push(new Team(uuid(), name))
    })

    return teams
}
