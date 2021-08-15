import React, { useState } from "react";
import "./MovieCard.scss";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";

export default function MovieCard({
  imgUrl,
  movieName,
  movieDuration,
  movieYear,
  movieTrailer,
  movieWhereWatch,
  height,
  className,
}) {
  const [whereWatchs, setWhereWatchs] = useState([]);
  const [load, setLoad] = useState(false);
  const streams = [
    "netflix",
    "hbomax",
    "hbogo",
    "google",
    "microsoft",
    "apple",
    "looke",
    "oiplay",
    "now",
  ];

  function iconStream(url) {
    var stream = {
      imgUrl: "",
      name: "",
    };
    streams.forEach((streamName) => {
      if (url.includes(streamName)) {
        stream = {
          imgUrl: process.env.PUBLIC_URL + "/streams/" + streamName + ".jpg",
          name: streamName,
        };
      }
    });
    return stream;
  }

  function loadWhereWatchs() {
    var wheres = [];
    if (movieWhereWatch != undefined || movieWhereWatch.length > 0) {
      movieWhereWatch.forEach((stream) => {
        var icon = iconStream(stream.split(";")[0]);
        var aux = {
          imgUrl: icon.imgUrl,
          price: 10,
          streamName: icon.name,
        };
        console.log(aux);
        wheres.push(
          <a className="stream-button" href={stream.split(";")[0]}>
            <img
              width="28px"
              height="28px"
              style={{ marginLeft: "8px" }}
              src={aux.imgUrl}
              alt=""
            />
            {iconStream(stream.split(";")[0]).streamName} Apartir de R$
          </a>
        );
      });
    } else {
      wheres.push(<a href="#">Ainda não esta disponivel</a>);
    }
    setWhereWatchs(wheres);

    setLoad(true);
  }

  useEffect(() => {
    if (!load) {
      loadWhereWatchs();
    }
  });
  return (
    <React.Fragment>
      <div
        className={className + " movie-card"}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <div className="movie-card-header">
          <button
            style={{
              marginTop: "32px",
              marginRight: "24px",
              padding: "11px",
              fontSize: "22px",
            }}
            className="btn btn-darkGrey"
          >
            <i className="bi bi-bookmark"></i>
          </button>
        </div>
        <div className="movie-card-body">
          <div>
            <h4 className="movie-title">{movieName}</h4>
            <h5 className="movie-duration">
              {movieDuration} - {movieYear}
            </h5>
          </div>
          <div
            style={{
              marginBottom: "40px",
              display: "flex",
            }}
          >
            <button
              className="btn btn-black"
              style={{
                marginRight: "16px",
              }}
            >
              Trailer
            </button>
            <Dropdown>
              <Dropdown.Toggle className="btn btn-black" id="dropdown-basic">
                Assistir
                <img
                  width="14px"
                  height="8px"
                  style={{ marginLeft: "8px" }}
                  src={process.env.PUBLIC_URL + "/icon/up.svg"}
                  alt=""
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-content">
                {whereWatchs}
                {/* <a href="#/action-1">Linha 1</a>
                <hr></hr>
                <a href="#/action-2">Linha 1</a>
                <hr></hr>
                <a href="#/action-3">Linha 1</a> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
