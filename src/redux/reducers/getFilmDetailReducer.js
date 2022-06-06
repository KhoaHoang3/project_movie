const stateDefault = {
  filmDetail: {
    maPhim: 0,
    danhGia: 0,
    moTa: '',
    ngayKhoiChieu: '',
    tenPhim: '',
    trailer: '',
    hinhAnh: '',
  },
};

export const getFilmDetailReducer = (
  state = stateDefault,
  action
) => {
  switch (action.type) {
    case 'FILM_DETAIL': {
      const currentDetail = { ...state };

      currentDetail.filmDetail = action.data;

      return { ...currentDetail };
    }
    default:
      return state;
      break;
  }
};
