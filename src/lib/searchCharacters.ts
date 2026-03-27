import { unstable_cache } from "next/cache";
import { CharacterApiResponse } from "../types/rickAndMorty";

type SearchParams = {
  name?: string;
  status?: string;
  page?: number;
};

async function fetchCharactersBySearch(
  params: SearchParams,
): Promise<CharacterApiResponse> {
  const query = new URLSearchParams();

  if (params.name) query.set("name", params.name);
  if (params.page) query.set("page", params.page.toString());

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?${query.toString()}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (res.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

const searchCharactersCached = unstable_cache(
  async (params: SearchParams) => {
    return fetchCharactersBySearch(params);
  },
  ["rick-and-morty-search"],
  {
    revalidate: 3600,
  },
);

export async function searchCharacters(params: SearchParams) {
  return searchCharactersCached(params);
}
