import Tournament from '../Tournament'
import Group from '../Group'
import Team from '../Team'
import Game from '../Game'
import Score from '../Score'

class TeamDto {
    constructor() {
        this.id = ''
        this.name = ''
    }
}

class GameDto {
    constructor() {
        this.id = ''
        this.team1Id = ''
        this.team2Id = ''
        this.team1Beers = 0
        this.team2Beers = 0
        this.order = 0
    }
}

class GroupDto {
    constructor() {
        this.id = ''
        this.name = ''
        this.teams = []
        this.games = []
    }
}

class TournamentDto {
    constructor() {
        this.id = ''
        this.name = ''
        this.groups = []
    }
}

export function TournamentToJson(tournament) {
    const dtoTournament = new TournamentDto()
    dtoTournament.id = tournament.id
    dtoTournament.name = tournament.name

    tournament.groups.forEach(group => {
        const dtoGroup = GroupToGroupDto(group)
        dtoTournament.groups.push(dtoGroup)
    })

    return JSON.stringify(dtoTournament)
}

export function JsonToTournament(jsonContent) {
    const dtoTournament = JSON.parse(jsonContent)
    const tournament = new Tournament(dtoTournament.id, dtoTournament.name)

    dtoTournament.groups.forEach(groupDto => {
        const group = GroupDtoToGroup(groupDto)
        tournament.groups.push(group)
    })

    return tournament
}


export function GroupToGroupDto(group) {
    const dtoGroup = new GroupDto()
    dtoGroup.id = group.id
    dtoGroup.name = group.name

    group.teams.forEach(team => {
        const dtoTeam = new TeamDto()
        dtoTeam.id = team.id
        dtoTeam.name = team.name

        dtoGroup.teams.push(dtoTeam)
    })

    group.games.forEach(game => {
        const dtoGame = new GameDto()
        dtoGame.id = game.id
        dtoGame.team1Id = game.team1.id
        dtoGame.team2Id = game.team2.id
        dtoGame.team1Beers = game.score.beers1 ?? -1
        dtoGame.team2Beers = game.score.beers2 ?? -1
        dtoGame.order = game.order

        dtoGroup.games.push(dtoGame)
    })
    return dtoGroup
}


export function GroupDtoToGroup(groupDto) {
    const group = new Group(groupDto.id, groupDto.name)

    groupDto.teams.forEach(teamDto => {
        const team = new Team()
        team.id = teamDto.id
        team.name = teamDto.name
        group.teams.push(team)
    })

    groupDto.games.forEach(gameDto => {
        const t1 = group.teams.find(t => (t.id === gameDto.team1Id))
        const t2 = group.teams.find(t => (t.id === gameDto.team2Id))

        if (t1 !== undefined && t2 !== undefined) {
            group.games.push(new Game(gameDto.id,
                t1,
                t2,
                new Score(
                    gameDto.team1Beers >= 0 ? gameDto.team1Beers : undefined,
                    gameDto.team2Beers >= 0 ? gameDto.team2Beers : undefined
                ),
                gameDto.order
            ))
        }
    })
    group.calculateStandings()

    return group
}
