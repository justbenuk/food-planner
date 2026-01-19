export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  cuisine: string
  ingredients: Ingredient[]
  instructions: string[]
  nutritionInfo?: NutritionInfo
  tags: string[]
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Ingredient {
  name: string
  amount: string
  unit: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
}

export interface MealPlan {
  id: string
  date: string
  meals: {
    breakfast?: Recipe | null
    lunch?: Recipe | null
    dinner?: Recipe | null
    snacks?: Recipe[]
  }
}

export interface WeeklyPlan {
  weekStart: string
  days: MealPlan[]
}
