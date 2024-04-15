export interface Movie {
  _id: string;
  title: string;
  director: string;
  year: number;
  description: string;
  poster: string;
  stock: {
    demat: number;
    dvd: number;
    bluRay: number;
  };
  favourite: boolean;
}
