import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Player from "../pages/Player";
import TVShows from "../pages/Tvshows";
import MoviePage from "../pages/Movies";
import UserListedMovies from "../pages/UserListedMovies";
import Netflix from "../pages/Netflix";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/movies" element={<MoviePage />} />
          <Route exact path="/new" element={<Player />} />
          <Route exact path="/mylist" element={<UserListedMovies />} />
          <Route exact path="/" element={<Netflix />} />
        </Routes>
      </Routes>
    </div>
  );
};

export default AllRoutes;
