/**
 * Integration Tests for Copy Operations
 *
 * Tests the copy object methods using real OBS credentials
 */

const ObsClient = require('../../lib/obs');
const { getObsConfig, getTestBucket, getOptionalConfig } = require('../test-config');

describe('Copy Operations', () => {
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

  describe('copyObject', () => {
    test('should copy object within same bucket', async () => {
      // Create bucket and upload source
      await obs.createBucket({ Bucket: testBucket });
      await obs.putObject({
        Bucket: testBucket,
        Key: 'source-file.txt',
        Body: 'Source content'
      });

      const result = await obs.copyObject({
        Bucket: testBucket,
        Key: 'copied-file.txt',
        CopySource: `/${testBucket}/source-file.txt`
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);

    test('should copy object with metadata', async () => {
      const result = await obs.copyObject({
        Bucket: testBucket,
        Key: 'copied-with-meta.txt',
        CopySource: `/${testBucket}/source-file.txt`,
        Metadata: {
          'copied-meta': 'value'
        }
      });

      expect(result.CommonMsg.Status).toBe(200);
    }, 30000);
  });
});