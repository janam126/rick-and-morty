"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("name") ?? "");

  function handleSearch() {
    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("name", value.trim());
      params.set("page", "1");
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function clearSearch() {
    setValue("");
    router.push(`/`);
  }

  return (
    <div className="flex w-full max-w-md gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search characters..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-full rounded border px-4 py-2 pr-10"
        />

        {value && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        )}
      </div>

      <button
        onClick={handleSearch}
        className="rounded bg-black px-4 py-2 cursor-pointer text-white hover:opacity-80"
      >
        Search
      </button>
    </div>
  );
}
