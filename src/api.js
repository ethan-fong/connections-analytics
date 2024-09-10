import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_LOCAL_DEVELOPMENT === 'true'
  ? "http://localhost:8000/"
  : "https://connections-backend-production.up.railway.app/";

export const fetchGuessTimeDistribution = async (number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}timedist/${number}/?format=json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchGuessDistribution = async (number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}guessdist/${number}/?format=json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchGuessCount = async (number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}count/${number}/?format=json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};