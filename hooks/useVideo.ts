import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useVideo(id: string) {
  return useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const res = await axios.get(`/api/videos/${id}`)
      return res.data
    }
  })
}