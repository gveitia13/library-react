import React from 'react';
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {ExploreTopBooks} from "./layouts/HomePage/ExploreTopBooks";
import {Carousel} from "./layouts/HomePage/Carousel";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <ExploreTopBooks></ExploreTopBooks>
      <Carousel></Carousel>
    </div>
  );
}

export default App;
