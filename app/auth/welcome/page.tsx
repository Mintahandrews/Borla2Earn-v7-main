"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Recycle, CheckCircle, Wallet, ArrowRight, Gift, Target, Users } from "lucide-react"

export default function WelcomePage() {
  const [step, setStep] = useState(0)

  const welcomeSteps = [
    {
      icon: CheckCircle,
      title: "Account Created Successfully!",
      description: "Welcome to the Borla2Earn community. You're now ready to start earning tokens by recycling waste.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Gift,
      title: "Welcome Bonus",
      description: "You've received 10 BORLA tokens as a welcome bonus! Start recycling to earn more.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Target,
      title: "Set Your First Goal",
      description: "Set a monthly recycling goal to track your environmental impact and earn bonus rewards.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < welcomeSteps.length - 1 ? prev + 1 : prev))
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const currentStep = welcomeSteps[step]
  const StepIcon = currentStep.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-green-200 shadow-lg">
          <CardContent className="text-center p-8">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Recycle className="w-10 h-10 text-white" />
            </div>

            {/* Animated Step Content */}
            <div className="space-y-6">
              <div
                className={`w-16 h-16 ${currentStep.bgColor} rounded-full flex items-center justify-center mx-auto transition-all duration-500`}
              >
                <StepIcon className={`w-8 h-8 ${currentStep.color}`} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{currentStep.title}</h1>
                <p className="text-gray-600 leading-relaxed">{currentStep.description}</p>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= step ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Welcome Stats */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Gift className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">10</p>
                  <p className="text-xs text-gray-600">Welcome Tokens</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600">Submissions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">1,247</p>
                  <p className="text-xs text-gray-600">Community</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/submit")}>
                  <Recycle className="w-4 h-4 mr-2" />
                  Submit Your First Waste
                </Button>

                <Button variant="ghost" className="w-full" onClick={() => (window.location.href = "/settings")}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet Later
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-green-800 mb-2">💡 Quick Tips to Get Started:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Find nearby collection centers on the map</li>
                  <li>• Connect your wallet to receive tokens</li>
                  <li>• Set monthly recycling goals for bonus rewards</li>
                  <li>• Invite friends to earn referral bonuses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
