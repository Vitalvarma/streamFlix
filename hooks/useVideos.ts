import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axios.get("/api/videos")
      return res.data
    },
  })
}