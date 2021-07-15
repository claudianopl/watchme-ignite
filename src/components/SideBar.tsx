import { useEffect } from "react";
import { useCallback, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface sideBarProps {
  handleClickButton: Function;
  selectedGenreId: number;
}

export function SideBar({ selectedGenreId, handleClickButton }: sideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const getGenres = useCallback(async () => {
    const response = await api.get<GenreResponseProps[]>('genres');
    setGenres(response.data);
  }, [])

  useEffect(() => {
    getGenres()
  }, [])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}