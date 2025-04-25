import { Genre } from "./genre.model";

export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genre: Genre;
  likes: number;
}

  