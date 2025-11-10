# 示例

本目录包含使用模板组件的示例代码。

## 示例列表

### 1. 基础布局示例（basic-layout）

演示 `ThreeColumnLayout` 组件的基本使用，包括：
- 顶部工具栏：搜索、筛选、操作按钮
- 左侧边栏：分类筛选、统计信息
- 主内容区：数据列表
- 右侧边栏：详情展示、操作按钮
- 底部状态栏：统计信息

## 如何运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

将示例代码导入到 `src/App.tsx` 中即可查看效果。

```typescript
import BasicLayoutExample from '../examples/basic-layout';

function App() {
  return <BasicLayoutExample />;
}
```
