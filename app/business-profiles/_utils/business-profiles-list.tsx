"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
import { BusinessProfileCard } from "./business-profile-card"
import type { BusinessProfile } from "../profile.types"

// Sample data based on the provided JSON structure
const sampleProfiles: BusinessProfile[] = [
  {
    id: "8f70912a-b1d3-4beb-870e-2d57a3682296",
    createdAt: "2025-03-13T06:26:21.786Z",
    updatedAt: "2025-03-13T06:26:21.786Z",
    handle: "anish_1",
    userId: "6ccec5ba-830b-4ebd-9029-d27183ca00cb",
    name: "Anish",
    about: null,
    verified: "none",
    status: "pending",
    coverImage: null,
    logo: null,
    user: {
      id: "6ccec5ba-830b-4ebd-9029-d27183ca00cb",
      handle: "anish",
      firstName: null,
      lastName: null,
      countryCode: "in",
      lang: "en",
      mobileNumber: "918428352171",
      email: "test@gmail.com",
      type: "business",
      status: "pending",
      lastLoginAt: null,
      createdAt: "2025-03-13T04:34:57.963Z",
      updatedAt: "2025-03-13T06:25:43.385Z",
      profilePhoto: null,
    },
  },
  {
    id: "7e60812b-c2d4-5ceb-960e-3d67a4682397",
    createdAt: "2025-03-12T05:26:21.786Z",
    updatedAt: "2025-03-12T05:26:21.786Z",
    handle: "techsolutions",
    userId: "5ddec5ba-940b-4ebd-8029-d27183ca11dc",
    name: "Tech Solutions Inc.",
    about: "Providing innovative tech solutions for businesses, Providing innovative tech solutions for businesses,Providing innovative tech solutions for businesses",
    verified: "verified",
    status: "active",
    coverImage: "/placeholder.svg?height=200&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    user: {
      id: "5ddec5ba-940b-4ebd-8029-d27183ca11dc",
      handle: "techsolutions",
      firstName: "John",
      lastName: "Smith",
      countryCode: "us",
      lang: "en",
      mobileNumber: "12025550178",
      email: "contact@techsolutions.com",
      type: "business",
      status: "active",
      lastLoginAt: "2025-03-12T04:34:57.963Z",
      createdAt: "2025-03-10T04:34:57.963Z",
      updatedAt: "2025-03-12T06:25:43.385Z",
      profilePhoto: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "6d50713c-a3e5-6def-850f-4e78b5793498",
    createdAt: "2025-03-11T07:26:21.786Z",
    updatedAt: "2025-03-11T07:26:21.786Z",
    handle: "globaltraders",
    userId: "4ccec6cb-730c-5fce-7130-e38294db22ed",
    name: "Global Traders Ltd.",
    about: "International trading and logistics services",
    verified: "verified",
    status: "active",
    coverImage: "/placeholder.svg?height=200&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    user: {
      id: "4ccec6cb-730c-5fce-7130-e38294db22ed",
      handle: "globaltraders",
      firstName: "Sarah",
      lastName: "Johnson",
      countryCode: "uk",
      lang: "en",
      mobileNumber: "447911123456",
      email: "info@globaltraders.com",
      type: "business",
      status: "active",
      lastLoginAt: "2025-03-11T08:34:57.963Z",
      createdAt: "2025-03-09T09:34:57.963Z",
      updatedAt: "2025-03-11T10:25:43.385Z",
      profilePhoto: "/placeholder.svg?height=100&width=100",
    },
  },
]

export function BusinessProfilesList() {
  const [profiles, setProfiles] = useState<BusinessProfile[]>(sampleProfiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
//   const { toast } = useToast()

  const handleSearch = () => {
    const filtered = sampleProfiles.filter(
      (profile) =>
        (profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.handle.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || profile.status === statusFilter),
    )
    setProfiles(filtered)

//     toast({
//       title: `Found ${filtered.length} profiles`,
//       description:
//         filtered.length > 0 ? "Displaying matching business profiles" : "No profiles match your search criteria",
//       duration: 3000,
//     })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setProfiles(sampleProfiles)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search by name or handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} variant="default">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button onClick={clearFilters} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <BusinessProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {profiles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No business profiles found</p>
        </div>
      )}
    </div>
  )
};