import { formatDistanceToNow } from "date-fns"
import { Mail, Phone, MapPin, ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BusinessProfile } from "../profile.types"

interface BusinessProfileCardProps {
  profile: BusinessProfile
}

export function BusinessProfileCard({ profile }: BusinessProfileCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "suspended":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInitials = () => {
    if (profile.name) {
      return profile.name.charAt(0).toUpperCase()
    }
    return profile.handle.charAt(0).toUpperCase()
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown date"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: profile.coverImage
            ? `url(https://png.pngtree.com/background/20230411/original/pngtree-natural-landscape-snow-mountain-background-picture-image_2390197.jpg)`
            : "url(https://png.pngtree.com/background/20230411/original/pngtree-natural-landscape-snow-mountain-background-picture-image_2390197.jpg)",
        }}
      />

      <CardHeader className="relative pt-0 pb-3">
        <div className="flex justify-between items-start -mt-10">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage
              src={profile.logo || profile.user.profilePhoto || undefined}
              alt={profile.name || profile.handle}
            />
            <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-end gap-2 mt-2">
            <div className="flex items-center gap-1">
              <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(profile.status)}`} />
              <span className="text-xs capitalize">{profile.status}</span>
            </div>

            {profile.verified === "verified" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-xl font-bold">{profile.name || profile.handle}</h3>
          <p className="text-sm text-muted-foreground">@{profile.handle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        {profile.about && <p className="text-sm line-clamp-2">{profile.about}</p>}

        <div className="space-y-1.5">
          {profile.user.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{profile.user.email}</span>
            </div>
          )}

          {profile.user.mobileNumber && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profile.user.mobileNumber}</span>
            </div>
          )}

          {profile.user.countryCode && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.user.countryCode.toUpperCase()}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-3">
        <div className="text-xs text-muted-foreground">Updated {getTimeAgo(profile.updatedAt)}</div>

        <Button variant="ghost" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          View
        </Button>
      </CardFooter>
    </Card>
  )
}

