"use client"

import { useVideo } from "@/hooks/useVideo"
import axios from "axios"
import { useEffect } from "react"
import ReactPlayer from "react-player"
import Image from "next/image"

export default function WatchPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useVideo(params.id)

  useEffect(() => {
    axios.patch(`/api/videos/${params.id}`)
  }, [params.id])

  if (isLoading) return <p>Loading...</p>

  const video = data.video
  const recommended = data.recommended

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">

  {/* Video Section */}
  <div className="lg:col-span-3">
    <ReactPlayer url={video.videoUrl} controls width="100%" />

    <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
    <p className="text-gray-500">{video.views} views</p>
    <p className="mt-2">{video.description}</p>
  </div>

  {/* Recommended */}
  <div>
    <h2 className="font-semibold mb-4">Recommended</h2>

    <div className="space-y-4">
      {recommended.map((v: any) => (
        <div key={v.id} className="flex gap-3">
          <Image
            alt={v.title}
            src={v.thumbnailUrl}
            className="w-32 h-20 object-cover rounded"
          />
          <p className="text-sm">{v.title}</p>
        </div>
      ))}
    </div>
  </div>

</div>
  )
}