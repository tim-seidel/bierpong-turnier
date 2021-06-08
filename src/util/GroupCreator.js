export function createGroups(teams, groupCount) {
    if (!teams || teams.length === 0 || groupCount < 1) {
        return []
    }

    const teamCount = teams.length
    const groups = []

    for (let g = 0; g < groupCount; g++) {
        groups.push({ name: "Tisch " + (g + 1), teams: [], games: [] })
    }

    for (let t = 0; t < teamCount; t++) {
        groups[t % groupCount].teams.push(teams[t])
    }

    return groups
}