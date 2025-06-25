"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Recycle, Camera, Upload, CheckCircle, AlertCircle, Info } from "lucide-react"

const wasteTypes = [
  { id: "plastic", name: "Plastic Bottles", rate: 5, unit: "BORLA/kg" },
  { id: "glass", name: "Glass Bottles", rate: 4, unit: "BORLA/kg" },
  { id: "paper", name: "Paper/Cardboard", rate: 3, unit: "BORLA/kg" },
  { id: "metal", name: "Metal Cans", rate: 6, unit: "BORLA/kg" },
  { id: "electronics", name: "Electronics", rate: 10, unit: "BORLA/kg" },
  { id: "organic", name: "Organic Waste", rate: 2, unit: "BORLA/kg" },
]

const collectionCenters = [
  { id: "accra-central", name: "Accra Central Collection Hub", address: "Ring Road Central, Accra" },
  { id: "tema-community", name: "Tema Community Center", address: "Community 1, Tema" },
  { id: "kumasi-green", name: "Kumasi Green Point", address: "Adum, Kumasi" },
  { id: "east-legon", name: "East Legon Recycling Station", address: "East Legon, Accra" },
]

export default function SubmitWaste() {
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    unit: "kg",
    collectionCenter: "",
    description: "",
    photos: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedWasteType = wasteTypes.find((type) => type.id === formData.wasteType)
  const estimatedTokens =
    selectedWasteType && formData.quantity
      ? (Number.parseFloat(formData.quantity) * selectedWasteType.rate).toFixed(1)
      : "0"

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your waste submission has been received and is pending verification. You'll earn approximately{" "}
              <strong>{estimatedTokens} BORLA tokens</strong> once approved.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
                View Dashboard
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-green-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submit Waste</h1>
              <p className="text-gray-600">Turn your recyclable waste into BORLA tokens</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Type</CardTitle>
                <CardDescription>Select the type of waste you're submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {wasteTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.wasteType === type.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => handleInputChange("wasteType", type.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{type.name}</h4>
                          <p className="text-sm text-gray-600">
                            {type.rate} {type.unit}
                          </p>
                        </div>
                        {formData.wasteType === type.id && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity */}
            <Card>
              <CardHeader>
                <CardTitle>Quantity</CardTitle>
                <CardDescription>Enter the amount of waste you're submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="0.0"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="pieces">pieces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedWasteType && formData.quantity && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Estimated Reward</span>
                    </div>
                    <p className="text-green-700">
                      You'll earn approximately <strong>{estimatedTokens} BORLA tokens</strong> for this submission
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Collection Center */}
            <Card>
              <CardHeader>
                <CardTitle>Collection Center</CardTitle>
                <CardDescription>Select where you'll drop off your waste</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.collectionCenter}
                  onValueChange={(value) => handleInputChange("collectionCenter", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a collection center" />
                  </SelectTrigger>
                  <SelectContent>
                    {collectionCenters.map((center) => (
                      <SelectItem key={center.id} value={center.id}>
                        <div>
                          <div className="font-medium">{center.name}</div>
                          <div className="text-sm text-gray-600">{center.address}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Photos (Optional)</CardTitle>
                <CardDescription>Upload photos of your waste to help with verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload photos</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                    </label>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-gray-600">{photo.name}</span>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes (Optional)</CardTitle>
                <CardDescription>Any additional information about your waste submission</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the condition of the waste, any special handling requirements, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  disabled={isSubmitting || !formData.wasteType || !formData.quantity || !formData.collectionCenter}
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Recycle className="w-4 h-4 mr-2" />
                      Submit Waste
                    </>
                  )}
                </Button>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Before submitting:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-700">
                        <li>Ensure waste is clean and sorted properly</li>
                        <li>Visit the selected collection center during operating hours</li>
                        <li>Bring a valid ID for verification</li>
                        <li>Tokens will be credited after admin approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
