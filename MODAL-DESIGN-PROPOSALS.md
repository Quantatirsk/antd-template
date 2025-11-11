# 弹窗设计方案

> 为 Ant Design Template 项目设计的弹窗组件规范
>
> 设计原则：遵循 Apple 级现代化设计、8px 网格系统、主色 #005BAC

---

## 目录

1. [方案一：标准三段式弹窗](#方案一标准三段式弹窗)
2. [方案二：侧边栏式弹窗 (Drawer)](#方案二侧边栏式弹窗-drawer)
3. [方案三：分步向导弹窗](#方案三分步向导弹窗)
4. [方案四：全屏工作台弹窗](#方案四全屏工作台弹窗)
5. [方案五：轻量确认弹窗](#方案五轻量确认弹窗)
6. [尺寸规范总结](#尺寸规范总结)

---

## 方案一：标准三段式弹窗

### 适用场景
- 表单填写（创建/编辑）
- 数据查看
- 设置配置
- 通用对话框

### ASCII 示意图

#### 小尺寸 (480px)
```
┌────────────────────────────────────────────────┐
│ 创建数据集                            [×]      │ ← Header (56px)
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 名称: [___________________________]     │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │ ← Content
│  │ 类型: [选择类型▼]                        │ │   (auto, max 60vh)
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 描述: [___________________________]     │ │
│  │       [___________________________]     │ │
│  └──────────────────────────────────────────┘ │
│                                                │
├────────────────────────────────────────────────┤
│                          [取消]  [确定]       │ ← Footer (64px)
└────────────────────────────────────────────────┘
     └─────────────┬─────────────┘
               480px
```

#### 中尺寸 (720px)
```
┌──────────────────────────────────────────────────────────────────┐
│ 编辑数据集详情                                          [×]      │ ← Header (56px)
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  基本信息                                                        │
│  ┌────────────────────────┐  ┌────────────────────────┐         │
│  │ 名称: [_____________] │  │ 类型: [选择▼]         │         │
│  └────────────────────────┘  └────────────────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 描述: [_____________________________________________]   │   │ ← Content
│  │       [_____________________________________________]   │   │   (auto, max 60vh)
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  高级设置                                                        │
│  ┌────────────────────────┐  ┌────────────────────────┐         │
│  │ ☑ 启用索引             │  │ ☑ 自动备份             │         │
│  └────────────────────────┘  └────────────────────────┘         │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                          [取消]  [保存]         │ ← Footer (64px)
└──────────────────────────────────────────────────────────────────┘
     └───────────────────────┬───────────────────────┘
                           720px
```

#### 大尺寸 (960px)
```
┌────────────────────────────────────────────────────────────────────────────────┐
│ 数据集配置                                                            [×]      │ ← Header (56px)
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌─────────────────┐  ┌──────────────────────────────────────────────────┐   │
│  │ 基本信息        │  │                                                  │   │
│  │ 高级设置        │  │  名称: [_____________________________________]  │   │
│  │ 权限管理        │  │                                                  │   │
│  │ 标签设置        │  │  类型: [选择类型▼]     状态: [激活▼]           │   │ ← Content
│  │                 │  │                                                  │   │   左右分栏
│  │                 │  │  描述:                                           │   │   (auto, max 60vh)
│  │                 │  │  ┌────────────────────────────────────────────┐ │   │
│  │                 │  │  │                                            │ │   │
│  │                 │  │  └────────────────────────────────────────────┘ │   │
│  └─────────────────┘  └──────────────────────────────────────────────────┘   │
│                                                                                │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                      [取消]  [保存并关闭]     │ ← Footer (64px)
└────────────────────────────────────────────────────────────────────────────────┘
     └─────────────────────────────┬─────────────────────────────┘
                                 960px
```

### 设计规范

| 元素 | 规格 | 说明 |
|------|------|------|
| **宽度** | 480px / 720px / 960px | 小/中/大三档 |
| **Header 高度** | 56px | 与 MainLayout.Header 一致 |
| **Footer 高度** | 64px | 容纳 40px 按钮 + padding |
| **Content 最大高度** | 60vh | 防止弹窗过高 |
| **Content Padding** | 24px | 舒适间距 |
| **圆角** | 8px | borderRadius.xl |
| **阴影** | shadows.2xl | 强分层感 |
| **按钮间距** | 12px | spacing[2] |
| **标题字号** | 20px | fontSize.lg |
| **标题字重** | 600 | fontWeight.semibold |

### 使用示例

```tsx
import { Modal, Form, Input, Select, Button } from 'antd';
import { designSystem } from '@/styles';

function CreateDatasetModal({ open, onCancel, onOk }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="创建数据集"
      width={720}
      styles={{
        body: {
          padding: designSystem.spacing[5],
          maxHeight: '60vh',
          overflow: 'auto'
        },
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          确定
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onOk}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入数据集名称" />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Select placeholder="选择类型">
            <Select.Option value="typeA">类型 A</Select.Option>
            <Select.Option value="typeB">类型 B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
```

---

## 方案二：侧边栏式弹窗 (Drawer)

### 适用场景
- 详情查看（无需强打断）
- 表单填写（内容较多）
- 过滤器面板
- 操作历史

### ASCII 示意图

#### 右侧滑入 (480px)
```
┌─────────────────────────┬──────────────────────────┐
│                         │ [×] 数据集详情           │ ← Header (56px)
│                         ├──────────────────────────┤
│                         │                          │
│                         │  基本信息                │
│   主页面内容             │  ────────────────────── │
│   保持可见               │  名称: 知识图谱 Alpha    │
│   但半透明遮罩            │  类型: typeA             │
│                         │  状态: [激活]            │
│                         │                          │
│                         │  统计数据                │
│                         │  ────────────────────── │
│                         │  节点数: 12,580          │
│                         │  边数:   45,230          │
│                         │                          │
│                         │  元数据                  │
│                         │  ────────────────────── │
│                         │  创建者: 张三            │
│                         │  创建于: 2024-01-15      │
│                         │  更新于: 2024-03-20      │
│                         │                          │
│                         │  标签                    │
│                         │  [知识图谱] [企业数据]   │
│                         │                          │
└─────────────────────────┴──────────────────────────┘
                          └────────┬────────┘
                                 480px
```

#### 大尺寸 (720px)
```
┌───────────────┬──────────────────────────────────────────────┐
│               │ [×] 编辑数据集                               │ ← Header (56px)
│               ├──────────────────────────────────────────────┤
│               │                                              │
│               │  ┌─────────────┐  ┌────────────────────┐    │
│  主页面内容    │  │ 基本信息    │  │ 名称: [_________] │    │
│  保持可见      │  │ 高级设置    │  │                    │    │
│  半透明遮罩    │  │ 权限管理    │  │ 类型: [选择▼]     │    │
│               │  │             │  │                    │    │
│               │  │             │  │ 描述:              │    │
│               │  │             │  │ ┌────────────────┐ │    │
│               │  │             │  │ │                │ │    │
│               │  │             │  │ └────────────────┘ │    │
│               │  └─────────────┘  └────────────────────┘    │
│               │                                              │
│               ├──────────────────────────────────────────────┤
│               │                      [取消]  [保存]         │ ← Footer (64px)
└───────────────┴──────────────────────────────────────────────┘
                └────────────────┬────────────────┘
                               720px
```

### 设计规范

| 元素 | 规格 | 说明 |
|------|------|------|
| **宽度** | 480px / 720px | 标准/宽屏两档 |
| **高度** | 100vh | 全屏高度 |
| **动画** | 从右滑入 300ms | transitions.slow |
| **遮罩透明度** | 0.4 | opacity.overlay |
| **Header 高度** | 56px | 与全局一致 |
| **Footer 高度** | 64px | 可选 |
| **内边距** | 24px | spacing[5] |

### 使用示例

```tsx
import { Drawer, Descriptions, Tag, Button, Space } from 'antd';
import { designSystem } from '@/styles';

function DatasetDetailDrawer({ open, onClose, data }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="数据集详情"
      width={480}
      styles={{
        body: { padding: designSystem.spacing[5] },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
          <Button type="primary">编辑</Button>
        </Space>
      }
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
        <Descriptions.Item label="类型">{data.type}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color="green">激活</Tag>
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: designSystem.spacing[5] }}>
        <h4>统计数据</h4>
        <p>节点数: {data.nodeCount}</p>
        <p>边数: {data.edgeCount}</p>
      </div>
    </Drawer>
  );
}
```

---

## 方案三：分步向导弹窗

### 适用场景
- 多步骤表单
- 引导流程
- 复杂配置
- 数据导入向导

### ASCII 示意图

```
┌────────────────────────────────────────────────────────────────┐
│ 创建数据集向导                                        [×]      │ ← Header (56px)
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  (1)基本信息 ──→ (2)数据配置 ──→ (3)权限设置 ──→ (4)确认     │ ← Steps (48px)
│     ═════                                                      │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  第 1 步：填写基本信息                                         │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 数据集名称 *                                             │ │
│  │ [___________________________________________________]   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │ ← Content
│  ┌──────────────────────────────────────────────────────────┐ │   (auto, max 50vh)
│  │ 数据集类型 *                                             │ │
│  │ [选择类型▼]                                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 描述信息                                                 │ │
│  │ [___________________________________________________]   │ │
│  │ [___________________________________________________]   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [取消]                                      [上一步] [下一步] │ ← Footer (64px)
└────────────────────────────────────────────────────────────────┘
     └───────────────────────┬───────────────────────┘
                           720px

                            ↓ 下一步 ↓

┌────────────────────────────────────────────────────────────────┐
│ 创建数据集向导                                        [×]      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  (1)基本信息 ──→ (2)数据配置 ──→ (3)权限设置 ──→ (4)确认     │
│                     ═════                                      │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  第 2 步：配置数据源                                           │
│                                                                │
│  ☑ 启用自动索引                                               │
│  ☑ 启用全文搜索                                               │
│  ☐ 启用版本控制                                               │
│                                                                │
│  索引配置                                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 索引字段: [name, description, tags]                     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [取消]                                      [上一步] [下一步] │
└────────────────────────────────────────────────────────────────┘
```

### 设计规范

| 元素 | 规格 | 说明 |
|------|------|------|
| **宽度** | 720px / 960px | 根据内容选择 |
| **Header 高度** | 56px | 标题 + 关闭 |
| **Steps 高度** | 48px | 步骤条 |
| **Content 最大高度** | 50vh | 留给步骤条空间 |
| **Footer 高度** | 64px | 三按钮布局 |
| **步骤指示器** | Ant Design Steps | 使用默认组件 |

### 使用示例

```tsx
import { Modal, Steps, Form, Input, Checkbox, Button } from 'antd';
import { useState } from 'react';
import { designSystem } from '@/styles';

const steps = [
  { title: '基本信息', key: 'basic' },
  { title: '数据配置', key: 'config' },
  { title: '权限设置', key: 'permission' },
  { title: '确认', key: 'confirm' },
];

function WizardModal({ open, onCancel, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    await form.validateFields();
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="创建数据集向导"
      width={720}
      footer={null}
      styles={{
        body: {
          padding: 0,
          maxHeight: '60vh',
          overflow: 'hidden'
        },
      }}
    >
      <div style={{ padding: designSystem.spacing[5] }}>
        <Steps current={current} items={steps} />
      </div>

      <div style={{
        padding: designSystem.spacing[5],
        maxHeight: '50vh',
        overflow: 'auto'
      }}>
        <Form form={form} layout="vertical">
          {current === 0 && (
            <>
              <Form.Item label="数据集名称" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="数据集类型" name="type" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </>
          )}
          {current === 1 && (
            <>
              <Form.Item name="autoIndex" valuePropName="checked">
                <Checkbox>启用自动索引</Checkbox>
              </Form.Item>
              <Form.Item name="fullText" valuePropName="checked">
                <Checkbox>启用全文搜索</Checkbox>
              </Form.Item>
            </>
          )}
          {/* 其他步骤... */}
        </Form>
      </div>

      <div style={{
        padding: designSystem.spacing[3],
        borderTop: `1px solid ${designSystem.semantic.border.light}`,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button onClick={onCancel}>取消</Button>
        <div>
          {current > 0 && <Button onClick={prev}>上一步</Button>}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next} style={{ marginLeft: 8 }}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => form.submit()} style={{ marginLeft: 8 }}>
              完成
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
```

---

## 方案四：全屏工作台弹窗

### 适用场景
- 复杂编辑器（代码编辑、富文本）
- 可视化配置
- 数据看板
- 需要大空间的操作

### ASCII 示意图

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ [←] 数据集编辑器        [保存草稿]  [预览]  [发布]                    [×]    │ ← Header (56px)
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  ┌─────────────────┐  ┌──────────────────────────────────────────────────┐   │
│  │ 配置             │  │                                                  │   │
│  │ ─────           │  │  名称: [______________________________________]  │   │
│  │ □ 基本信息       │  │                                                  │   │
│  │ □ 节点配置       │  │  类型: [知识图谱▼]     版本: [v1.0▼]           │   │
│  │ □ 关系配置       │  │                                                  │   │
│  │ □ 显示设置       │  │  描述:                                           │   │
│  │                 │  │  ┌────────────────────────────────────────────┐ │   │
│  │ 预览             │  │  │                                            │ │   │
│  │ ─────           │  │  │                                            │ │   │
│  │ [图表预览]       │  │  └────────────────────────────────────────────┘ │   │
│  │                 │  │                                                  │   │
│  │                 │  │  节点属性配置:                                   │   │
│  │ 统计             │  │  ┌─────────────────┬─────────────────────────┐ │   │
│  │ ─────           │  │  │ 属性名          │ 类型         │ 必填      │ │   │
│  │ 节点: 0         │  │  ├─────────────────┼─────────────────────────┤ │   │
│  │ 边:   0         │  │  │ id              │ string      │ ☑         │ │   │
│  │                 │  │  │ name            │ string      │ ☑         │ │   │
│  │                 │  │  │ type            │ enum        │ ☐         │ │   │
│  │                 │  │  └─────────────────┴─────────────────────────┘ │   │
│  │                 │  │                                                  │   │
│  │                 │  │  [+ 添加属性]                                    │   │
│  │                 │  │                                                  │   │
│  └─────────────────┘  └──────────────────────────────────────────────────┘   │
│     200px                          剩余空间                                   │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
                              100vw × 100vh
```

### 设计规范

| 元素 | 规格 | 说明 |
|------|------|------|
| **尺寸** | 100vw × 100vh | 全屏 |
| **Header 高度** | 56px | 包含返回、操作按钮 |
| **左侧栏宽度** | 200px | 可折叠 |
| **布局** | 固定 Header + 弹性内容 | 类似独立页面 |
| **背景** | 纯白 | 与页面一致 |
| **层级** | z-index: 1050 | 覆盖所有内容 |

### 使用示例

```tsx
import { Modal, Button, Space, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { designSystem } from '@/styles';

function FullscreenEditorModal({ open, onClose, onSave }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      width="100vw"
      style={{ top: 0, maxWidth: '100vw', padding: 0 }}
      styles={{
        body: {
          height: 'calc(100vh - 56px)',
          padding: 0,
          display: 'flex',
        },
      }}
      closeIcon={null}
      footer={null}
      title={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${designSystem.spacing[5]}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[3] }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={onClose}
            />
            <span style={{ fontSize: designSystem.typography.fontSize.lg }}>
              数据集编辑器
            </span>
          </div>

          <Space>
            <Button>保存草稿</Button>
            <Button>预览</Button>
            <Button type="primary" onClick={onSave}>发布</Button>
          </Space>
        </div>
      }
    >
      <div style={{
        width: '200px',
        borderRight: `1px solid ${designSystem.semantic.border.light}`,
        padding: designSystem.spacing[3],
        overflow: 'auto'
      }}>
        {/* 左侧工具栏 */}
        <h4>配置</h4>
        {/* ... */}
      </div>

      <div style={{
        flex: 1,
        padding: designSystem.spacing[5],
        overflow: 'auto'
      }}>
        {/* 主编辑区 */}
      </div>
    </Modal>
  );
}
```

---

## 方案五：轻量确认弹窗

### 适用场景
- 删除确认
- 操作确认
- 成功/失败提示
- 简单选择

### ASCII 示意图

#### 警告确认 (416px)
```
┌──────────────────────────────────────┐
│                                      │
│           ⚠️                         │ ← Icon (48px)
│                                      │
│       确认删除数据集？                │ ← Title (lg)
│                                      │
│   此操作不可撤销，数据集"知识图谱     │
│   Alpha"及其所有数据将被永久删除。   │ ← Content
│                                      │
│                                      │
│      [取消]        [确认删除]        │ ← Footer
│                                      │
└──────────────────────────────────────┘
     └─────────┬─────────┘
             416px
```

#### 成功提示 (360px)
```
┌────────────────────────────────┐
│                                │
│          ✓                     │
│                                │
│       操作成功                  │
│                                │
│    数据集已成功创建             │
│                                │
│          [确定]                │
│                                │
└────────────────────────────────┘
     └────────┬────────┘
            360px
```

#### 选择确认 (416px)
```
┌──────────────────────────────────────┐
│                 [×]                  │
│                                      │
│         保存更改？                    │
│                                      │
│   检测到未保存的更改，是否保存后     │
│   再退出？                           │
│                                      │
│  [放弃更改]  [取消]  [保存并退出]   │
│                                      │
└──────────────────────────────────────┘
```

### 设计规范

| 元素 | 规格 | 说明 |
|------|------|------|
| **宽度** | 360px / 416px | 紧凑 |
| **内边距** | 24px | spacing[5] |
| **图标大小** | 48px | 醒目 |
| **标题字号** | 20px | fontSize.lg |
| **文字居中** | 是 | 增强视觉聚焦 |
| **按钮尺寸** | 40px 高度 | heights.buttonLg |
| **按钮样式** | 危险操作用 danger | 避免误操作 |

### 使用示例

```tsx
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 删除确认
function showDeleteConfirm(datasetName: string, onConfirm: () => void) {
  Modal.confirm({
    title: '确认删除数据集？',
    icon: <ExclamationCircleOutlined style={{ color: '#F59E0B' }} />,
    content: `此操作不可撤销，数据集"${datasetName}"及其所有数据将被永久删除。`,
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    width: 416,
    centered: true,
    onOk: onConfirm,
  });
}

// 成功提示
function showSuccessModal(message: string) {
  Modal.success({
    title: '操作成功',
    content: message,
    width: 360,
    centered: true,
  });
}

// 三按钮选择
function showSaveConfirm(onSave: () => void, onDiscard: () => void) {
  Modal.confirm({
    title: '保存更改？',
    content: '检测到未保存的更改，是否保存后再退出？',
    width: 416,
    centered: true,
    okText: '保存并退出',
    cancelText: '取消',
    onOk: onSave,
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <Button onClick={onDiscard}>放弃更改</Button>
        <CancelBtn />
        <OkBtn />
      </>
    ),
  });
}
```

---

## 尺寸规范总结

### 弹窗宽度体系

| 尺寸 | 宽度 | 适用场景 |
|------|------|----------|
| **xs** | 360px | 成功/失败提示 |
| **sm** | 416px | 确认对话框 |
| **md** | 480px | 简单表单 |
| **lg** | 720px | 标准表单、详情 |
| **xl** | 960px | 复杂表单、配置 |
| **Drawer 标准** | 480px | 详情查看 |
| **Drawer 宽屏** | 720px | 编辑表单 |
| **全屏** | 100vw | 编辑器、工作台 |

### 垂直高度限制

```
Content 最大高度计算:

标准弹窗: min(60vh, 内容自适应)
向导弹窗: min(50vh, 内容自适应)  // 留给步骤条
全屏弹窗: 100vh - 56px (Header)
```

### 间距系统（复用设计系统）

| 位置 | 间距 | Token |
|------|------|-------|
| **Header Padding** | 24px | spacing[5] |
| **Content Padding** | 24px | spacing[5] |
| **Footer Padding** | 16px | spacing[3] |
| **按钮间距** | 12px | spacing[2] |
| **表单项间距** | 16px | Form 默认 |
| **卡片间距** | 12px | spacing[2] |

### 颜色使用规范

```typescript
// 遮罩层
background: 'rgba(0, 0, 0, 0.4)'  // semantic.surface.overlay

// 分隔线
borderColor: colors.neutral[100]   // semantic.border.light

// 危险操作按钮
color: colors.error               // #EF4444

// 标题文字
color: colors.neutral[900]        // semantic.text.primary
```

---

## 设计建议

### 1. 选择合适的弹窗类型

```
简单确认 → 轻量确认弹窗 (方案五)
表单填写 → 标准三段式 (方案一) 或 Drawer (方案二)
查看详情 → Drawer (方案二)
多步操作 → 分步向导 (方案三)
复杂编辑 → 全屏工作台 (方案四)
```

### 2. 响应式适配

```typescript
// 移动端自动调整
const modalWidth = useMediaQuery('(min-width: 768px)') ? 720 : '100vw';
```

### 3. 无障碍支持

- 使用 `aria-label` 标注弹窗用途
- 确保键盘可操作（ESC 关闭、Tab 切换）
- 聚焦管理：打开时聚焦第一个输入框
- 提供明确的确认/取消按钮

### 4. 性能优化

- 延迟加载弹窗内容（`destroyOnClose`）
- 大列表使用虚拟滚动
- 避免在弹窗内放置大量 DOM 节点

### 5. 用户体验

- **关闭方式多样化**：点击遮罩、ESC、关闭按钮
- **防止误操作**：危险操作二次确认、loading 状态
- **保存状态**：表单草稿保存、未保存提示
- **动画流畅**：使用 designSystem.transitions
- **移动端友好**：小屏自动全屏或底部弹出

---

## 实现检查清单

### 标准三段式弹窗
- [ ] 小中大三种尺寸
- [ ] Header/Content/Footer 结构清晰
- [ ] Content 区域可滚动
- [ ] 按钮布局合理
- [ ] 表单验证完整

### Drawer 侧边栏
- [ ] 从右侧滑入动画
- [ ] 遮罩层可关闭
- [ ] 宽度两档可选
- [ ] 支持 Footer 区域
- [ ] 适配移动端

### 分步向导
- [ ] 步骤条清晰
- [ ] 前进后退逻辑完善
- [ ] 每步独立验证
- [ ] 最后一步确认
- [ ] 支持跳过某些步骤

### 全屏工作台
- [ ] Header 包含返回按钮
- [ ] 左侧工具栏可折叠
- [ ] 主区域充分利用空间
- [ ] 保存/发布等操作明确
- [ ] 未保存提示

### 轻量确认
- [ ] 图标醒目
- [ ] 文字简洁清晰
- [ ] 按钮类型正确（danger/primary）
- [ ] 居中显示
- [ ] 支持键盘操作

---

## 总结

本方案提供了 5 种弹窗设计方案，覆盖 90% 的业务场景：

1. **标准三段式**：通用性强，适合大部分表单和详情
2. **Drawer 侧边栏**：轻量级，不强打断，适合查看和编辑
3. **分步向导**：引导性强，适合复杂多步流程
4. **全屏工作台**：空间充足，适合编辑器和配置页
5. **轻量确认**：快速决策，适合确认和提示

所有方案均遵循项目的设计系统，确保视觉一致性和代码复用性。建议根据实际场景选择合适的方案，并在使用过程中不断优化细节。
