import axios from 'axios';

export const getLocalData = (column) => {
  return axios.get(`http://localhost:3000/api/${column}`)
    .then(response => response.data)
}