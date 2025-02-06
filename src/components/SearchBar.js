import React, { useState, useEffect } from "react";
import "./Nav.css";
import { MOVIE_API, REQUESTS, ENDPOINT_TO_TITLE } from "./url";
const API_Key = "00e8e3e4aa76b7fe765f58691d55a5b6";

function SearchBar() {
    const [message, setMessage] = useState("");
    const [videoList, setVideoList] = useState();
    const [videoLists, setVideoLists] = useState();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [detailMovie, setDetailMovie] = useState(null);
    const [movieid, setMovieid] = useState();
    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    const handleClick = () => {
        setMessage("");
        setOpen((open) => false);
        setOpens((opens) => false);
    };
    function fetchMovie() {
        fetch(
            MOVIE_API +
            `/search/movie?api_key=${API_Key}&language=en-US&page=1&include_adult=false&query=${message}`
        )
            .then((res) => res.json())
            .then((json) => {
                const videoMovie = json.results;
                setVideoList(videoMovie);
            });
    }
    function searchResult() {
        fetchMovie();
        setOpen((open) => true);
    }
    function fetchVideo(movie_id) {
        fetch(MOVIE_API + `/movie/${movie_id}/videos?api_key=${API_Key}`)
            .then((res) => res.json())
            .then((json) => {
                const videoMovie = json.results;
                setVideoLists(videoMovie);
            });
    }
    console.log(videoList);
    console.log(videoLists);
    const setMovieDetailHandler = (movieDetail) => {
        setMovieid(movieDetail.id);

        setDetailMovie(movieDetail);
        if (movieid == null) {
            setOpens((opens) => !opens);
        } else if (movieid === movieDetail.id) {
            setOpens((opens) => !opens);
        }
        console.log(open);
        console.log(movieid);
        console.log(movieDetail);

        fetchVideo(movieDetail.id);
    };
    const firstNElements = videoLists?.slice(0, 1).map((id) => {
        return (
            <iframe
                width="100%"
                height="auto"
                style={{ padding: "2rem 1rem 2rem 0", border: "0" }}
                src={"https://www.youtube.com/embed/" + id.key}
            ></iframe>
        );
    });

    return (
        <>
            <div
                style={{
                    width: "40%",
                    height: "150px",
                    position: "absolute",
                    top: "4rem",
                    left: "30%",
                    backgroundColor: "white",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        height: "3rem",
                        justifyContent: "space-between",
                    }}
                >
                    <input
                        style={{ border: "none ", width: "100%" }}
                        className="fix-ip"
                        onChange={handleChange}
                        value={message}
                    ></input>
                    <span style={{ width: "2.5rem", padding: "5px" }}>
                        <svg
                            className="svg-inline--fa fa-search fa-w-16 "
                            fill="#ccc"
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="search"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </span>
                </div>
                <div
                    style={{ width: "100%", height: "1px", backgroundColor: "#0e73dc" }}
                ></div>
                <div style={{ marginTop: "2.5rem", marginLeft: "75%" }}>
                    <button
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "white",
                            border: "0",
                        }}
                        onClick={handleClick}
                    >
                        Reset
                    </button>
                    <button
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#00bfff",
                            border: "0",
                            cursor: "pointer",
                        }}
                        onClick={searchResult}
                    >
                        Search
                    </button>
                </div>
            </div>
            {open && (
                <>
                    {" "}
                    <div style={{ backgroundColor: "black", color: "white" }}>
                        <p style={{ margin: "0", marginLeft: "1rem", fontWeight: "700" }}>
                            Search Result
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            overflowX: "hidden",
                            backgroundColor: "black",
                        }}
                    >
                        {videoList?.map((item) => {
                            return (
                                <>
                                    <div className="card-image col-2">
                                        <img
                                            src={
                                                "https://image.tmdb.org/t/p/original" + item.poster_path
                                            }
                                            className="box"
                                            onClick={() => setMovieDetailHandler(item)}
                                        />
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </>
            )}
            {detailMovie && opens && (
                <div>
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
                </div>
            )}
        </>
    );
}
export default SearchBar;
