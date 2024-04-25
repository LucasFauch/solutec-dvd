export interface Movie {
  movieId: string;
  title: string;
  director: string;
  year: number;
  description: string;
  poster: string;
  genres: string[];
  stock: {
    demat: number;
    dvd: number;
    bluRay: number;
  };
  favourite: boolean;
}
