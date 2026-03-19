import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

export function useVideos() {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(`/api/videos?page=${pageParam}`)
      return res.data
    },
    getNextPageParam: (lastPage) => lastPage.nextPage
  })
}