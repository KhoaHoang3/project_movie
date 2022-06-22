import React from 'react';
import Carouselll from '../../component/Carousel';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import MovieList from '../../component/MovieList';
import TheaterInfo from '../../component/TheaterInfo';
import $, { easing } from 'jquery';

var btn = $('.return-to-top');

$(window).scroll(function () {
  if ($(window).scrollTop() > 700) {
    // btn.addClass('show');
    btn.show('slow');
  } else {
    // btn.removeClass('show');
    btn.hide();
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 600);
  return false;
});

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
      <a className="return-to-top" href="">
        <i className="fa fa-chevron-up"></i>
      </a>
    </div>
  );
}
