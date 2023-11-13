import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
};

const doGet = (url) => {
  const URL = url || baseURL;
  
  return axios.get(URL, {
    headers
  });
}

export {
  doGet,
} 
