import Store from '../redux/Store';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-app-api-gama.herokuapp.com/api/v1',
  timeout: 50000,
});

instance.interceptors.request.use(async (config) => {
  const token = await Store.getState().todoAppStore.token;
  config.headers.common['Authorization'] = `Bearer ${token}`;
  config.headers.common['Content-Type'] = 'application/json';
  //console.log('Config: ', config);
  return config;
});

export default instance;
