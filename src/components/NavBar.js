import React, { useState, useEffect } from "react";
import "./Nav.css";


function NavBar() {
    const [open, setOpen] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);

        } else {
            setNavbar(false);
        }
    };
    window.addEventListener("scroll", changeBackground);
    const [backgroundUrl, setBackgroundUrl] = useState();
    function fetchMovieHandler() {
        fetch(
            "https://api.themoviedb.org/3/discover/tv?api_key=00e8e3e4aa76b7fe765f58691d55a5b6&with_network=123"
        )
            .then((res) => res.json())
            .then((json) => {

                const movieList = json.results;


                const randomNumber = Math.floor(Math.random() * movieList.length - 1);
                const randomMovie = movieList[randomNumber];

                const X =
                    "https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path;
                setBackgroundUrl(X);
            });

    }
    function searchBar() {
        window.location.replace("search");

    }

    useEffect(() => {
        fetchMovieHandler();
    }, []);

    return (
        <div>
            <div>
                {" "}
                <nav className={navbar ? "navbar active" : "navbar"}>
                    <span className="logo" onClick={() => window.location.replace("/")}>
                        Movie app
                    </span>

                    <svg
                        onClick={searchBar}

                        className="svg-inline--fa fa-search fa-w-16 searchBtn"
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
                </nav>
                <div
                    className="header"
                    style={{ backgroundImage: `url(${backgroundUrl})` }}
                ></div>
            </div>
        </div>
    );
}

export default NavBar;
