import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

const videoSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string(),
  category: z.string()
})

// GET all videos
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page")) || 1
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""

  const limit = 6

  const videos = await prisma.video.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive"
      },
      ...(category && { category })
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json({
    videos,
    nextPage: videos.length === limit ? page + 1 : null
  })
}

// POST new video
export async function POST(req: Request) {
  const body = await req.json()
  const parsed = videoSchema.parse(body)

  const video = await prisma.video.create({
    data: parsed
  })

  return NextResponse.json(video)
}