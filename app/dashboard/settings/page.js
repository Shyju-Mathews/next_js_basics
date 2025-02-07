"use client"

import { useRouter } from "next/navigation";


const Settings = () => {

  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard');
  }
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <h1 className="text-black font-bold text-3xl">Settings</h1>
      <button onClick={handleBack} className='bg-blue-500 rounded text-white font-bold py-2 px-4 mt-5'>Go to Dashboard</button>
    </div>
  )
}

export default Settings
