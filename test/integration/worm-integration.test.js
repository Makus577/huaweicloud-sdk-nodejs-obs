/**
 * WORM/Object Lock API Integration Tests
 *
 * Tests WORM/Object Lock functionality using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('WORM/Object Lock API Integration Tests', () => {
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

  describe('setBucketObjectLock', () => {
    test('should set bucket object lock configuration', async () => {
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.setBucketObjectLock({
        Bucket: testBucket,
        ObjectLockEnabled: 'Enabled',
        Rule: {
          DefaultRetention: {
            Mode: 'COMPLIANCE',
            Days: 30
          }
        }
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getBucketObjectLock', () => {
    test('should get bucket object lock configuration', async () => {
      // Set first
      await obs.setBucketObjectLock({
        Bucket: testBucket,
        ObjectLockEnabled: 'Enabled',
        Rule: {
          DefaultRetention: {
            Mode: 'GOVERNANCE',
            Years: 1
          }
        }
      });

      const result = await obs.getBucketObjectLock({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult).toBeDefined();
    }, 30000);
  });
});