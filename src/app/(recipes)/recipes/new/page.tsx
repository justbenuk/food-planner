"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, cuisines } from "@/lib/mock-data"
import { ArrowLeft, Plus, X, Upload, Save, ImageIcon } from "lucide-react"
import Link from "next/link"

interface IngredientInput {
  id: string
  name: string
  amount: string
  unit: string
}

export default function NewRecipePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [servings, setServings] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { id: "1", name: "", amount: "", unit: "" },
  ])
  const [instructions, setInstructions] = useState<string[]>([""])
  const [tags, setTags] = useState("")

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: "", amount: "", unit: "" },
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, field: keyof IngredientInput, value: string) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    )
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index))
    }
  }

  const updateInstruction = (index: number, value: string) => {
    setInstructions(instructions.map((inst, i) => (i === index ? value : inst)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      cuisine,
      imageUrl,
      ingredients,
      instructions,
      tags: tags.split(",").map((t) => t.trim()),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/recipes">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Recipe</h1>
            <p className="text-muted-foreground mt-1">
              Share your culinary creation with the world
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                The essential details about your recipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Grandma's Famous Chocolate Cake"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe in a few sentences..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Recipe Image</Label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  {imageUrl ? (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Recipe preview"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setImageUrl("")}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center">
                        <ImageIcon className="size-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Upload an image</p>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop or click to browse
                        </p>
                      </div>
                      <Input
                        type="text"
                        placeholder="Or paste an image URL..."
                        className="max-w-sm mx-auto"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c !== "All").map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine</Label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisines.filter((c) => c !== "All").map((cuis) => (
                        <SelectItem key={cuis} value={cuis}>
                          {cuis}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time & Servings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Time & Servings</CardTitle>
              <CardDescription>
                Help others plan their cooking time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    placeholder="15"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    placeholder="30"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="4"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>
                  List all the ingredients needed
                </CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="size-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 size-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid sm:grid-cols-3 gap-3">
                    <Input
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "amount", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Unit (cups, tbsp...)"
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "unit", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>
                  Step-by-step cooking directions
                </CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                <Plus className="size-4 mr-2" />
                Add Step
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <Textarea
                    placeholder={`Step ${index + 1}: Describe what to do...`}
                    rows={2}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeInstruction(index)}
                    disabled={instructions.length === 1}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Help others find your recipe with relevant tags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., quick, healthy, vegetarian, comfort-food (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/recipes">Cancel</Link>
            </Button>
            <Button type="submit">
              <Save className="size-4 mr-2" />
              Save Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
