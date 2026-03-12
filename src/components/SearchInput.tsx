"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("name") || "");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setValue(name);

    const params = new URLSearchParams(searchParams);

    if (name) {
      params.set("name", name);
      params.set("page", "1");
    } else {
      params.delete("name");
    }

    router.push(`/?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={value}
      onChange={handleSearch}
      className="w-full max-w-md rounded border px-4 py-2"
    />
  );
}
