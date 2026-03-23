export default function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  )
}