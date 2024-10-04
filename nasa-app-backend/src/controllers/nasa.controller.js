import catchAsync from '../utils/catchAsync.js';
import logger from '../config/logger.js';
import { queryApod } from '../services/nasa.service.js';
import { setCache, getCache } from '../services/redis.service.js';

const getApod = catchAsync(async (req, res) => {
  let cacheKey = req.query.date;

  if (!cacheKey) {
    cacheKey = new Date().toISOString().slice(0, 10);
  }

  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    logger.info('Cache hit. Fetching from cache');
    res.send(cachedData);
    return;
  }

  logger.info('Cache miss. Fetching from API');
  const response = await queryApod(req.query);
  // Cache only single json responses
  if (!Array.isArray(response)) {
    await setCache(cacheKey, response);
  }

  res.send(response);
});

export default {
  getApod,
};
