import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockRecipes, mockMealPlan } from "@/lib/mock-data"
import {
  ChefHat,
  Calendar,
  Heart,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Utensils,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const favoriteCount = mockRecipes.filter((r) => r.isFavorite).length
  const todaysMeals = mockMealPlan[0]
  const recentRecipes = mockRecipes.slice(0, 4)

  const stats = [
    {
      title: "Total Recipes",
      value: mockRecipes.length,
      icon: ChefHat,
      description: "In your collection",
      trend: "+3 this week",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Favorites",
      value: favoriteCount,
      icon: Heart,
      description: "Saved recipes",
      trend: "Most loved",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Meals Planned",
      value: 12,
      icon: Calendar,
      description: "This week",
      trend: "On track",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Shopping List",
      value: 24,
      icon: ShoppingCart,
      description: "Items to buy",
      trend: "Ready to shop",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here&apos;s your kitchen at a glance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/planner">
                <Calendar className="size-4 mr-2" />
                View Planner
              </Link>
            </Button>
            <Button asChild>
              <Link href="/recipes/new">
                <Plus className="size-4 mr-2" />
                Add Recipe
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp className="size-3 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Meals */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Today&apos;s Meals</CardTitle>
                <CardDescription>Your meal plan for today</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/planner">
                  Edit Plan
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {["breakfast", "lunch", "dinner"].map((mealType) => {
                  const meal = todaysMeals?.meals[mealType as keyof typeof todaysMeals.meals]
                  const mealLabels = {
                    breakfast: { label: "Breakfast", icon: "🌅", time: "7:00 AM" },
                    lunch: { label: "Lunch", icon: "☀️", time: "12:00 PM" },
                    dinner: { label: "Dinner", icon: "🌙", time: "6:00 PM" },
                  }
                  const info = mealLabels[mealType as keyof typeof mealLabels]

                  return (
                    <div
                      key={mealType}
                      className="group relative rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all"
                    >
                      {meal && !Array.isArray(meal) ? (
                        <>
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={meal.image}
                              alt={meal.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>{info.icon}</span>
                              <span>{info.label}</span>
                              <span className="ml-auto">{info.time}</span>
                            </div>
                            <p className="font-medium text-sm line-clamp-1">
                              {meal.title}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              <span>{meal.prepTime + meal.cookTime} min</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="aspect-[16/10] flex flex-col items-center justify-center p-4 bg-muted/30">
                          <span className="text-2xl mb-2">{info.icon}</span>
                          <p className="text-sm font-medium text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {info.time}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3"
                            asChild
                          >
                            <Link href="/recipes">
                              <Plus className="size-3 mr-1" />
                              Add Meal
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription>Common tasks at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/recipes/new"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Plus className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    Add New Recipe
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Save your favorite dishes
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/planner"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Calendar className="size-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    Plan Your Week
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Organize meals ahead
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/recipes?favorites=true"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Heart className="size-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    View Favorites
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your most loved recipes
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/shopping-list"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <ShoppingCart className="size-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    Shopping List
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Export to your supermarket
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Recipes */}
        <Card className="mt-6 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Recipes</CardTitle>
              <CardDescription>Recently added to your collection</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/recipes">
                View All
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="group relative rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.category}
                      </Badge>
                      {recipe.isFavorite && (
                        <Heart className="size-3 fill-red-500 text-red-500" />
                      )}
                    </div>
                    <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {recipe.prepTime + recipe.cookTime}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils className="size-3" />
                        {recipe.servings}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
