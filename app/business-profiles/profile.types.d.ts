export interface User {
    id: string
    handle: string
    firstName: string | null
    lastName: string | null
    countryCode: string
    lang: string
    mobileNumber: string
    email: string
    type: string
    status: string
    lastLoginAt: string | null
    createdAt: string
    updatedAt: string
    profilePhoto: string | null
  }
  
  export interface BusinessProfile {
    id: string
    createdAt: string
    updatedAt: string
    handle: string
    userId: string
    name: string | null
    about: string | null
    verified: string
    status: string
    coverImage: string | null
    logo: string | null
    user: User
  }
  
  