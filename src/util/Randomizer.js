import moment from "moment";

export function randomizePlayers(players) {
    return randomize(players)
}

export function randomizeTeams(teams) {
    return randomize(teams)
}

function randomize(playersOrTeams) {
    const random_copy = playersOrTeams.slice()

    const magic = getMagicNumber()
    for (let m = 0; m < magic; m++) {
        shuffleArray(random_copy)
    }

    return random_copy
}

function getMagicNumber() {
    return Math.max(100, moment().get("milliseconds") % 1000)
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
