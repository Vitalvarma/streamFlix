"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function LikeButton({ videoId, likes }: { videoId: number, likes?: number }) {
  const [liked, setLiked] = useState(false)
    
  useEffect(() => {
    const likedVideos = JSON.parse(localStorage.getItem("liked") || "[]")
    if (likedVideos.includes(videoId)) {
      setLiked(true)
    }
  }, [videoId])

  const handleLike = async () => {
    if (liked) return

    await axios.put(`/api/videos/${videoId}`)

    const likedVideos = JSON.parse(localStorage.getItem("liked") || "[]")
    localStorage.setItem("liked", JSON.stringify([...likedVideos, videoId]))

    setLiked(true)
  }

  return (
    <button
      onClick={handleLike}
      className={`mt-3 px-4 py-2 rounded ${
        liked ? "bg-gray-500" : "bg-blue-500"
      } text-white`}
    >
      {liked ? "Liked ❤️" : "Like 👍"}
    </button>
  )
}