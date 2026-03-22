"use client"

import { useState, useCallback } from 'react'
import axios from 'axios'

export default function LikeButton({ videoId, likes }: { videoId: number, likes?: number }) {
  const [liked, setLiked] = useState(false)

  const getLikedVideos = useCallback(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('liked') || '[]') as number[]
    } catch {
      return []
    }
  }, [])

  const checkLiked = useCallback(() => {
    const likedVideos = getLikedVideos()
    const isLiked = likedVideos.includes(videoId)
    setLiked(isLiked)
    return isLiked
  }, [videoId, getLikedVideos])

  const handleLike = useCallback(async () => {
    if (checkLiked()) return

    try {
      await axios.put(`/api/videos/${videoId}`)

      const likedVideos = getLikedVideos()
      const updatedLikedVideos = [...likedVideos, videoId]
      localStorage.setItem('liked', JSON.stringify(updatedLikedVideos))
      setLiked(true)
    } catch (error) {
      console.error('Failed to like video:', error)
    }
  }, [videoId, checkLiked, getLikedVideos])

  return (
    <button
      onClick={handleLike}
      className={`mt-3 px-4 py-2 rounded-full transition-colors ${
        liked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      {liked ? `Liked ❤️ (${likes ?? 0})` : `Like 👍 (${likes ?? 0})`}
    </button>
  )
}

