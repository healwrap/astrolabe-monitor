JWT 结合 Redis 的使用思路主要有以下几种场景：

## 1. Token 黑名单机制

将已注销的 JWT token 存储在 Redis 中，实现token失效控制：

```javascript
// 用户登出时，将token加入黑名单
async function logout(token) {
  const decoded = jwt.decode(token);
  const expiry = decoded.exp - Math.floor(Date.now() / 1000);

  // 将token存入Redis黑名单，设置过期时间
  await redis.setex(`blacklist:${token}`, expiry, '1');
}

// 验证token时检查黑名单
async function verifyToken(token) {
  // 检查是否在黑名单中
  const isBlacklisted = await redis.exists(`blacklist:${token}`);
  if (isBlacklisted) {
    throw new Error('Token已失效');
  }

  // 正常验证JWT
  return jwt.verify(token, secretKey);
}
```

## 2. 刷新令牌存储

将 refresh token 存储在 Redis 中，提高安全性：

```javascript
// 生成token对
async function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' });

  // 将refresh token存储到Redis
  await redis.setex(`refresh:${userId}`, 7 * 24 * 3600, refreshToken);

  return { accessToken, refreshToken };
}

// 刷新访问令牌
async function refreshAccessToken(refreshToken) {
  const decoded = jwt.verify(refreshToken, refreshSecret);
  const storedToken = await redis.get(`refresh:${decoded.userId}`);

  if (storedToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  return jwt.sign({ userId: decoded.userId }, accessSecret, { expiresIn: '15m' });
}
```

## 3. 用户会话管理

使用 Redis 存储用户会话信息，支持单点登录：

```javascript
// 登录时存储会话
async function login(userId, token) {
  const sessionData = {
    token,
    loginTime: Date.now(),
    lastActive: Date.now(),
  };

  // 存储用户会话，支持单点登录
  await redis.setex(`session:${userId}`, 3600, JSON.stringify(sessionData));
}

// 验证会话
async function validateSession(userId, token) {
  const sessionData = await redis.get(`session:${userId}`);
  if (!sessionData) return false;

  const session = JSON.parse(sessionData);
  return session.token === token;
}
```

## 4. 权限缓存

将用户权限信息缓存到 Redis，提高性能：

```javascript
// 缓存用户权限
async function cacheUserPermissions(userId, permissions) {
  await redis.setex(`permissions:${userId}`, 1800, JSON.stringify(permissions));
}

// 获取用户权限
async function getUserPermissions(userId) {
  const cached = await redis.get(`permissions:${userId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 从数据库获取并缓存
  const permissions = await db.getUserPermissions(userId);
  await cacheUserPermissions(userId, permissions);
  return permissions;
}
```

## 5. 频率限制

使用 Redis 实现基于用户的 API 频率限制：

```javascript
// API频率限制
async function checkRateLimit(userId) {
  const key = `rate_limit:${userId}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, 3600); // 1小时窗口
  }

  return current <= 1000; // 每小时最多1000次请求
}
```

## 主要优势

1. **性能提升**：Redis 的高速缓存减少数据库查询
2. **灵活控制**：可以主动使 token 失效
3. **会话管理**：支持复杂的会话控制逻辑
4. **横向扩展**：支持分布式部署
5. **安全增强**：refresh token 集中管理，降低泄露风险

这种架构特别适合需要精确控制用户会话和高并发的应用场景。
