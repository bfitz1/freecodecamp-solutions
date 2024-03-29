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
    return problems

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')