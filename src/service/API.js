import axios from 'axios';
const baseURL = 'http://localhost:3000';

const empresas = {
    getAll: () => axios.get(`${baseURL}/empresas`),
    getOne: (id) => axios.get(`${baseURL}/empresas/${id}`),
    create: (item) => axios.post(`${baseURL}/empresas`, item),
    modify: (item) => axios.put(`${baseURL}/empresas/${item.id}`, item),
    delete: (id) => axios.delete(`${baseURL}/empresas/${id}`),
    toogleDone: (item) => axios.put(`${baseURL}/empresas/${item.id}`, {
      id: item.id,
      title: item.title, 
      done: !item.done
    }),
};

const ofertas = {
  getAll: () => axios.get(`${baseURL}/ofertas`),
  getAllById: (id) => axios.get(`${baseURL}/ofertas?empresa=${id}`),
  getOne: (id) => axios.get(`${baseURL}/ofertas/${id}`),
  create: (item) => axios.post(`${baseURL}/ofertas`, item),
  modify: (item) => axios.put(`${baseURL}/ofertas/${item.id}`, item),
  delete: (id) => axios.delete(`${baseURL}/ofertas/${id}`),
  toogleDone: (item) => axios.put(`${baseURL}/ofertas/${item.id}`, {
    id: item.id,
    title: item.title, 
    done: !item.done
  }),
};

export default {
    empresas,
    ofertas,
};