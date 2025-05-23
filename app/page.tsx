"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PizzaIcon,
  TruckIcon,
  BarChart3,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  Clock,
  Menu,
  X,
  Shield,
  Play,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect to dashboard if authenticated
    if (!isLoading && user) {
      router.push("/dashboard")
    }

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-orange-500"></div>
            <PizzaIcon className="absolute inset-0 m-auto h-8 w-8 text-orange-500" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">Loading PizzaDash...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  const features = [
    {
      icon: <PizzaIcon className="h-8 w-8 text-orange-400" />,
      title: "Smart Order Management",
      description: "Streamline your pizza orders with intelligent tracking and real-time updates.",
      gradient: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      icon: <TruckIcon className="h-8 w-8 text-blue-400" />,
      title: "Delivery Optimization",
      description: "Optimize delivery routes and track drivers in real-time for faster service.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-400" />,
      title: "Advanced Analytics",
      description: "Get insights into sales trends, popular items, and customer behavior.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-green-500/10 border-green-500/20",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Customer Management",
      description: "Build lasting relationships with comprehensive customer profiles.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-400" />,
      title: "Time Tracking",
      description: "Monitor preparation times and optimize kitchen efficiency.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconBg: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-400" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
    },
  ]

  const testimonials = [
    {
      quote:
        "PizzaDash transformed our business completely. We've seen a 40% increase in efficiency and our customers love the faster delivery times!",
      author: "Maria Rodriguez",
      role: "Owner, Napoli's Pizza",
      image: "/professional-woman-dark-hair-smiling.png",
      rating: 5,
    },
    {
      quote:
        "The analytics helped us optimize our menu and increase profits by 35%. The interface is so intuitive that our entire team learned it in just one day.",
      author: "James Chen",
      role: "Manager, Slice Haven",
      image: "/asian-man-glasses-headshot.png",
      rating: 5,
    },
    {
      quote:
        "Customer satisfaction has never been higher. The real-time tracking and order management features are game-changers for our operation.",
      author: "Sarah Johnson",
      role: "Operations Director, Pizza Express",
      image: "/professional-blonde-woman-smiling.png",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <PizzaIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">PizzaDash</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105"
              >
                Pricing
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden md:block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={() => router.push("/auth/signin")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
              </div>
              <button
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="space-y-1 px-4 py-4">
              <Link
                href="#features"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={() => router.push("/auth/signin")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden homepage-gradient">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30">
                  🚀 New Dashboard 2.0 Available
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Manage your pizza business{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    like a pro
                  </span>
                </h1>
                <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                  The complete dashboard solution for pizza restaurants. Track orders, manage deliveries, and grow your
                  business with powerful analytics.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={() => router.push("/auth/signin")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border text-muted-foreground hover:bg-card hover:text-foreground hover:border-border"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Pizza Shops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">2M+</div>
                  <div className="text-sm text-muted-foreground">Orders Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right column - Dashboard Preview */}
            <div className="relative">
              <div className="relative z-10">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <div className="ml-2 text-sm text-muted-foreground">PizzaDash Dashboard</div>
                  </div>
                  <div className="p-6">
                    <img src="/dashboard-screenshot.png" alt="Dashboard Preview" className="w-full rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 z-20 rounded-lg border border-green-500/20 bg-card/90 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Order Completed</div>
                    <div className="text-xs text-muted-foreground">Margherita Pizza</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 z-20 rounded-lg border border-blue-500/20 bg-card/90 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
                    <TruckIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Out for Delivery</div>
                    <div className="text-xs text-muted-foreground">ETA: 15 mins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything you need to run your pizza business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed specifically for pizza restaurants
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-600"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                ></div>
                <CardContent className="relative p-6">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconBg} transition-all duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Loved by pizza businesses worldwide</h2>
            <p className="mt-4 text-lg text-muted-foreground">See what our customers have to say about PizzaDash</p>
          </div>

          <div className="mt-16">
            <div className="relative mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-border p-8 shadow-2xl">
                <div className="text-center">
                  <div className="mb-6 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl font-medium text-foreground leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <img
                      src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].author}
                      className="h-12 w-12 rounded-full object-cover border-2 border-border"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{testimonials[activeTestimonial].author}</div>
                      <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 w-8 rounded-full transition-colors ${
                      index === activeTestimonial ? "bg-orange-500" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">Choose the perfect plan for your pizza business</p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Starter Plan */}
            <Card className="relative bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground">Starter</h3>
                <p className="mt-2 text-muted-foreground">Perfect for small pizza shops</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Up to 100 orders/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Email support</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full bg-gray-700 hover:bg-gray-600 text-foreground border-border">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative bg-card border-orange-500 shadow-xl ring-2 ring-orange-500/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-orange-500 text-white shadow-lg">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground">Professional</h3>
                <p className="mt-2 text-muted-foreground">For growing pizza businesses</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Unlimited orders</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Custom reports</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground">Enterprise</h3>
                <p className="mt-2 text-muted-foreground">For large pizza chains</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">24/7 phone support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-muted-foreground">Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full bg-gray-700 hover:bg-gray-600 text-foreground border-border">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to transform your pizza business?</h2>
          <p className="mt-4 text-xl text-orange-100">Join hundreds of pizza shops already using PizzaDash</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-500 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              onClick={() => router.push("/auth/signin")}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-200 hover:scale-105"
            >
              Schedule Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <PizzaIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">PizzaDash</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                The ultimate dashboard for pizza businesses. Streamline operations and delight customers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">&copy; 2024 PizzaDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
