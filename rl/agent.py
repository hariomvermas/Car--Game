import numpy as np
import random
import pickle

class QAgent:
    def __init__(self):
        self.q_table = {}
        self.lr = 0.1
        self.gamma = 0.9
        self.epsilon = 1.0

    def get_q(self, state):
        if state not in self.q_table:
            self.q_table[state] = np.zeros(6)
        return self.q_table[state]
    
    def choose_action(self, state):
        if random.random() < self.epsilon:
            return random.random(0,5)
        return np.argmax(self.get_q(state))

    def update(self, state , action, reward, next_state):
        q_values = self.get_q(state)
        next_q = max(self.get_q(next_state))

        q_values[action] += self.lr * (reward + self.gamma * next_q)

    def save(self):
        with open("q_table.pkl","wb") as f:
            pickle.dump(self.q_table, f)

    def load(self):
        with open("q_table.pkl","rb") as f:
            self.q_table = pickle.load(f)