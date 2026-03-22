# OBS SDK 测试用例覆盖计划

## 目标
为华为云 OBS Node.js SDK 所有接口编写集成测试，使用真实 OBS 认证。

## 当前状态
- 已完成 9 个集成测试文件（使用真实 OBS 认证）
- 还有大量接口缺少测试覆盖

## SDK 接口列表（75+ 方法）

### 桶操作（14个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| createBucket | bucket-operations.test.js | ✅ |
| listBuckets | bucket-operations.test.js | ✅ |
| headBucket | bucket-operations.test.js | ✅ |
| deleteBucket | bucket-operations.test.js | ✅ |
| getBucketMetadata | - | ❌ |
| setBucketQuota | - | ❌ |
| getBucketQuota | - | ❌ |
| getBucketStorageInfo | - | ❌ |
| getBucketLocation | - | ❌ |
| setBucketPolicy / getBucketPolicy / deleteBucketPolicy | - | ❌ |
| getBucketEncryption / setBucketEncryption / deleteBucketEncryption | - | ❌ |
| getBucketRequesterPayment / setBucketRequesterPayment | - | ❌ |
| putBucketPublicAccessBlock / getBucketPublicAccessBlock / deleteBucketPublicAccessBlock | - | ❌ |
| getBucketPolicyPublicStatus / getBucketPublicStatus | - | ❌ |
| setBucketCustomDomain / getBucketCustomDomain / deleteBucketCustomDomain | - | ❌ |

### 版本控制（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketVersioningConfiguration | versioning-operations.test.js | ✅ |
| getBucketVersioningConfiguration | versioning-operations.test.js | ✅ |
| listVersions | - | ❌ |

### 生命周期（3个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketLifecycleConfiguration | lifecycle-operations.test.js | ✅ |
| getBucketLifecycleConfiguration | lifecycle-operations.test.js | ✅ |
| deleteBucketLifecycleConfiguration | lifecycle-operations.test.js | ✅ |

### ACL（4个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketAcl | acl-operations.test.js | ✅ |
| getBucketAcl | acl-operations.test.js | ✅ |
| setObjectAcl | acl-operations.test.js | ✅ |
| getObjectAcl | acl-operations.test.js | ✅ |

### CORS（3个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketCors | - | ❌ |
| getBucketCors | - | ❌ |
| deleteBucketCors | - | ❌ |

### 日志（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketLoggingConfiguration | - | ❌ |
| getBucketLoggingConfiguration | - | ❌ |

### 网站配置（3个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketWebsiteConfiguration | - | ❌ |
| getBucketWebsiteConfiguration | - | ❌ |
| deleteBucketWebsiteConfiguration | - | ❌ |

### 通知（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketNotification | - | ❌ |
| getBucketNotification | - | ❌ |

### 标签（6个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketTagging | - | ❌ |
| getBucketTagging | - | ❌ |
| deleteBucketTagging | - | ❌ |
| setObjectTagging | - | ❌ |
| getObjectTagging | - | ❌ |
| deleteObjectTagging | - | ❌ |

### 复制（3个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketReplication | - | ❌ |
| getBucketReplication | - | ❌ |
| deleteBucketReplication | - | ❌ |

### 存储策略（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketStoragePolicy | - | ❌ |
| getBucketStoragePolicy | - | ❌ |

### 直接访问冷存储（3个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| getBucketDirectColdAccess | - | ❌ |
| setBucketDirectColdAccess | - | ❌ |
| deleteBucketDirectColdAccess | - | ❌ |

### 对象操作（12个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| putObject | object-operations.test.js | ✅ |
| getObject | object-operations.test.js | ✅ |
| deleteObject | object-operations.test.js | ✅ |
| getObjectMetadata | object-operations.test.js | ✅ |
| copyObject | copy-operations.test.js | ✅ |
| setObjectMetadata | - | ❌ |
| deleteObjects | - | ❌ |
| appendObject | - | ❌ |
| modifyObject | - | ❌ |
| restoreObject | - | ❌ |
| listObjects | - | ❌ |
| renameObject | - | ❌ |

### 多段上传（6个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| initiateMultipartUpload | multipart-upload.test.js | ✅ |
| uploadPart | multipart-upload.test.js | ✅ |
| completeMultipartUpload | multipart-upload.test.js | ✅ |
| abortMultipartUpload | multipart-upload.test.js | ✅ |
| listMultipartUploads | multipart-upload.test.js | ✅ |
| listParts | - | ❌ |

### 文件上传下载（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| uploadFile | file-upload.test.js | ✅ |
| downloadFile | - | ❌ |

### 选项（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| optionsBucket | - | ❌ |
| optionsObject | - | ❌ |

### WORM/Object Lock（2个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| setBucketObjectLock | worm-integration.test.js | ✅ |
| getBucketObjectLock | worm-integration.test.js | ✅ |

### 签名URL（6个）
| 方法 | 测试文件 | 状态 |
|------|---------|------|
| createSignedUrlSync | - | ❌ |
| createV2SignedUrlSync | - | ❌ |
| createV4SignedUrlSync | - | ❌ |
| createV4PostSignatureSync | - | ❌ |
| createPostSignatureSync | - | ❌ |
| createPostPolicySync | - | ❌ |

## 测试文件列表

### 已完成 (9个)
- test/integration/bucket-operations.test.js
- test/integration/object-operations.test.js
- test/integration/lifecycle-operations.test.js
- test/integration/acl-operations.test.js
- test/integration/copy-operations.test.js
- test/integration/multipart-upload.test.js
- test/integration/file-upload.test.js
- test/integration/versioning-operations.test.js
- test/integration/worm-integration.test.js

### 待新增 (约21个)
1. test/integration/bucket-metadata.test.js
2. test/integration/bucket-policy.test.js
3. test/integration/bucket-encryption.test.js
4. test/integration/bucket-logging.test.js
5. test/integration/bucket-website.test.js
6. test/integration/bucket-notification.test.js
7. test/integration/bucket-tagging.test.js
8. test/integration/bucket-replication.test.js
9. test/integration/bucket-storage.test.js
10. test/integration/bucket-cold-access.test.js
11. test/integration/bucket-requester-payment.test.js
12. test/integration/bucket-public-access.test.js
13. test/integration/bucket-custom-domain.test.js
14. test/integration/object-metadata.test.js
15. test/integration/object-advanced.test.js
16. test/integration/object-delete.test.js
17. test/integration/multipart-advanced.test.js
18. test/integration/download-file.test.js
19. test/integration/options.test.js
20. test/integration/signed-url.test.js
21. test/integration/list-operations.test.js

## 运行测试

### 环境配置
在 `test/.env` 文件中配置 OBS 凭证：
```bash
OBS_ACCESS_KEY=your_access_key_id
OBS_SECRET_KEY=your_secret_access_key
OBS_SERVER=your_obs_endpoint
OBS_REGION=cn-north-1
```

### 测试命令
```bash
# 运行所有集成测试
npm run test:integration

# 运行单个测试文件
npm test -- test/integration/bucket-operations.test.js

# 运行带覆盖率的测试
npm run test:coverage
```

## 状态统计

- **已完成**: 9 个测试文件，25+ 测试用例
- **待完成**: 约 21 个测试文件，60+ 测试用例
- **覆盖率**: 约 30%