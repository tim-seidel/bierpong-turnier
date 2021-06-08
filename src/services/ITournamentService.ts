interface ITournamnetService{
    getTournaments(): Array<Object>
    getTournament(id: string, params: Object)
    updateTournament(): void
    deleteTournament(): void

    getConfiguration(id: string, params: Object): void
    updateConfiguration(): void
    deleteConfiguration(): void

    updateGroup(): void 
    deleteGroup(): void

    createGame(): void
    updateGame(): void 
    deleteGame(): void

    updateTeam(): void 
    createTeam(): void
    deleteTeam(): void
}