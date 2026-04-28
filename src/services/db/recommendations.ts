import { prisma } from "@/lib/prisma";

export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export async function getRecommendations() {
  const month = getCurrentMonth();

  const recommendations = await prisma.recommendation.findMany({
    where: { month },
  });

  return prisma.episode.findMany({
    where: { id: { in: recommendations.map((r) => r.episodeId) } },
  });
}
