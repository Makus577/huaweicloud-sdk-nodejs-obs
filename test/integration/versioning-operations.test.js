/**
 * Integration Tests for Bucket Versioning Operations
 *
 * Tests versioning enable/disable/suspend operations using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Versioning Operations Integration Tests', () => {
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

  describe('setBucketVersioningConfiguration', () => {
    test('should enable versioning', async () => {
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.setBucketVersioningConfiguration({
        Bucket: testBucket,
        Status: 'Enabled'
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);

    test('should suspend versioning', async () => {
      const result = await obs.setBucketVersioningConfiguration({
        Bucket: testBucket,
        Status: 'Suspended'
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getBucketVersioningConfiguration', () => {
    test('should get versioning configuration', async () => {
      const result = await obs.getBucketVersioningConfiguration({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult).toBeDefined();
    }, 30000);
  });
});