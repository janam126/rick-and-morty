import Link from "next/link";

type Props = {
  page: number;
  pages: number;
  searchParams: { name?: string };
  hasPrev: boolean;
  hasNext: boolean;
};

export default function Pagination({
  page,
  pages,
  searchParams,
  hasPrev,
  hasNext,
}: Props) {
  if (pages <= 1) return null;

  function createLink(newPage: number) {
    const params = new URLSearchParams();

    if (searchParams?.name) {
      params.set("name", searchParams?.name);
    }

    params.set("page", String(newPage));

    return `/?${params.toString()}`;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-6">
      {hasPrev && (
        <Link
          href={createLink(page - 1)}
          className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          ← Previous
        </Link>
      )}

      <span className="px-4 py-2 text-sm">
        Page {page} of {pages}
      </span>

      {hasNext && (
        <Link
          href={createLink(page + 1)}
          className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          Next →
        </Link>
      )}
    </div>
  );
}
