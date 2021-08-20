import axios from 'axios';

export const apiCurrencyConverter = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/',
});
