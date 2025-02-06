import React from "react";
import NavBar from "../../components/NavBar";
// import BanNer from '../../components/BanNer';
import MovieList from "../../components/movieList";
function Browse() {
  return (
    <div style={{ background: "#1a1a1a", overflow: "hidden" }}>
      <NavBar></NavBar>
      {/* <BanNer></BanNer> */}
      <MovieList></MovieList>
    </div>
  );
}

export default Browse;
