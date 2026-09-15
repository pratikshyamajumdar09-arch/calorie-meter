import { FoodPreset, DailyGoals } from '../types';

export const DEFAULT_GOALS: DailyGoals = {
  calorieGoal: 2000,
  proteinGoal: 130,
  carbsGoal: 220,
  fatGoal: 65,
};

export interface ExtendedFoodPreset extends FoodPreset {
  category: 'breakfast' | 'meals' | 'proteins' | 'fruits-veg' | 'grains' | 'snacks' | 'dairy' | 'drinks';
  tags?: string[];
}

export const POPULAR_FOOD_PRESETS: ExtendedFoodPreset[] = [
  // --- BREAKFAST CLASSICS ---
  { name: 'Rolled Oats with Honey & Berries', calories: 280, protein: 9, carbs: 52, fat: 4, mealType: 'breakfast', portion: '1 bowl (70g dry)', category: 'breakfast', tags: ['oatmeal', 'porridge', 'grain', 'fruit'] },
  { name: 'Eggs (2 scrambled) with Olive Oil', calories: 210, protein: 14, carbs: 2, fat: 16, mealType: 'breakfast', portion: '2 large eggs', category: 'breakfast', tags: ['egg', 'breakfast', 'protein'] },
  { name: 'Boiled Eggs (2 large)', calories: 155, protein: 13, carbs: 1, fat: 11, mealType: 'breakfast', portion: '2 eggs', category: 'breakfast', tags: ['egg', 'boiled', 'protein', 'keto'] },
  { name: 'Egg Whites (3 whites / 100g)', calories: 52, protein: 11, carbs: 1, fat: 0, mealType: 'breakfast', portion: '3 whites', category: 'breakfast', tags: ['egg', 'protein', 'low cal', 'fat free'] },
  { name: 'Omelette with Spinach & Feta', calories: 260, protein: 18, carbs: 4, fat: 19, mealType: 'breakfast', portion: '2 egg omelette', category: 'breakfast', tags: ['egg', 'cheese', 'veggie'] },
  { name: 'Avocado Toast on Whole Wheat', calories: 260, protein: 7, carbs: 28, fat: 14, mealType: 'breakfast', portion: '1 thick slice', category: 'breakfast', tags: ['toast', 'avocado', 'bread', 'healthy'] },
  { name: 'Pancakes with Maple Syrup (2)', calories: 350, protein: 7, carbs: 64, fat: 8, mealType: 'breakfast', portion: '2 medium pancakes', category: 'breakfast', tags: ['pancake', 'syrup', 'sweet'] },
  { name: 'Belgian Waffle (Plain)', calories: 310, protein: 6, carbs: 38, fat: 15, mealType: 'breakfast', portion: '1 waffle (100g)', category: 'breakfast', tags: ['waffle', 'sweet'] },
  { name: 'French Toast with Cinnamon', calories: 290, protein: 10, carbs: 36, fat: 12, mealType: 'breakfast', portion: '2 slices', category: 'breakfast', tags: ['french toast', 'bread'] },
  { name: 'Breakfast Burrito (Eggs, Bacon, Cheese)', calories: 480, protein: 24, carbs: 38, fat: 26, mealType: 'breakfast', portion: '1 wrap', category: 'breakfast', tags: ['burrito', 'wrap', 'bacon'] },
  { name: 'Bagel with Cream Cheese', calories: 360, protein: 11, carbs: 54, fat: 11, mealType: 'breakfast', portion: '1 regular bagel', category: 'breakfast', tags: ['bagel', 'bread', 'cream cheese'] },
  { name: 'Granola with Greek Yogurt & Honey', calories: 320, protein: 18, carbs: 44, fat: 8, mealType: 'breakfast', portion: '1 bowl (220g)', category: 'breakfast', tags: ['yogurt', 'granola'] },

  // --- PROTEINS & MEATS ---
  { name: 'Grilled Chicken Breast (skinless)', calories: 240, protein: 46, carbs: 0, fat: 5, mealType: 'lunch', portion: '200g cooked', category: 'proteins', tags: ['chicken', 'poultry', 'lean', 'meat'] },
  { name: 'Roast Chicken Thigh (with skin)', calories: 280, protein: 30, carbs: 0, fat: 18, mealType: 'dinner', portion: '1 thigh (150g)', category: 'proteins', tags: ['chicken', 'poultry', 'meat'] },
  { name: 'Lean Ground Beef (90/10)', calories: 290, protein: 35, carbs: 0, fat: 15, mealType: 'dinner', portion: '170g (6 oz)', category: 'proteins', tags: ['beef', 'meat', 'mince'] },
  { name: 'Ribeye Steak (Grilled)', calories: 420, protein: 40, carbs: 0, fat: 28, mealType: 'dinner', portion: '200g (7 oz)', category: 'proteins', tags: ['steak', 'beef', 'meat'] },
  { name: 'Sirloin Steak (Lean)', calories: 310, protein: 44, carbs: 0, fat: 14, mealType: 'dinner', portion: '200g (7 oz)', category: 'proteins', tags: ['steak', 'beef', 'lean'] },
  { name: 'Grilled Atlantic Salmon', calories: 340, protein: 38, carbs: 0, fat: 20, mealType: 'dinner', portion: '1 fillet (180g)', category: 'proteins', tags: ['salmon', 'fish', 'seafood', 'omega3'] },
  { name: 'Canned Tuna in Water (Drained)', calories: 140, protein: 32, carbs: 0, fat: 1, mealType: 'lunch', portion: '1 can (130g)', category: 'proteins', tags: ['tuna', 'fish', 'canned', 'lean'] },
  { name: 'Baked Cod / White Fish Fillet', calories: 160, protein: 36, carbs: 0, fat: 2, mealType: 'dinner', portion: '200g fillet', category: 'proteins', tags: ['fish', 'cod', 'white fish', 'lean'] },
  { name: 'Jumbo Shrimp / Prawns (Steamed)', calories: 120, protein: 26, carbs: 1, fat: 1, mealType: 'lunch', portion: '150g (8-10 shrimp)', category: 'proteins', tags: ['shrimp', 'prawn', 'seafood'] },
  { name: 'Pork Chop (Lean grilled)', calories: 260, protein: 36, carbs: 0, fat: 12, mealType: 'dinner', portion: '1 chop (180g)', category: 'proteins', tags: ['pork', 'meat'] },
  { name: 'Bacon Strips (Crispy, 3 slices)', calories: 135, protein: 9, carbs: 0, fat: 11, mealType: 'breakfast', portion: '3 slices (35g)', category: 'proteins', tags: ['bacon', 'pork'] },
  { name: 'Turkey Breast Slices (Deli)', calories: 110, protein: 24, carbs: 2, fat: 1, mealType: 'lunch', portion: '120g (4 slices)', category: 'proteins', tags: ['turkey', 'deli', 'cold cuts'] },
  { name: 'Tofu (Firm, pan-seared)', calories: 170, protein: 18, carbs: 4, fat: 9, mealType: 'dinner', portion: '150g (1/2 block)', category: 'proteins', tags: ['tofu', 'vegan', 'plant', 'soy'] },
  { name: 'Tempeh (Grilled strips)', calories: 230, protein: 22, carbs: 11, fat: 12, mealType: 'dinner', portion: '120g', category: 'proteins', tags: ['tempeh', 'vegan', 'soy'] },

  // --- POPULAR MEALS & COMBOS ---
  { name: 'Grilled Chicken with Brown Rice & Broccoli', calories: 480, protein: 48, carbs: 54, fat: 8, mealType: 'lunch', portion: '1 meal prep container', category: 'meals', tags: ['chicken', 'rice', 'broccoli', 'fitness', 'clean'] },
  { name: 'Baked Salmon with Sweet Potato & Asparagus', calories: 520, protein: 42, carbs: 38, fat: 22, mealType: 'dinner', portion: '1 plate', category: 'meals', tags: ['salmon', 'sweet potato', 'dinner'] },
  { name: 'Tuna Salad Sandwich (Whole Grain)', calories: 380, protein: 29, carbs: 36, fat: 12, mealType: 'lunch', portion: '1 sandwich', category: 'meals', tags: ['tuna', 'sandwich', 'bread'] },
  { name: 'Turkey & Swiss Wrap with Greens', calories: 390, protein: 32, carbs: 34, fat: 14, mealType: 'lunch', portion: '1 wrap', category: 'meals', tags: ['turkey', 'wrap', 'lunch'] },
  { name: 'Caesar Salad with Grilled Chicken', calories: 480, protein: 34, carbs: 14, fat: 32, mealType: 'lunch', portion: '1 large bowl', category: 'meals', tags: ['salad', 'caesar', 'chicken'] },
  { name: 'Mediterranean Quinoa & Feta Bowl', calories: 410, protein: 14, carbs: 54, fat: 16, mealType: 'lunch', portion: '1 bowl', category: 'meals', tags: ['quinoa', 'feta', 'bowl', 'salad'] },
  { name: 'Chicken Burrito Bowl (Rice, Beans, Salsa)', calories: 640, protein: 42, carbs: 78, fat: 18, mealType: 'lunch', portion: '1 large bowl', category: 'meals', tags: ['burrito', 'bowl', 'chipotle', 'mexican'] },
  { name: 'Beef Burger with Cheddar & Brioche Bun', calories: 650, protein: 38, carbs: 45, fat: 36, mealType: 'dinner', portion: '1 burger', category: 'meals', tags: ['burger', 'beef', 'cheeseburger'] },
  { name: 'Classic Margherita Pizza', calories: 580, protein: 24, carbs: 68, fat: 22, mealType: 'dinner', portion: '2 slices (regular)', category: 'meals', tags: ['pizza', 'cheese', 'italian'] },
  { name: 'Pepperoni Pizza', calories: 660, protein: 28, carbs: 66, fat: 32, mealType: 'dinner', portion: '2 slices', category: 'meals', tags: ['pizza', 'pepperoni'] },
  { name: 'Spaghetti Bolognese with Parmesan', calories: 540, protein: 28, carbs: 72, fat: 15, mealType: 'dinner', portion: '1 plate (350g)', category: 'meals', tags: ['pasta', 'spaghetti', 'bolognese', 'beef'] },
  { name: 'Pasta with Garlic & Olive Oil (Aglio e Olio)', calories: 420, protein: 11, carbs: 66, fat: 14, mealType: 'dinner', portion: '1 plate', category: 'meals', tags: ['pasta', 'noodles'] },
  { name: 'Japanese Chicken Ramen (Broth, Noodles, Egg)', calories: 590, protein: 32, carbs: 68, fat: 21, mealType: 'dinner', portion: '1 bowl', category: 'meals', tags: ['ramen', 'soup', 'japanese', 'noodles'] },
  { name: 'California Sushi Roll (8 pcs)', calories: 310, protein: 9, carbs: 52, fat: 7, mealType: 'lunch', portion: '8 pieces', category: 'meals', tags: ['sushi', 'japanese', 'roll'] },
  { name: 'Salmon Avocado Sushi Roll (8 pcs)', calories: 380, protein: 18, carbs: 48, fat: 12, mealType: 'lunch', portion: '8 pieces', category: 'meals', tags: ['sushi', 'salmon', 'avocado'] },
  { name: 'Pad Thai with Shrimp & Peanuts', calories: 620, protein: 26, carbs: 84, fat: 20, mealType: 'dinner', portion: '1 take-out box', category: 'meals', tags: ['thai', 'pad thai', 'noodles'] },
  { name: 'Chicken Tikka Masala with Basmati Rice', calories: 680, protein: 42, carbs: 74, fat: 24, mealType: 'dinner', portion: '1 plate', category: 'meals', tags: ['curry', 'indian', 'chicken', 'rice'] },
  { name: 'Lentil Soup with Crusty Bread', calories: 340, protein: 18, carbs: 54, fat: 5, mealType: 'lunch', portion: '1 large bowl + 1 roll', category: 'meals', tags: ['soup', 'lentils', 'vegan'] },
  { name: 'Grilled Cheese Sandwich', calories: 410, protein: 16, carbs: 34, fat: 24, mealType: 'lunch', portion: '1 sandwich', category: 'meals', tags: ['cheese', 'sandwich', 'comfort'] },

  // --- GRAINS, RICE, BREAD & PASTA ---
  { name: 'Cooked White Jasmine / Basmati Rice', calories: 205, protein: 4, carbs: 45, fat: 0, mealType: 'lunch', portion: '1 cup (158g)', category: 'grains', tags: ['rice', 'white rice', 'grain'] },
  { name: 'Cooked Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 2, mealType: 'lunch', portion: '1 cup (195g)', category: 'grains', tags: ['rice', 'brown rice', 'grain', 'fiber'] },
  { name: 'Cooked Quinoa', calories: 220, protein: 8, carbs: 39, fat: 4, mealType: 'lunch', portion: '1 cup (185g)', category: 'grains', tags: ['quinoa', 'grain', 'protein'] },
  { name: 'Whole Wheat Bread (1 slice)', calories: 85, protein: 4, carbs: 15, fat: 1, mealType: 'breakfast', portion: '1 slice (38g)', category: 'grains', tags: ['bread', 'wheat', 'toast'] },
  { name: 'Sourdough Bread (1 thick slice)', calories: 120, protein: 4, carbs: 24, fat: 1, mealType: 'breakfast', portion: '1 slice (50g)', category: 'grains', tags: ['bread', 'sourdough'] },
  { name: 'Flour Tortilla (Large)', calories: 180, protein: 4, carbs: 32, fat: 4, mealType: 'lunch', portion: '1 tortilla (60g)', category: 'grains', tags: ['tortilla', 'wrap'] },
  { name: 'Corn Tortilla (2 small)', calories: 110, protein: 3, carbs: 22, fat: 1, mealType: 'dinner', portion: '2 tortillas', category: 'grains', tags: ['tortilla', 'corn', 'taco'] },
  { name: 'Baked Potato (Medium, with skin)', calories: 160, protein: 4, carbs: 37, fat: 0, mealType: 'dinner', portion: '1 medium (170g)', category: 'grains', tags: ['potato', 'baked potato', 'carb'] },
  { name: 'Baked Sweet Potato', calories: 140, protein: 3, carbs: 33, fat: 0, mealType: 'dinner', portion: '1 medium (150g)', category: 'grains', tags: ['sweet potato', 'yam', 'carb'] },
  { name: 'French Fries (Medium serving)', calories: 365, protein: 4, carbs: 48, fat: 18, mealType: 'lunch', portion: '1 medium (115g)', category: 'grains', tags: ['fries', 'potato', 'fried'] },

  // --- FRUITS & VEGETABLES ---
  { name: 'Medium Banana', calories: 105, protein: 1, carbs: 27, fat: 0, mealType: 'snack', portion: '1 medium (118g)', category: 'fruits-veg', tags: ['banana', 'fruit', 'potassium'] },
  { name: 'Medium Apple (Gala / Honeycrisp)', calories: 95, protein: 0, carbs: 25, fat: 0, mealType: 'snack', portion: '1 medium (180g)', category: 'fruits-veg', tags: ['apple', 'fruit', 'snack'] },
  { name: 'Fresh Strawberries (1 cup)', calories: 50, protein: 1, carbs: 12, fat: 0, mealType: 'snack', portion: '1 cup (150g)', category: 'fruits-veg', tags: ['strawberry', 'berries', 'fruit', 'low cal'] },
  { name: 'Fresh Blueberries (1 cup)', calories: 85, protein: 1, carbs: 21, fat: 0, mealType: 'snack', portion: '1 cup (148g)', category: 'fruits-veg', tags: ['blueberry', 'berries', 'fruit'] },
  { name: 'Orange / Clementines (2 small)', calories: 70, protein: 1, carbs: 18, fat: 0, mealType: 'snack', portion: '2 small or 1 large', category: 'fruits-veg', tags: ['orange', 'citrus', 'fruit'] },
  { name: 'Fresh Mango Slices (1 cup)', calories: 100, protein: 1, carbs: 25, fat: 1, mealType: 'snack', portion: '1 cup (165g)', category: 'fruits-veg', tags: ['mango', 'tropical', 'fruit'] },
  { name: 'Watermelon Wedges (2 cups diced)', calories: 90, protein: 2, carbs: 22, fat: 0, mealType: 'snack', portion: '2 cups (300g)', category: 'fruits-veg', tags: ['watermelon', 'melon', 'fruit'] },
  { name: 'Avocado (1/2 fruit)', calories: 160, protein: 2, carbs: 9, fat: 15, mealType: 'lunch', portion: '1/2 medium (100g)', category: 'fruits-veg', tags: ['avocado', 'healthy fat'] },
  { name: 'Steamed Broccoli (1 cup)', calories: 55, protein: 4, carbs: 11, fat: 1, mealType: 'dinner', portion: '1 cup (150g)', category: 'fruits-veg', tags: ['broccoli', 'vegetable', 'greens'] },
  { name: 'Baby Spinach (Raw salad, 2 cups)', calories: 15, protein: 2, carbs: 2, fat: 0, mealType: 'lunch', portion: '2 cups (60g)', category: 'fruits-veg', tags: ['spinach', 'greens', 'salad'] },
  { name: 'Carrot Sticks with Hummus (2 tbsp)', calories: 120, protein: 3, carbs: 15, fat: 6, mealType: 'snack', portion: '1 carrot + 2 tbsp hummus', category: 'fruits-veg', tags: ['carrots', 'hummus', 'snack'] },
  { name: 'Cucumber Slices (1 whole)', calories: 30, protein: 2, carbs: 6, fat: 0, mealType: 'snack', portion: '1 whole (200g)', category: 'fruits-veg', tags: ['cucumber', 'vegetable', 'low cal'] },
  { name: 'Mixed Garden Salad (no dressing)', calories: 35, protein: 2, carbs: 7, fat: 0, mealType: 'lunch', portion: '1 large bowl', category: 'fruits-veg', tags: ['salad', 'lettuce', 'veggie'] },

  // --- DAIRY, CHEESE & PLANT MILKS ---
  { name: 'Greek Yogurt 0% (Plain)', calories: 130, protein: 22, carbs: 7, fat: 0, mealType: 'breakfast', portion: '1 cup (225g)', category: 'dairy', tags: ['yogurt', 'greek yogurt', 'protein', 'dairy'] },
  { name: 'Greek Yogurt (Whole Milk, 5%)', calories: 200, protein: 18, carbs: 9, fat: 11, mealType: 'breakfast', portion: '1 cup (225g)', category: 'dairy', tags: ['yogurt', 'greek', 'full fat'] },
  { name: 'Cottage Cheese (Low fat 2%)', calories: 180, protein: 24, carbs: 8, fat: 5, mealType: 'snack', portion: '1 cup (226g)', category: 'dairy', tags: ['cottage cheese', 'cheese', 'protein'] },
  { name: 'Whole Milk (1 glass)', calories: 150, protein: 8, carbs: 12, fat: 8, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'dairy', tags: ['milk', 'dairy'] },
  { name: 'Skim / Fat-Free Milk', calories: 85, protein: 8, carbs: 12, fat: 0, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'dairy', tags: ['milk', 'skim', 'dairy'] },
  { name: 'Unsweetened Almond Milk', calories: 35, protein: 1, carbs: 1, fat: 3, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'dairy', tags: ['almond milk', 'plant milk', 'vegan'] },
  { name: 'Oat Milk (Barista standard)', calories: 130, protein: 3, carbs: 16, fat: 7, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'dairy', tags: ['oat milk', 'plant milk'] },
  { name: 'Cheddar Cheese (1 slice / block)', calories: 115, protein: 7, carbs: 0, fat: 9, mealType: 'snack', portion: '1 oz (28g)', category: 'dairy', tags: ['cheese', 'cheddar'] },
  { name: 'Fresh Mozzarella Cheese', calories: 85, protein: 6, carbs: 1, fat: 6, mealType: 'lunch', portion: '1 slice (30g)', category: 'dairy', tags: ['mozzarella', 'cheese'] },
  { name: 'Butter / Ghee (1 tablespoon)', calories: 100, protein: 0, carbs: 0, fat: 11, mealType: 'breakfast', portion: '1 tbsp (14g)', category: 'dairy', tags: ['butter', 'ghee', 'fat'] },

  // --- NUTS, SNACKS & TREATS ---
  { name: 'Peanut Butter (2 tablespoons)', calories: 190, protein: 8, carbs: 7, fat: 16, mealType: 'snack', portion: '2 tbsp (32g)', category: 'snacks', tags: ['peanut butter', 'pb', 'nuts'] },
  { name: 'Raw Almonds (Handful)', calories: 165, protein: 6, carbs: 6, fat: 14, mealType: 'snack', portion: '23 almonds (28g)', category: 'snacks', tags: ['almonds', 'nuts', 'snack'] },
  { name: 'Walnuts (Handful)', calories: 185, protein: 4, carbs: 4, fat: 18, mealType: 'snack', portion: '14 halves (28g)', category: 'snacks', tags: ['walnuts', 'nuts', 'omega3'] },
  { name: 'Cashews (Handful)', calories: 160, protein: 5, carbs: 9, fat: 13, mealType: 'snack', portion: '1 oz (28g)', category: 'snacks', tags: ['cashews', 'nuts'] },
  { name: 'Whey Protein Shake with Water', calories: 130, protein: 25, carbs: 3, fat: 2, mealType: 'snack', portion: '1 scoop (32g)', category: 'snacks', tags: ['whey', 'protein shake', 'powder', 'supplement'] },
  { name: 'Protein Bar (Chocolate Peanut)', calories: 210, protein: 20, carbs: 22, fat: 7, mealType: 'snack', portion: '1 bar (60g)', category: 'snacks', tags: ['protein bar', 'snack'] },
  { name: 'Dark Chocolate (70-85% cocoa)', calories: 170, protein: 2, carbs: 13, fat: 12, mealType: 'snack', portion: '3 squares (30g)', category: 'snacks', tags: ['chocolate', 'dark chocolate', 'sweet'] },
  { name: 'Potato Chips (Single bag)', calories: 160, protein: 2, carbs: 15, fat: 10, mealType: 'snack', portion: '1 small bag (28g)', category: 'snacks', tags: ['chips', 'crisps', 'snack'] },
  { name: 'Tortilla Chips & Salsa', calories: 170, protein: 2, carbs: 24, fat: 8, mealType: 'snack', portion: '12 chips + salsa', category: 'snacks', tags: ['tortilla chips', 'salsa'] },
  { name: 'Air-popped Popcorn (3 cups)', calories: 95, protein: 3, carbs: 19, fat: 1, mealType: 'snack', portion: '3 cups popped', category: 'snacks', tags: ['popcorn', 'snack', 'low cal'] },
  { name: 'Chocolate Chip Cookie', calories: 150, protein: 2, carbs: 20, fat: 7, mealType: 'snack', portion: '1 medium cookie', category: 'snacks', tags: ['cookie', 'dessert', 'sweet'] },
  { name: 'Vanilla Ice Cream (1 scoop)', calories: 140, protein: 2, carbs: 16, fat: 7, mealType: 'snack', portion: '1/2 cup (70g)', category: 'snacks', tags: ['ice cream', 'dessert'] },

  // --- BEVERAGES & DRINKS ---
  { name: 'Black Coffee / Cold Brew / Espresso', calories: 5, protein: 0, carbs: 1, fat: 0, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'drinks', tags: ['coffee', 'caffeine', 'black coffee', 'zero cal'] },
  { name: 'Caffe Latte with Whole Milk', calories: 150, protein: 8, carbs: 12, fat: 7, mealType: 'breakfast', portion: '1 cup (240ml)', category: 'drinks', tags: ['latte', 'coffee', 'milk'] },
  { name: 'Iced Caramel Macchiato', calories: 250, protein: 7, carbs: 34, fat: 8, mealType: 'snack', portion: 'Grande (16 oz)', category: 'drinks', tags: ['starbucks', 'coffee', 'sweet'] },
  { name: 'Green Tea / Black Tea (Unsweetened)', calories: 2, protein: 0, carbs: 0, fat: 0, mealType: 'breakfast', portion: '1 mug', category: 'drinks', tags: ['tea', 'green tea', 'zero cal'] },
  { name: 'Fresh Orange Juice', calories: 110, protein: 2, carbs: 26, fat: 0, mealType: 'breakfast', portion: '1 glass (240ml)', category: 'drinks', tags: ['juice', 'orange juice', 'drink'] },
  { name: 'Coca-Cola / Pepsi (Regular can)', calories: 140, protein: 0, carbs: 39, fat: 0, mealType: 'lunch', portion: '1 can (355ml)', category: 'drinks', tags: ['coke', 'soda', 'pepsi', 'cola'] },
  { name: 'Diet Coke / Coke Zero', calories: 0, protein: 0, carbs: 0, fat: 0, mealType: 'lunch', portion: '1 can (355ml)', category: 'drinks', tags: ['diet coke', 'coke zero', 'zero cal', 'soda'] },
  { name: 'Pure Coconut Water', calories: 45, protein: 1, carbs: 10, fat: 0, mealType: 'snack', portion: '1 cup (240ml)', category: 'drinks', tags: ['coconut water', 'hydration'] },
];

export const ACTIVITY_PRESETS = [
  { name: 'Brisk Walking (30 min)', calories: 140, duration: 30 },
  { name: 'Outdoor Jogging / Running (30 min)', calories: 310, duration: 30 },
  { name: 'Strength / Weight Training (45 min)', calories: 220, duration: 45 },
  { name: 'Cycling / Spin Class (30 min)', calories: 260, duration: 30 },
  { name: 'HIIT / Cardio Workout (25 min)', calories: 250, duration: 25 },
  { name: 'Swimming Laps (30 min)', calories: 280, duration: 30 },
  { name: 'Yoga / Pilates (40 min)', calories: 130, duration: 40 },
  { name: 'Jump Rope (15 min)', calories: 180, duration: 15 },
  { name: 'Stair Climber (20 min)', calories: 190, duration: 20 },
  { name: 'Basketball / Soccer (45 min)', calories: 360, duration: 45 },
];
