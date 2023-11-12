import axios from 'axios';

const baseURL = 'https://swapi.dev/api/planets/';
const headers = {
  'Content-Type': 'application/json',
};

const doGet = (id = '') => {
  const URL = id !== '' ? `${baseURL}/${id}` : baseURL;

  return axios.get(URL, {
    headers
  });
}

export {
  doGet,
} 
