/**
 * Test Configuration
 *
 * Reads OBS credentials from environment variables or .env file for real OBS testing.
 *
 * Environment variables (priority: process.env > .env file):
 * - OBS_ACCESS_KEY: Access Key ID
 * - OBS_SECRET_KEY: Secret Access Key
 * - OBS_SERVER: OBS endpoint (e.g., obs.example.com)
 * - OBS_REGION: OBS region (optional, default: cn-north-1)
 * - OBS_BUCKET: Test bucket name (optional)
 */

const fs = require('fs');
const path = require('path');

// Load .env file if exists
function loadEnvFile() {
  const envFile = path.resolve(process.cwd(), 'test', '.env');
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex > 0) {
          const key = trimmed.substring(0, eqIndex).trim();
          const value = trimmed.substring(eqIndex + 1).trim();
          // Only set if not already in process.env
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

// Try to load env file (don't fail if not found)
try {
  loadEnvFile();
} catch (e) {
  // Ignore errors
}

module.exports = {
  getObsConfig() {
    const config = {
      access_key_id: process.env.OBS_ACCESS_KEY,
      secret_access_key: process.env.OBS_SECRET_KEY,
      server: process.env.OBS_SERVER || process.env.OBS_ENDPOINT,
      region: process.env.OBS_REGION || 'cn-north-1',
      is_secure: process.env.OBS_SECURE !== 'false',
    };

    if (!config.access_key_id || !config.secret_access_key || !config.server) {
      throw new Error(
        'Missing required OBS credentials. Please set OBS_ACCESS_KEY, OBS_SECRET_KEY, and OBS_SERVER environment variables, or create test/.env file.'
      );
    }

    return config;
  },

  getTestBucket() {
    return process.env.OBS_BUCKET || 'test-bucket-' + Date.now();
  },

  getOptionalConfig() {
    return {
      path_style: process.env.OBS_PATH_STYLE === 'true',
      signature: process.env.OBS_SIGNATURE || 'obs',
      is_signature_negotiation: process.env.OBS_SIGNATURE_NEGOTIATION === 'true',
    };
  },
};