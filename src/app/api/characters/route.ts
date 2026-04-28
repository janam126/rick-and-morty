import { searchCharacters } from "@/services/api/characters";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name") || undefined;
    const page = Number(searchParams.get("page")) || 1;

    const data = await searchCharacters({ name, page });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 },
    );
  }
}
