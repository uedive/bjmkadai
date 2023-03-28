import axios from 'axios';

const API_URL = 'https://opendata.resas-portal.go.jp';

const PREFECTURES_ENDPOINT = '/api/v1/prefectures';
const POPULATION_ENDPOINT = '/api/v1/population/composition/perYear';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': process.env.REACT_APP_API_KEY,
    'Content-Type': 'application/json',
  },
});

export async function fetchPrefectures() {
  const response = await api.get(PREFECTURES_ENDPOINT);
  const prefectures = response.data.result;
  return prefectures;
}

export async function fetchPopulationComPosition(prefCd) {
  const response = await api.get(POPULATION_ENDPOINT + `?cityCode=-&prefCode=${prefCd}`);
  const population = response.data.result;
  return population;
}