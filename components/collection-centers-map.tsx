"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, Phone } from "lucide-react"

interface CollectionCenter {
  id: number
  name: string
  address: string
  coordinates: { lat: number; lng: number }
  hours: string
  phone: string
  wasteTypes: string[]
  status: "open" | "closed" | "busy"
}

const mockCenters: CollectionCenter[] = [
  {
    id: 1,
    name: "Accra Central Collection Hub",
    address: "Ring Road Central, Accra",
    coordinates: { lat: 5.6037, lng: -0.187 },
    hours: "8:00 AM - 6:00 PM",
    phone: "+233 20 123 4567",
    wasteTypes: ["Plastic", "Glass", "Metal", "Paper"],
    status: "open",
  },
  {
    id: 2,
    name: "Tema Community Center",
    address: "Community 1, Tema",
    coordinates: { lat: 5.6698, lng: -0.0166 },
    hours: "7:00 AM - 5:00 PM",
    phone: "+233 24 987 6543",
    wasteTypes: ["Plastic", "Glass", "Electronics"],
    status: "busy",
  },
  {
    id: 3,
    name: "Kumasi Green Point",
    address: "Adum, Kumasi",
    coordinates: { lat: 6.6885, lng: -1.6244 },
    hours: "9:00 AM - 7:00 PM",
    phone: "+233 32 456 7890",
    wasteTypes: ["Plastic", "Paper", "Organic"],
    status: "open",
  },
  {
    id: 4,
    name: "East Legon Recycling Station",
    address: "East Legon, Accra",
    coordinates: { lat: 5.65, lng: -0.15 },
    hours: "8:00 AM - 6:00 PM",
    phone: "+233 26 111 2222",
    wasteTypes: ["Plastic", "Glass", "Metal"],
    status: "closed",
  },
]

export function CollectionCentersMap() {
  const [selectedCenter, setSelectedCenter] = useState<CollectionCenter | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700"
      case "busy":
        return "bg-yellow-100 text-yellow-700"
      case "closed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Map Placeholder */}
      <div className="relative">
        <div className="w-full h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg border-2 border-green-200 flex items-center justify-center relative overflow-hidden">
          {/* Realistic Map Background */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Map background with roads and areas */}
              <rect width="400" height="300" fill="#f0f9ff" />

              {/* Water bodies */}
              <path d="M0,200 Q100,180 200,200 T400,190 L400,300 L0,300 Z" fill="#3b82f6" opacity="0.3" />
              <circle cx="320" cy="100" r="25" fill="#3b82f6" opacity="0.3" />

              {/* Roads */}
              <path d="M0,150 L400,150" stroke="#6b7280" strokeWidth="3" opacity="0.6" />
              <path d="M200,0 L200,300" stroke="#6b7280" strokeWidth="3" opacity="0.6" />
              <path d="M50,50 L350,250" stroke="#9ca3af" strokeWidth="2" opacity="0.5" />
              <path d="M350,50 L50,250" stroke="#9ca3af" strokeWidth="2" opacity="0.5" />

              {/* Green areas (parks) */}
              <circle cx="80" cy="80" r="30" fill="#22c55e" opacity="0.3" />
              <circle cx="320" cy="220" r="25" fill="#22c55e" opacity="0.3" />
              <rect x="150" y="50" width="40" height="30" fill="#22c55e" opacity="0.3" rx="5" />

              {/* Buildings/blocks */}
              <rect x="30" y="120" width="20" height="15" fill="#e5e7eb" opacity="0.7" />
              <rect x="60" y="115" width="25" height="20" fill="#e5e7eb" opacity="0.7" />
              <rect x="300" y="130" width="30" height="25" fill="#e5e7eb" opacity="0.7" />
              <rect x="250" y="180" width="20" height="20" fill="#e5e7eb" opacity="0.7" />
            </svg>
          </div>

          {/* Collection Center Pins */}
          {mockCenters.map((center, index) => (
            <div
              key={center.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 ${
                selectedCenter?.id === center.id ? "scale-125" : ""
              }`}
              style={{
                left: `${25 + index * 18}%`,
                top: `${35 + (index % 2) * 20}%`,
              }}
              onClick={() => setSelectedCenter(selectedCenter?.id === center.id ? null : center)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                  center.status === "open" ? "bg-green-500" : center.status === "busy" ? "bg-yellow-500" : "bg-red-500"
                }`}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>

              {/* Tooltip on hover/click */}
              {selectedCenter?.id === center.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-48 border">
                  <div className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-1">{center.name}</h4>
                    <p className="text-gray-600 text-xs mb-2">{center.address}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Clock className="w-3 h-3" />
                      {center.hours}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {center.wasteTypes.slice(0, 2).map((type) => (
                        <span key={type} className="px-1 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                          {type}
                        </span>
                      ))}
                      {center.wasteTypes.length > 2 && (
                        <span className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          +{center.wasteTypes.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
            <h4 className="font-medium mb-2">Collection Centers</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Collection Centers List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Collection Centers</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockCenters.map((center) => (
            <Card
              key={center.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCenter?.id === center.id ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => setSelectedCenter(selectedCenter?.id === center.id ? null : center)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{center.name}</h4>
                  <Badge className={getStatusColor(center.status)}>{center.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {center.hours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {center.phone}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {center.wasteTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
