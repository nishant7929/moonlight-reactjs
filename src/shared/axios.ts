import axios from 'axios';
import { PROXY_API_URL } from './constants';
import { API_URL } from './constants';

const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;

const instance = axios.create({
	baseURL: localStorage.getItem('moviedb') === 'true' ? API_URL : PROXY_API_URL,
	params: {
		api_key: localStorage.getItem('moviedb') === 'true' ? API_KEY : undefined,
	},
});

export default instance;
