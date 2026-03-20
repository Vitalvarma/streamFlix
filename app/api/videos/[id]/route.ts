import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET single video + recommended
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const video = await prisma.video.findUnique({
    where: { id: Number(params.id) }
  })

  const recommended = await prisma.video.findMany({
    where: {
      category: video?.category,
      NOT: { id: Number(params.id) }
    },
    take: 5
  })

  return NextResponse.json({ video, recommended })
}

// PATCH → increase views
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const video = await prisma.video.update({
    where: { id: Number(params.id) },
    data: {
      views: { increment: 1 }
    }
  })

  return NextResponse.json(video)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const video = await prisma.video.update({
    where: { id: Number(params.id) },
    data: {
      likes: { increment: 1 }
    }
  })

  return NextResponse.json(video)
}