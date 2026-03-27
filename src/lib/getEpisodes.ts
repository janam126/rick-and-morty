import { Episode, EpisodeApiResponse } from "../types/rickAndMorty";

export async function getEpisodes() {
  let url: string | null = "https://rickandmortyapi.com/api/episode";

  const allEpisodes: Episode[] = [];

  while (url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch episodes");
    }

    const data: EpisodeApiResponse = await res.json();

    allEpisodes.push(...data.results);
    url = data.info.next;
  }

  return allEpisodes;
}
