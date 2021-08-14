import { React, useEffect, useState } from "react";
import api from "../../services/extenalApi";
import MovieCard from "../../components/movieCard/MovieCard";
import "./Dashboard.scss";

export default function Dashboard() {
  const [moviesLeft, setMoviesLeft] = useState([]);
  const [moviesRight, setMoviesRight] = useState([]);
  const [load, setLoad] = useState(false);
  async function loadMovies() {
    let res = await api.tenantGet("/Movie");
    let moviesLeft = [];
    let moviesRight = [];
    let aux = 1;
    res.data.forEach((movie, index) => {
      if (aux === 2 || aux === 3) {
        if (aux === 2) {
          moviesRight.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieDuration={movie.duration}
              movieYear={movie.year}
              className={"movie-large"}
            ></MovieCard>
          );
        } else {
          moviesLeft.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieDuration={movie.duration}
              movieYear={movie.year}
              className={"movie-large"}
            ></MovieCard>
          );
        }
      } else {
        if (aux === 4) {
          moviesLeft.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieDuration={movie.duration}
              movieYear={movie.year}
              className="movie-small"
            ></MovieCard>
          );
          aux = 0;
        } else {
          moviesRight.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieDuration={movie.duration}
              movieYear={movie.year}
              className="movie-small"
            ></MovieCard>
          );
        }
      }

      aux++;
    });
    setMoviesRight(moviesRight);
    setMoviesLeft(moviesLeft);
    setLoad(true);
  }
  useEffect(() => {
    if (!load) {
      loadMovies();
    }
  });
  return (
    <>
      <div className="movies">
        <div className="list-movies">{moviesLeft}</div>
        <div className="list-movies">{moviesRight}</div>
      </div>
    </>
  );
}
