import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-shack.firebaseio.com/'
});

export default instance;
