import { v4 as uuid } from "uuid";
import Group from "../model/Group";

const colors = [
    '#DDD92A',
    '#6E2594',
    '#5FAD56',
    '#F34213',
    '#6CD4FF',
    '#9B97B2',
]

export function createGroups(teams, groupCount) {
    if (!teams || teams.length === 0 || groupCount < 1) {
        return []
    }

    const teamCount = teams.length
    const groups = []

    for (let g = 0; g < groupCount; g++) {
        groups.push(new Group(uuid(), "Tisch " + (g + 1),))
    }

    for (let t = 0; t < teamCount; t++) {
        groups[t % groupCount].teams.push(teams[t])
    }

    groups.forEach(g => {
        g.teams.forEach((team, colorIndex)=> {
            team.color = colors[colorIndex%colors.length]
        })
    })

    return groups
}
