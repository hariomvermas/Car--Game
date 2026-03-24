from flask import Flask, render_template, jsonify
from rl.env import TaxiEnv
from rl.agent import QAgent

app = Flask(__name__)

env = TaxiEnv()
agent = QAgent()
agent.load()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run")
def run():
    state = env.reset()
    done = False
    steps = []

    while not done:
        action = agent.choose_action(state)
        next_state , reward, done = env.step(action)

        steps.append({
            "state":state,
            "action":int(action),
            "reward":reward
        })

        state = next_state

    return jsonify(steps)

if __name__== "__main__":
    app.run(debug=True)