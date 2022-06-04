import { ACCESSTOKEN, http, GROUPID } from '../../axios';
import { getBannerURL, getListFilmURL } from '../../axios/apiURL';
import { getBannerFilms } from '../reducers/getBannerReducer';
import { getListFilms } from '../reducers/getListFilmReducer';

// Get banner film action

export const getBannerFilmsAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(getBannerURL);
      const action = getBannerFilms(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//get list film and banner film
export const getListFilmAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getListFilmURL}?maNhom=${GROUPID}`
      );
      console.log(result);
      const action = getListFilms(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
