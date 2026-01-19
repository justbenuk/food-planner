"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { categories, cuisines } from "@/lib/mock-data"
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecipeFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedCuisine: string
  setSelectedCuisine: (cuisine: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
}

export function RecipeFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCuisine,
  setSelectedCuisine,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
}: RecipeFiltersProps) {
  const hasActiveFilters = selectedCategory !== "All" || selectedCuisine !== "All" || searchQuery

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedCuisine("All")
  }

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="size-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 size-5 p-0 flex items-center justify-center text-xs">
                !
              </Badge>
            )}
          </Button>

          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === "grid" && "bg-accent"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === "list" && "bg-accent"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Panels */}
      {showFilters && (
        <div className="p-4 border rounded-xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-colors",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Cuisine</label>
              <div className="flex flex-wrap gap-2">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-colors",
                      selectedCuisine === cuisine
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
