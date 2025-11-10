# Ant Design Template

一套完整的 Ant Design 模板项目，提炼自成熟的 GraphRAG 项目，包含设计系统、布局组件、通用组件和最佳实践文档。

## 特性

- ✅ **完整的设计系统**：基于 4px 网格的设计令牌（Design Tokens）
- ✅ **布局组件库**：PageLayout 等可复用布局组件
- ✅ **通用组件库**：LoadingState、ErrorState、EmptyState 等状态组件
- ✅ **页面模板库**：ListPage、DetailPage、DashboardPage 等完整页面模板
- ✅ **API 集成模式**：BaseService 继承式 API 设计
- ✅ **类型安全**：全程 TypeScript 支持
- ✅ **详细文档**：6 份设计规范文档 + 代码注释

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 项目结构

```
/antd-template/
├── docs/                          # 📚 设计文档
│   ├── UI-SPECS.md               # UI 规范
│   ├── DESIGN-SYSTEM.md          # 设计系统
│   ├── LAYOUT-PATTERNS.md        # 布局模式
│   ├── COMPONENT-PATTERNS.md     # 组件模式
│   ├── INTERACTION-PATTERNS.md   # 交互模式
│   └── API-INTEGRATION.md        # API 集成指南
│
├── src/
│   ├── styles/                   # 🎨 设计系统
│   │   ├── design-system.ts     # 设计令牌
│   │   ├── common-styles.ts     # 通用样式
│   │   └── index.ts
│   │
│   ├── components/               # 🧩 组件库
│   │   ├── Common/              # 通用组件
│   │   │   ├── LoadingState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── layout/              # 布局组件
│   │       ├── PageLayout.tsx
│   │       └── index.ts
│   │
│   ├── hooks/                    # 🪝 自定义 Hooks
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # 🛠️ 工具函数
│   │   ├── error.ts             # 错误处理
│   │   └── index.ts
│   │
│   ├── api/                      # 🌐 API 模板
│   │   ├── base.ts              # BaseService
│   │   ├── types.ts             # 类型定义
│   │   └── index.ts
│   │
│   ├── pages/                    # 📄 页面模板
│   │   ├── ListPage.tsx         # 列表页模板
│   │   ├── DetailPage.tsx       # 详情页模板
│   │   ├── DashboardPage.tsx    # 仪表板模板
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── examples/                      # 💡 使用示例
│   ├── basic-layout/
│   └── README.md
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 核心概念

### 1. 设计系统

基于 4px 网格系统的完整设计令牌：

```typescript
import { designSystem } from '@/styles';

// 颜色
designSystem.colors.primary[500]         // #005BAC
designSystem.semantic.text.primary      // 主文字颜色

// 间距
designSystem.spacing[4]                 // 16px（标准间距）
designSystem.spacing[6]                 // 24px（卡片间距）

// 字体
designSystem.typography.fontSize.base   // 16px
designSystem.typography.fontWeight.bold // 700
```

详见：[docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)

### 2. 布局组件

#### PageLayout（三栏布局）

经典三栏布局，支持顶部工具栏、左右侧边栏、底部状态栏：

```typescript
import PageLayout from '@/components/layout/PageLayout';

<PageLayout
  topBar={<div>工具栏</div>}
  leftSidebar={<div>左侧边栏</div>}
  rightSidebar={<div>右侧边栏</div>}
  bottomBar={<div>状态栏</div>}
>
  <div>主内容区</div>
</PageLayout>
```

详见：[docs/LAYOUT-PATTERNS.md](docs/LAYOUT-PATTERNS.md)

### 3. 通用组件

#### LoadingState（加载状态）

```typescript
import { LoadingState } from '@/components/Common';

// 旋转加载
<LoadingState mode="spin" tip="加载中..." />

// 骨架屏
<LoadingState mode="skeleton" rows={5} />

// 行内加载
<LoadingState mode="inline" />
```

#### ErrorState（错误状态）

```typescript
import { ErrorState } from '@/components/Common';

<ErrorState
  error={error}
  onRetry={fetchData}
  showDetails={true}
/>
```

#### EmptyState（空状态）

```typescript
import { EmptyState } from '@/components/Common';

<EmptyState
  type="dataset"
  action={{
    text: '创建数据集',
    onClick: () => setModalOpen(true),
  }}
/>
```

详见：[docs/COMPONENT-PATTERNS.md](docs/COMPONENT-PATTERNS.md)

### 4. 页面模板

#### ListPage（列表页）

完整的列表页模板，包含：
- 搜索/筛选
- 表格/卡片视图切换
- 分页
- 批量操作
- 新建/编辑/删除

```typescript
import { ListPage } from '@/pages';

// 直接使用
<ListPage />

// 或者作为参考自定义实现
```

#### DetailPage（详情页）

完整的详情页模板，包含：
- 详细信息展示（Descriptions）
- Tabs 切换（基本信息、关联数据、操作历史）
- 编辑/删除操作
- 统计卡片

```typescript
import { DetailPage } from '@/pages';

<DetailPage />
```

#### DashboardPage（仪表板）

完整的仪表板模板，包含：
- 统计卡片（带趋势）
- 图表展示（趋势图、分布图）
- 最近活动列表
- 快捷操作
- 系统状态

```typescript
import { DashboardPage } from '@/pages';

<DashboardPage />
```

### 5. API 集成

#### BaseService 模式

```typescript
import { BaseService, ApiResponse } from '@/api';

class UsersService extends BaseService {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.get('/users');
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.post('/users', data);
  }
}

export const usersAPI = new UsersService();
```

详见：[docs/API-INTEGRATION.md](docs/API-INTEGRATION.md)

### 6. 自定义 Hooks

#### useDebounce（防抖）

```typescript
import { useDebounce } from '@/hooks';

const [searchText, setSearchText] = useState('');
const debouncedText = useDebounce(searchText, 500);

useEffect(() => {
  performSearch(debouncedText);
}, [debouncedText]);
```

#### useMediaQuery（媒体查询）

```typescript
import { useMediaQuery } from '@/hooks';
import { designSystem } from '@/styles';

const isMobile = useMediaQuery(`(max-width: ${designSystem.breakpoints.mobile})`);
```

## 文档

### 设计规范

- [UI-SPECS.md](docs/UI-SPECS.md) - UI 规范文档
- [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) - 设计系统文档

### 开发指南

- [LAYOUT-PATTERNS.md](docs/LAYOUT-PATTERNS.md) - 布局模式文档
- [COMPONENT-PATTERNS.md](docs/COMPONENT-PATTERNS.md) - 组件模式文档
- [INTERACTION-PATTERNS.md](docs/INTERACTION-PATTERNS.md) - 交互模式文档
- [API-INTEGRATION.md](docs/API-INTEGRATION.md) - API 集成指南

## 使用示例

### 页面模板

查看 `src/pages/` 目录：
- **ListPage.tsx** - 完整的列表页（约 400 行，包含搜索、筛选、CRUD 操作）
- **DetailPage.tsx** - 完整的详情页（约 250 行，包含 Tabs、操作历史）
- **DashboardPage.tsx** - 完整的仪表板（约 300 行，包含统计卡片、图表、活动列表）

### 布局示例

查看 [examples/](examples/) 目录中的布局示例。

## 技术栈

- **框架**：React 18 + TypeScript 5
- **构建工具**：Vite 5
- **UI 库**：Ant Design 5
- **状态管理**：Zustand（推荐）
- **路由**：React Router 6
- **HTTP 客户端**：Axios
- **样式工具**：clsx + tailwind-merge

## 最佳实践

### 1. 使用设计令牌

```typescript
// ✅ 推荐
color: designSystem.semantic.text.primary

// ❌ 不推荐
color: '#111827'
```

### 2. 组件分离

```typescript
// 容器组件（业务逻辑）
function DataListPage() {
  const { data, loading, fetchData } = useDataStore();

  return <DataList data={data} loading={loading} />;
}

// 展示组件（纯 UI）
function DataList({ data, loading }: Props) {
  return <div>{/* UI */}</div>;
}
```

### 3. 类型安全

```typescript
// 定义类型
interface User {
  id: string;
  name: string;
}

// API 响应类型
async getUsers(): Promise<ApiResponse<User[]>> {
  return this.get<User[]>('/users');
}
```

## License

MIT

## 致谢

本模板提炼自 [graphrag_structured](https://github.com/your-repo) 项目，感谢团队的贡献。
