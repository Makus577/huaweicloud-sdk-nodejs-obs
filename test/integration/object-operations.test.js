/**
 * Integration Tests for Object Operations
 *
 * Tests basic object CRUD operations using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Object Operations Integration Tests', () => {
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

  describe('putObject', () => {
    test('should upload object with string body', async () => {
      // Create bucket first
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.putObject({
        Bucket: testBucket,
        Key: 'test-object.txt',
        Body: 'Hello OBS'
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.ETag).toBeDefined();
    }, 30000);

    test('should upload object with Buffer', async () => {
      const result = await obs.putObject({
        Bucket: testBucket,
        Key: 'test-buffer.bin',
        Body: Buffer.from('Hello Buffer')
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);

    test('should upload object with metadata', async () => {
      const result = await obs.putObject({
        Bucket: testBucket,
        Key: 'test-metadata.txt',
        Body: 'Test Content',
        Metadata: {
          'custom-meta': 'test-value'
        }
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('getObject', () => {
    test('should download object', async () => {
      // Upload first
      await obs.putObject({
        Bucket: testBucket,
        Key: 'test-get.txt',
        Body: 'Content for get'
      });

      const result = await obs.getObject({
        Bucket: testBucket,
        Key: 'test-get.txt'
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.ContentLength).toBeGreaterThan(0);
    }, 30000);
  });

  describe('getObjectMetadata', () => {
    test('should get object metadata', async () => {
      // Upload first
      await obs.putObject({
        Bucket: testBucket,
        Key: 'test-meta.txt',
        Body: 'Metadata test'
      });

      const result = await obs.getObjectMetadata({
        Bucket: testBucket,
        Key: 'test-meta.txt'
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.ETag).toBeDefined();
    }, 30000);
  });

  describe('deleteObject', () => {
    test('should delete object', async () => {
      // Upload first
      await obs.putObject({
        Bucket: testBucket,
        Key: 'test-delete.txt',
        Body: 'To be deleted'
      });

      const result = await obs.deleteObject({
        Bucket: testBucket,
        Key: 'test-delete.txt'
      });

      expect(result.CommonMsg.Status).toBe(204);
    }, 30000);
  });

  describe('copyObject', () => {
    test('should copy object', async () => {
      // Upload source
      await obs.putObject({
        Bucket: testBucket,
        Key: 'source.txt',
        Body: 'Source content'
      });

      const result = await obs.copyObject({
        Bucket: testBucket,
        Key: 'destination.txt',
        CopySource: `/${testBucket}/source.txt`
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });
});