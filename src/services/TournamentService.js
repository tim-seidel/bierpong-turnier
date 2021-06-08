import {v4 as uuid} from 'uuid'
import Group from "../model/Group"
import Team from "../model/Team"
import Tournament from "../model/Tournament"
import Game from "../model/Game";
import Score from "../model/Score";
import moment from "moment";
import { createTeamsFromCount, createTeamsFromNames, createTeamsFromPlayers } from "../util/TeamCreator";
import { createGroups } from "../util/GroupCreator";
import { createGames } from "../util/GameCreator";

import * as LocalStorageDatatbase from "./LocalStorageDatabase"

export function getTournaments() {
    const result = LocalStorageDatatbase.getTournaments();  
    return result
}

export async function getTournament(id) {
    const result = LocalStorageDatatbase.getTournament(id)
    const tournament = convertJsonToTournament(result)

    return tournament
}

export function convertJsonToTournament(jTournament) {
    const tournament = new Tournament(
        jTournament.id,
        jTournament.name,
        moment(jTournament.startDate)
    )
    tournament.configurationId = jTournament.configurationId

    const groups = []
    jTournament.groups.forEach(jGroup => {
        const teams = []
        const games = []

        const group = new Group(
            jGroup.id,
            jGroup.name
        )

        jGroup.teams.forEach(jTeam => {
            const team = new Team()
            team.id = jTeam.id
            team.name = jTeam.name
            teams.push(team)
        })

        jGroup.games.forEach(jGame => {
            const t1 = teams.find(t => t.id == jGame.team1Id)
            const t2 = teams.find(t => t.id == jGame.team2Id)

            if (!t1 || !t2) return

            games.push(new Game(
                jGame.id,
                t1,
                t2,
                new Score(jGame?.team1Score ?? undefined, jGame?.team2Score ?? undefined),
                jGame.order
            ))
        })

        games.sort((g1, g2) => g1.order - g2.order)

        group.teams = teams
        group.games = games

        group.calculateStandings()
        groups.push(group)
    })

    tournament.groups = groups

    return tournament
}

export function createTournament(config) {
    let json = ""
    switch (config.type) {
        case "manual":
            json = convertManualConfigToTournamenentDto(config)
            break
        case "player":
            json = convertPlayerConfigToTournamenentDto(config)
            break
        case "team":
            json = convertTeamConfigToTournamenentDto(config)
            break
        default: throw new Error("Unkown tournament config type.")
    }

    json.id = uuid()
    json.configuration = {
        groupCount: config.groupCount,
        teamCount: config.teamCount,
        players: config.players,
        teams: config.teams
    }

    LocalStorageDatatbase.createTournament(json)

    return json
}

export function updateTournament(tournament) {
    if (tournament) {
        LocalStorageDatatbase.updateTournament(tournament)
    }
}

export function deleteTournament(id) {
    LocalStorageDatatbase.deleteTournament(id)
}

export function updateTeam(params) {
    console.log("updateTeam(params) is not implemented yet")
}

export function updateGame(params) {
    console.log("updateGame(params) is not implemented yet")
}

export async function getConfiguration(id) {
    console.log("getConfiguration(id) is not implemented yet")
}

function convertManualConfigToTournamenentDto(config) {
    const teams = createTeamsFromCount(config.teamCount)
    const groups = createGroups(teams, config.groupCount)
    groups.forEach(grp => {
        grp.games = createGames(grp)
    })
    return ({
        name: config.name,
        startDate: config.startDate,
        groups: groups,
    })
}

export function convertPlayerConfigToTournamenentDto(config) {
    const teams = createTeamsFromPlayers(config.players)
    const groups = createGroups(teams, config.groupCount)
    groups.forEach(grp => {
        grp.games = createGames(grp)
    })
    return ({
        name: config.name,
        startDate: config.startDate,
        groups: groups,
    })
}

export function convertTeamConfigToTournamenentDto(config) {
    const teams = createTeamsFromNames(config.teams)
    const groups = createGroups(teams, config.groupCount)
    groups.forEach(grp => {
        grp.games = createGames(grp)
    })
    return ({
        name: config.name,
        startDate: config.startDate,
        groups: groups,
    })
}