"use client"

import { useVideos } from "@/hooks/useVideos"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const { data, isLoading } = useVideos()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {data.map((video: any) => (
        <Link key={video.id} href={`/watch/${video.id}`}>
          <div className="border p-4 rounded-lg cursor-pointer">
            <Image src={video.thumbnailUrl} alt={video.title} />
            <h2 className="font-bold">{video.title}</h2>
            <p>{video.category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}