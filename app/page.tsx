"use client"

import { useSearchParams } from 'next/navigation'
import { useVideos } from '@/hooks/useVideos'
import VideoCard from '@/components/VideoCard'
import { Video, VideosPage } from '@/types/video'
import { useEffect, useRef } from 'react'
import VideoCardSkeleton from '@/components/VideoCardSkeleton'

export default function Home() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useVideos(search, category)

  const loadMoreRef = useRef<HTMLDivElement>(null)

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

if (isLoading) {
  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  )
}
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Category Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {['all', 'programming', 'music', 'tutorial'].map((cat) => (
          <button
            key={cat}
            onClick={() =>
              window.location.href = cat === 'all' ? '/' : `/?category=${cat}`
            }
            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Videos */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(data?.pages ?? []).map((page: VideosPage, i) => (
          <div key={i}>
            {page.videos.map((video: Video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10" />
    </div>
  )
}

