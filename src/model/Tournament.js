export default class Tournament {
  constructor (id, name, startDate) {
    this.id = id
    this.name = name
    this.startDate = startDate
    this.groups = []
    this.maxTeams = 0
    this.configuration = undefined
    this.password = undefined
  }
}
