import React, { useState, useEffect } from "react";
import "./MovieList.css";
import { MOVIE_API, REQUESTS } from "./url";
function List(props) {
    const { movielist, setMovieDetailHandler } = props;

    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="card">
                {movielist?.map((item, index) => {
                    // console.log(props.genre)
                    // console.log(item)
                    // console.log(props?.id)
                    return (
                        <div
                            onClick={() => setMovieDetailHandler(item)}
                            className="card-image col-2 "
                            key={item.id}
                        >
                            {props?.type == "" ? (
                                <img
                                    // key={item.key}

                                    alt={item.id}
                                    src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                                    className="box"
                                />
                            ) : (
                                <img
                                    // key={item.key}

                                    alt={item.id}
                                    src={
                                        "https://image.tmdb.org/t/p/original" + item.backdrop_path
                                    }
                                    className="box"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default List;
