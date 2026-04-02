import { prisma } from "@/lib/prisma";
import { Episode } from "@/src/generated/client";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function GET() {
  try {
    const month = getCurrentMonth();

    const existing = await prisma.recommendation.findMany({
      where: { month },
      include: { episode: true },
    });

    if (existing.length > 0) {
      return Response.json(existing);
    }

    const episodes: Episode[] = await prisma.episode.findMany();

    const selected = getRandomItems<Episode>(episodes, 10);

    await prisma.recommendation.createMany({
      data: selected.map((ep) => ({
        month,
        episodeId: ep.id,
      })),
    });

    const recommendations = await prisma.recommendation.findMany({
      where: { month },
      include: { episode: true },
    });

    return Response.json(recommendations);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error" }, { status: 500 });
  }
}
