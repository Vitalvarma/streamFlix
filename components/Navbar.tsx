"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/?search=${search}`)
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        StreamFlix 🎬
      </h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="border px-3 py-1 rounded-lg w-64"
      />

    </div>
  )
}