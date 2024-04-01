import re

# We may need to offset days
WEEKDAYS = ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')

# Time is represented as an integer in [0, 2400), like a 24-hour clock
MIDNIGHT = 2400
MIDDAY = 1200

def parse_time(time):
    hours, minutes, period = re.split(r'[: ]', time)
    offset = 1200 if period == 'PM' else 0
    return 100*int(hours) + int(minutes) + offset

def parse_duration(duration):
    hours, minutes = re.split(r'[: ]', duration)
    return 100*int(hours) + int(minutes)

def add_time(start, duration, starting_day=None):
    sum_time = parse_time(start) + parse_duration(duration)
    if sum_time % 100 > 60:
        # Add an hour (100) and subtract an hour's worth of minutes (60)
        sum_time += 40
    days_elapsed = sum_time // MIDNIGHT
    time_24h = sum_time % MIDNIGHT
    time_12h = sum_time % MIDDAY
 
    hours = 12 if time_12h // 100 == 0 else time_12h // 100
    minutes = time_12h % 100
    period = 'AM' if time_24h < MIDDAY else 'PM'
    elapsed = '' if days_elapsed == 0 else f' ({days_elapsed} days later)'
    if starting_day is None:
        return f'{hours}:{minutes:02} {period}{elapsed}'
    else:
        index = WEEKDAYS.index(starting_day.title())
        return f'{hours}:{minutes:02} {period}, {WEEKDAYS[index]}{elapsed}'