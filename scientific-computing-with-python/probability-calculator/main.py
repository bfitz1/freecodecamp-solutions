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
    successes = 0
    for _ in range(num_experiments):
        # Always create a copy since Hat.draw mutates its internal state
        copy = Hat(**collapse(hat.contents))
        outcome = collapse(copy.draw(num_balls_drawn))
        # Check that we have at least as many balls as expected
        meets_expectations = all(
            outcome.get(key, 0) >= expected_balls.get(key)
            for key in expected_balls
        )
        successes += 1 if meets_expectations else 0
    return successes / num_experiments

if __name__ == "__main__":
    hat = Hat(black=6, red=4, green=3)
    probability = experiment(
        hat=hat,
        expected_balls={"red":2,"green":1},
        num_balls_drawn=5,
        num_experiments=2000
    )
    print(probability)