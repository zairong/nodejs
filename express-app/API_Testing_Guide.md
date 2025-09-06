# API 測試指南

## 前置作業

### 1. 資料庫設置
首先，您需要在 Render 的 PostgreSQL 資料庫中執行以下 SQL 指令：
```sql
-- 複製 database_setup.sql 中的內容並在資料庫中執行
```

### 2. 確認環境變數
確保在 Render 中設置了以下環境變數：
- `DB_HOST`: 您的資料庫主機
- `DB_USER`: 資料庫用戶名
- `DB_PASSWORD`: 資料庫密碼
- `DB_NAME`: 資料庫名稱
- `DB_PORT`: 資料庫端口（通常是 5432）

## API 端點測試

假設您的 Render 應用程式 URL 是：`https://your-app-name.onrender.com`

### 1. 基本連接測試
```bash
# 測試基本 API 連接
GET https://your-app-name.onrender.com/api/hello
```

**期望回應：**
```json
{
  "message": "Hello from the API!"
}
```

### 2. 創建用戶 (CREATE)
```bash
POST https://your-app-name.onrender.com/api/users
Content-Type: application/json

{
  "name": "張小明",
  "email": "zhang.xiaoming@example.com"
}
```

**期望回應：**
```json
{
  "message": "用戶創建成功",
  "user": {
    "id": 1,
    "name": "張小明",
    "email": "zhang.xiaoming@example.com",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  }
}
```

### 3. 獲取所有用戶 (READ)
```bash
GET https://your-app-name.onrender.com/api/users
```

**期望回應：**
```json
{
  "message": "成功獲取用戶列表",
  "users": [
    {
      "id": 1,
      "name": "張小明",
      "email": "zhang.xiaoming@example.com",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

### 4. 根據 ID 獲取用戶 (READ)
```bash
GET https://your-app-name.onrender.com/api/users/1
```

**期望回應：**
```json
{
  "message": "成功獲取用戶資訊",
  "user": {
    "id": 1,
    "name": "張小明",
    "email": "zhang.xiaoming@example.com",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  }
}
```

### 5. 更新用戶 (UPDATE)
```bash
PUT https://your-app-name.onrender.com/api/users/1
Content-Type: application/json

{
  "name": "張大明",
  "email": "zhang.daming@example.com"
}
```

**期望回應：**
```json
{
  "message": "用戶更新成功",
  "user": {
    "id": 1,
    "name": "張大明",
    "email": "zhang.daming@example.com",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:05:00.000Z"
  }
}
```

### 6. 刪除用戶 (DELETE)
```bash
DELETE https://your-app-name.onrender.com/api/users/1
```

**期望回應：**
```json
{
  "message": "用戶刪除成功",
  "user": {
    "id": 1,
    "name": "張大明",
    "email": "zhang.daming@example.com",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:05:00.000Z"
  }
}
```

## 使用工具測試

### 使用 curl 指令
```bash
# 1. 測試基本連接
curl -X GET https://your-app-name.onrender.com/api/hello

# 2. 創建用戶
curl -X POST https://your-app-name.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "測試用戶", "email": "test@example.com"}'

# 3. 獲取所有用戶
curl -X GET https://your-app-name.onrender.com/api/users

# 4. 獲取特定用戶
curl -X GET https://your-app-name.onrender.com/api/users/1

# 5. 更新用戶
curl -X PUT https://your-app-name.onrender.com/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "更新的用戶", "email": "updated@example.com"}'

# 6. 刪除用戶
curl -X DELETE https://your-app-name.onrender.com/api/users/1
```

### 使用 Postman
1. 創建新的 Collection
2. 添加以上所有請求
3. 設置環境變數 `base_url` = `https://your-app-name.onrender.com`
4. 依序測試每個端點

### 使用瀏覽器開發者工具
```javascript
// 在瀏覽器控制台中執行
const baseUrl = 'https://your-app-name.onrender.com/api';

// 測試獲取用戶
fetch(`${baseUrl}/users`)
  .then(response => response.json())
  .then(data => console.log(data));

// 測試創建用戶
fetch(`${baseUrl}/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '測試用戶',
    email: 'test@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 錯誤處理測試

### 測試錯誤情況
1. **無效的資料格式**
```bash
curl -X POST https://your-app-name.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": ""}'
```

2. **不存在的用戶 ID**
```bash
curl -X GET https://your-app-name.onrender.com/api/users/999
```

3. **重複的電子郵件**
```bash
# 先創建一個用戶，然後嘗試用相同的 email 創建另一個
```

## 資料庫連接驗證

### 檢查資料庫連接
如果 API 回應錯誤，請檢查：
1. Render 的應用程式日誌
2. 資料庫連接參數是否正確
3. 資料庫是否正在運行
4. 環境變數是否正確設置

### 常見錯誤
- `connection refused`: 檢查資料庫 URL 和端口
- `authentication failed`: 檢查用戶名和密碼
- `database not found`: 檢查資料庫名稱
- `table doesn't exist`: 確保已執行 database_setup.sql

## 成功指標
✅ 所有 API 端點回應正確的 JSON 格式
✅ 資料庫中的資料正確更新
✅ 錯誤情況返回適當的錯誤訊息
✅ HTTP 狀態碼正確（200, 201, 404, 500 等）
