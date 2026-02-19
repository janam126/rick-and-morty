import { unstable_cache } from "next/cache";
import { Character } from "../types/character";

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character");

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data = await res.json();

  return data.results;
}

export const getCharacters = unstable_cache(
  async () => {
    return fetchCharacters();
  },
  ["rick-and-morty-characters"],
  {
    revalidate: 3600,
  },
);
