import Link from "next/link";

type Props = {
  page: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export default function Pagination({ page, pages, hasPrev, hasNext }: Props) {
  return (
    <div className="mt-10 flex justify-center gap-6">
      {hasPrev && (
        <Link
          href={`/?page=${page - 1}`}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Previous
        </Link>
      )}

      <span className="px-4 py-2">
        Page {page} of {pages}
      </span>

      {hasNext && (
        <Link
          href={`/?page=${page + 1}`}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Next
        </Link>
      )}
    </div>
  );
}
