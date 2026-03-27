export type CharacterApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
};

export type EpisodeApiResponse = {
  info: {
    next: string | null;
  };
  results: Episode[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};
