import { React, useEffect, useState } from "react";
import api from "../../services/extenalApi";
import MovieCard from "../../components/movieCard/MovieCard";
import "./Dashboard.scss";
import { Dropdown } from "react-bootstrap";

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
              movieWhereWatch={movie.whereWatch}
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
              movieWhereWatch={movie.whereWatch}
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
              movieWhereWatch={movie.whereWatch}
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
              movieWhereWatch={movie.whereWatch}
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
        <div className="list-movies">
          <div className="filter"></div>
          {moviesLeft}
        </div>
        <div className="list-movies">
          <div className="filter">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-darkBlue" id="dropdown-basic">
                Filtrar por
                <img
                  width="14px"
                  height="8px"
                  style={{ marginLeft: "8px" }}
                  src={process.env.PUBLIC_URL + "/icon/up.svg"}
                  alt=""
                />
              </Dropdown.Toggle>
              <div style={{ padding: "10px" }}>
                <Dropdown.Menu className="dropdown-content">
                  <a href="#/action-1">Ordem alfabética</a>
                  <hr></hr>
                  <a href="#/action-2">Score do IMDB</a>
                  <hr></hr>
                  <a href="#/action-3">Duração</a>
                  <hr></hr>
                  <a href="#/action-3">Número de indica</a>
                </Dropdown.Menu>
              </div>
            </Dropdown>
          </div>
          {moviesRight}
        </div>
      </div>
    </>
  );
}
