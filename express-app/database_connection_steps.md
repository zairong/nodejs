# Render 資料庫連接步驟

## 方法一：使用 psql 命令列工具

### 1. 獲取資料庫連接字串
在 Render Dashboard 中：
1. 進入您的 PostgreSQL 資料庫服務
2. 找到 "Connections" 或 "Info" 標籤
3. 複製 **External Database URL**
   - 格式：`postgresql://user:password@host:port/database`

### 2. 使用 psql 連接
```bash
# 使用您從 Render 複製的連接字串
# psql "postgresql://user:password@host:port/database"
psql "postgresql://databases_8x19_user:40E19uPzdhiRQjIvmN0Lh5YMJQLNQuJG@dpg-d2t8s615pdvs739am8f0-a.oregon-postgres.render.com/databases_8x19"
```

### 3. 執行 SQL 指令
連接成功後，複製貼上 database_setup.sql 的內容：

```sql
-- 創建 users 表格
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建更新 updated_at 的觸發器函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 為 users 表格創建觸發器
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 插入一些測試資料（可選）
INSERT INTO users (name, email) VALUES 
    ('測試用戶1', 'test1@example.com'),
    ('測試用戶2', 'test2@example.com'),
    ('張三', 'zhang.san@example.com'),
    ('李四', 'li.si@example.com')
ON CONFLICT (email) DO NOTHING;

-- 檢查表格是否正確創建
SELECT 'Table created successfully!' as message;
SELECT * FROM users;
```

## 方法二：使用 pgAdmin（圖形化介面）

### 1. 下載並安裝 pgAdmin
- 前往 [pgAdmin 官網](https://www.pgadmin.org/)
- 下載並安裝

### 2. 添加新伺服器
1. 開啟 pgAdmin
2. 右鍵點擊 "Servers" → "Create" → "Server"
3. 填入以下資訊：
   - **Name**: 任意名稱（例如：Render Database）
   - **Host**: 從 Render 連接字串中提取
   - **Port**: 通常是 5432
   - **Database**: 資料庫名稱
   - **Username**: 用戶名
   - **Password**: 密碼

### 3. 執行 SQL
1. 連接成功後，右鍵點擊您的資料庫
2. 選擇 "Query Tool"
3. 複製貼上 database_setup.sql 的內容
4. 點擊執行按鈕

## 方法三：使用線上工具

### 使用 TablePlus（推薦）
1. 下載 [TablePlus](https://tableplus.com/)
2. 創建新連接，選擇 PostgreSQL
3. 輸入 Render 提供的連接資訊
4. 連接後執行 SQL 指令

### 使用 DBeaver
1. 下載 [DBeaver](https://dbeaver.io/)
2. 創建新的 PostgreSQL 連接
3. 使用 Render 的連接參數
4. 執行 SQL 指令

## 方法四：使用 Render 的內建功能（如果可用）

某些 Render 計劃可能提供：
1. 在資料庫服務頁面尋找 "Console" 或 "Query" 按鈕
2. 直接在瀏覽器中執行 SQL
3. 貼上 database_setup.sql 的內容並執行

## 確認步驟

執行完成後，您應該能看到：
1. 成功訊息："Table created successfully!"
2. 用戶列表顯示測試資料

## 如果遇到問題

### 常見錯誤：
- **連接被拒絕**: 檢查 IP 白名單設定
- **認證失敗**: 確認用戶名和密碼正確
- **資料庫不存在**: 確認資料庫名稱正確

### 解決方法：
1. 確認 Render 資料庫狀態為 "Available"
2. 檢查連接字串是否完整
3. 確認沒有防火牆阻擋連接
4. 嘗試從 Render Dashboard 重新獲取連接資訊

## 驗證資料庫設置

執行以下查詢確認設置成功：
```sql
-- 檢查表格是否存在
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 檢查用戶資料
SELECT * FROM users;

-- 檢查表格結構
\d users
```
