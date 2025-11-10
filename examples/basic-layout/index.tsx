/**
 * 基础三栏布局示例
 *
 * 演示 ThreeColumnLayout 的基本使用
 */

import { useState } from 'react';
import { Input, Select, Button, List, Card, Checkbox } from 'antd';
import { SearchOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import ThreeColumnLayout from '../../src/components/layout/ThreeColumnLayout';
import { designSystem } from '../../src/styles';

export default function BasicLayoutExample() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 顶部工具栏
  const topBar = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: designSystem.spacing[3],
        padding: `0 ${designSystem.spacing[4]}`,
        height: '100%',
      }}
    >
      {/* 左侧主要操作 */}
      <Input.Search
        placeholder="搜索..."
        style={{ width: 240 }}
        prefix={<SearchOutlined />}
      />
      <Select
        style={{ width: 120 }}
        placeholder="筛选"
        options={[
          { label: '全部', value: 'all' },
          { label: '活跃', value: 'active' },
        ]}
      />

      {/* 占位 */}
      <div style={{ flex: 1 }} />

      {/* 右侧次要操作 */}
      <Button icon={<ExportOutlined />}>导出</Button>
      <Button type="primary" icon={<PlusOutlined />}>
        新建
      </Button>
    </div>
  );

  // 左侧控制面板
  const leftSidebar = (
    <div style={{ padding: designSystem.spacing[4] }}>
      <div style={{ marginBottom: designSystem.spacing[6] }}>
        <h3 style={{ marginBottom: designSystem.spacing[2] }}>分类</h3>
        <Checkbox.Group
          options={[
            { label: '类型 A', value: 'a' },
            { label: '类型 B', value: 'b' },
            { label: '类型 C', value: 'c' },
          ]}
          style={{ display: 'flex', flexDirection: 'column' }}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: designSystem.spacing[2] }}>统计</h3>
        <div>总数: 100</div>
        <div>活跃: 80</div>
      </div>
    </div>
  );

  // 右侧详情面板
  const rightSidebar = (
    <div style={{ padding: designSystem.spacing[4] }}>
      {selectedItem ? (
        <>
          <Card size="small" title="详情" style={{ marginBottom: designSystem.spacing[4] }}>
            <div><strong>名称:</strong> {selectedItem.name}</div>
            <div><strong>状态:</strong> {selectedItem.status}</div>
          </Card>

          <Card size="small" title="操作">
            <Button block onClick={() => alert('编辑')}>编辑</Button>
            <Button block danger onClick={() => alert('删除')} style={{ marginTop: designSystem.spacing[2] }}>
              删除
            </Button>
          </Card>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: designSystem.spacing[6], color: designSystem.semantic.text.tertiary }}>
          点击列表项查看详情
        </div>
      )}
    </div>
  );

  // 底部状态栏
  const bottomBar = (
    <>
      <span>总数: 100</span>
      <span style={{ marginLeft: designSystem.spacing[4] }}>选中: {selectedItem ? 1 : 0}</span>
    </>
  );

  // 模拟数据
  const data = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    name: `项目 ${i + 1}`,
    status: i % 2 === 0 ? '活跃' : '归档',
  }));

  return (
    <div style={{ height: '100vh' }}>
      <ThreeColumnLayout
        topBar={topBar}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        bottomBar={bottomBar}
      >
        {/* 主内容区 */}
        <div style={{ flex: 1, overflow: 'auto', padding: designSystem.spacing[4] }}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedItem(item)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedItem?.id === item.id ? designSystem.semantic.surface.tertiary : 'transparent',
                }}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`状态: ${item.status}`}
                />
              </List.Item>
            )}
          />
        </div>
      </ThreeColumnLayout>
    </div>
  );
}
