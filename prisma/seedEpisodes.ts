import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { EpisodeApiResponse } from "../src/types/rickAndMorty";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seedEpisodes() {
  let url: string | null = "https://rickandmortyapi.com/api/episode";

  while (url) {
    const res = await fetch(url);
    const data: EpisodeApiResponse = await res.json();

    for (const ep of data.results) {
      await prisma.episode.upsert({
        where: { id: ep.id },
        update: {},
        create: {
          id: ep.id,
          name: ep.name,
          airDate: ep.air_date,
          episodeCode: ep.episode,
        },
      });
    }

    url = data.info.next;
  }

  console.log("Episodes seeded");
}

seedEpisodes()
  .catch((e) => {
    console.error("Seeding failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
