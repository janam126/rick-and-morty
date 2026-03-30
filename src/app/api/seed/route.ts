import { prisma } from "@/src/lib/prisma";
import { EpisodeApiResponse } from "@/src/types/rickAndMorty";

export async function GET() {
  try {
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
            episode: ep.episode,
          },
        });
      }

      url = data.info.next;
    }

    return Response.json({ message: "Episodes seeded ✅" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
}
