"use client"

import dynamic from "next/dynamic"
import { useVideo } from "@/hooks/useVideo"
import axios from "axios"
import { useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import LikeButton from "@/components/LikeButton"
import { Video } from "@/types/video"
import VideoCardSkeleton from "@/components/VideoCardSkeleton"

interface ReactPlayerProps {
  url: string;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  playing?: boolean;
  volume?: number;
  muted?: boolean;
}

const DynamicReactPlayer = dynamic<ReactPlayerProps>(
  () => import("react-player").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-900 animate-pulse" /> 
  }
)

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading } = useVideo(id)

  useEffect(() => {
    if (id) {
      axios.patch(`/api/videos/${id}`)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-6 p-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const video = data?.video as Video | undefined
  const recommended = data?.recommended as Video[] || []

  if (!video) {
    return <div className="p-6">Video not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <div className="lg:col-span-3">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <DynamicReactPlayer
              url={video.videoUrl || ""}
              controls
              width="100%"
              height="100%"
            />
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-3xl font-bold">{video.title}</h1>

            <p className="text-lg text-gray-500 dark:text-gray-400">
              {video.views.toLocaleString()} views
            </p>

            {video.description && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {video.description}
              </p>
            )}

            <LikeButton videoId={video.id} />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-6">Recommended</h2>

          <div className="space-y-4">
            {recommended.map((v) => (
              <Link
                key={v.id}
                href={`/watch/${v.id}`}
                className="flex gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Image
                  src={v.thumbnailUrl}
                  alt={v.title}
                  width={128}
                  height={72}
                  className="w-32 h-20 object-cover rounded-md shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm line-clamp-2 leading-tight">
                    {v.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {v.views.toLocaleString()} views
                  </p>
                </div>

                <LikeButton videoId={v.id} />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
