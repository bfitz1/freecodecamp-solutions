import copy
import random

class Hat:
    def __init__(self, **kwargs):
        self.contents = expand(kwargs)
    
    def draw(self, amount):
        # Bail if the amount being sampled is more than the population
        if amount > len(self.contents):
            return self.contents
        
        sample = random.sample(self.contents, k=amount)
        collapsed_sample = collapse(sample)
        collapsed_contents = collapse(self.contents)
        for key in collapsed_sample:
            collapsed_contents[key] -= collapsed_sample[key]
        
        self.contents = expand(collapsed_contents)
        return sample

# Both of these functions are probably duplicating functionality
# provided in collections.Counter

# Take a dictionary of counts and expand it into a list
def expand(contents):
    result = []
    for key, value in contents.items():
        result += [key] * value
    return result

# Take a list and collapse it into a dictionary of counts
def collapse(contents):
    result = {}
    for key in contents:
        if key not in result:
            result[key] = 0
        result[key] += 1
    return result

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    pass