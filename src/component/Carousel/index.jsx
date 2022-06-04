import React, { useEffect } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerFilms } from '../../redux/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper';
import { getBannerFilmsAction } from '../../redux/thunk/actions';

export default function Carouselll() {
  const dispatch = useDispatch();
  const { bannerFilms } = useSelector(getBannerFilms);
  useEffect(() => {
    const action = getBannerFilmsAction();
    dispatch(action);
  }, []);
  return (
    <div>
      <>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay, EffectFade]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          effect={'fade'}
          style={{ height: 980 }}
        >
          {/* FILM - 1 */}
          {bannerFilms.slice(0, 1).map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: `url(${item.hinhAnh})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  display: 'block',
                }}
                className="carousel"
              >
                <div className="trailer">
                  <div
                    type="button"
                    className="trailer__icon"
                    data-toggle="modal"
                    data-target="#trailer_film_1"
                  >
                    <PlayCircleOutlined />
                  </div>

                  <div className="trailer__define">
                    <h1 className="text-white">Xem trailer</h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {/* FILM - 2 */}
          {bannerFilms.slice(1, 2).map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: `url(${item.hinhAnh})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }}
                className="carousel"
              >
                <div className="trailer">
                  <div
                    data-toggle="modal"
                    data-target="#trailer_film_2"
                    className="trailer__icon"
                  >
                    <PlayCircleOutlined />
                  </div>

                  <div className="trailer__define">
                    <h1 className="text-white">Xem trailer</h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {/* FILM - 3 */}
          {bannerFilms.slice(2, 3).map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: `url(${item.hinhAnh})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }}
                className="carousel"
              >
                <div className="trailer">
                  <div
                    data-toggle="modal"
                    data-target="#trailer_film_3"
                    className="trailer__icon"
                  >
                    <PlayCircleOutlined />
                  </div>

                  <div className="trailer__define">
                    <h1 className="text-white">Xem trailer</h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>

      {/* TRAILER FILM 1 */}
      <div
        className="modal fade"
        id="trailer_film_1"
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
                width={720}
                height={600}
                src="https://www.youtube.com/embed/uqJ9u7GSaYM"
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
                <span className="text-white" aria-hidden="true">
                  X
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER FILM 2 */}
      <div
        className="modal fade"
        id="trailer_film_2"
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
                width={720}
                height={600}
                src="https://www.youtube.com/embed/kBY2k3G6LsM"
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
                <span className="text-white" aria-hidden="true">
                  X
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER FILM 3 */}
      <div
        className="modal fade"
        id="trailer_film_3"
        tabIndex="-1"
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
                width="720"
                height="600"
                src="https://www.youtube.com/embed/Eu9G8nO5-Ug"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowscriptaccess="always"
              ></iframe>

              <button
                type="button"
                className="close"
                aria-label="Close"
                data-dismiss="modal"
              >
                <span className="text-white" aria-hidden="true">
                  X
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
