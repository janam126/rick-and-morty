import { Recommendation } from "../types/rickAndMorty";

async function getRecommendations(): Promise<Recommendation[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/recommendations`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}

export default async function Recommendations() {
  const data = await getRecommendations();

  return (
    <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">
        Recommended Episodes
      </h1>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{item.episode.name}</h3>

            <div className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
              {item.episode.episode}
            </div>

            <p className="mt-3 text-sm text-gray-500">{item.episode.airDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
