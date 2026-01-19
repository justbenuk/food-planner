import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { mockRecipes } from "@/lib/mock-data"
import {
  ChefHat,
  Calendar,
  ShoppingCart,
  ArrowRight,
  Clock,
  Users,
  Heart,
  Star,
  Check,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: ChefHat,
    title: "Recipe Collection",
    description: "Store and organize all your favorite recipes in one beautiful place. Search, filter, and find what you need instantly.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Meal Planning",
    description: "Drag and drop recipes into your weekly calendar. Plan ahead and never wonder what's for dinner again.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: ShoppingCart,
    title: "Smart Shopping Lists",
    description: "Auto-generate shopping lists from your meal plan. Export directly to your favorite supermarket app.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]


export default function Home() {
  const featuredRecipes = mockRecipes.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 left-10 size-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 size-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your Kitchen&apos;s
              <span className="text-primary block">Operating System</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Plan meals, organize recipes, and generate shopping lists effortlessly.
              Drag and drop recipes into precise time slots and export your shopping
              list to your favourite supermarket in one click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="size-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/recipes">
                  Explore Recipes
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to master your kitchen
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features designed to make meal planning effortless and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-xl ${feature.bgColor} w-fit mb-4`}>
                    <feature.icon className={`size-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Recipes</h2>
              <p className="text-muted-foreground">Discover what others are cooking</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/recipes">
                View All
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all p-0">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className="p-2 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm">
                        <Heart className={recipe.isFavorite ? "size-4 fill-red-500 text-red-500" : "size-4"} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/90 dark:bg-black/50 backdrop-blur-sm text-foreground">
                        {recipe.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {recipe.cuisine} Cuisine
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {recipe.prepTime + recipe.cookTime}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-4" />
                        {recipe.servings}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        4.8
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get started in minutes
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to transform your meal planning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Add Your Recipes",
                description: "Import recipes from anywhere or add your own. Organize them with tags and categories.",
              },
              {
                step: "02",
                title: "Plan Your Week",
                description: "Drag and drop recipes into your calendar. Set specific times for each meal.",
              },
              {
                step: "03",
                title: "Shop & Cook",
                description: "Generate your shopping list and export it. Then cook delicious meals with ease.",
              },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="size-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-border -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <CardContent className="py-16 px-8 md:px-16 relative">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to transform your kitchen?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Join thousands of home cooks who have simplified their meal planning
                  and cooking experience with Mantry.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" variant="secondary" className="text-lg" asChild>
                    <Link href="/register">
                      Start Free Trial
                      <ArrowRight className="size-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link href="/choose-plan">
                      View Pricing
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/80">
                  <span className="flex items-center gap-2">
                    <Check className="size-4" />
                    Free 14-day trial
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="size-4" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="size-4" />
                    Cancel anytime
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by home cooks everywhere
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our community has to say about Mantry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Mantry has completely changed how I approach weeknight dinners. No more last-minute grocery runs!",
                author: "Sarah M.",
                role: "Home Cook",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
              },
              {
                quote: "The drag-and-drop meal planner is genius. I can plan my entire month in under 30 minutes.",
                author: "James K.",
                role: "Busy Parent",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
              },
              {
                quote: "Finally, all my grandmother's recipes are organized and easily accessible. Worth every penny!",
                author: "Maria L.",
                role: "Recipe Collector",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
              },
            ].map((testimonial) => (
              <Card key={testimonial.author} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
