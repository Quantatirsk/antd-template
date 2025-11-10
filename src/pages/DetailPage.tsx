/**
 * 详情页模板
 *
 * 功能：
 * - 详细信息展示
 * - Tabs 切换（基本信息、关联数据、操作历史）
 * - 编辑/删除操作
 * - 返回列表
 */

import { useState } from 'react';
import { Card, Descriptions, Tag, Button, Space, Tabs, Table, Timeline, Modal, Form, Input, Select, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { LoadingState } from '@/components/Common';
import { designSystem } from '@/styles';
import type { ColumnsType } from 'antd/es/table';

// ==================== 类型定义 ====================

interface DetailData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  type: 'typeA' | 'typeB' | 'typeC';
  nodeCount: number;
  edgeCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
}

interface RelatedItem {
  id: string;
  name: string;
  relationship: string;
  createdAt: string;
}

interface HistoryItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

// ==================== Mock 数据 ====================

const mockDetail: DetailData = {
  id: '1',
  name: '知识图谱数据集 Alpha',
  description: '这是一个包含丰富知识实体和关系的大规模图谱数据集，用于语义搜索和推理分析。',
  status: 'active',
  type: 'typeA',
  nodeCount: 12580,
  edgeCount: 45230,
  createdAt: '2024-01-15 10:30:00',
  updatedAt: '2024-03-20 14:20:00',
  createdBy: '张三',
  tags: ['知识图谱', '语义分析', '企业数据'],
};

const mockRelatedItems: RelatedItem[] = [
  { id: '1', name: '相关数据集 1', relationship: '派生自', createdAt: '2024-02-01' },
  { id: '2', name: '相关数据集 2', relationship: '引用', createdAt: '2024-02-15' },
  { id: '3', name: '相关数据集 3', relationship: '合并自', createdAt: '2024-03-01' },
];

const mockHistory: HistoryItem[] = [
  { id: '1', action: '创建数据集', user: '张三', timestamp: '2024-01-15 10:30', details: '初始化数据集' },
  { id: '2', action: '导入数据', user: '李四', timestamp: '2024-01-16 09:00', details: '导入 5000 个节点' },
  { id: '3', action: '更新配置', user: '王五', timestamp: '2024-02-01 14:20', details: '修改索引配置' },
  { id: '4', action: '发布', user: '张三', timestamp: '2024-02-10 11:00', details: '发布到生产环境' },
  { id: '5', action: '数据增量', user: '李四', timestamp: '2024-03-20 14:20', details: '新增 2000 个节点' },
];

// ==================== 主组件 ====================

export default function DetailPage() {
  const [loading] = useState(false);
  const [data, setData] = useState<DetailData>(mockDetail);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // ==================== 操作函数 ====================

  const handleBack = () => {
    console.log('返回列表');
    // 实际项目中使用 navigate(-1) 或 navigate('/list')
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleUpdate = (values: any) => {
    console.log('更新:', values);
    setData({ ...data, ...values });
    message.success('更新成功');
    setEditModalOpen(false);
    // 实际项目中调用 API
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 "${data.name}" 吗？此操作不可撤销。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('删除:', data.id);
        message.success('删除成功');
        handleBack();
        // 实际项目中调用 API
      },
    });
  };

  const handleExport = () => {
    console.log('导出:', data.id);
    message.success('导出成功');
    // 实际项目中调用导出 API
  };

  // ==================== 关联数据表格 ====================

  const relatedColumns: ColumnsType<RelatedItem> = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '关系', dataIndex: 'relationship', key: 'relationship' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link" size="small">查看</Button>,
    },
  ];

  // ==================== 渲染 ====================

  if (loading) {
    return <LoadingState mode="skeleton" rows={10} />;
  }

  return (
    <div style={{
      padding: designSystem.spacing[6],
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* 顶部操作栏 */}
      <div style={{ marginBottom: designSystem.spacing[6] }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>返回</Button>
          <Button icon={<EditOutlined />} onClick={handleEdit}>编辑</Button>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>导出</Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>删除</Button>
        </Space>
      </div>

      {/* 标题区 */}
      <div style={{ marginBottom: designSystem.spacing[6] }}>
        <h1 style={{ fontSize: designSystem.typography.fontSize['3xl'], fontWeight: designSystem.typography.fontWeight.bold, marginBottom: designSystem.spacing[2] }}>
          {data.name}
        </h1>
        <Space>
          <Tag color={data.status === 'active' ? 'green' : 'gray'}>
            {data.status === 'active' ? '活跃' : data.status === 'archived' ? '归档' : '草稿'}
          </Tag>
          {data.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </Space>
      </div>

      {/* Tabs 区域 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'basic',
            label: '基本信息',
            children: (
              <>
                {/* 描述 */}
                <Card size="small" title="描述" style={{ marginBottom: designSystem.spacing[4] }}>
                  <p style={{ color: designSystem.semantic.text.secondary }}>{data.description}</p>
                </Card>

                {/* 详细信息 */}
                <Card size="small" title="详细信息" style={{ marginBottom: designSystem.spacing[4] }}>
                  <Descriptions column={2} bordered size="small">
                    <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
                    <Descriptions.Item label="类型">
                      {data.type === 'typeA' ? '类型 A' : data.type === 'typeB' ? '类型 B' : '类型 C'}
                    </Descriptions.Item>
                    <Descriptions.Item label="节点数">{data.nodeCount.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="边数">{data.edgeCount.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{data.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="最后更新时间">{data.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="状态">
                      <Tag color={data.status === 'active' ? 'green' : 'gray'}>
                        {data.status === 'active' ? '活跃' : data.status === 'archived' ? '归档' : '草稿'}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* 统计信息 */}
                <Card size="small" title="统计信息">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: designSystem.spacing[4] }}>
                    <div>
                      <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.primary[500] }}>
                        {data.nodeCount.toLocaleString()}
                      </div>
                      <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
                        节点总数
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.success }}>
                        {data.edgeCount.toLocaleString()}
                      </div>
                      <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
                        边总数
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.info }}>
                        {(data.edgeCount / data.nodeCount).toFixed(2)}
                      </div>
                      <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
                        平均度数
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ),
          },
          {
            key: 'related',
            label: `关联数据 (${mockRelatedItems.length})`,
            children: (
              <Card size="small">
                <Table
                  size="small"
                  columns={relatedColumns}
                  dataSource={mockRelatedItems}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            ),
          },
          {
            key: 'history',
            label: `操作历史 (${mockHistory.length})`,
            children: (
              <Card size="small">
                <Timeline
                  items={mockHistory.map(item => ({
                    children: (
                      <div>
                        <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[1] }}>
                          {item.action}
                        </div>
                        <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary, marginBottom: designSystem.spacing[1] }}>
                          {item.details}
                        </div>
                        <div style={{ fontSize: designSystem.typography.fontSize.xs, color: designSystem.semantic.text.tertiary }}>
                          {item.user} · {item.timestamp}
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>
            ),
          },
        ]}
      />

      {/* 编辑 Modal */}
      <Modal
        title="编辑数据集"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical" onFinish={handleUpdate} initialValues={data}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
            <Select options={[
              { label: '活跃', value: 'active' },
              { label: '归档', value: 'archived' },
              { label: '草稿', value: 'draft' },
            ]} />
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="输入标签" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button onClick={() => setEditModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
