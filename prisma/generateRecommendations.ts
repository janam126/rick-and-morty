import { PrismaClient, Episode } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function getNextMonth(): string {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return `${next.getFullYear()}-${next.getMonth() + 1}`;
}

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function generateRecommendations() {
  const month = process.argv[2] ?? getNextMonth();

  console.log(`Generating recommendations for month: ${month}`);

  const existing = await prisma.recommendation.findMany({ where: { month } });

  if (existing.length > 0) {
    console.log(
      `Recommendations for ${month} already exist (${existing.length} entries). Skipping.`,
    );
    return;
  }

  const episodes = await prisma.episode.findMany();

  if (episodes.length === 0) {
    throw new Error("No episodes found in the database. Run seed first.");
  }

  const selected = getRandomItems<Episode>(episodes, 10);

  await prisma.recommendation.createMany({
    data: selected.map((ep) => ({ month, episodeId: ep.id })),
  });

  console.log(
    `Created ${selected.length} recommendations for ${month}:`,
    selected.map((ep) => `[${ep.episodeCode}] ${ep.name}`).join(", "),
  );
}

generateRecommendations()
  .catch((e) => {
    console.error("Failed to generate recommendations:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
