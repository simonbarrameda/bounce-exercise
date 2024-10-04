import { createClient } from 'redis';
import config from '../config/config.js';
import logger from '../config/logger.js';

let client;

const connectRedis = async () => {
  if (!client) {
    client = createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
      socket: {
        reconnectStrategy: false,
      },
    });

    client.on('error', (err) => {
      logger.error('Redis error:', err);
    });

    client.on('end', () => {
      logger.error('Redis connection closed unexpectedly.');
    });
  }

  try {
    if (!client.isOpen || !(await client.ping())) {
      logger.info(`Attempting to connect to Redis...`);
      await client.connect();
    }
    logger.info('Connected to Redis');
    return true;
  } catch (err) {
    logger.error(`Failed to connect to Redis:`, err);
    return false;
  }
};

/**
 * Setting APOD data to redis cache
 * @param {string} key - Date when APOD was requested
 * @param {string} value - APOD response body
 * @param {number} expiration - Expiration in seconds
 */
const setCache = async (key, value, expiration = 86400) => {
  try {
    const connected = await connectRedis();
    if (!connected) throw new Error('Redis connection failed');

    await client.set(key, JSON.stringify(value), {
      EX: expiration,
    });
    logger.info(`Data set in cache with key: ${key}`);
  } catch (err) {
    logger.error('Failed to set cache:', err);
  }
};

/**
 * Getting APOD data from redis cache
 * @param {string} key - Date when APOD was requested
 * @returns {Object|null} - APOD response body or null if not found
 */
const getCache = async (key) => {
  try {
    const connected = await connectRedis();
    if (!connected) throw new Error('Redis connection failed');

    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    logger.error('Failed to get cache:', err);
    return null;
  }
};

export { setCache, getCache };
