import React, { useEffect, useState } from 'react';
import Carouselll from '../../component/Carousel';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import MovieList from '../../component/MovieList';
import TheaterInfo from '../../component/TheaterInfo';
import $, { easing } from 'jquery';

export default function HomeScreen(props) {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 700) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 700) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      });
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // const btn = $('.return-to-top');

  // $(window).scroll(function () {
  //   if ($(window).scrollTop() > 300) {
  //     // btn.addClass('show');
  //     btn.show();
  //   } else {
  //     // btn.removeClass('show');
  //     btn.hide();
  //   }
  // });

  // btn.on('click', function (e) {
  //   e.preventDefault();
  //   $('html').animate({ scrollTop: 0 }, 300);
  //   return false;
  // });
  return (
    <div>
      <section id="top" className="header">
        <Header />
      </section>

      <section className="carousel">
        <Carouselll />
      </section>

      <section className="movies">
        <div className="container">
          <MovieList />
        </div>
      </section>

      <section className="theater">
        <TheaterInfo />
      </section>

      <section className="footer">
        <Footer />
      </section>
      {showBtn && (
        <a
          onClick={(e) => {
            e.preventDefault();
            goToTop();
          }}
          className="return-to-top"
          href=""
        >
          <i className="fa fa-chevron-up"></i>
        </a>
      )}
    </div>
  );
}
