NUMBER_OF_DISKS = 3
number_of_moves = 2 ** NUMBER_OF_DISKS - 1

rods = {'A': list(range(NUMBER_OF_DISKS, 0, -1)), 'B': [], 'C': []}

def move(n, source, auxiliary, target):
    print(rods)

# initiate call from source A to target C with auxiliary B
move(NUMBER_OF_DISKS, 'A', 'B', 'C')