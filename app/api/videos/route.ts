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
export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(videos)
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