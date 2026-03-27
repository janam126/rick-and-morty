// import { getEpisodes } from "@/src/lib/getEpisodes";
// import { prisma } from "@/src/lib/prisma";

// async function seedEpisodes() {
//   const episodes = await getEpisodes();

//   console.log("Fetched:", episodes.length);

//   for (const ep of episodes) {
//     await prisma.episode.upsert({
//       where: { id: ep.id },
//       update: {},
//       create: {
//         id: ep.id,
//         name: ep.name,
//         airDate: ep.air_date,
//         episodeCode: ep.episode,
//       },
//     });
//   }

//   console.log("Done ✅");
// }

// seedEpisodes()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
