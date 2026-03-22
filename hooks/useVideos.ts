import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

export function useVideos(search: string = '', category: string = '') {
  return useInfiniteQuery({
    queryKey: ["videos", { search, category }],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({ page: pageParam.toString() })
      if (search) params.append('search', search)
      if (category) params.append('category', category)
      const { data } = await axios.get(`/api/videos?${params.toString()}`)
      return data
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 0
  })
}

