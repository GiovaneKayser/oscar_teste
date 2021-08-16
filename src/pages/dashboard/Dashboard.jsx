import { React, useEffect, useState } from "react";
import api from "../../services/extenalApi";
import MovieCard from "../../components/movieCard/MovieCard";
import "./Dashboard.scss";
import { Dropdown } from "react-bootstrap";

export default function Dashboard() {
  const [moviesLeft, setMoviesLeft] = useState([]);
  const [moviesRight, setMoviesRight] = useState([]);
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState("");
  const [lastFilter, setLastFilter] = useState("");

  async function loadMovies() {
    let res = response;
    let moviesLeft = [];
    let moviesRight = [];
    let aux = 1;
    // if (response === null || res === null) {
    res = await api.tenantGet("/Movie");
    setResponse(res);
    // }
    if (filter !== "") {
      res.data = await sortMovies(res.data, filter);
    }
    res.data.forEach((movie) => {
      if (aux === 2 || aux === 3) {
        if (aux === 2) {
          moviesRight.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieTrailer={movie.trailer}
              movieDuration={movie.duration}
              movieYear={movie.year}
              movieWhereWatch={movie.whereWatch}
              className={"movie-small"}
            ></MovieCard>
          );
        } else {
          moviesLeft.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieTrailer={movie.trailer}
              movieDuration={movie.duration}
              movieYear={movie.year}
              movieWhereWatch={movie.whereWatch}
              className={"movie-small"}
            ></MovieCard>
          );
        }
      } else {
        if (aux === 4) {
          moviesRight.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieTrailer={movie.trailer}
              movieDuration={movie.duration}
              movieYear={movie.year}
              movieWhereWatch={movie.whereWatch}
              className="movie-large"
            ></MovieCard>
          );
          aux = 0;
        } else {
          moviesLeft.push(
            <MovieCard
              imgUrl={movie.imgUrl}
              movieName={movie.title}
              movieTrailer={movie.trailer}
              movieDuration={movie.duration}
              movieYear={movie.year}
              movieWhereWatch={movie.whereWatch}
              className="movie-large"
            ></MovieCard>
          );
        }
      }

      aux++;
    });
    setMoviesRight(moviesRight);
    setMoviesLeft(moviesLeft);
    setLastFilter(filter);
    setLoad(true);
  }
  async function sortMovies(array, param) {
    return array.sort((a, b) =>
      a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0
    );
  }
  useEffect(() => {
    if (!load || lastFilter !== filter) {
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
                  <li
                    onClick={() => {
                      setFilter("title");
                    }}
                  >
                    Ordem alfabética
                  </li>
                  <hr></hr>
                  <li
                    onClick={() => {
                      setFilter("scoreIMDB");
                    }}
                  >
                    Score do IMDB
                  </li>
                  <hr></hr>
                  <li
                    onClick={() => {
                      setFilter("duration");
                    }}
                  >
                    Duração
                  </li>
                  <hr></hr>
                  <li
                    onClick={() => {
                      setFilter("numberIndication");
                    }}
                  >
                    Número de indica
                  </li>
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
