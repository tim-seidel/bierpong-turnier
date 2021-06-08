import {v4 as uuid} from 'uuid'

export default class Team {
  constructor () {
    this.id = uuid()
    this.name = ""

    this.games = 0
    this.points = 0
    this.beersGood = 0
    this.beersBad = 0
  }
}