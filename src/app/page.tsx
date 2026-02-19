import Image from "next/image";
import { Character } from "../types/character";
import { getCharacters } from "../lib/rickAndMorty";

export default async function Home() {
  const characters: Character[] = await getCharacters();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-12 text-center text-3xl font-bold">
        Rick and Morty Characters
      </h1>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => (
          <li
            key={character.id}
            className="rounded-xl bg-white p-4 text-center shadow-md transition-transform hover:-translate-y-1"
          >
            <Image
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="mb-3 mx-auto rounded-lg"
            />

            <h3 className="text-lg font-semibold">{character.name}</h3>

            <p className="text-sm text-gray-500">
              {character.species} — {character.status}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
