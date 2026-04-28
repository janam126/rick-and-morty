import { unstable_cache } from "next/cache";
import { CharacterApiResponse } from "@/types/rickAndMorty";

type SearchParams = {
  name?: string;
  status?: string;
  page?: number;
};

async function fetchCharacters(page: number): Promise<CharacterApiResponse> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

async function fetchCharactersBySearch(
  params: SearchParams,
): Promise<CharacterApiResponse> {
  const query = new URLSearchParams();

  if (params.name) query.set("name", params.name);
  if (params.page) query.set("page", params.page.toString());

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?${query.toString()}`,
    { next: { revalidate: 3600 } },
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

export const getCharacters = unstable_cache(
  async (page: number) => fetchCharacters(page),
  ["rick-and-morty-characters"],
  { revalidate: 3600 },
);

export const searchCharacters = unstable_cache(
  async (params: SearchParams) => fetchCharactersBySearch(params),
  ["rick-and-morty-search"],
  { revalidate: 3600 },
);
