import React from "react";
import "./MovieCard.scss";
export default function MovieCard({
  imgUrl,
  movieName,
  movieDuration,
  movieYear,
  movieTrailer,
  movieWhereWatch,
  height,
}) {
  return (
    <React.Fragment>
      <div
        className="movie-card"
        style={{
          backgroundImage: `url(${imgUrl})`,
          height: `${height}px`,
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
            <button className="btn btn-black">
              Assistir
              <img
                width="14px"
                height="8px"
                style={{ marginLeft: "8px" }}
                src={process.env.PUBLIC_URL + "/icon/up.svg"}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
