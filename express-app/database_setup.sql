-- 資料庫設置檔案
-- 請在您的 Render PostgreSQL 資料庫中執行這些指令

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
