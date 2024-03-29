import string

def is_valid_size(problems):
    return len(problems) <= 5

def is_valid_operator(op):
    return op == '+' or op == '-'

def is_valid_operand(op):
    return all(ch in string.digits for ch in op)

def is_valid_width(op):
    return len(op) <= 4

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

    return problems

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')