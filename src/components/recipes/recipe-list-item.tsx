"use client"

import { Recipe } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface RecipeListItemProps {
  recipe: Recipe
}

export function RecipeListItem({ recipe }: RecipeListItemProps) {
  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="group flex gap-4 p-4 border rounded-xl hover:shadow-md transition-all bg-card">
        <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs">
                  {recipe.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {recipe.cuisine}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                {recipe.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                {recipe.description}
              </p>
            </div>

            <button
              className="p-2 rounded-full hover:bg-accent transition-colors flex-shrink-0"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Heart
                className={cn(
                  "size-5 transition-colors",
                  recipe.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                )}
              />
            </button>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>{recipe.servings} servings</span>
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
      </div>
    </Link>
  )
}
