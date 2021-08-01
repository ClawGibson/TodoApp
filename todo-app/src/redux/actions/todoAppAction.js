import { ADD_TOKEN } from '../Constants';

export const addTokenAction = (payload) => {
  return {
    type: ADD_TOKEN,
    payload,
  };
};
