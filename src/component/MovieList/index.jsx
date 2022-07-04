import React, {
  useEffect,
  Component,
  useState,
  Fragment,
} from 'react';
import { Card, Modal } from 'antd';
import Slider from 'react-slick';
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { getListFilmAction } from '../../redux/thunk/actions';
import { getListFilms } from '../../redux/selectors';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
const { Meta } = Card;

export default function MovieList() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: 'block' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: 'center',
    centerPadding: '180px',
    slidesToShow: 3,
    speed: 400,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesPerRow: 1,
          rows: 2,
          dots: true,
        },
      },

      {
        breakpoint: 1275,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 3,
          rows: 2,
          dots: true,
        },
      },
      // {
      //   breakpoint: 1023,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //   },
      // },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dispatch = useDispatch();

  //get list film
  useEffect(() => {
    const action = getListFilmAction();
    dispatch(action);
  }, [dispatch]);

  const { listFilms } = useSelector(getListFilms);
  return (
    <div className="movie_tabs">
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="pill"
            href="#current_movies"
          >
            PHIM ĐANG CHIẾU
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="pill"
            href="#upcoming_movies"
          >
            PHIM SẮP CHIẾU
          </a>
        </li>
      </ul>

      {/* MOVIE */}
      <div className="tab-content" id="pills-tabContent">
        {/* CURRENT MOVIES */}
        <div
          className="tab-pane fade show active tab-content-movies"
          id="current_movies"
        >
          <div className="">
            <Slider {...settings}>
              {listFilms.map((item, index) => {
                return (
                  <div key={index} className="wrapper">
                    <div className="card">
                      <img
                        width={380}
                        height={400}
                        src={item.hinhAnh}
                        alt=""
                      />
                      <div className="descriptions">
                        <h1>{item.tenPhim}</h1>
                        {item.moTa.length > 150 ? (
                          <p>{item.moTa.slice(0, 150)}...</p>
                        ) : (
                          <p>{item.moTa}</p>
                        )}

                        <NavLink to={`/detail/${item.maPhim}`}>
                          <button
                            onClick={() => {
                              dispatch({
                                type: 'FILM_DETAIL',
                                data: item,
                              });
                            }}
                            className="booking"
                          >
                            Đặt vé
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        {/* UPCOMING MOVIES */}
        <div
          className="tab-pane fade tab-content-movies"
          id="upcoming_movies"
        >
          <div>
            <Slider {...settings}>
              {listFilms
                .filter((film) => film.dangChieu === false)
                .map((item, index) => {
                  return (
                    <div key={index} className="wrapper">
                      <div className="card">
                        <img
                          width={380}
                          height={400}
                          src={item.hinhAnh}
                          alt=""
                        />
                        <div className="descriptions">
                          <h1>{item.tenPhim}</h1>
                          {item.moTa.length > 150 ? (
                            <p>{item.moTa.slice(0, 150)}...</p>
                          ) : (
                            <p>{item.moTa}</p>
                          )}
                          {/* <button>
                            <YoutubeOutlined
                              style={{
                                fontSize: 40,
                                paddingRight: '10px',
                              }}
                            />
                            Xem trailer
                          </button> */}
                          <NavLink to={`/detail/${item.maPhim}`}>
                            <button
                              onClick={() => {
                                dispatch({
                                  type: 'FILM_DETAIL',
                                  data: item,
                                });
                              }}
                              className="booking"
                            >
                              Đặt vé
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    // <div key={index} className="list">
                    //   <div className="item">
                    //     <div className="content">
                    //       <div className="image">
                    //         <img
                    //           width={380}
                    //           height={400}
                    //           src={item.hinhAnh}
                    //           alt=""
                    //         />
                    //       </div>
                    //       <div className="card-body">
                    //         <p>Name: {item.tenPhim}</p>
                    //         <p>Premiere date: {item.ngayKhoiChieu}</p>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
