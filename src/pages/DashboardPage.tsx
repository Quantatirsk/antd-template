/**
 * 仪表板 - 大屏展示模式
 *
 * 功能：
 * - 统计卡片
 * - 图表展示（使用伪代码/占位符）
 * - 最近活动
 * - 系统状态监控
 */

import { useState } from 'react';
import { Card, Row, Col, Statistic, Progress, List, Tag, Button, Space, Select, DatePicker, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DatabaseOutlined, FileTextOutlined, ClockCircleOutlined, PlusOutlined, EyeOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons';
import DisplayLayout from '@/layout/DisplayLayout';
import { designSystem } from '@/styles';

// ==================== 类型定义 ====================

interface StatData {
  title: string;
  value: number;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: {
    value: number;
    isIncrease: boolean;
  };
}

interface ActivityItem {
  id: string;
  type: 'create' | 'update' | 'delete' | 'view';
  title: string;
  description: string;
  time: string;
  user: string;
}

// ==================== Mock 数据 ====================

const mockStats: StatData[] = [
  {
    title: '总数据集',
    value: 128,
    prefix: <DatabaseOutlined />,
    suffix: '个',
    trend: { value: 12, isIncrease: true },
  },
  {
    title: '总节点数',
    value: 1250000,
    prefix: <FileTextOutlined />,
    suffix: '',
    trend: { value: 8.5, isIncrease: true },
  },
  {
    title: '总用户数',
    value: 45,
    prefix: <UserOutlined />,
    suffix: '人',
    trend: { value: 3, isIncrease: false },
  },
  {
    title: '今日查询',
    value: 2340,
    prefix: <EyeOutlined />,
    suffix: '次',
    trend: { value: 15.2, isIncrease: true },
  },
];

const mockActivities: ActivityItem[] = [
  { id: '1', type: 'create', title: '创建了数据集', description: '知识图谱 Alpha', time: '5 分钟前', user: '张三' },
  { id: '2', type: 'update', title: '更新了数据集', description: '企业数据 Beta', time: '15 分钟前', user: '李四' },
  { id: '3', type: 'view', title: '查看了数据集', description: '产品知识库', time: '30 分钟前', user: '王五' },
  { id: '4', type: 'delete', title: '删除了数据集', description: '测试数据 Demo', time: '1 小时前', user: '赵六' },
  { id: '5', type: 'create', title: '创建了数据集', description: '客户关系图谱', time: '2 小时前', user: '张三' },
];

const mockChartData = {
  trend: [
    { date: '01-15', value: 850 },
    { date: '01-16', value: 920 },
    { date: '01-17', value: 1100 },
    { date: '01-18', value: 980 },
    { date: '01-19', value: 1250 },
    { date: '01-20', value: 1350 },
    { date: '01-21', value: 1450 },
  ],
  distribution: [
    { type: '知识图谱', value: 45 },
    { type: '企业数据', value: 30 },
    { type: '产品数据', value: 25 },
    { type: '客户数据', value: 15 },
    { type: '其他', value: 13 },
  ],
};

// ==================== 主组件 ====================

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState('7d');

  const getActivityIcon = (type: string) => {
    const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
      create: { icon: <PlusOutlined />, color: 'green' },
      update: { icon: <FileTextOutlined />, color: 'blue' },
      delete: { icon: <DatabaseOutlined />, color: 'red' },
      view: { icon: <EyeOutlined />, color: 'gray' },
    };
    return iconMap[type] || iconMap.view;
  };

  // ==================== 顶部工具栏（整合系统状态）====================
  const topBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: designSystem.spacing[2],
      width: '100%',
    }}>
      {/* 左侧：时间筛选 */}
      <Space size={parseInt(designSystem.spacing[1])}>
        <Select
          value={timePeriod}
          onChange={setTimePeriod}
          style={{ width: designSystem.inputWidths.select }}
          options={[
            { label: '今天', value: '1d' },
            { label: '最近 7 天', value: '7d' },
            { label: '最近 30 天', value: '30d' },
            { label: '最近 90 天', value: '90d' },
          ]}
        />
        <DatePicker.RangePicker style={{ width: 280 }} />
      </Space>

      {/* 中间：系统状态指示器 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: designSystem.spacing[3] }}>
        <Tooltip title="CPU 使用率">
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[0.5] }}>
            <span style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.tertiary }}>CPU</span>
            <Progress
              type="circle"
              percent={45}
              size={32}
              strokeColor={designSystem.colors.success}
              format={(percent) => <span style={{ fontSize: designSystem.typography.fontSize.xs }}>{percent}%</span>}
            />
          </div>
        </Tooltip>
        <Tooltip title="内存使用率">
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[0.5] }}>
            <span style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.tertiary }}>内存</span>
            <Progress
              type="circle"
              percent={72}
              size={32}
              strokeColor={designSystem.colors.warning}
              format={(percent) => <span style={{ fontSize: designSystem.typography.fontSize.xs }}>{percent}%</span>}
            />
          </div>
        </Tooltip>
        <Tooltip title="存储使用率">
          <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[0.5] }}>
            <span style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.tertiary }}>存储</span>
            <Progress
              type="circle"
              percent={58}
              size={32}
              strokeColor={designSystem.colors.info}
              format={(percent) => <span style={{ fontSize: designSystem.typography.fontSize.xs }}>{percent}%</span>}
            />
          </div>
        </Tooltip>
      </div>

      {/* 右侧：操作按钮 */}
      <Space size={parseInt(designSystem.spacing[1])}>
        <Button icon={<ReloadOutlined />}>刷新</Button>
        <Button icon={<DownloadOutlined />}>导出</Button>
        <Button type="primary" icon={<PlusOutlined />}>创建</Button>
      </Space>
    </div>
  );

  // ==================== 主内容区 ====================
  const mainContent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: designSystem.spacing[2],
    }}>
      {/* 统计卡片 */}
      <Row gutter={[parseInt(designSystem.spacing[2]), parseInt(designSystem.spacing[2])]}>
        {mockStats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg, boxShadow: designSystem.shadows.sm }}>
              <Statistic
                title={<span style={{ fontSize: designSystem.typography.fontSize.sm }}>{stat.title}</span>}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: designSystem.colors.primary[500], fontSize: designSystem.typography.fontSize.xl }}
              />
              {stat.trend && (
                <div style={{ marginTop: designSystem.spacing[1], fontSize: designSystem.typography.fontSize.xs }}>
                  <Space size={parseInt(designSystem.spacing[0.5])}>
                    {stat.trend.isIncrease ? (
                      <ArrowUpOutlined style={{ color: designSystem.colors.success }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: designSystem.colors.error }} />
                    )}
                    <span style={{ color: stat.trend.isIncrease ? designSystem.colors.success : designSystem.colors.error }}>
                      {stat.trend.value}%
                    </span>
                    <span style={{ color: designSystem.semantic.text.tertiary }}>
                      vs 上周
                    </span>
                  </Space>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* 今日概览卡片 */}
      <Row gutter={[parseInt(designSystem.spacing[2]), parseInt(designSystem.spacing[2])]}>
        <Col xs={24}>
          <Card
            size="small"
            title={<span style={{ fontSize: designSystem.typography.fontSize.md, fontWeight: designSystem.typography.fontWeight.semibold }}>今日概览</span>}
            style={{ borderRadius: designSystem.borderRadius.lg, boxShadow: designSystem.shadows.sm }}
          >
            <Row gutter={[parseInt(designSystem.spacing[5]), parseInt(designSystem.spacing[2])]}>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.primary[500] }}>
                    2,340
                  </div>
                  <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary, marginTop: designSystem.spacing[0.5] }}>
                    查询次数
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.success }}>
                    32
                  </div>
                  <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary, marginTop: designSystem.spacing[0.5] }}>
                    活跃用户
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: designSystem.typography.fontSize['2xl'], fontWeight: designSystem.typography.fontWeight.bold, color: designSystem.colors.info }}>
                    15
                  </div>
                  <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary, marginTop: designSystem.spacing[0.5] }}>
                    数据更新
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[parseInt(designSystem.spacing[2]), parseInt(designSystem.spacing[2])]}>
        {/* 趋势图 */}
        <Col xs={24} lg={16}>
          <Card
            size="small"
            title={<span style={{ fontSize: designSystem.typography.fontSize.md, fontWeight: designSystem.typography.fontWeight.semibold }}>查询趋势</span>}
            extra={<Button type="link" size="small">查看更多</Button>}
            style={{ borderRadius: designSystem.borderRadius.lg, boxShadow: designSystem.shadows.sm }}
          >
            <div style={{ height: '280px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: designSystem.spacing[2] }}>
              {mockChartData.trend.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                  <div
                    style={{
                      height: `${(item.value / 1500) * 200}px`,
                      background: `linear-gradient(to top, ${designSystem.colors.primary[500]}, ${designSystem.colors.primary[300]})`,
                      borderRadius: designSystem.borderRadius.md,
                      marginBottom: designSystem.spacing[1],
                      transition: 'height 0.3s',
                    }}
                  />
                  <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.tertiary }}>
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 分布图 */}
        <Col xs={24} lg={8}>
          <Card
            size="small"
            title={<span style={{ fontSize: designSystem.typography.fontSize.md, fontWeight: designSystem.typography.fontWeight.semibold }}>数据集分布</span>}
            extra={<Button type="link" size="small">查看更多</Button>}
            style={{ borderRadius: designSystem.borderRadius.lg, boxShadow: designSystem.shadows.sm }}
          >
            <div style={{ padding: designSystem.spacing[2] }}>
              {mockChartData.distribution.map((item, index) => (
                <div key={index} style={{ marginBottom: designSystem.spacing[2] }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: designSystem.spacing[0.5], fontSize: designSystem.typography.fontSize.sm }}>
                    <span>{item.type}</span>
                    <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>
                      {item.value}
                    </span>
                  </div>
                  <Progress
                    percent={(item.value / mockChartData.distribution.reduce((sum, d) => sum + d.value, 0)) * 100}
                    showInfo={false}
                    strokeColor={designSystem.colors.primary[500]}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近活动 */}
      <Row gutter={[parseInt(designSystem.spacing[2]), parseInt(designSystem.spacing[2])]}>
        <Col xs={24}>
          <Card
            size="small"
            title={<span style={{ fontSize: designSystem.typography.fontSize.md, fontWeight: designSystem.typography.fontWeight.semibold }}>最近活动</span>}
            extra={<Button type="link" size="small">查看全部</Button>}
            style={{ borderRadius: designSystem.borderRadius.lg, boxShadow: designSystem.shadows.sm }}
          >
            <List
              size="small"
              dataSource={mockActivities}
              renderItem={(item) => {
                const { icon, color } = getActivityIcon(item.type);
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div
                          style={{
                            width: designSystem.avatarSizes.sm,
                            height: designSystem.avatarSizes.sm,
                            borderRadius: '50%',
                            background: `${color}${Math.round(designSystem.opacity.hover * 255).toString(16).padStart(2, '0')}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color,
                            fontSize: designSystem.typography.fontSize.xs,
                          }}
                        >
                          {icon}
                        </div>
                      }
                      title={
                        <div style={{ fontSize: designSystem.typography.fontSize.sm }}>
                          <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>{item.user}</span>
                          {' '}
                          <span style={{ color: designSystem.semantic.text.secondary }}>{item.title}</span>
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[1], marginTop: designSystem.spacing[0.5], fontSize: designSystem.typography.fontSize.xs }}>
                          <span style={{ color: designSystem.semantic.text.primary }}>{item.description}</span>
                          <Tag icon={<ClockCircleOutlined />} color="default" style={{ fontSize: designSystem.typography.fontSize.xs }}>
                            {item.time}
                          </Tag>
                        </div>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <DisplayLayout
      topBar={topBar}
      contentPadding={designSystem.spacing[3]}
      backgroundColor={designSystem.semantic.surface.background}
    >
      {mainContent}
    </DisplayLayout>
  );
}
