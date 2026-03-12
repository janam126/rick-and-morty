import { searchCharacters } from "@/src/lib/searchCharacters";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name") || undefined;
    const page = Number(searchParams.get("page")) || 1;

    const characters = await searchCharacters({
      name,
      page,
    });

    return NextResponse.json(characters);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 },
    );
  }
}
