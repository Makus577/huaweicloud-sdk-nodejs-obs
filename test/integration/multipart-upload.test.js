/**
 * Integration Tests for Multipart Upload Operations
 *
 * Tests the multipart upload methods using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Multipart Upload Operations', () => {
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

  describe('initiateMultipartUpload', () => {
    test('should initiate multipart upload', async () => {
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.initiateMultipartUpload({
        Bucket: testBucket,
        Key: 'multipart-file.txt'
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.UploadId).toBeDefined();
    }, 30000);
  });

  describe('uploadPart', () => {
    let uploadId;

    test('should upload part', async () => {
      // Initiate first
      const initResult = await obs.initiateMultipartUpload({
        Bucket: testBucket,
        Key: 'part-file.txt'
      });
      uploadId = initResult.InterfaceResult.UploadId;

      const result = await obs.uploadPart({
        Bucket: testBucket,
        Key: 'part-file.txt',
        PartNumber: 1,
        UploadId: uploadId,
        Body: 'Part content'
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.ETag).toBeDefined();
    }, 30000);
  });

  describe('completeMultipartUpload', () => {
    test('should complete multipart upload', async () => {
      // Initiate
      const initResult = await obs.initiateMultipartUpload({
        Bucket: testBucket,
        Key: 'complete-file.txt'
      });
      const uploadId = initResult.InterfaceResult.UploadId;

      // Upload part
      await obs.uploadPart({
        Bucket: testBucket,
        Key: 'complete-file.txt',
        PartNumber: 1,
        UploadId: uploadId,
        Body: 'Part 1 content'
      });

      // Complete
      const result = await obs.completeMultipartUpload({
        Bucket: testBucket,
        Key: 'complete-file.txt',
        UploadId: uploadId,
        Parts: [{ PartNumber: 1 }]
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });

  describe('abortMultipartUpload', () => {
    test('should abort multipart upload', async () => {
      // Initiate
      const initResult = await obs.initiateMultipartUpload({
        Bucket: testBucket,
        Key: 'abort-file.txt'
      });
      const uploadId = initResult.InterfaceResult.UploadId;

      // Abort
      const result = await obs.abortMultipartUpload({
        Bucket: testBucket,
        Key: 'abort-file.txt',
        UploadId: uploadId
      });

      expect(result.CommonMsg.Status).toBe(204);
    }, 30000);
  });

  describe('listMultipartUploads', () => {
    test('should list multipart uploads', async () => {
      const result = await obs.listMultipartUploads({
        Bucket: testBucket
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });
});