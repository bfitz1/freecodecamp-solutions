NUMBER_OF_DISKS = 4
rods = {'A': list(range(NUMBER_OF_DISKS, 0, -1)), 'B': [], 'C': []}

def move(n, source, auxiliary, target):
    if n > 0:
        # move n - 1 disks from source to auxiliary, so they are out of the way
        move(n - 1, source, auxiliary, target)
        # display starting configuration
        rods[target].append(rods[source].pop())
        print(rods, '\n')

# initiate call from source A to target C with auxiliary B
move(NUMBER_OF_DISKS, 'A', 'B', 'C')