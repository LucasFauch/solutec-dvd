export interface Movie {
  _id: string;
  title: string;
  director: string;
  year: number;
  description: string;
  poster: string;
  demat: boolean;
  dvdQuantity: number;
  bluRayQuantity: number;
  favourite: boolean;
}
