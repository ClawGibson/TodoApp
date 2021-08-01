import { ADD_TOKEN } from '../Constants';

const initialState = {
  token: '',
  isLoggedIn: false,
  username: '',
  id: '',
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
        username: action.payload.name,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export default todoAppReducer;
