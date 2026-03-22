export interface Video {
  id: number
  title: string
  thumbnailUrl: string
  videoUrl?: string
  category: string
  views: number
  description?: string
  likes?: number
}

export interface VideosPage {
  videos: Video[]
  nextPage?: number
}

export interface VideoDetails {
  video: Video
  recommended: Video[]
}

