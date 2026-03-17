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
    <div className="p-6">
      <ReactPlayer url={video.videoUrl} controls width="100%" />

      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-500">{video.views} views</p>
      <p className="mt-2">{video.description}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Recommended</h2>

        <div className="grid grid-cols-3 gap-4">
          {recommended.map((v: any) => (
            <div key={v.id}>
              <Image src={v?.thumbnailUrl} alt={v.title} />
              <p>{v.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}