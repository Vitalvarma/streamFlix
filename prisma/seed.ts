import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.video.createMany({
    data: [
      {
        title: "Next.js Tutorial",
        description: "Learn Next.js basics",
        videoUrl: "VIDEO_URL",
        thumbnailUrl: "THUMBNAIL_URL",
        category: "programming"
      },
      {
        title: "React Query Guide",
        description: "Data fetching with React Query",
        videoUrl: "VIDEO_URL",
        thumbnailUrl: "THUMBNAIL_URL",
        category: "programming"
      }
    ]
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })