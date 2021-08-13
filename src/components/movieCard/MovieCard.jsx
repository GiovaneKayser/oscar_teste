import React from 'react'

export default function MovieCard({ imgUrl, movieName, movieDuration, movieYear, movieTrailer, movieWhereWatch }) {
    return (
      <React.Fragment>
        <div class="movie-card">
                <div class="movie-card-header">
                    <button>
                        Favorito
                    </button>
          </div>
          <div class="movie-card-body">
            <div>
              <h4>{movieName}</h4>
              <h5>
                {movieDuration} - {movieYear}
              </h5>
            </div>
            <div>
                        <button>
                            Trailer
                        </button>
                        <button>
                            Assistir    
                        </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}