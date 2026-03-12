import Image from "next/image";

import { Character } from "../types/rickAndMorty";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  return (
    <li className="rounded-xl bg-white p-4 text-center shadow-md transition-transform hover:-translate-y-1">
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
        className="mx-auto mb-3 rounded-lg"
      />

      <h3 className="text-lg font-semibold">{character.name}</h3>

      <p className="text-sm text-gray-500">
        {character.species} — {character.status}
      </p>
    </li>
  );
}
