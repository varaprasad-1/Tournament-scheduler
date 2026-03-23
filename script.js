function tournamentSchedule(players) {
    let n = players.length;

    if (n === 1) return [];

    // Handle odd players
    let dummy = null;
    if (n % 2 === 1) {
        players.push("BYE");
        dummy = "BYE";
        n++;
    }

    let mid = n / 2;
    let group1 = players.slice(0, mid);
    let group2 = players.slice(mid);

    let schedule1 = tournamentSchedule(group1);
    let schedule2 = tournamentSchedule(group2);

    let schedule = [];

    // Merge internal schedules
    for (let i = 0; i < schedule1.length; i++) {
        schedule.push([...schedule1[i], ...schedule2[i]]);
    }

    // Cross matches
    for (let i = 0; i < mid; i++) {
        let round = [];

        for (let j = 0; j < mid; j++) {
            let p1 = group1[j];
            let p2 = group2[(i + j) % mid];

            if (p1 !== dummy && p2 !== dummy) {
                round.push(`${p1} vs ${p2}`);
            }
        }

        schedule.push(round);
    }

    return schedule;
}

function generateSchedule() {
    let input = document.getElementById("players").value;

    if (!input) {
        alert("Enter players!");
        return;
    }

    let players = input.split(",").map(p => p.trim());

    let schedule = tournamentSchedule(players);

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    schedule.forEach((round, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<h3>Round ${index + 1}</h3>` +
            round.map(match => `<p>${match}</p>`).join("");
        outputDiv.appendChild(div);
    });
}
