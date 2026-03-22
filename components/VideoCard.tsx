import Link from 'next/link'
import Image from 'next/image'

interface Video {
  id: number
  title: string
  thumbnailUrl: string
  category: string
  views: number
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/watch/${video.id}`} className="block">
      <div className="cursor-pointer group transition-all rounded-lg overflow-hidden hover:shadow-lg">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={320}
          height={180}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="p-3">
          <h2 className="font-semibold text-sm line-clamp-2 leading-tight">
            {video.title}
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {video.category}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {video.views.toLocaleString()} views
          </p>
        </div>
      </div>
    </Link>
  )
}

