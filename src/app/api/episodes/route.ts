import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const episodes = await prisma.episode.findMany();
  return Response.json(episodes);
}
