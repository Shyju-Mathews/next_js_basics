import { BusinessProfilesList } from "./_utils/business-profiles-list";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Business Profiles</h1>
      <BusinessProfilesList />
    </main>
  )
}

