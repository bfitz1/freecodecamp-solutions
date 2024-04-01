import copy
import random
from collections import Counter

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for key, value in kwargs.items():
            balls = [key] * value
            self.contents += balls
    
    def draw(self, amount):
        # Bail if the amount being sampled is more than the population
        if amount > len(self.contents):
            return self.contents
        
        # Lean on Counters to handle the gruntwork of updating hat contents
        sample = Counter(random.sample(self.contents, k=amount))
        contents = Counter(self.contents)
        contents.subtract(sample)
        self.contents = list(contents.elements())
        return list(sample.elements())

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    pass