"use client"

import { useVideos } from "@/hooks/useVideos"
import VideoCard from "@/components/VideoCard"

export default function Home() {
  const { data, isLoading } = useVideos()

  if (isLoading) return <p className="p-10">Loading...</p>

  return (
    <div className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}