import Store from '../redux/Store';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-app-api-gama.herokuapp.com/api/v1',
  timeout: 5000,
});

const token = Store.getState().todoAppStore.token;

instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;
