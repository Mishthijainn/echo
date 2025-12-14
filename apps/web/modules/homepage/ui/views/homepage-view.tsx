"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
    BotIcon,
    CheckIcon,
    MessageSquareIcon,
    MicIcon,
    PhoneIcon,
    SparklesIcon,
    UsersIcon,
    ZapIcon,
    ShieldIcon,
    GlobeIcon,
    ArrowRightIcon,
    StarIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const features = [
    {
        icon: BotIcon,
        title: "AI Customer Support",
        description: "Intelligent automated responses 24/7 powered by advanced AI that understands context and provides accurate answers."
    },
    {
        icon: MicIcon,
        title: "AI Voice Agent",
        description: "Natural voice conversations with customers using state-of-the-art voice AI technology for seamless interactions."
    },
    {
        icon: PhoneIcon,
        title: "Phone System",
        description: "Inbound & outbound calling capabilities with automated routing and intelligent call handling."
    },
    {
        icon: MessageSquareIcon,
        title: "Multi-Channel Support",
        description: "Unified inbox for chat, voice, and email conversations all in one place."
    },
    {
        icon: SparklesIcon,
        title: "Knowledge Base",
        description: "Train your AI on your documentation, FAQs, and product information for accurate responses."
    },
    {
        icon: UsersIcon,
        title: "Team Collaboration",
        description: "Work together with your team, assign conversations, and maintain consistent customer service."
    },
    {
        icon: ZapIcon,
        title: "Real-time Analytics",
        description: "Track performance metrics, response times, and customer satisfaction in real-time."
    },
    {
        icon: ShieldIcon,
        title: "Enterprise Security",
        description: "Bank-level security with encryption, compliance, and data protection built-in."
    }
]

const useCases = [
    {
        title: "For Individuals",
        description: "Perfect for solo entrepreneurs and freelancers who need professional customer support without the overhead.",
        features: ["24/7 AI support", "Basic customization", "Up to 1,000 conversations/month"]
    },
    {
        title: "For Teams",
        description: "Ideal for growing businesses that need collaborative support tools and advanced features.",
        features: ["Team collaboration", "Advanced analytics", "Priority support", "Custom integrations"]
    },
    {
        title: "For Enterprises",
        description: "Built for large organizations requiring scale, security, and dedicated support.",
        features: ["Unlimited conversations", "Dedicated account manager", "Custom AI training", "SLA guarantees"]
    }
]

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started",
        features: [
            "Up to 100 conversations/month",
            "Basic AI support",
            "Email support",
            "Widget customization",
            "Knowledge base (up to 5 files)"
        ],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Pro",
        price: "$29",
        period: "per month",
        description: "For growing businesses",
        features: [
            "Unlimited conversations",
            "Advanced AI support",
            "Voice agent (Vapi)",
            "Phone system",
            "Priority support",
            "Team access (up to 5 members)",
            "Advanced analytics",
            "Knowledge base (unlimited files)",
            "Custom integrations"
        ],
        cta: "Start Free Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "For large organizations",
        features: [
            "Everything in Pro",
            "Unlimited team members",
            "Dedicated account manager",
            "Custom AI training",
            "SLA guarantees",
            "On-premise deployment options",
            "Advanced security features",
            "Custom integrations & APIs"
        ],
        cta: "Contact Sales",
        popular: false
    }
]

export const HomePageView = () => {
    const { isSignedIn } = useAuth()
    const router = useRouter()

    // Redirect if already signed in (client-side check as backup)
    useEffect(() => {
        if (isSignedIn) {
            router.push("/conversations")
        }
    }, [isSignedIn, router])

    // Don't render sign-in/sign-up buttons if user is authenticated
    const showAuthButtons = !isSignedIn

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/50">
                <div className="container mx-auto px-4 py-24 md:py-32">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-6 flex items-center justify-center gap-2">
                            <Image alt="Echo Logo" height={48} width={48} src="/logo.svg" />
                            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                                Echo
                            </h1>
                        </div>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                            AI-Powered Customer Support
                            <br />
                            <span className="text-primary">That Actually Works</span>
                        </h2>
                        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                            Transform your customer support with intelligent AI that understands context,
                            provides accurate answers, and scales with your business. No coding required.
                        </p>
                        {showAuthButtons && (
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <SignUpButton mode="modal" fallbackRedirectUrl="/">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Start Free Trial
                                        <ArrowRightIcon className="ml-2 size-4" />
                                    </Button>
                                </SignUpButton>
                                <SignInButton mode="modal" fallbackRedirectUrl="/">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Sign In
                                    </Button>
                                </SignInButton>
                            </div>
                        )}
                        <p className="mt-4 text-sm text-muted-foreground">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="border-b bg-muted/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                            Why Choose Echo?
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Echo solves the problem of providing 24/7 customer support without the overhead
                            of a large support team. Our AI understands your business, learns from your
                            documentation, and provides accurate, helpful responses to your customers.
                        </p>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <div className="text-3xl font-bold text-primary">99.9%</div>
                                <div className="text-sm text-muted-foreground">Uptime SLA</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-3xl font-bold text-primary">&lt;2s</div>
                                <div className="text-sm text-muted-foreground">Average Response Time</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-3xl font-bold text-primary">24/7</div>
                                <div className="text-sm text-muted-foreground">Always Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="border-b py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                            Everything You Need to Support Customers
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Powerful features designed to help you deliver exceptional customer experiences
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <Card key={feature.title} className="border-2 transition-all hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                        <feature.icon className="size-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="border-b bg-muted/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                            Built for Everyone
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Whether you're a solo entrepreneur or a large enterprise, Echo scales with you
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {useCases.map((useCase) => (
                            <Card key={useCase.title} className="border-2">
                                <CardHeader>
                                    <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                                    <CardDescription className="text-base">{useCase.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {useCase.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <CheckIcon className="size-4 text-primary" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="border-b py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                            Simple, Transparent Pricing
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Choose the plan that's right for you. All plans include a 14-day free trial.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <span>Billed monthly</span>
                            <span>•</span>
                            <span>Per organization</span>
                            <span>•</span>
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                className={`relative border-2 transition-all hover:shadow-xl ${plan.popular ? "border-primary shadow-lg" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="mt-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.period !== "forever" && plan.period !== "pricing" && (
                                            <span className="text-muted-foreground">/{plan.period}</span>
                                        )}
                                    </div>
                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2">
                                                <CheckIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        {plan.name === "Enterprise" ? (
                                            <Button variant="outline" className="w-full" size="lg" asChild>
                                                <Link href="/billing">Contact Sales</Link>
                                            </Button>
                                        ) : showAuthButtons ? (
                                            <SignUpButton mode="modal" fallbackRedirectUrl="/">
                                                <Button
                                                    className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                                                    size="lg"
                                                    variant={plan.popular ? "default" : "outline"}
                                                >
                                                    {plan.cta}
                                                </Button>
                                            </SignUpButton>
                                        ) : (
                                            <Button
                                                className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                                                size="lg"
                                                variant={plan.popular ? "default" : "outline"}
                                                asChild
                                            >
                                                <Link href="/conversations">Get Started</Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-b from-primary/10 to-background py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                            Ready to Transform Your Customer Support?
                        </h3>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Join thousands of businesses using Echo to provide exceptional customer experiences.
                            Start your free trial today—no credit card required.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {showAuthButtons ? (
                                <>
                                    <SignUpButton mode="modal" fallbackRedirectUrl="/">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Start Free Trial
                                            <ArrowRightIcon className="ml-2 size-4" />
                                        </Button>
                                    </SignUpButton>
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                                        <Link href="/billing">View Pricing</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="lg" className="w-full sm:w-auto" asChild>
                                        <Link href="/conversations">
                                            Go to Dashboard
                                            <ArrowRightIcon className="ml-2 size-4" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                                        <Link href="/billing">View Pricing</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

