"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/recipes/recipe-card"
import { RecipeListItem } from "@/components/recipes/recipe-list-item"
import { RecipeFilters } from "@/components/recipes/recipe-filters"
import { mockRecipes } from "@/lib/mock-data"
import { Plus, ChefHat } from "lucide-react"
import Link from "next/link"

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory

      const matchesCuisine =
        selectedCuisine === "All" || recipe.cuisine === selectedCuisine

      return matchesSearch && matchesCategory && matchesCuisine
    })
  }, [searchQuery, selectedCategory, selectedCuisine])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Recipes</h1>
            <p className="text-muted-foreground mt-1">
              {mockRecipes.length} recipes in your collection
            </p>
          </div>
          <Button asChild>
            <Link href="/recipes/new">
              <Plus className="size-4 mr-2" />
              Add Recipe
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <RecipeFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        {/* Results */}
        <div className="mt-6">
          {filteredRecipes.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredRecipes.length} recipe
                {filteredRecipes.length !== 1 ? "s" : ""}
              </p>

              {viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecipes.map((recipe) => (
                    <RecipeListItem key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <ChefHat className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No recipes found</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                {searchQuery || selectedCategory !== "All" || selectedCuisine !== "All"
                  ? "Try adjusting your filters or search terms"
                  : "Start building your collection by adding your first recipe"}
              </p>
              {!searchQuery && selectedCategory === "All" && selectedCuisine === "All" && (
                <Button className="mt-4" asChild>
                  <Link href="/recipes/new">
                    <Plus className="size-4 mr-2" />
                    Add Your First Recipe
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
