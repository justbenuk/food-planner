"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockMealPlan, mockRecipes } from "@/lib/mock-data"
import { Recipe } from "@/types"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ShoppingCart,
  Download,
  Clock,
  X,
  GripVertical,
  Utensils,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = [
  { id: "breakfast", label: "Breakfast", icon: "🌅", time: "7:00 AM" },
  { id: "lunch", label: "Lunch", icon: "☀️", time: "12:00 PM" },
  { id: "dinner", label: "Dinner", icon: "🌙", time: "6:00 PM" },
]

interface MealSlot {
  day: number
  mealType: string
  recipe: Recipe | null
}

export default function PlannerPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date("2024-01-22"))
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; mealType: string } | null>(null)

  const getDateForDay = (dayIndex: number) => {
    const date = new Date(currentWeekStart)
    date.setDate(date.getDate() + dayIndex)
    return date
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getMealForSlot = (dayIndex: number, mealType: string): Recipe | null => {
    const plan = mockMealPlan[dayIndex]
    if (!plan) return null
    const meal = plan.meals[mealType as keyof typeof plan.meals]
    if (Array.isArray(meal)) return null
    return meal || null
  }

  const previousWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeekStart(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeekStart(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    today.setDate(today.getDate() + diff)
    setCurrentWeekStart(today)
  }

  const weekEndDate = new Date(currentWeekStart)
  weekEndDate.setDate(weekEndDate.getDate() + 6)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meal Planner</h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop recipes to plan your week
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <ShoppingCart className="size-4 mr-2" />
              Shopping List
            </Button>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={previousWeek}>
                <ChevronLeft className="size-5" />
              </Button>

              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {formatDate(currentWeekStart)} - {formatDate(weekEndDate)}
                </h2>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
              </div>

              <Button variant="ghost" size="icon" onClick={nextWeek}>
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <div className="grid grid-cols-8 gap-2">
          {/* Time column */}
          <div className="space-y-2">
            <div className="h-16" /> {/* Header spacer */}
            {mealTypes.map((meal) => (
              <div
                key={meal.id}
                className="h-32 flex flex-col items-center justify-center text-center p-2"
              >
                <span className="text-2xl mb-1">{meal.icon}</span>
                <span className="font-medium text-sm">{meal.label}</span>
                <span className="text-xs text-muted-foreground">{meal.time}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {daysOfWeek.map((day, dayIndex) => {
            const date = getDateForDay(dayIndex)
            const isToday = new Date().toDateString() === date.toDateString()

            return (
              <div key={day} className="space-y-2">
                {/* Day header */}
                <div
                  className={cn(
                    "h-16 rounded-xl flex flex-col items-center justify-center",
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50"
                  )}
                >
                  <span className="font-semibold">{day}</span>
                  <span className={cn(
                    "text-sm",
                    isToday ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {date.getDate()}
                  </span>
                </div>

                {/* Meal slots */}
                {mealTypes.map((meal) => {
                  const recipe = getMealForSlot(dayIndex, meal.id)

                  return (
                    <div
                      key={`${day}-${meal.id}`}
                      className={cn(
                        "h-32 rounded-xl border-2 border-dashed transition-all overflow-hidden",
                        recipe
                          ? "border-transparent"
                          : "border-muted-foreground/20 hover:border-primary/50 hover:bg-accent/50",
                        selectedSlot?.day === dayIndex &&
                          selectedSlot?.mealType === meal.id &&
                          "ring-2 ring-primary"
                      )}
                      onClick={() => {
                        if (!recipe) {
                          setSelectedSlot({ day: dayIndex, mealType: meal.id })
                        }
                      }}
                    >
                      {recipe ? (
                        <div className="group relative h-full cursor-pointer">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 p-2 flex flex-col justify-end">
                            <p className="text-white text-xs font-medium line-clamp-2 leading-tight">
                              {recipe.title}
                            </p>
                            <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                              <Clock className="size-3" />
                              <span>{recipe.prepTime + recipe.cookTime}m</span>
                            </div>
                          </div>
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="size-6"
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <X className="size-3" />
                            </Button>
                          </div>
                          <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                            <div className="p-1 bg-black/50 rounded backdrop-blur-sm">
                              <GripVertical className="size-3 text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50">
                          <Plus className="size-5" />
                          <span className="text-xs mt-1">Add meal</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Recipe Picker Panel */}
        <Card className="border-0 shadow-sm mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Recipe Library</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/recipes">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedSlot
                ? `Select a recipe for ${fullDays[selectedSlot.day]} ${
                    mealTypes.find((m) => m.id === selectedSlot.mealType)?.label
                  }`
                : "Click on an empty slot to add a meal, or drag recipes from below"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockRecipes.slice(0, 6).map((recipe) => (
                <div
                  key={recipe.id}
                  className="group cursor-grab active:cursor-grabbing"
                  draggable
                  onClick={() => {
                    if (selectedSlot) {
                      setSelectedSlot(null)
                    }
                  }}
                >
                  <div className="relative rounded-xl overflow-hidden border hover:shadow-md transition-all">
                    <div className="aspect-square">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium line-clamp-1">
                        {recipe.title}
                      </p>
                      <div className="flex items-center gap-2 text-white/70 text-xs mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Clock className="size-3" />
                          {recipe.prepTime + recipe.cookTime}m
                        </span>
                        <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4">
                          {recipe.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="size-5 text-primary" />
                Meals Planned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">of 21 meals this week</p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "57%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="size-5 text-emerald-500" />
                Shopping List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">ingredients needed</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Generate List
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="size-5 text-amber-500" />
                Total Cook Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4h 30m</div>
              <p className="text-sm text-muted-foreground">estimated this week</p>
              <p className="text-xs text-muted-foreground mt-3">
                Average 38 min per meal
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
