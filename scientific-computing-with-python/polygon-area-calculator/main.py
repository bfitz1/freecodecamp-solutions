class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def set_width(self, width):
        self.width = width
    
    def set_height(self, height):
        self.height = height
    
    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return 2*self.width + 2*self.height
    
    def get_diagonal(self):
        return (self.width**2 + self.height**2) ** .5
    
    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."

        lines = []
        for _ in range(self.height):
            lines.append("*" * self.width)
        return "\n".join(lines)
    
    def get_amount_inside(self, shape):
        return self.get_area // shape.get_area
    
    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"

class Square:
    pass

if __name__ == "__main__":
    rect = Rectangle(10, 5)
    print(rect.get_area())
    rect.set_height(3)
    print(rect.get_perimeter())
    print(rect)
    print(rect.get_picture())