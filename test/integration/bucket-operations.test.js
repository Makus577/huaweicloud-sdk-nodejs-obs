/**
 * Integration Tests for Bucket Operations
 *
 * Tests basic bucket lifecycle operations using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Bucket Operations Integration Tests', () => {
  let obs;
  let testBucket;

  beforeAll(() => {
    const config = getObsConfig();
    const optionalConfig = getOptionalConfig();
    obs = new ObsClient({
      ...config,
      ...optionalConfig,
    });
    testBucket = getTestBucket();
  });

  afterAll(() => {
    if (obs && obs.close) {
      obs.close();
    }
  });

  describe('createBucket', () => {
    test('should create bucket successfully', async () => {
      const result = await obs.createBucket({ Bucket: testBucket });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);

    test('should fail to create duplicate bucket', async () => {
      // First create
      await obs.createBucket({ Bucket: testBucket + '-duplicate' });

      // Second create should fail
      const result = await obs.createBucket({ Bucket: testBucket + '-duplicate' });

      expect(result.CommonMsg.Status).toBe(409);
    }, 30000);
  });

  describe('headBucket', () => {
    test('should check bucket existence', async () => {
      // First create the bucket
      await obs.createBucket({ Bucket: testBucket + '-head' });

      // Then check it exists
      const result = await obs.headBucket({ Bucket: testBucket + '-head' });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('listBuckets', () => {
    test('should list buckets', async () => {
      const result = await obs.listBuckets();

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult).toBeDefined();
    }, 30000);
  });

  describe('deleteBucket', () => {
    test('should delete bucket successfully', async () => {
      // Create bucket first
      await obs.createBucket({ Bucket: testBucket + '-delete' });

      // Then delete it - OBS returns 204 No Content
      const result = await obs.deleteBucket({ Bucket: testBucket + '-delete' });

      expect(result.CommonMsg.Status).toBe(204);
    }, 30000);
  });
});