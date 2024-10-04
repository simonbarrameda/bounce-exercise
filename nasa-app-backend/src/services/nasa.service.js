import axios from 'axios';
import config from '../config/config.js';

/**
 * Fetches NASA's Astronomy Picture of the Day
 * @param {Object} options - Query options
 * @param {string} [options.date] - The date of the APOD image to retrieve
 * @param {string} [options.start_date] - The start of a date range, when requesting date for a range of dates. Cannot be used with date
 * @param {string} [options.end_date] - The end of the date range, when used with start_date
 * @param {number} [options.count] - If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date
 * @param {boolean} [options.thumbs] - Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored
 */
const queryApod = async (options) => {
  let apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${config.nasaApiKey}&thumbs=True`;
  const optionsList = ['date', 'start_date', 'end_date', 'count', 'thumbs'];

  optionsList.forEach((param) => {
    if (options[param]) {
      apodUrl += `&${param}=${options[param]}`;
    }
  });

  const response = await axios.get(apodUrl);

  return response?.data;
};

export { queryApod };
