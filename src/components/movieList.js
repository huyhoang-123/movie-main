import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import "./MovieList.css";
import { MOVIE_API, REQUESTS, ENDPOINT_TO_TITLE } from "./url";
import List from "./listting";

const API_Key = "00e8e3e4aa76b7fe765f58691d55a5b6";

function MovieList() {
    const [bigMovie, setBigMovie] = useState([]);
    const [detailMovie, setDetailMovie] = useState(null);
    const [videoList, setVideoList] = useState();
    const [open, setOpen] = useState(false);

    const [movieid, setMovieid] = useState();

    function fetchMovieList() {
        REQUESTS.map(({ value, title }, index) => {
            fetch(MOVIE_API + value + API_Key)
                .then((res) => res.json())
                .then((json) => {
                    const movieList = json?.results;
                    const dataListMovive = {
                        title,
                        movieList,
                    };
                    setBigMovie((prevState) => {
                        return [...prevState, dataListMovive];
                    });
                });
        });
    }
    //get api by idmovie
    function fetchVideo(movie_id) {
        fetch(MOVIE_API + `/movie/${movie_id}/videos?api_key=${API_Key}`)
            .then((res) => res.json())
            .then((json) => {
                const videoMovie = json.results;
                setVideoList(videoMovie);
            });
    }
    //  lấy video đầu tiên tìm được
    const firstNElements = videoList?.slice(0, 1).map((id) => {
        return (
            <iframe
                width="100%"
                height="auto"
                style={{ padding: "2rem 1rem 2rem 0", border: "0" }}
                src={"https://www.youtube.com/embed/" + id.key}
            ></iframe>
        );
    });

    const setMovieDetailHandler = (movieDetail) => {
        setMovieid(movieDetail.id);

        setDetailMovie(movieDetail);
        if (movieid == null) {
            setOpen((open) => !open);
        } else if (movieid === movieDetail.id) {
            setOpen((open) => !open);
        }


        fetchVideo(movieDetail.id);
    };

    useEffect(() => {
        fetchMovieList();
    }, []);

    return (
        <>
            <div className="row" style={{ width: "100%" }}>
                <div className=" style_1">
                    {bigMovie?.length !== 0 ? (
                        bigMovie?.map((movielist, id) => {
                            return (
                                <>
                                    <div key={movielist.id}>
                                        <p
                                            style={{
                                                color: "white",
                                                fontWeight: "700",
                                                marginLeft: "20px",
                                            }}
                                        >
                                            {movielist?.title}
                                        </p>
                                        <List
                                            setMovieDetailHandler={setMovieDetailHandler}
                                            type={movielist.title}
                                            movielist={movielist.movieList}
                                        />
                                    </div>
                                </>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    {detailMovie && open && (
                        <div
                            style={{
                                position: "fixed",
                                bottom: "0",
                                width: "100%",
                                height: "400px",
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "black",
                            }}
                        >
                            <div className="col-6" style={{ color: "white", width: "100%" }}>
                                <p style={{ marginTop: "2rem", marginLeft: "2rem" }}>
                                    {detailMovie?.name || detailMovie?.original_title}
                                </p>
                                <div
                                    style={{
                                        marginLeft: "2rem",
                                        marginRight: "1rem",
                                        height: "1px",
                                        backgroundColor: "white",
                                    }}
                                ></div>
                                <p
                                    style={{
                                        marginBottom: "0",
                                        marginLeft: "2rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    Release date: {detailMovie?.first_air_date}
                                </p>
                                <p
                                    style={{
                                        marginLeft: "2rem",
                                        fontWeight: "700",
                                        marginTop: "0",
                                    }}
                                >
                                    Vote: {detailMovie?.vote_average}/10
                                </p>
                                <p
                                    style={{
                                        marginLeft: "2rem",
                                        marginRight: "1rem",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    {detailMovie?.overview}
                                </p>
                            </div>

                            {videoList == 0 || videoList == undefined ? (
                                <img
                                    style={{
                                        width: "50%",
                                        marginTop: "2rem",
                                        marginRight: "1rem",
                                        marginBottom: "2rem",
                                    }}
                                    src={
                                        "https://image.tmdb.org/t/p/original" +
                                        detailMovie.backdrop_path
                                    }
                                />
                            ) : (
                                firstNElements
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default MovieList;
