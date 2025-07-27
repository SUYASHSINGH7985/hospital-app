'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login/patient')
      return
    }

    try {
      const user = JSON.parse(userStr)
      setName(user.name)
    } catch (err) {
      localStorage.removeItem('user')
      router.push('/login/patient')
    }
  }, [router])

  if (!name) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700">Hi {name} 👋</h1>
      <button
        onClick={() => {
          localStorage.removeItem('user')
          router.push('/login/patient')
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}
