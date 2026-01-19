import { notFound } from "next/navigation"
import { mockRecipes } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Share2,
  Printer,
  Calendar,
  ArrowLeft,
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = mockRecipes.find((r) => r.id === id)

  if (!recipe) {
    notFound()
  }

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 dark:bg-black/50 backdrop-blur-sm border-0"
            asChild
          >
            <Link href="/recipes">
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 dark:bg-black/50 backdrop-blur-sm border-0"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 dark:bg-black/50 backdrop-blur-sm border-0"
          >
            <Printer className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 dark:bg-black/50 backdrop-blur-sm border-0"
          >
            <Heart
              className={cn(
                "size-4",
                recipe.isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </Button>
        </div>

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-white/90 text-foreground">
                {recipe.category}
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {recipe.cuisine}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {recipe.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="font-semibold">{totalTime} min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Users className="size-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <ChefHat className="size-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className={cn(
                  "font-semibold",
                  recipe.difficulty === "Easy" && "text-emerald-600 dark:text-emerald-400",
                  recipe.difficulty === "Medium" && "text-amber-600 dark:text-amber-400",
                  recipe.difficulty === "Hard" && "text-red-600 dark:text-red-400"
                )}>
                  {recipe.difficulty}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <Calendar className="size-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prep / Cook</p>
                <p className="font-semibold">{recipe.prepTime}m / {recipe.cookTime}m</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ingredients */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-primary flex-shrink-0" />
                      <span>
                        <span className="font-medium">{ingredient.amount} {ingredient.unit}</span>{" "}
                        {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-foreground/90 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition */}
            {recipe.nutritionInfo && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Nutrition</CardTitle>
                  <p className="text-sm text-muted-foreground">Per serving</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
                    <div className="flex items-center gap-2">
                      <Flame className="size-4 text-orange-500" />
                      <span className="text-sm">Calories</span>
                    </div>
                    <span className="font-semibold">{recipe.nutritionInfo.calories}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10">
                    <div className="flex items-center gap-2">
                      <Beef className="size-4 text-red-500" />
                      <span className="text-sm">Protein</span>
                    </div>
                    <span className="font-semibold">{recipe.nutritionInfo.protein}g</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                    <div className="flex items-center gap-2">
                      <Wheat className="size-4 text-amber-500" />
                      <span className="text-sm">Carbs</span>
                    </div>
                    <span className="font-semibold">{recipe.nutritionInfo.carbs}g</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10">
                    <div className="flex items-center gap-2">
                      <Droplets className="size-4 text-yellow-600" />
                      <span className="text-sm">Fat</span>
                    </div>
                    <span className="font-semibold">{recipe.nutritionInfo.fat}g</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add to Planner */}
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardContent className="p-6 text-center">
                <Calendar className="size-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Add to Meal Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule this recipe for an upcoming meal
                </p>
                <Button className="w-full">
                  <Calendar className="size-4 mr-2" />
                  Add to Planner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
