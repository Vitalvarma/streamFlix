"use client"

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`)
    }
  }, [search, router])

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
        StreamFlix 🎬
      </h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search videos..."
        className="border dark:border-gray-700 bg-transparent px-3 py-1 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ThemeToggle />
    </div>
  )
}

