import React, { useState } from "react";
import "./MovieCard.scss";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import Modal from "react-modal";
import { useCookies } from "react-cookie";

export default function MovieCard({
  imgUrl,
  movieName,
  movieDuration,
  movieYear,
  movieTrailer,
  movieWhereWatch,
  className,
}) {
  const [whereWatchs, setWhereWatchs] = useState([]);
  const [title, setTitle] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["favorites"]);

  const streams = [
    { urlName: "netflix", name: "Netflix" },
    { urlName: "hbomax", name: "Hbo Max" },
    { urlName: "hbogo", name: "Hbo Go" },
    { urlName: "google", name: "Google Play" },
    { urlName: "microsoft", name: "Microsoft" },
    { urlName: "apple", name: "ITunes" },
    { urlName: "looke", name: "Looke" },
    { urlName: "oiplay", name: "Oi Play" },
    { urlName: "now", name: "Now Online" },
    { urlName: "prime", name: "Prime Video" },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      background: "transparent",
      border: "0",
    },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function iconStream(url) {
    var stream = {
      imgUrl: "",
      name: "",
    };
    streams.forEach((streamName) => {
      if (url.includes(streamName.urlName)) {
        stream = {
          imgUrl:
            process.env.PUBLIC_URL + "/streams/" + streamName.urlName + ".jpg",
          name: streamName.name,
        };
      }
    });
    return stream;
  }
  function goToLink(url) {
    window.location.href = url;
  }
  function loadWhereWatchs() {
    var wheres = [];
    if (movieWhereWatch != undefined || movieWhereWatch.length > 0) {
      movieWhereWatch.forEach((stream) => {
        var icon = iconStream(stream.split(";")[0]);
        var aux = {
          imgUrl: icon.imgUrl,
          streamName: icon.name,
        };
        wheres.push(
          <li
            className="stream-button"
            onClick={() => {
              goToLink(stream.split(";")[0]);
            }}
          >
            <strong className="stream-name">
              <img
                width="28px"
                height="28px"
                style={{ marginLeft: "8px", marginRight: "12px" }}
                src={aux.imgUrl}
                alt=""
              />
              {aux.streamName}
            </strong>{" "}
            {stream.split(";").length == 2
              ? "a partir de R$ " + stream.split(";")[1]
              : "Assinatura"}
          </li>
        );
      });
    } else {
      wheres.push(<a href="#">Ainda não esta disponivel</a>);
    }
    setWhereWatchs(wheres);
  }
  async function addFavorite() {
    let oldFavorites = cookies.favorites;
    let newFavorites = oldFavorites + "," + movieName;
    setCookie("favorites", newFavorites);
  }
  useEffect(() => {
    if (title !== movieName) {
      loadWhereWatchs();
      setTitle(movieName);
    }
  });
  if (cookies.favorites == undefined) {
    setCookie("favorites", "");
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <iframe
          width="696"
          height="392"
          src={"https://www.youtube.com/embed/" + movieTrailer}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal>
      <div
        className={className + " movie-card"}
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
            className="btn btn-darkGrey btn-favorite"
            onClick={addFavorite}
          >
            {cookies.favorites != undefined ? (
              cookies.favorites.includes(movieName) ? (
                <img
                  className="favorite-active"
                  src={process.env.PUBLIC_URL + "/icon/favorite-active.svg"}
                  alt=""
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/icon/favorite.svg"}
                  alt=""
                />
              )
            ) : (
              <img src={process.env.PUBLIC_URL + "/icon/favorite.svg"} alt="" />
            )}
          </button>
        </div>
        <div className="movie-card-body">
          <div>
            <h4 className="movie-title">{movieName}</h4>
            <h5 className="movie-duration">
              {movieDuration} - {movieYear}
            </h5>
          </div>
          <div className="row-trailer">
            <button
              className="btn btn-black"
              style={{
                marginRight: "16px",
              }}
              onClick={openModal}
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
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
