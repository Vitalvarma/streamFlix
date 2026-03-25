"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface UploadWidgetResult {
  event: string
  info: {
    secure_url: string
  }
}

interface CloudinaryWidget {
  createUploadWidget: (options: unknown, callback: (result: UploadWidgetResult) => void) => unknown
}


declare global {
  interface Window {
    cloudinary: CloudinaryWidget
  }
}

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showWidgets, setShowWidgets] = useState(false)
  const router = useRouter()

const handleVideoUpload = useCallback((result: UploadWidgetResult) => {
    if (!result || !result.event || result.event !== 'success') return;
    setVideoUrl(result.info.secure_url)
    setError('')
  }, [])

const handleThumbnailUpload = useCallback((result: UploadWidgetResult) => {
    if (!result || !result.event || result.event !== 'success') return;
    setThumbnailUrl(result.info.secure_url)
    setError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !videoUrl || !thumbnailUrl || !category) {
      setError('Please fill all required fields and upload files')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          category
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to upload video')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js'
    script.async = true
    script.onload = () => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
      
      const videoWidget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset: 'ml_default',
          sources: ['local'],
          multiple: false,
          resourceType: 'video',
          maxFiles: 1
        },
        handleVideoUpload
      )

      const thumbnailWidget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset: 'ml_default',
          sources: ['local'],
          multiple: false,
          resourceType: 'image',
          cropping: true,
          croppingAspectRatio: '16:9',
          maxFiles: 1
        },
        handleThumbnailUpload
      )

      const videoBtn = document.getElementById('video-upload-widget')
      const thumbnailBtn = document.getElementById('thumbnail-upload-widget')
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      videoBtn?.addEventListener('click', () => (videoWidget as any).open())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thumbnailBtn?.addEventListener('click', () => (thumbnailWidget as any).open())
    }
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://upload-widget.cloudinary.com/latest/global/all.js"]') as HTMLScriptElement
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [handleVideoUpload, handleThumbnailUpload])

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-required="true"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            aria-required="true"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="programming">Programming</option>
            <option value="music">Music</option>
            <option value="tutorial">Tutorial</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowWidgets(!showWidgets)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4"
          >
            {showWidgets ? 'Hide' : 'Show'} Upload Widgets
          </button>
          
          {showWidgets && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Upload Video *</label>
                <button 
                  id="video-upload-widget" 
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-400 transition-colors cursor-pointer"
                  aria-label="Upload video file"
                >
                  Click to upload video
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Upload Thumbnail *</label>
                <button 
                  id="thumbnail-upload-widget" 
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-400 transition-colors cursor-pointer"
                  aria-label="Upload thumbnail image"
                >
                  Click to upload thumbnail
                </button>
              </div>
            </div>
          )}
        </div>

        {videoUrl && (
          <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-sm font-medium mb-2">Video uploaded successfully!</p>
            <video controls className="w-full max-h-32 rounded mb-2">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {thumbnailUrl && (
          <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-sm font-medium mb-2">Thumbnail uploaded successfully!</p>
            <Image 
              src={thumbnailUrl} 
              alt="Thumbnail preview" 
              width={128}
              height={72}
              className="object-cover rounded"
              unoptimized
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !videoUrl || !thumbnailUrl}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Upload Video'}
        </button>
      </form>
    </div>
  )
}
