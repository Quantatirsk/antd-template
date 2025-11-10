/**
 * 列表页模板
 *
 * 功能：
 * - 搜索/筛选
 * - 列表展示（卡片/表格切换）
 * - 分页
 * - 批量操作
 * - 新建/编辑/删除
 */

import { useState, useMemo } from 'react';
import { Input, Select, Button, Table, Card, Tag, Space, Modal, Form, message, Radio, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExportOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import { LoadingState, EmptyState } from '@/components/Common';
import { designSystem } from '@/styles';
import type { ColumnsType } from 'antd/es/table';

// ==================== 类型定义 ====================

interface DataItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  type: 'typeA' | 'typeB' | 'typeC';
  createdAt: string;
  updatedAt: string;
  nodeCount?: number;
  edgeCount?: number;
}

// ==================== Mock 数据 ====================

const mockData: DataItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `数据集 ${i + 1}`,
  description: `这是数据集 ${i + 1} 的描述信息`,
  status: ['active', 'archived', 'draft'][i % 3] as any,
  type: ['typeA', 'typeB', 'typeC'][i % 3] as any,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
  nodeCount: Math.floor(Math.random() * 10000),
  edgeCount: Math.floor(Math.random() * 50000),
}));

// ==================== 主组件 ====================

export default function ListPage() {
  // ==================== 状态管理 ====================
  const [loading] = useState(false);
  const [data, setData] = useState<DataItem[]>(mockData);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 筛选条件
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  // UI 状态
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ==================== 筛选逻辑 ====================
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 搜索文本
      const matchSearch = searchText === '' ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());

      // 状态筛选
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;

      // 类型筛选
      const matchType = typeFilter.length === 0 || typeFilter.includes(item.type);

      return matchSearch && matchStatus && matchType;
    });
  }, [data, searchText, statusFilter, typeFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  // ==================== 操作函数 ====================
  const handleCreate = (values: any) => {
    console.log('创建:', values);
    message.success('创建成功');
    setCreateModalOpen(false);
    // 实际项目中调用 API
  };

  const handleEdit = (item: DataItem) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleUpdate = (values: any) => {
    console.log('更新:', selectedItem?.id, values);
    message.success('更新成功');
    setEditModalOpen(false);
    // 实际项目中调用 API
  };

  const handleDelete = (item: DataItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 "${item.name}" 吗？此操作不可撤销。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('删除:', item.id);
        setData(prev => prev.filter(d => d.id !== item.id));
        message.success('删除成功');
        // 实际项目中调用 API
      },
    });
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedKeys.length} 项吗？此操作不可撤销。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('批量删除:', selectedKeys);
        setData(prev => prev.filter(d => !selectedKeys.includes(d.id)));
        setSelectedKeys([]);
        message.success('删除成功');
        // 实际项目中调用 API
      },
    });
  };

  const handleExport = () => {
    console.log('导出:', filteredData);
    message.success('导出成功');
    // 实际项目中调用导出 API
  };

  // ==================== 表格列定义 ====================
  const columns: ColumnsType<DataItem> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 200,
      render: (text, record) => (
        <a onClick={() => { setSelectedItem(record); }}>{text}</a>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = { active: 'green', archived: 'gray', draft: 'orange' };
        const textMap: Record<string, string> = { active: '活跃', archived: '归档', draft: '草稿' };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const textMap: Record<string, string> = { typeA: '类型A', typeB: '类型B', typeC: '类型C' };
        return textMap[type];
      },
    },
    {
      title: '节点数',
      dataIndex: 'nodeCount',
      key: 'nodeCount',
      width: 100,
      align: 'right',
      sorter: (a, b) => (a.nodeCount || 0) - (b.nodeCount || 0),
    },
    {
      title: '边数',
      dataIndex: 'edgeCount',
      key: 'edgeCount',
      width: 100,
      align: 'right',
      sorter: (a, b) => (a.edgeCount || 0) - (b.edgeCount || 0),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // ==================== 布局区域 ====================

  // 顶部工具栏
  const topBar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[3], padding: `0 ${designSystem.spacing[4]}`, height: '100%' }}>
      <Input.Search
        placeholder="搜索名称或描述..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 240 }}
        allowClear
      />
      <Select
        value={statusFilter}
        onChange={setStatusFilter}
        style={{ width: 120 }}
        options={[
          { label: '全部状态', value: 'all' },
          { label: '活跃', value: 'active' },
          { label: '归档', value: 'archived' },
          { label: '草稿', value: 'draft' },
        ]}
      />

      <div style={{ flex: 1 }} />

      {/* 批量操作 */}
      {selectedKeys.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[2] }}>
          <span style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>
            已选中 {selectedKeys.length} 项
          </span>
          <Button size="small" danger onClick={handleBatchDelete}>批量删除</Button>
          <Button size="small" onClick={() => setSelectedKeys([])}>取消选择</Button>
        </div>
      )}

      <Radio.Group value={viewMode} onChange={e => setViewMode(e.target.value)} size="small">
        <Radio.Button value="card"><AppstoreOutlined /></Radio.Button>
        <Radio.Button value="table"><UnorderedListOutlined /></Radio.Button>
      </Radio.Group>
      <Button icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
        新建
      </Button>
    </div>
  );

  // 左侧筛选面板
  const leftSidebar = (
    <div style={{ padding: designSystem.spacing[4] }}>
      {/* 类型筛选 */}
      <div style={{ marginBottom: designSystem.spacing[6] }}>
        <h3 style={{ fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[2] }}>
          类型
        </h3>
        <Checkbox.Group
          value={typeFilter}
          onChange={setTypeFilter as any}
          style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[2] }}
        >
          <Checkbox value="typeA">类型 A</Checkbox>
          <Checkbox value="typeB">类型 B</Checkbox>
          <Checkbox value="typeC">类型 C</Checkbox>
        </Checkbox.Group>
      </div>

      {/* 统计信息 */}
      <div>
        <h3 style={{ fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[2] }}>
          统计
        </h3>
        <div style={{ fontSize: designSystem.typography.fontSize.xs, color: designSystem.semantic.text.secondary }}>
          <div style={{ marginBottom: designSystem.spacing[1] }}>总数: {data.length}</div>
          <div style={{ marginBottom: designSystem.spacing[1] }}>活跃: {data.filter(d => d.status === 'active').length}</div>
          <div style={{ marginBottom: designSystem.spacing[1] }}>归档: {data.filter(d => d.status === 'archived').length}</div>
          <div>草稿: {data.filter(d => d.status === 'draft').length}</div>
        </div>
      </div>
    </div>
  );

  // 右侧详情面板
  const rightSidebar = (
    <div style={{ padding: designSystem.spacing[4] }}>
      {selectedItem ? (
        <>
          <Card size="small" title="详情" style={{ marginBottom: designSystem.spacing[4] }}>
            <div style={{ fontSize: designSystem.typography.fontSize.xs }}>
              <div style={{ marginBottom: designSystem.spacing[2] }}>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>名称:</div>
                <div style={{ color: designSystem.semantic.text.primary }}>{selectedItem.name}</div>
              </div>
              <div style={{ marginBottom: designSystem.spacing[2] }}>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>描述:</div>
                <div style={{ color: designSystem.semantic.text.primary }}>{selectedItem.description}</div>
              </div>
              <div style={{ marginBottom: designSystem.spacing[2] }}>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>状态:</div>
                <div><Tag color={selectedItem.status === 'active' ? 'green' : 'gray'}>{selectedItem.status}</Tag></div>
              </div>
              <div style={{ marginBottom: designSystem.spacing[2] }}>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>节点数:</div>
                <div style={{ color: designSystem.semantic.text.primary }}>{selectedItem.nodeCount?.toLocaleString()}</div>
              </div>
              <div style={{ marginBottom: designSystem.spacing[2] }}>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>边数:</div>
                <div style={{ color: designSystem.semantic.text.primary }}>{selectedItem.edgeCount?.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: designSystem.semantic.text.secondary, marginBottom: 2 }}>创建时间:</div>
                <div style={{ color: designSystem.semantic.text.primary }}>{new Date(selectedItem.createdAt).toLocaleString('zh-CN')}</div>
              </div>
            </div>
          </Card>

          <Card size="small" title="操作">
            <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[2] }}>
              <Button size="small" block onClick={() => handleEdit(selectedItem)}>编辑</Button>
              <Button size="small" block onClick={() => console.log('查看详情:', selectedItem.id)}>查看详情</Button>
              <Button size="small" block danger onClick={() => handleDelete(selectedItem)}>删除</Button>
            </div>
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
      <span>总数: {filteredData.length}</span>
      <span style={{ marginLeft: designSystem.spacing[4] }}>选中: {selectedKeys.length}</span>
      <span style={{ marginLeft: designSystem.spacing[4] }}>页码: {currentPage}/{Math.ceil(filteredData.length / pageSize)}</span>
    </>
  );

  // ==================== 渲染 ====================
  return (
    <>
      <ThreeColumnLayout
        topBar={topBar}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        bottomBar={bottomBar}
      >
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: designSystem.spacing[4] }}>
          {loading ? (
            <LoadingState mode="skeleton" rows={8} />
          ) : filteredData.length === 0 ? (
            <EmptyState
              type="general"
              description="暂无数据"
              action={{ text: '新建', onClick: () => setCreateModalOpen(true) }}
            />
          ) : viewMode === 'table' ? (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={paginatedData}
              pagination={{
                current: currentPage,
                pageSize,
                total: filteredData.length,
                onChange: setCurrentPage,
                showSizeChanger: false,
                showTotal: (total) => `共 ${total} 条`,
              }}
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: setSelectedKeys as any,
              }}
              scroll={{ x: 1200 }}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: designSystem.spacing[4] }}>
              {paginatedData.map(item => (
                <Card
                  key={item.id}
                  size="small"
                  title={item.name}
                  extra={<Tag color={item.status === 'active' ? 'green' : 'gray'}>{item.status}</Tag>}
                  onClick={() => setSelectedItem(item)}
                  style={{ cursor: 'pointer' }}
                  actions={[
                    <EditOutlined key="edit" onClick={(e) => { e.stopPropagation(); handleEdit(item); }} />,
                    <DeleteOutlined key="delete" onClick={(e) => { e.stopPropagation(); handleDelete(item); }} />,
                  ]}
                >
                  <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary, marginBottom: designSystem.spacing[2] }}>
                    {item.description}
                  </div>
                  <div style={{ fontSize: designSystem.typography.fontSize.xs, color: designSystem.semantic.text.tertiary }}>
                    节点: {item.nodeCount?.toLocaleString()} | 边: {item.edgeCount?.toLocaleString()}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ThreeColumnLayout>

      {/* 创建 Modal */}
      <Modal
        title="新建数据集"
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
            <Select options={[
              { label: '类型 A', value: 'typeA' },
              { label: '类型 B', value: 'typeB' },
              { label: '类型 C', value: 'typeC' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">创建</Button>
              <Button onClick={() => setCreateModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑 Modal */}
      <Modal
        title="编辑数据集"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleUpdate} initialValues={selectedItem || undefined}>
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
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button onClick={() => setEditModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
