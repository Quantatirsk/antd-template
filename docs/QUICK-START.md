# 快速开始

本指南帮助你快速启动一个基于此模板的新项目。

## 前提条件

- Node.js >= 16.0.0
- npm >= 8.0.0 或 pnpm >= 7.0.0

## 方式一：使用模板创建新项目

### 1. 克隆模板

```bash
# 克隆模板仓库
git clone <template-repo-url> my-project
cd my-project

# 删除 git 历史，重新初始化
rm -rf .git
git init
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 4. 配置项目信息

编辑以下文件：

**package.json**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "我的项目描述"
}
```

**src/components/layout/MainLayout.tsx**
```tsx
// 修改应用标题
<span>我的应用名称</span>
```

### 5. 自定义主题

编辑 `src/styles/design-system.ts`：

```typescript
export const colors = {
  primary: {
    500: '#YOUR_BRAND_COLOR',  // 替换为你的品牌色
    // ... 可以使用工具生成完整色阶
  },
}
```

推荐使用在线工具生成色阶：
- [UIColors](https://uicolors.app/)
- [Tailwind Color Generator](https://tailwind.simeongriggs.dev/)

## 方式二：从零开始搭建

### 1. 创建 Vite 项目

```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
npm install
```

### 2. 安装依赖

```bash
# Ant Design 和相关库
npm install antd @ant-design/icons

# React Router
npm install react-router-dom

# 开发依赖
npm install -D @types/node
```

### 3. 配置路径别名

编辑 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

编辑 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 4. 复制核心文件

从模板复制以下文件/目录到你的项目：

```
src/
├── styles/
│   ├── design-system.ts     # 设计系统（必需）
│   ├── GlobalStyles.tsx     # 全局样式
│   └── common-styles.ts     # 通用样式工具
│
├── components/
│   ├── layout/              # 布局组件
│   └── Common/              # 通用组件
│
├── hooks/                   # 自定义 Hooks
└── utils/                   # 工具函数
```

### 5. 配置 App.tsx

```tsx
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { designSystem } from '@/styles';
import GlobalStyles from '@/styles/GlobalStyles';
import Router from '@/router';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: designSystem.colors.primary[500],
          fontSize: parseInt(designSystem.componentFontSize.global),
          borderRadius: parseInt(designSystem.borderRadius.md),
        },
      }}
    >
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
```

## 创建第一个页面

### 1. 创建页面组件

在 `src/pages/` 创建 `HomePage.tsx`：

```tsx
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PageLayout from '@/components/layout/PageLayout';
import { designSystem } from '@/styles';

export default function HomePage() {
  // 顶部工具栏
  const topBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[1],
      padding: designSystem.spacing[1],
      width: '100%',
    }}>
      <h2 style={{ margin: 0 }}>首页</h2>
      <div style={{ flex: 1 }} />
      <Button type="primary" icon={<PlusOutlined />}>
        新建
      </Button>
    </div>
  );

  // 主内容
  return (
    <PageLayout topBar={topBar}>
      <div style={{
        padding: designSystem.spacing[3],
        background: designSystem.semantic.surface.base,
      }}>
        <Card title="欢迎使用">
          <p>这是你的第一个页面！</p>
        </Card>
      </div>
    </PageLayout>
  );
}
```

### 2. 配置路由

编辑 `src/router/index.tsx`：

```tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
```

### 3. 添加菜单项

编辑 `src/components/layout/MainLayout.tsx`：

```tsx
const menuItems = [
  {
    key: '/home',
    icon: <HomeOutlined />,
    label: '首页',
  },
  // ... 更多菜单项
];
```

## 使用页面模板

模板提供三种页面类型，可以直接复制修改：

### Dashboard 页面

```bash
# 复制模板
cp src/pages/DashboardPage.tsx src/pages/MyDashboard.tsx

# 修改内容：
# 1. 修改统计卡片数据
# 2. 修改图表数据源
# 3. 修改活动流数据
# 4. 调整侧边栏内容
```

### List 页面

```bash
# 复制模板
cp src/pages/ListPage.tsx src/pages/MyListPage.tsx

# 修改内容：
# 1. 修改数据类型定义
# 2. 修改表格列配置
# 3. 修改筛选条件
# 4. 修改 API 调用
```

### Detail 页面

```bash
# 复制模板
cp src/pages/DetailPage.tsx src/pages/MyDetailPage.tsx

# 修改内容：
# 1. 修改数据结构
# 2. 修改 Tabs 内容
# 3. 修改侧边栏信息
# 4. 修改 API 调用
```

## 开发工作流

### 1. 开发新功能

```bash
# 启动开发服务器
npm run dev

# 在浏览器中实时预览
# 修改代码会自动热更新
```

### 2. 代码检查

```bash
# 运行 ESLint
npm run lint

# 修复可自动修复的问题
npm run lint:fix
```

### 3. 类型检查

```bash
# 运行 TypeScript 类型检查
npx tsc --noEmit
```

### 4. 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构建议

```
src/
├── api/                      # API 接口
│   ├── modules/             # 按模块划分
│   │   ├── user.ts
│   │   └── product.ts
│   ├── base.ts
│   └── types.ts
│
├── pages/                   # 页面
│   ├── Dashboard/          # 按功能模块划分
│   │   ├── index.tsx
│   │   └── components/     # 页面级组件
│   ├── Users/
│   └── Products/
│
├── components/             # 全局组件
│   ├── layout/
│   ├── Common/
│   └── Business/           # 业务组件
│
├── hooks/                  # 自定义 Hooks
├── utils/                  # 工具函数
├── types/                  # 全局类型定义
├── constants/              # 常量
└── styles/                 # 样式
```

## 环境变量

创建 `.env` 文件：

```env
# API 地址
VITE_API_BASE_URL=https://api.example.com

# 应用配置
VITE_APP_TITLE=我的应用
```

使用环境变量：

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_TITLE = import.meta.env.VITE_APP_TITLE;
```

## 常见任务

### 添加新依赖

```bash
# 安装生产依赖
npm install package-name

# 安装开发依赖
npm install -D package-name
```

### 修改端口

编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    port: 3001,  // 修改端口
  },
});
```

### 配置代理

编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

## 调试技巧

### 1. React DevTools

安装 React DevTools 浏览器扩展，用于检查组件树和状态。

### 2. 控制台日志

```typescript
// 开发环境日志
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### 3. VS Code 断点

配置 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## 部署

### Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod
```

### Docker

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t my-app .
docker run -p 80:80 my-app
```

## 下一步

- 阅读 [设计系统文档](./DESIGN-SYSTEM.md) 了解样式规范
- 阅读 [布局系统](./LAYOUT-SYSTEM.md) 学习布局组件
- 阅读 [页面模板](./PAGE-TEMPLATES.md) 复用页面代码
- 阅读 [最佳实践](./BEST-PRACTICES.md) 提升代码质量

## 获取帮助

遇到问题？
1. 查看项目 README.md
2. 阅读 Ant Design 官方文档
3. 检查控制台错误信息
4. 搜索相关 issue
