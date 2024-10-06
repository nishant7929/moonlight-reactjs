import axios from 'axios';
import { API_URL } from './constants';
// console.log("abcd", process.env.REACT_APP_API_KEY);

const API_KEY = '1cc28d7cb8202fa7566afa90c4a8b9f4';

const instance = axios.create({
	baseURL: API_URL,
	params: {
		api_key: API_KEY,
	},
});

export default instance;
