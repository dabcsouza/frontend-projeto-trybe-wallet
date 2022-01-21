import { SET_USER } from '../actions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
