def is_valid_size(problems):
    return len(problems) <= 5

def is_valid_operator(op):
    return op in '+-'

def is_valid_operand(op):
    return all(ch.isdigit() for ch in op)

def is_valid_width(op):
    return len(op) <= 4

def format_term1(op, width):
    return op.rjust(width)

def format_term2(op, pom, width):
    return op.rjust(width).replace(' ', pom, 1)

def format_dash(width):
    return ''.rjust(width, '-')

def format_solution(sol, width):
    return sol.rjust(width)

def arithmetic_arranger(problems, show_answers=False):
    if not is_valid_size(problems):
        return "Error: Too many problems."
    
    split_problems = [p.split(' ') for p in problems]
    
    if not all(is_valid_operator(op) for _, op, _ in split_problems):
        return "Error: Operator must be '+' or '-'."
    if not all(is_valid_operand(lhs) and is_valid_operand(rhs) for lhs, _, rhs in split_problems):
        return "Error: Numbers must only contain digits."
    if not all(is_valid_width(lhs) and is_valid_width(rhs) for lhs, _, rhs in split_problems):
        return "Error: Numbers cannot be more than four digits."

    term1_line = []
    term2_line = []
    dash_line = []
    solution_line = []
    for lhs, op, rhs in split_problems:
        width = max(len(lhs), len(rhs)) + 2
        term1_line.append(format_term1(lhs, width))
        term2_line.append(format_term2(rhs, op, width))
        dash_line.append(format_dash(width))
        if show_answers:
            x = int(lhs)
            y = int(rhs)
            answer = x + y if op == '+' else x - y
            solution_line.append(format_solution(str(answer), width))

    return '\n'.join([
        ''.rjust(4).join(term1_line),
        ''.rjust(4).join(term2_line),
        ''.rjust(4).join(dash_line),
        ''.rjust(4).join(solution_line),
    ]).rstrip()

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"], show_answers=True)}')