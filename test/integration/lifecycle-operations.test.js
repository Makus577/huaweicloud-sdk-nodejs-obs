/**
 * Integration Tests for Lifecycle Operations
 *
 * Tests bucket lifecycle configuration using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Lifecycle Operations Integration Tests', () => {
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

  describe('setBucketLifecycleConfiguration', () => {
    test('should set lifecycle configuration', async () => {
      // Create bucket first
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.setBucketLifecycleConfiguration({
        Bucket: testBucket,
        Rules: [
          {
            ID: 'rule-1',
            Status: 'Enabled',
            Prefix: 'logs/',
            Expiration: { Days: 30 }
          }
        ]
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getBucketLifecycleConfiguration', () => {
    test('should get lifecycle configuration', async () => {
      // Set lifecycle first
      await obs.setBucketLifecycleConfiguration({
        Bucket: testBucket,
        Rules: [
          {
            ID: 'rule-2',
            Status: 'Enabled',
            Prefix: 'documents/',
            Expiration: { Days: 60 }
          }
        ]
      });

      const result = await obs.getBucketLifecycleConfiguration({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.Rules).toBeDefined();
    }, 30000);
  });

  describe('deleteBucketLifecycleConfiguration', () => {
    test('should delete lifecycle configuration', async () => {
      // Set lifecycle first
      await obs.setBucketLifecycleConfiguration({
        Bucket: testBucket,
        Rules: [
          {
            ID: 'rule-3',
            Status: 'Enabled',
            Prefix: 'temp/',
            Expiration: { Days: 7 }
          }
        ]
      });

      const result = await obs.deleteBucketLifecycleConfiguration({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(204);
    }, 30000);
  });
});