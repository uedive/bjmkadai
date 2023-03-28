import axios from 'axios';

const API_URL = 'https://opendata.resas-portal.go.jp';

const PREFECTURES_ENDPOINT = '/api/v1/prefectures';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': 'QSFotIcVzYcktMijfSwuaiuLgUSXcUPIJITARZ7p',
    'Content-Type': 'application/json',
  },
});

export async function fetchPrefectures() {
  const response = await api.get(PREFECTURES_ENDPOINT);
  const prefectures = response.data.result;
  return prefectures;
}