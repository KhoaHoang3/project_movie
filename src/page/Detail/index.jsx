import React, { useEffect } from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { Tag, Rate, Collapse } from 'antd';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEachFilmCalendar,
  getFilmDetail,
} from '../../redux/selectors';
import moment from 'moment';
import { getShowtimeEachFilmAction } from '../../redux/thunk/actions';
import { Tab } from 'bootstrap';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/circle.css';
import { toast } from 'react-toastify';
import {
  getDateAndTime,
  getFilmCode,
} from '../../redux/reducers/getBoxOfficeReducer';
import $ from 'jquery';

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Detail() {
  //stop video modal
  $('#modalTrailer').on('hidden.bs.modal', function (e) {
    $('#modalTrailer iframe').attr(
      'src',
      $('#modalTrailer iframe').attr('src')
    );
  });
  // check user login or not
  const renderCalendar = (maLichChieu, ngayChieuGioChieu) => {
    if (localStorage.getItem('USER_LOGIN')) {
      return (
        <NavLink
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            dispatch(getFilmCode(maLichChieu));
            dispatch(getDateAndTime(ngayChieuGioChieu));
          }}
          to={`/booking_ticket/${maLichChieu}`}
        >
          {moment(ngayChieuGioChieu).format('DD/MM/YYYY hh:mm A')}
        </NavLink>
      );
    } else {
      return (
        <NavLink
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            toast.error('Bạn phải đăng nhập để đặt vé !', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
          }}
          to={'/login'}
        >
          {moment(ngayChieuGioChieu).format('DD/MM/YYYY hh:mm A')}
        </NavLink>
      );
    }
  };

  const { filmDetail } = useSelector(getFilmDetail);
  const dispatch = useDispatch();
  const {
    maPhim,
    danhGia,
    moTa,
    ngayKhoiChieu,
    tenPhim,
    trailer,
    hinhAnh,
  } = filmDetail;
  const { calendar } = useSelector(getEachFilmCalendar);

  useEffect(() => {
    const action = getShowtimeEachFilmAction(maPhim);
    dispatch(action);
  }, [dispatch, maPhim]);
  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="film">
        <div
          style={{
            backgroundImage: `url(${hinhAnh})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <CustomCard
            style={{ minHeight: '100vh' }}
            effectColor="orange" // required
            color="black" // default color is white
            blur={25} // default blur value is 10px
            borderRadius={0} // default border radius value is 10px
          >
            <div className="film__detail row">
              <div className="film__image col-4">
                <div className="film__poster">
                  <img src={`${hinhAnh}`} alt="" />
                </div>
                <div className="film__trailer">
                  <a
                    data-toggle="modal"
                    data-target="#modalTrailer"
                    className="play-btn"
                    href=""
                  ></a>
                </div>
              </div>
              <div className="film__info col-4">
                <h1 className="font-weight-bold">
                  Tên phim: {tenPhim}
                </h1>

                <h1 className="font-weight-bold">Ngày công chiếu</h1>
                <h1 className="font-weight-bold">
                  {moment(ngayKhoiChieu).format('DD.MM.YYYY')}
                </h1>
                <p>Mô tả: {moTa}</p>
              </div>
              <div className="circle">
                <h1 className="text-warning font-weight-bold">
                  Đánh giá
                </h1>
                <div className="rating">
                  <Rate
                    className="d-flex justify-content-center"
                    style={{
                      color: 'green',
                      width: '100%',
                      fontSize: '3rem',
                    }}
                    allowHalf
                    value={calendar.danhGia / 2}
                  />
                  ;
                </div>
                <div
                  className={`c100 p${
                    calendar.danhGia * 10
                  } big green point`}
                >
                  <span>{calendar.danhGia}0%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tabs">
              <Tabs
                style={{
                  width: '125rem',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                }}
                defaultActiveKey="1"
                centered
              >
                <TabPane
                  tab={
                    <h1 style={{ fontSize: '1.2rem' }}>
                      Thông tin lịch chiếu các rạp
                    </h1>
                  }
                  key="1"
                >
                  <Tabs defaultActiveKey="1" centered>
                    {/* CALENDAR */}
                    {calendar.heThongRapChieu?.map((item, index) => {
                      return (
                        <TabPane
                          key={index}
                          tab={
                            <img
                              style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '10px',
                              }}
                              src={item.logo}
                            ></img>
                          }
                        >
                          <Collapse accordion>
                            {item.cumRapChieu?.map(
                              (theater, index) => {
                                return (
                                  <Panel
                                    key={index}
                                    header={
                                      <div className="d-flex justify-content-center">
                                        <div className="image-1">
                                          <img
                                            style={{
                                              width: 120,
                                              height: 130,
                                              borderRadius: ' 10px',
                                            }}
                                            src={theater.hinhAnh}
                                          ></img>
                                        </div>

                                        <div className="address text-left ml-3 d-flex flex-column justify-content-center">
                                          <p
                                            style={{
                                              fontSize: '1.2rem',
                                            }}
                                            className="font-weight-bold"
                                          ></p>

                                          {item.maHeThongRap ===
                                          'BHDStar' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',
                                                fontSize: '1.2rem',
                                                color: 'green',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : item.maHeThongRap ===
                                            'CGV' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',

                                                fontSize: '1.2rem',
                                                color: 'red',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : item.maHeThongRap ===
                                            'CineStar' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',

                                                fontSize: '1.2rem',
                                                color: 'purple',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : item.maHeThongRap ===
                                            'Galaxy' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',

                                                fontSize: '1.2rem',
                                                color: 'orange',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : item.maHeThongRap ===
                                            'LotteCinima' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',

                                                fontSize: '1.2rem',
                                                color: 'red',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : item.maHeThongRap ===
                                            'MegaGS' ? (
                                            <p
                                              style={{
                                                fontWeight: 'bolder',

                                                fontSize: '1.2rem',
                                                color: '#eeb730',
                                              }}
                                            >
                                              {theater.tenCumRap}
                                            </p>
                                          ) : (
                                            ''
                                          )}
                                          <p
                                            style={{
                                              fontSize: '1.2rem',
                                            }}
                                          >
                                            {theater.diaChi}
                                          </p>
                                        </div>
                                      </div>
                                    }
                                  >
                                    <div className="">
                                      <p
                                        style={{ fontSize: '1.5rem' }}
                                      >
                                        Ngày, giờ chiếu (click vào
                                        ngày giờ bạn muốn để đặt vé):
                                      </p>
                                      {theater.lichChieuPhim
                                        .slice(0, 6)
                                        .map((film, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className=""
                                            >
                                              <Tag
                                                style={{
                                                  marginBottom:
                                                    '1.5rem',
                                                }}
                                                color="green"
                                              >
                                                {renderCalendar(
                                                  film.maLichChieu,
                                                  film.ngayChieuGioChieu
                                                )}
                                              </Tag>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  </Panel>
                                );
                              }
                            )}
                          </Collapse>
                        </TabPane>
                      );
                    })}
                  </Tabs>
                </TabPane>
              </Tabs>
            </div>
          </CustomCard>
        </div>
        {/* MODAL TRAILER */}
        <div
          className="modal fade"
          id="modalTrailer"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          role="dialog"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered"
          >
            <div className="modal-content">
              <div className="modal-body">
                <iframe
                  id="trailer_1"
                  width={720}
                  height={600}
                  src={trailer}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  data-dismiss="modal"
                >
                  <span
                    // onClick={() => {
                    //   handleStopVideo1();
                    // }}
                    className="text-white"
                    aria-hidden="true"
                  >
                    X
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
