class Category:
    def __init__(self, category):
        self.category = category
        self.ledger = []
    
    def deposit(self, amount, description=''):
        self.ledger.append({'amount': amount, 'description': description})
    
    def withdraw(self, amount, description=''):
        if not self.check_funds(amount):
            return False
        
        self.ledger.append({'amount': -amount, 'description': description})
        return True
    
    def get_balance(self):
        return sum(x['amount'] for x in self.ledger)
    
    def transfer(self, amount, category):
        if not self.check_funds(amount):
            return False
    
        category.deposit(amount, f'Transfer from {self.category}')
        self.withdraw(amount, f'Transfer to {category.category}')
        return True
    
    def check_funds(self, amount):
        return amount <= self.get_balance()
    
    def __str__(self):
        lines = []
        lines.append(self.category.center(30, '*'))
        total = 0
        for item in self.ledger:
            line = item['description'][:23].ljust(23, ' ')
            line += f"{item['amount']:.2f}".rjust(7, ' ')
            total += item['amount']
            lines.append(line)
        lines.append(f'Total: {total:.2f}')
        return '\n'.join(lines)

def sum_category(category):
    return sum(x['amount'] for x in category.ledger if x['amount'] < 0)

def create_spend_chart(categories):
    # Sum withdrawals, grouping by category
    groups = {
        x.category : -sum(y['amount'] for y in x.ledger if y['amount'] < 0)
        for x in categories
    }
    total = sum(groups.values())

    # Tedious text formatting: first we format the data
    width = 3*len(groups) + 1
    print('Percentage spent by category')
    for percentage in range(100, -1, -10):
        print(f'{percentage:3}|', end='')
        for spent in groups.values():
            if round((spent / total) * 100) >= percentage:
                print('o'.center(3), end='')
            else:
                print(' '.center(3), end='')
        print(' ')

    # More tedious text formatting: now we format the labels!
    print('    ' + ('-' * width) + ' ') 
    longest = len(max(groups.keys(), key=len))
    # Tricky bit: make every label the same length, then splat so the zip
    # call groups on a per character basis
    for item in zip(*[x.ljust(longest) for x in groups.keys()]):
        print('    ', end='')
        for letter in item:
            print(letter.center(3), end='')
        print(' ')


if __name__ == '__main__':
    # Example from the exercise page
    food = Category("Food")
    food.deposit(1000, "deposit")
    food.withdraw(10.15, "groceries")
    food.withdraw(15.89, "restaurant and more food for dessert")
    clothing = Category("Clothing")
    food.transfer(50, clothing)

    # Check the output
    print(food, '\n')
    create_spend_chart([food, clothing])