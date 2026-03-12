import SearchInput from "../components/SearchInput";
import CharactersGrid from "../components/CharactersGrid";
import Pagination from "../components/Pagination";

import { searchCharacters } from "../lib/searchCharacters";
import { getCharacters } from "../lib/getCharacters";

type Props = {
  searchParams: Promise<{ page?: string; name?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const name = params.name;

  const data = name
    ? await searchCharacters({ name, page })
    : await getCharacters(page);

  const { info, results } = data;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-12 text-center text-3xl font-bold">
        Rick and Morty Characters
      </h1>

      <div className="mb-6 flex justify-center">
        <SearchInput />
      </div>

      <CharactersGrid characters={results} />

      <Pagination
        page={page}
        pages={info.pages}
        hasPrev={!!info.prev}
        hasNext={!!info.next}
      />
    </main>
  );
}
