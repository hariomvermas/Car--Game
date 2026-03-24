from env import TaxiEnv
from agent import QAgent

env = TaxiEnv()
agent = QAgent()

for episode in range (5000):
    state = env.reset()
    done = False
    
    while not done:
        action = agent.choose_action(state)
        next_state, reward, done = env.step(action)

        agent.update(state, action, reward, next_state)
        state = next_state

    agent.epsilon *= 0.995

agent.save()
print("Training Complete!")