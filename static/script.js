async function runAgent() {
    const output = document.getElementById("output");
    output.innerText = "Running...\n";

    const res = await fetch("/run");
    const data = await res.json();

    let text = "";
    data.forEach((step, i) => {
        text += `Step ${i + 1}\n`;
        text += `State: ${step.state}\n`;
        text += `Action: ${step.action}\n`;
        text += `Reward: ${step.reward}\n\n`;
    });

    output.innerText = text;
}