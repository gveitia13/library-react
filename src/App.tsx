import React from 'react';
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {ExploreTopBooks} from "./layouts/HomePage/ExploreTopBooks";
import {Carousel} from "./layouts/HomePage/Carousel";
import {Heros} from "./layouts/HomePage/Heros";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <ExploreTopBooks></ExploreTopBooks>
      <Carousel></Carousel>
      <Heros></Heros>
    </div>
  );
}

export default App;
