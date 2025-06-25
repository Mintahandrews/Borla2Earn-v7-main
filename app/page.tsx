"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Recycle,
  Coins,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Smartphone,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Github,
  Mail,
  ExternalLink,
} from "lucide-react"
import { CollectionCentersMap } from "@/components/collection-centers-map"

export default function Borla2EarnLanding() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null)

  const sdgGoals = [
    {
      number: 11,
      title: "Sustainable Cities",
      description: "Clean communities through waste collection",
      detailedInfo: {
        target: "Make cities and human settlements inclusive, safe, resilient and sustainable",
        impact:
          "Borla2Earn directly addresses urban waste management challenges by incentivizing proper waste disposal and recycling in Ghanaian cities.",
        metrics: ["Reduced street litter", "Improved sanitation", "Cleaner neighborhoods", "Enhanced urban livability"],
        connection:
          "Our collection centers create organized waste management systems that transform chaotic urban waste into structured, rewarding recycling programs.",
      },
    },
    {
      number: 12,
      title: "Responsible Production",
      description: "Promotes recycling and reuse",
      detailedInfo: {
        target: "Ensure sustainable consumption and production patterns",
        impact:
          "By rewarding recycling behavior, we encourage circular economy principles and reduce waste generation at the source.",
        metrics: [
          "Increased recycling rates",
          "Reduced landfill waste",
          "Material recovery",
          "Circular economy adoption",
        ],
        connection:
          "BORLA tokens create economic incentives for responsible consumption, making recycling profitable and sustainable.",
      },
    },
    {
      number: 1,
      title: "No Poverty",
      description: "Creates earning opportunities via waste",
      detailedInfo: {
        target: "End poverty in all its forms everywhere",
        impact:
          "Transforms waste into income streams for underserved communities, creating new economic opportunities from environmental action.",
        metrics: [
          "Additional income sources",
          "Economic empowerment",
          "Community wealth creation",
          "Financial inclusion",
        ],
        connection:
          "Every piece of recycled waste becomes a source of BORLA tokens, providing direct economic benefits to participants.",
      },
    },
    {
      number: 3,
      title: "Good Health",
      description: "Reduces disease linked to waste buildup",
      detailedInfo: {
        target: "Ensure healthy lives and promote well-being for all at all ages",
        impact:
          "Proper waste management reduces disease vectors, improves air quality, and creates healthier living environments.",
        metrics: [
          "Reduced waterborne diseases",
          "Improved air quality",
          "Lower infection rates",
          "Better community health",
        ],
        connection:
          "Clean communities mean healthier families. Our waste collection system directly improves public health outcomes.",
      },
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Mitigates waste-related emissions",
      detailedInfo: {
        target: "Take urgent action to combat climate change and its impacts",
        impact: "Reduces methane emissions from landfills and promotes carbon-neutral waste management practices.",
        metrics: [
          "Reduced greenhouse gases",
          "Lower carbon footprint",
          "Methane emission reduction",
          "Climate resilience",
        ],
        connection:
          "Every recycled item prevents methane emissions and reduces the carbon footprint of waste management.",
      },
    },
  ]

  const roadmapItems = [
    { quarter: "Q2 2025", milestone: "MVP launch (NextJS + Testnet Token)", status: "upcoming" },
    { quarter: "Q3 2025", milestone: "Partner onboarding, token audit, mobile support", status: "planned" },
    { quarter: "Q4 2025", milestone: "Mainnet launch, community DAO, marketplace features", status: "planned" },
  ]

  const techStack = [
    {
      category: "Frontend",
      tech: "NextJS",
      icon: Smartphone,
      description: "Wallet integration and real-time balance display",
    },
    {
      category: "Blockchain",
      tech: "Solidity",
      icon: Shield,
      description: "Smart contracts for waste registration and rewards",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold text-gray-900 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Borla2Earn
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              How It Works
            </a>
            <a href="#token" className="text-gray-600 hover:text-green-600 transition-colors">
              $BORLA Token
            </a>
            <a href="#impact" className="text-gray-600 hover:text-green-600 transition-colors">
              Impact
            </a>
            <a href="#roadmap" className="text-gray-600 hover:text-green-600 transition-colors">
              Roadmap
            </a>
            <a href="/shop" className="text-gray-600 hover:text-green-600 transition-colors">
              Shop
            </a>
          </div>
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={() => (window.location.href = "/auth/signup")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
            ♻️ Blockchain-Powered Waste Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Waste</span>{" "}
            into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Wealth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join Ghana's revolutionary waste management DApp. Recycle waste, earn BORLA tokens, and contribute to a
            sustainable future while creating economic opportunities for your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              onClick={() => (window.location.href = "/auth/signup")}
            >
              <Coins className="w-5 h-5 mr-2" />
              Start Earning BORLA
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
              onClick={() => window.open("https://github.com/NharnahQwami/Borla2Earn", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable waste disposal</p>
            </CardContent>
          </Card>
          <Card className="text-center border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Earn Tokens</h3>
              <p className="text-gray-600">Get rewarded for recycling</p>
            </CardContent>
          </Card>
          <Card className="text-center border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Community</h3>
              <p className="text-gray-600">Empower local communities</p>
            </CardContent>
          </Card>
          <Card className="text-center border-green-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Global Impact</h3>
              <p className="text-gray-600">Aligned with UN SDGs</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Collection Centers Map */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Collection Centers</h2>
          <p className="text-xl text-gray-600">Locate nearby waste collection centers and start earning BORLA tokens</p>
        </div>
        <CollectionCentersMap />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Borla2Earn Works</h2>
          <p className="text-xl text-gray-600">Simple steps to turn your waste into valuable tokens</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { step: 1, title: "Sign Up", description: "Create your account on the web app", icon: Users },
            {
              step: 2,
              title: "Submit Waste",
              description: "Bring waste to certified collection centers",
              icon: Recycle,
            },
            { step: 3, title: "Get Verified", description: "Verifier approves and logs your waste", icon: CheckCircle },
            { step: 4, title: "Earn Tokens", description: "Receive BORLA tokens instantly", icon: Coins },
            {
              step: 5,
              title: "Track Impact",
              description: "Monitor your environmental contribution",
              icon: TrendingUp,
            },
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              {index < 4 && <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-green-400" />}
            </div>
          ))}
        </div>
      </section>

      {/* BORLA Token Section */}
      <section id="token" className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The $BORLA Token</h2>
            <p className="text-xl text-gray-600">Powering our sustainable ecosystem</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-600" />
                    Token Utility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>Rewards for verified waste submissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Leaderboard bonuses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Partner discounts and coupons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span>Community governance (future)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Turn Trash into Tokens</h3>
              <p className="text-gray-600 leading-relaxed">
                BORLA tokens can be redeemed or traded for goods, services, or fiat currency. Our token creates real
                economic value from environmental action, making sustainability profitable.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">💡 Pro Tip</p>
                <p className="text-green-700 text-sm mt-1">
                  The more waste you recycle, the more tokens you earn. Join our leaderboard to compete with others!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
          <p className="text-xl text-gray-600">Secure, scalable, and user-friendly</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStack.map((item, index) => (
            <Card key={index} className="border-gray-200 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <item.icon className="w-6 h-6 text-green-600" />
                  {item.category}
                </CardTitle>
                <CardDescription className="text-lg font-medium">{item.tech}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* UN SDG Impact */}
      <section id="impact" className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Global Impact</h2>
            <p className="text-xl text-gray-600">Aligned with UN Sustainable Development Goals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgGoals.map((goal, index) => (
              <Card
                key={index}
                className={`border-blue-200 hover:border-blue-400 transition-all cursor-pointer transform hover:scale-105 ${
                  selectedSDG === goal.number ? "ring-2 ring-blue-500 border-blue-500" : ""
                }`}
                onClick={() => setSelectedSDG(selectedSDG === goal.number ? null : goal.number)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {goal.number}
                    </div>
                    SDG {goal.number}
                  </CardTitle>
                  <CardDescription className="font-medium">{goal.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  {selectedSDG === goal.number && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">UN Target:</h4>
                        <p className="text-sm text-gray-700">{goal.detailedInfo.target}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Our Impact:</h4>
                        <p className="text-sm text-gray-700">{goal.detailedInfo.impact}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Key Metrics:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {goal.detailedInfo.metrics.map((metric, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Connection to Borla2Earn:</h4>
                        <p className="text-sm text-gray-700">{goal.detailedInfo.connection}</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    {selectedSDG === goal.number ? "Click to collapse" : "Click to learn more"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedSDG && (
            <div className="mt-8 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-blue-900 mb-2">🌍 Making a Real Difference</h3>
                <p className="text-blue-800">
                  By participating in Borla2Earn, you're not just earning tokens – you're contributing to global
                  sustainability goals and helping build a better future for Ghana and the world.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">2025 Roadmap</h2>
          <p className="text-xl text-gray-600">Our journey to transform waste management</p>
        </div>
        <div className="max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
              <div className="flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.status === "upcoming" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="font-bold">{index + 1}</span>
                </div>
              </div>
              <div className="flex-grow">
                <Card className={`${item.status === "upcoming" ? "border-green-300 bg-green-50" : "border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{item.quarter}</span>
                      <Badge variant={item.status === "upcoming" ? "default" : "secondary"}>{item.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.milestone}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Turn Your Waste into Wealth?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the movement for sustainable waste management and start earning BORLA tokens today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => (window.location.href = "/auth/signup")}
            >
              <Users className="w-5 h-5 mr-2" />
              Join the Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <ExternalLink className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold cursor-pointer" onClick={() => (window.location.href = "/")}>
                  Borla2Earn
                </span>
              </div>
              <p className="text-gray-400">Transforming waste into wealth through blockchain technology.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    BORLA Token
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>team@borla2earn.io</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Borla2Earn. Because your trash has value. ♻️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
