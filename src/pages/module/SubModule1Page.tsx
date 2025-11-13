/**
 * SubModule1Page - 数据管理子模块
 *
 * 演示：
 * - 子页面不使用 PageLayout
 * - 通过 store 更新状态触发右侧栏联动
 * - 导出独立的 Sidebar 组件
 */

import { useState } from 'react';
import { Card, Button, Table, Input, Space, Statistic, Empty, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useModuleStore } from '@/store/moduleStore';
import { designSystem } from '@/styles/DesignSystem';

// 模拟数据
interface DataItem {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  count: number;
}

const mockData: DataItem[] = [
  { id: 1, name: '数据集 A', category: '分类 1', status: 'active', count: 120 },
  { id: 2, name: '数据集 B', category: '分类 2', status: 'active', count: 85 },
  { id: 3, name: '数据集 C', category: '分类 1', status: 'inactive', count: 42 },
  { id: 4, name: '数据集 D', category: '分类 3', status: 'active', count: 200 },
];

// 右侧栏组件（独立导出）
export function SubModule1Sidebar() {
  const { selectedItemId } = useModuleStore();

  const selectedItem = mockData.find((item) => item.id === selectedItemId);

  if (!selectedItem) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[2] }}>
        <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
          <Statistic
            title="总数据集"
            value={mockData.length}
            prefix={<FileTextOutlined />}
          />
        </Card>
        <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
          <Statistic
            title="活跃数据集"
            value={mockData.filter((d) => d.status === 'active').length}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: designSystem.colors.success }}
          />
        </Card>
        <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请选择数据集查看详情"
            style={{ margin: 0 }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[2] }}>
      <Card
        title="数据集详情"
        size="small"
        style={{ borderRadius: designSystem.borderRadius.lg }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <div>
            <div style={{ color: designSystem.semantic.text.tertiary, fontSize: designSystem.typography.fontSize.xs }}>
              名称
            </div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.medium }}>
              {selectedItem.name}
            </div>
          </div>
          <div>
            <div style={{ color: designSystem.semantic.text.tertiary, fontSize: designSystem.typography.fontSize.xs }}>
              分类
            </div>
            <Tag color="blue">{selectedItem.category}</Tag>
          </div>
          <div>
            <div style={{ color: designSystem.semantic.text.tertiary, fontSize: designSystem.typography.fontSize.xs }}>
              状态
            </div>
            <Tag color={selectedItem.status === 'active' ? 'green' : 'default'}>
              {selectedItem.status === 'active' ? '活跃' : '不活跃'}
            </Tag>
          </div>
        </Space>
      </Card>
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <Statistic
          title="数据量"
          value={selectedItem.count}
          suffix="条"
        />
      </Card>
    </div>
  );
}

// 主页面组件
export default function SubModule1Page() {
  const { selectedItemId, selectItem } = useModuleStore();
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '活跃' : '不活跃'}
        </Tag>
      ),
    },
    {
      title: '数据量',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => `${count} 条`,
    },
  ];

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: designSystem.spacing[1],
      }}
    >
      {/* 顶部工具栏 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: designSystem.spacing[2],
          }}
        >
          <Input
            placeholder="搜索数据集..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ maxWidth: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            新建数据集
          </Button>
        </div>
      </Card>

      {/* 数据表格 */}
      <Card
        style={{
          flex: 1,
          borderRadius: designSystem.borderRadius.lg,
          overflow: 'hidden',
        }}
        styles={{
          body: {
            height: '100%',
            padding: 0,
          },
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ y: 'calc(100vh - 280px)' }}
          onRow={(record) => ({
            onClick: () => selectItem(record.id),
            style: {
              cursor: 'pointer',
              backgroundColor:
                selectedItemId === record.id
                  ? designSystem.colors.primary[50]
                  : undefined,
            },
          })}
        />
      </Card>
    </div>
  );
}
