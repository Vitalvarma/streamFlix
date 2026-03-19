"use client"

import { useVideos } from "@/hooks/useVideos"
import VideoCard from "@/components/VideoCard"
import { useEffect, useRef } from "react"

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useVideos()

  const loadMoreRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <p className="p-10">Loading...</p>

  return (
    <div className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.pages.map((page, i) => (
          <div key={i} className="contents">
            {page.videos.map((video: any) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ))}
      </div>

      {/* Trigger for infinite scroll */}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  )
}