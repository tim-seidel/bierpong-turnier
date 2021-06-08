export default class Score {
  constructor (beers1 = undefined, beers2 = undefined) {
    this.beers1 = (beers1 || beers1 === 0) ? beers1 : undefined // To unify NULL from db
    this.beers2 = (beers2 || beers2 === 0) ? beers2 : undefined // To unify NULL from db
  }

  isValid () {
    return this.beers1 !== undefined && this.beers1 >= 0 && this.beers2 !== undefined && this.beers2 >= 0
  }

  asString() {
    return (this.beers1 ?? "-") + " : " + (this.beers2 ?? "-")
  }
}
