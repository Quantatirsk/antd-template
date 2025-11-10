/**
 * 仪表板模板
 *
 * 功能：
 * - 统计卡片
 * - 图表展示（使用伪代码/占位符）
 * - 最近活动
 * - 快捷操作
 */

import { Card, Row, Col, Statistic, Progress, List, Tag, Button, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DatabaseOutlined, FileTextOutlined, ClockCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
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
  const getActivityIcon = (type: string) => {
    const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
      create: { icon: <PlusOutlined />, color: 'green' },
      update: { icon: <FileTextOutlined />, color: 'blue' },
      delete: { icon: <DatabaseOutlined />, color: 'red' },
      view: { icon: <EyeOutlined />, color: 'gray' },
    };
    return iconMap[type] || iconMap.view;
  };

  return (
    <div style={{
      padding: designSystem.spacing[6],
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100%',
      background: designSystem.semantic.surface.base,
    }}>
      {/* 标题 */}
      <h1 style={{ fontSize: designSystem.typography.fontSize['3xl'], fontWeight: designSystem.typography.fontWeight.bold, marginBottom: designSystem.spacing[6] }}>
        仪表板
      </h1>

      {/* 统计卡片 */}
      <Row gutter={[designSystem.gridGutter.default, designSystem.gridGutter.default]} style={{ marginBottom: designSystem.spacing[6] }}>
        {mockStats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: designSystem.colors.primary[500] }}
              />
              {stat.trend && (
                <div style={{ marginTop: designSystem.spacing[2], fontSize: designSystem.typography.fontSize.sm }}>
                  <Space>
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

      {/* 图表区域 */}
      <Row gutter={[designSystem.gridGutter.default, designSystem.gridGutter.default]} style={{ marginBottom: designSystem.spacing[6] }}>
        {/* 趋势图 */}
        <Col xs={24} lg={16}>
          <Card title="查询趋势" extra={<Button type="link">查看更多</Button>}>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: designSystem.spacing[4] }}>
              {mockChartData.trend.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                  <div
                    style={{
                      height: `${(item.value / 1500) * parseInt(designSystem.avatarSizes.xl) * 4}px`,
                      background: `linear-gradient(to top, ${designSystem.colors.primary[500]}, ${designSystem.colors.primary[300]})`,
                      borderRadius: designSystem.borderRadius.sm,
                      marginBottom: designSystem.spacing[2],
                      transition: 'height 0.3s',
                    }}
                  />
                  <div style={{ fontSize: designSystem.typography.fontSize.xs, color: designSystem.semantic.text.tertiary }}>
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 分布图 */}
        <Col xs={24} lg={8}>
          <Card title="数据集分布" extra={<Button type="link">查看更多</Button>}>
            <div style={{ padding: designSystem.spacing[4] }}>
              {mockChartData.distribution.map((item, index) => (
                <div key={index} style={{ marginBottom: designSystem.spacing[3] }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: designSystem.spacing[1] }}>
                    <span style={{ fontSize: designSystem.typography.fontSize.sm }}>{item.type}</span>
                    <span style={{ fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold }}>
                      {item.value}
                    </span>
                  </div>
                  <Progress
                    percent={(item.value / mockChartData.distribution.reduce((sum, d) => sum + d.value, 0)) * 100}
                    showInfo={false}
                    strokeColor={designSystem.colors.primary[500]}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近活动 + 快捷操作 */}
      <Row gutter={[designSystem.gridGutter.default, designSystem.gridGutter.default]}>
        {/* 最近活动 */}
        <Col xs={24} lg={16}>
          <Card title="最近活动" extra={<Button type="link">查看全部</Button>}>
            <List
              dataSource={mockActivities}
              renderItem={(item) => {
                const { icon, color } = getActivityIcon(item.type);
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div
                          style={{
                            width: designSystem.avatarSizes.md,
                            height: designSystem.avatarSizes.md,
                            borderRadius: '50%',
                            background: `${color}${Math.round(designSystem.opacity.hover * 255).toString(16).padStart(2, '0')}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color,
                          }}
                        >
                          {icon}
                        </div>
                      }
                      title={
                        <div>
                          <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>{item.user}</span>
                          {' '}
                          <span style={{ color: designSystem.semantic.text.secondary }}>{item.title}</span>
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', alignItems: 'center', gap: designSystem.spacing[2], marginTop: designSystem.spacing[1] }}>
                          <span style={{ color: designSystem.semantic.text.primary }}>{item.description}</span>
                          <Tag icon={<ClockCircleOutlined />} color="default">{item.time}</Tag>
                        </div>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>

        {/* 快捷操作 */}
        <Col xs={24} lg={8}>
          <Card title="快捷操作">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Button type="primary" block icon={<PlusOutlined />} size="large">
                创建数据集
              </Button>
              <Button block icon={<DatabaseOutlined />} size="large">
                导入数据
              </Button>
              <Button block icon={<FileTextOutlined />} size="large">
                查看文档
              </Button>
              <Button block icon={<UserOutlined />} size="large">
                管理用户
              </Button>
            </Space>
          </Card>

          {/* 系统状态 */}
          <Card title="系统状态" style={{ marginTop: designSystem.spacing[4] }}>
            <div style={{ marginBottom: designSystem.spacing[3] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: designSystem.spacing[1] }}>
                <span>CPU 使用率</span>
                <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>45%</span>
              </div>
              <Progress percent={45} strokeColor={designSystem.colors.success} />
            </div>
            <div style={{ marginBottom: designSystem.spacing[3] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: designSystem.spacing[1] }}>
                <span>内存使用率</span>
                <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>72%</span>
              </div>
              <Progress percent={72} strokeColor={designSystem.colors.warning} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: designSystem.spacing[1] }}>
                <span>存储使用率</span>
                <span style={{ fontWeight: designSystem.typography.fontWeight.semibold }}>58%</span>
              </div>
              <Progress percent={58} strokeColor={designSystem.colors.info} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
