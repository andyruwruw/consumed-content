// Packages
import axios from 'axios';

// Local Imports
import { Environment } from '../../helpers/environment';

/**
 * Axios instance set up for The Movie DB API.
 */
const request = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

/**
 * Add authentication to all requests.
 */
request.interceptors.request.use(config => {
  config.params = {
    'api_key': Environment.getTheMovieDBAPIKey(),
    ...config.params,
  };

  return config;
});

export default request;