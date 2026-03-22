/**
 * Integration Tests for File Upload Operations
 *
 * Tests the file upload methods using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');
const fs = require('fs');
const path = require('path');

describe('File Upload Operations', () => {
  let obs;
  let testBucket;
  const testFilePath = path.join(__dirname, '..', 'fixtures', 'test-upload.txt');

  beforeAll(() => {
    const config = getObsConfig();
    const optionalConfig = getOptionalConfig();
    obs = new ObsClient({
      ...config,
      ...optionalConfig,
    });
    testBucket = getTestBucket();

    // Create test file
    const dir = path.dirname(testFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(testFilePath, 'Test file content for upload');
  });

  afterAll(() => {
    if (obs && obs.close) {
      obs.close();
    }
    // Clean up test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  describe('uploadFile', () => {
    test('should upload file', async () => {
      await obs.createBucket({ Bucket: testBucket });

      const result = await obs.uploadFile({
        Bucket: testBucket,
        Key: 'uploaded-file.txt',
        UploadFile: testFilePath
      });

      expect(result.CommonMsg.Status).toBe(200);
      expect(result.InterfaceResult.ETag).toBeDefined();
    }, 60000);
  });
});