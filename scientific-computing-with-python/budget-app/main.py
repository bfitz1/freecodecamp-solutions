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
            line += str(item['amount']).rjust(7, ' ')
            total += item['amount']
            lines.append(line)
        lines.append(f'Total: {total:.2f}')
        return '\n'.join(lines)


def create_spend_chart(categories):
    pass

if __name__ == '__main__':
    # Example code
    food = Category("Food")
    food.deposit(1000, "deposit")
    food.withdraw(10.15, "groceries")
    food.withdraw(15.89, "restaurant and more food for dessert")
    clothing = Category("Clothing")
    food.transfer(50, clothing)
    print(food)