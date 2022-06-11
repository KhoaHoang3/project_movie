let detail = {};
if (localStorage.getItem('FILM_DETAIL')) {
  detail = JSON.parse(localStorage.getItem('FILM_DETAIL'));
}

const stateDefault = {
  // filmDetail: {
  //   maPhim: 0,
  //   danhGia: 0,
  //   moTa: '',
  //   ngayKhoiChieu: '',
  //   tenPhim: '',
  //   trailer: '',
  //   hinhAnh: '',
  // },

  filmDetail: detail,

  // filmDetail: new film(),
};

export const getFilmDetailReducer = (
  state = stateDefault,
  action
) => {
  switch (action.type) {
    case 'FILM_DETAIL': {
      const currentDetail = { ...state };

      currentDetail.filmDetail = action.data;

      localStorage.setItem(
        'FILM_DETAIL',
        JSON.stringify(currentDetail.filmDetail)
      );

      return { ...currentDetail };
    }
    default:
      return state;
      break;
  }
};
