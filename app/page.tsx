"use client"

import { useVideos } from "@/hooks/useVideos"

export default function Home() {
  const { data, isLoading } = useVideos()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {data.map((video: any) => (
        <div key={video.id} className="border rounded-lg p-4">
          <img src={video.thumbnailUrl} />
          <h2 className="font-bold">{video.title}</h2>
          <p>{video.category}</p>
        </div>
      ))}
    </div>
  )
}