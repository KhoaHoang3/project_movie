import React from 'react';
import Carouselll from '../../component/Carousel';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import MovieList from '../../component/MovieList';
import TheaterInfo from '../../component/TheaterInfo';

export default function HomeScreen(props) {
  return (
    <div>
      <section className="header">
        <Header />
      </section>

      <section className="carousel">
        <Carouselll />
      </section>

      <section className="movies">
        <div className="background__image">
          <div className="background__black">
            <MovieList />
          </div>
        </div>
      </section>

      <section className="theater">
        <TheaterInfo />
      </section>

      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}
