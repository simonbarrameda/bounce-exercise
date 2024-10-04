import { jest } from '@jest/globals';
import logger from '../../../src/config/logger.js';

jest.unstable_mockModule('redis', () => ({
  createClient: jest.fn(),
}));
const { createClient } = await import('redis');
const { setCache, getCache } = await import('../../../src/services/redis.service.js');

describe('Redis service', () => {
  let infoLogSpy;
  let errorLogSpy;

  const mockClient = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    isOpen: false,
    ping: jest.fn(),
    on: jest.fn(),
  };

  createClient.mockReturnValue(mockClient);

  beforeEach(() => {
    infoLogSpy = jest.spyOn(logger, 'info').mockImplementation(() => {});
    errorLogSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setCache', () => {
    it('should set data in cache when connected', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockResolvedValueOnce('PONG');
      mockClient.get.mockResolvedValueOnce(JSON.stringify({ data: 'test-value' }));

      const result = await getCache('test-key');

      expect(result).toEqual({ data: 'test-value' });
      expect(infoLogSpy).toHaveBeenCalledWith('Connected to Redis');
    });

    it('should log an error if Redis connection fails', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockRejectedValueOnce(new Error('Ping failed'));

      await setCache('test-key', { data: 'test-value' });

      expect(errorLogSpy).toHaveBeenCalledWith('Failed to set cache:', expect.any(Error));
    });

    it('should log an error if setting cache fails', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockResolvedValueOnce('PONG');
      mockClient.set.mockRejectedValueOnce(new Error('Set failed'));

      await setCache('test-key', { data: 'test-value' });

      expect(errorLogSpy).toHaveBeenCalledWith('Failed to set cache:', expect.any(Error));
    });
  });

  describe('getCache', () => {
    it('should get data from cache when connected', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockResolvedValueOnce('PONG');
      mockClient.get.mockResolvedValueOnce(JSON.stringify({ data: 'test-value' }));

      const result = await getCache('test-key');

      expect(result).toEqual({ data: 'test-value' });
      expect(infoLogSpy).toHaveBeenCalledWith('Connected to Redis');
    });

    it('should return null if key is not found in cache', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockResolvedValueOnce('PONG');
      mockClient.get.mockResolvedValueOnce(null);

      const result = await getCache('non-existent-key');

      expect(result).toBeNull();
    });

    it('should log an error if Redis connection fails', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockRejectedValueOnce(new Error('Ping failed'));

      const result = await getCache('test-key');

      expect(result).toBeNull();
      expect(errorLogSpy).toHaveBeenCalledWith('Failed to get cache:', expect.any(Error));
    });

    it('should log an error if getting cache fails', async () => {
      mockClient.isOpen = true;
      mockClient.ping.mockResolvedValueOnce('PONG');
      mockClient.get.mockRejectedValueOnce(new Error('Get failed'));

      const result = await getCache('test-key');

      expect(result).toBeNull();
      expect(errorLogSpy).toHaveBeenCalledWith('Failed to get cache:', expect.any(Error));
    });
  });
});
