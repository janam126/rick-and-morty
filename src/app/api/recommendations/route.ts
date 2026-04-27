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

async function getRecommendationsWithEpisodes(month: string) {
  const recommendations = await prisma.recommendation.findMany({
    where: { month },
  });

  const episodes = await prisma.episode.findMany({
    where: { id: { in: recommendations.map((r) => r.episodeId) } },
  });

  return episodes;
}

export async function GET() {
  try {
    const month = getCurrentMonth();

    const existing = await prisma.recommendation.findMany({
      where: { month },
    });

    if (existing.length > 0) {
      const episodes = await prisma.episode.findMany({
        where: { id: { in: existing.map((r) => r.episodeId) } },
      });
      return Response.json(episodes);
    }

    const episodes: Episode[] = await prisma.episode.findMany();

    const selected = getRandomItems<Episode>(episodes, 10);

    await prisma.recommendation.createMany({
      data: selected.map((ep) => ({
        month,
        episodeId: ep.id,
      })),
    });

    return Response.json(await getRecommendationsWithEpisodes(month));
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error" }, { status: 500 });
  }
}
