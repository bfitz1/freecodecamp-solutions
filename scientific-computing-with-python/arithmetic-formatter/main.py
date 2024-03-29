import string

def is_valid_size(problems):
    return len(problems) <= 5

def is_valid_operator(op):
    return op == '+' or op == '-'

def is_valid_operand(op):
    return all(ch in string.digits for ch in op)

def is_valid_width(op):
    return len(op) <= 4

def format_operand1(op, width):
    return (' ' * (width - len(op))) + op

def format_operand2(op, pom, width):
    return pom + (' ' * (width - len(op) - 1)) + op

def format_divider(width):
    return '-' * width

def format_solution(sol, width):
    return ' ' * (width - len(sol)) + sol

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

    operand1_line = ''
    operand2_line = ''
    dividing_line = ''
    solution_line = ''

    for lhs, op, rhs in split_problems:
        width = max(len(lhs), len(rhs)) + 2
        operand1_line += format_operand1(lhs, width) + ' ' * 4
        operand2_line += format_operand2(rhs, op, width) + ' ' * 4
        dividing_line += format_divider(width) + ' ' * 4
        if show_answers:
            x = int(lhs)
            y = int(rhs)
            answer = x + y if op == '+' else x - y
            solution_line += format_solution(answer, width) + ' ' * 4

    return '\n'.join([
        operand1_line.rstrip(),
        operand2_line.rstrip(),
        dividing_line.rstrip(),
        solution_line.rstrip(),
    ]).rstrip()

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')