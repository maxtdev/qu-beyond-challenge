import axios from 'axios';

const baseURL = 'https://swapi.dev/api/planets/';
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
