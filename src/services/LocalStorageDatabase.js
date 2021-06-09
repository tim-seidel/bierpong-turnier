import { convertTournamentToJson } from "../model/util/Converter"

const KEY_TOURNAMENTS = "key_tournaments"
const KEY_TOURNAMENT_WITH_ID = "key_tournament_"

export function getTournaments() {
    const result = localStorage.getItem(KEY_TOURNAMENTS)
    return result ? JSON.parse(result) : []
}

export function getTournament(id) {
    const result = localStorage.getItem(KEY_TOURNAMENT_WITH_ID + id)
    return result ? JSON.parse(result) : undefined
}

export function createTournament(tournament) {
    if (tournament) {
        const jTournament = convertTournamentToJson(tournament)
        localStorage.setItem(KEY_TOURNAMENT_WITH_ID + tournament.id, JSON.stringify(jTournament))
        insertOrUpdateTournaments(jTournament)
    }
}

function insertOrUpdateTournaments(tournament) {
    if (!tournament) return

    const general = extractGeneralInformation(tournament)
    const tournaments = getTournaments()

    const existing = tournaments.find(t => t.id === tournament.id)
    if (existing) {
        existing.name = tournament.name
        existing.startDate = tournament.startDate
    } else {
        tournaments.push(general)
    }

    localStorage.setItem(KEY_TOURNAMENTS, JSON.stringify(tournaments))
}

export function updateTournament(tournament) {
    if (tournament) {
        const jTournament = convertTournamentToJson(tournament)

        localStorage.setItem(KEY_TOURNAMENT_WITH_ID + tournament.id, JSON.stringify(jTournament))
        insertOrUpdateTournaments(jTournament)
    }
}

export function deleteTournament(id) {
    localStorage.removeItem(KEY_TOURNAMENT_WITH_ID + id)

    const tournaments = getTournaments()
    const existing = tournaments.find(t => t.id === t.id)
    if (existing) {
        const removed = tournaments.filter(t => t.id !== id)
        localStorage.setItem(KEY_TOURNAMENTS, JSON.stringify(removed))
    }
}

function extractGeneralInformation(tournament) {
    if (!tournament) return undefined

    let tc = 0
    tournament.groups.forEach(g => {
        tc += g.teams.length
    });

    return {
        id: tournament.id,
        name: tournament.name,
        startDate: tournament.startDate,
        teamCount: tc
    }
}