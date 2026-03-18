import Link from "next/link"
import Image from "next/image"
export default function VideoCard({ video }: { video: any }) {
  return (
    <Link href={`/watch/${video.id}`}>
      <div className="cursor-pointer group">
        
        <Image
          src={video.thumbnailUrl}
            alt={video.title}
          className="rounded-lg w-full h-48 object-cover group-hover:opacity-80 transition"
        />

        <div className="mt-2">
          <h2 className="font-semibold text-sm line-clamp-2">
            {video.title}
          </h2>

          <p className="text-xs text-gray-500">
            {video.category}
          </p>

          <p className="text-xs text-gray-400">
            {video.views} views
          </p>
        </div>

      </div>
    </Link>
  )
}