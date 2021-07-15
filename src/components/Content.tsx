import { MovieCard } from './MovieCard';

import { api } from '../services/api';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';

interface MovieProps {
  Genre_id: number;
  selectedGenreId: number;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const getMovies = useCallback(async () => {
    const response = await api.get<MovieProps[]>('movies', {
      params: {
        Genre_id: selectedGenreId
      }
    });

    setMovies(response.data);
  }, [selectedGenreId])

  const getSelectedGenre = useCallback(async () => {
    const response = await api.get<GenreResponseProps>(`genres/${selectedGenreId}`);
    setSelectedGenre(response.data);
  }, [selectedGenreId]);

  useEffect(() => {
    getMovies();
    getSelectedGenre();
  }, [selectedGenreId])


  return (
    <div className="container">

      <header>
        <span className="category">Categoria:<span>{selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.Poster} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}