import React, { useEffect, Component } from 'react';
import { Card } from 'antd';
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
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '180px',
    slidesToShow: 1,
    speed: 400,
    rows: 2,
    slidesPerRow: 3,
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
          className="tab-pane fade show active"
          id="current_movies"
        >
          <div>
            <Slider {...settings}>
              {listFilms
                .filter((film) => film.dangChieu === true)
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
                          {item.moTa.length > 300 ? (
                            <p>{item.moTa.slice(0, 300)}...</p>
                          ) : (
                            <p>{item.moTa}</p>
                          )}
                          <button>
                            <YoutubeOutlined
                              style={{
                                fontSize: 40,
                                paddingRight: '10px',
                              }}
                            />
                            Xem trailer
                          </button>

                          <button className="booking">Đặt vé</button>
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

        {/* UPCOMING MOVIES */}
        <div className="tab-pane fade" id="upcoming_movies">
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
                          {item.moTa.length > 300 ? (
                            <p>{item.moTa.slice(0, 300)}...</p>
                          ) : (
                            <p>{item.moTa}</p>
                          )}
                          <button>
                            <YoutubeOutlined
                              style={{
                                fontSize: 40,
                                paddingRight: '10px',
                              }}
                            />
                            Xem trailer
                          </button>

                          <button className="booking">Đặt vé</button>
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
