const ACTIONS = ["Up", "Down", "Left", "Right", "Pickup", "Drop"];

function buildGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = "cell-" + i;
        grid.appendChild(cell);
    }
}

function renderState(state) {
    // state: [taxi_r, taxi_c, pass_r, pass_c, dest_r, dest_c, has_passenger]
    document.querySelectorAll(".cell").forEach(c => {
        c.classList.remove("taxi", "passenger", "destination");
        c.textContent = "";
    });

    const [tr, tc, pr, pc, dr, dc, hasPax] = state;

    const destCell = document.getElementById("cell-" + (dr * 5 + dc));
    destCell.classList.add("destination");
    destCell.textContent = "🏁";

    if (!hasPax) {
        const paxCell = document.getElementById("cell-" + (pr * 5 + pc));
        paxCell.classList.add("passenger");
        paxCell.textContent = "🧍";
    }

    const taxiCell = document.getElementById("cell-" + (tr * 5 + tc));
    taxiCell.classList.add("taxi");
    taxiCell.textContent = hasPax ? "🚕🧍" : "🚕";
}

async function runAgent() {
    const btn = document.getElementById("run-btn");
    btn.disabled = true;
    buildGrid();

    const res = await fetch("/run");
    const steps = await res.json();

    let totalReward = 0;

    for (let i = 0; i < steps.length; i++) {
        const { state, action, reward } = steps[i];
        totalReward += reward;

        renderState(state);
        document.getElementById("step-count").textContent = i + 1;
        document.getElementById("reward").textContent = totalReward;
        document.getElementById("action-name").textContent = ACTIONS[action] || action;

        await new Promise(r => setTimeout(r, 300));
    }

    btn.disabled = false;
}

buildGrid();
