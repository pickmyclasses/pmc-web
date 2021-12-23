import { AUTH, LOGOUT } from '../../constants/constants';

// default of the state is an object with a property authData and a value null.
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      //console.log(action?.data);

      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
