# 使用 Node.js 18 的輕量版本
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 pnpm-lock.yaml 用於安裝依賴
COPY package.json pnpm-lock.yaml ./

# 安裝 pnpm 包管理工具
RUN npm install -g pnpm

# 安裝專案依賴
RUN pnpm install

# 複製所有項目文件
COPY . .

# 開放開發時的端口
EXPOSE 3000

# 啟動開發伺服器
CMD ["pnpm", "dev"]
