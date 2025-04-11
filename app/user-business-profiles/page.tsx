'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { sampleProfiles } from "../business-profiles/_utils/business-profiles-list";

type UserProfile = {
  id: string;
  name: string | null;
  handle: string;
  status: "pending" | "verified" | "none";
  coverImage: string | null;
  logo: string | null;
};

type BusinessProfilesListProps = {
  profiles: UserProfile[];
  isLoading?: boolean;
};

const statusColors: Record<UserProfile["status"], string> = {
  pending: "bg-yellow-500",
  verified: "bg-green-500",
  none: "bg-gray-400",
};

export default function BusinessProfilesList(/* { profiles, isLoading }: BusinessProfilesListProps */ ) {
    const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-xl" />
          ))
        : sampleProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              {profile.coverImage && (
                <div
                  className="h-24 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${profile.coverImage})` }}
                />
              )}
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage src={profile.logo || "https://via.placeholder.com/50"} alt={profile.name || "User"} />
                  <AvatarFallback>{profile.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-lg font-semibold">{profile.name || "Unknown"}</CardTitle>
                  <span className="text-sm text-gray-500">@{profile.handle}</span>
                  <Badge className={cn("text-white", statusColors[profile.status as keyof typeof statusColors])}>{profile.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}