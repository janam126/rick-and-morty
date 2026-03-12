import { unstable_cache } from "next/cache";
import { ApiResponse } from "../types/rickAndMorty";

export async function fetchCharacters(page: number): Promise<ApiResponse> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

const getCharactersCached = unstable_cache(
  async (page: number) => {
    return fetchCharacters(page);
  },
  ["rick-and-morty-characters"],
  {
    revalidate: 3600,
  },
);

export async function getCharacters(page: number) {
  return getCharactersCached(page);
}
