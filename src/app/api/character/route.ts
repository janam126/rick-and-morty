import { getCharacters } from "@/src/lib/rickAndMorty";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const characters = await getCharacters();

    return NextResponse.json(characters);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 },
    );
  }
}
