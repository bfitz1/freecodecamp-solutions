import re

# Since we may need to know from which day to offset
WEEKDAYS = ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')

def parse_time(time):
    pass

def parse_duration(duration):
    pass

# Considering an internal data representation like
#   Time : Number [0, 2400)
#   Day  : Number [0, 7)
def add_time(start, duration, starting_day=None):
    pass