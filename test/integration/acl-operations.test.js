/**
 * Integration Tests for ACL Operations
 *
 * Tests the Access Control List operations using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('ACL Operations', () => {
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

  describe('setBucketAcl', () => {
    test('should set bucket ACL', async () => {
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.setBucketAcl({
        Bucket: testBucket,
        ACL: 'public-read'
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getBucketAcl', () => {
    test('should get bucket ACL', async () => {
      const result = await obs.getBucketAcl({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult).toBeDefined();
    }, 30000);
  });

  describe('setObjectAcl', () => {
    test('should set object ACL', async () => {
      // Upload object first
      await obs.putObject({
        Bucket: testBucket,
        Key: 'test-acl.txt',
        Body: 'ACL Test'
      });

      const result = await obs.setObjectAcl({
        Bucket: testBucket,
        Key: 'test-acl.txt',
        ACL: 'private'
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getObjectAcl', () => {
    test('should get object ACL', async () => {
      const result = await obs.getObjectAcl({
        Bucket: testBucket,
        Key: 'test-acl.txt'
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });
});