
import { Character } from "../types/rickAndMorty";
import CharacterCard from "./CharacterCard";

type Props = {
  characters: Character[];
};

export default function CharactersGrid({ characters }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </ul>
  );
}
