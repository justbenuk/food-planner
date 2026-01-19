"use client"

import { Recipe } from "@/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className={cn(
        "group overflow-hidden p-0 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-card",
        className
      )}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                recipe.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              )}
            />
          </button>

          <div className="absolute bottom-3 left-3 right-3">
            <Badge
              variant="secondary"
              className="bg-white/90 dark:bg-black/50 backdrop-blur-sm text-foreground"
            >
              {recipe.category}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {recipe.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>{recipe.servings}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat className="size-4" />
              <span className={cn(
                recipe.difficulty === "Easy" && "text-emerald-600 dark:text-emerald-400",
                recipe.difficulty === "Medium" && "text-amber-600 dark:text-amber-400",
                recipe.difficulty === "Hard" && "text-red-600 dark:text-red-400"
              )}>
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
