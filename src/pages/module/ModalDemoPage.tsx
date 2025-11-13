/**
 * 弹窗布局组件演示页（子页面模式）
 */

import { useState } from 'react';
import { Button, Space, Modal, Drawer, Form, Input, Select, Checkbox, message, Card } from 'antd';
import { StandardModalLayout, DrawerLayout, WizardModalLayout } from '@/components/modal';
import { designSystem } from '@/styles';

/* ==================== Sidebar 组件（导出给容器页使用）==================== */

export function ModalDemoPageSidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing[1] }}>
      {/* 组件说明 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <h3 style={{ fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[2] }}>
          组件说明
        </h3>
        <Space direction="vertical" size={parseInt(designSystem.spacing[2])} style={{ width: '100%' }}>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>StandardModalLayout</div>
            <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>三段式布局：Header + Content + Footer</div>
          </div>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>DrawerLayout</div>
            <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>侧边栏布局：Header + Content + Footer</div>
          </div>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>WizardModalLayout</div>
            <div style={{ fontSize: designSystem.typography.fontSize.sm, color: designSystem.semantic.text.secondary }}>向导式布局：Steps + Content + Navigation</div>
          </div>
        </Space>
      </Card>

      {/* 使用建议 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <h3 style={{ fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[2] }}>
          使用建议
        </h3>
        <Space direction="vertical" size={parseInt(designSystem.spacing[2])} style={{ width: '100%', fontSize: designSystem.typography.fontSize.sm }}>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>表单场景</div>
            <div style={{ color: designSystem.semantic.text.secondary }}>使用 StandardModalLayout</div>
          </div>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>详情查看</div>
            <div style={{ color: designSystem.semantic.text.secondary }}>使用 DrawerLayout</div>
          </div>
          <div>
            <div style={{ fontWeight: designSystem.typography.fontWeight.semibold, marginBottom: designSystem.spacing[0.5] }}>多步骤流程</div>
            <div style={{ color: designSystem.semantic.text.secondary }}>使用 WizardModalLayout</div>
          </div>
        </Space>
      </Card>
    </div>
  );
}

/* ==================== 主组件 ==================== */

export default function ModalDemoPage() {
  const [standardOpen, setStandardOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [form] = Form.useForm();

  // StandardModalLayout 演示
  const renderStandardModal = () => (
    <Modal
      open={standardOpen}
      onCancel={() => setStandardOpen(false)}
      width={720}
      footer={null}
    >
      <StandardModalLayout
        title="创建数据集"
        footer={
          <>
            <Button onClick={() => setStandardOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => form.submit()}>确定</Button>
          </>
        }
      >
        <div style={{ padding: designSystem.spacing[1] }}>
          <Form form={form} layout="vertical" onFinish={(values) => {
            console.log(values);
            message.success('创建成功');
            setStandardOpen(false);
          }}>
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
        </div>
      </StandardModalLayout>
    </Modal>
  );

  // DrawerLayout 演示
  const renderDrawer = () => (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      width={480}
    >
      <DrawerLayout
        header={
          <Space>
            <Button type="primary">编辑</Button>
            <Button>导出</Button>
          </Space>
        }
        footer={
          <>
            <Button onClick={() => setDrawerOpen(false)}>关闭</Button>
            <Button type="primary">保存</Button>
          </>
        }
      >
        <div style={{ padding: designSystem.spacing[1] }}>
          <h3 style={{ marginTop: 0 }}>数据集详情</h3>
          <p><strong>名称：</strong>知识图谱 Alpha</p>
          <p><strong>类型：</strong>typeA</p>
          <p><strong>状态：</strong>激活</p>

          <h4 style={{ marginTop: designSystem.spacing[5] }}>统计数据</h4>
          <p><strong>节点数：</strong>12,580</p>
          <p><strong>边数：</strong>45,230</p>

          <h4 style={{ marginTop: designSystem.spacing[5] }}>元数据</h4>
          <p><strong>创建者：</strong>张三</p>
          <p><strong>创建于：</strong>2024-01-15</p>
          <p><strong>更新于：</strong>2024-03-20</p>
        </div>
      </DrawerLayout>
    </Drawer>
  );

  // WizardModalLayout 演示
  const renderWizardModal = () => {
    const wizardSteps = [
      {
        key: 'basic',
        title: '基本信息',
        description: '填写基本信息',
        content: (
          <div style={{ padding: designSystem.spacing[1] }}>
            <Form layout="vertical">
              <Form.Item label="数据集名称" name="name" rules={[{ required: true }]}>
                <Input placeholder="请输入名称" />
              </Form.Item>
              <Form.Item label="数据集类型" name="type" rules={[{ required: true }]}>
                <Select placeholder="选择类型">
                  <Select.Option value="typeA">类型 A</Select.Option>
                  <Select.Option value="typeB">类型 B</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        ),
      },
      {
        key: 'config',
        title: '数据配置',
        description: '配置数据源',
        content: (
          <div style={{ padding: designSystem.spacing[1] }}>
            <Form layout="vertical">
              <Form.Item name="autoIndex" valuePropName="checked">
                <Checkbox>启用自动索引</Checkbox>
              </Form.Item>
              <Form.Item name="fullText" valuePropName="checked">
                <Checkbox>启用全文搜索</Checkbox>
              </Form.Item>
              <Form.Item name="version" valuePropName="checked">
                <Checkbox>启用版本控制</Checkbox>
              </Form.Item>
            </Form>
          </div>
        ),
      },
      {
        key: 'permission',
        title: '权限设置',
        description: '配置访问权限',
        content: (
          <div style={{ padding: designSystem.spacing[1] }}>
            <Form layout="vertical">
              <Form.Item label="可见性" name="visibility">
                <Select defaultValue="private">
                  <Select.Option value="private">私有</Select.Option>
                  <Select.Option value="team">团队</Select.Option>
                  <Select.Option value="public">公开</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="allowEdit" valuePropName="checked">
                <Checkbox>允许团队成员编辑</Checkbox>
              </Form.Item>
            </Form>
          </div>
        ),
      },
      {
        key: 'confirm',
        title: '确认',
        description: '确认创建',
        content: (
          <div style={{ padding: designSystem.spacing[1] }}>
            <h3>请确认以下信息：</h3>
            <p>数据集名称：知识图谱 Alpha</p>
            <p>数据集类型：typeA</p>
            <p>启用自动索引：是</p>
            <p>可见性：私有</p>
          </div>
        ),
      },
    ];

    return (
      <Modal
        open={wizardOpen}
        onCancel={() => setWizardOpen(false)}
        width={960}  // 向导式弹窗使用大尺寸
        footer={null}
      >
        <WizardModalLayout
          title="创建数据集向导"
          steps={wizardSteps}
          onCancel={() => setWizardOpen(false)}
          onFinish={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('创建成功');
            setWizardOpen(false);
          }}
          onStepValidate={async () => {
            // 模拟验证
            await new Promise(resolve => setTimeout(resolve, 500));
            return true;
          }}
        />
      </Modal>
    );
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: designSystem.spacing[1],
    }}>
      {/* 顶部标题卡片 */}
      <Card size="small" style={{ borderRadius: designSystem.borderRadius.lg }}>
        <div style={{ padding: designSystem.spacing[1], fontSize: designSystem.typography.fontSize.sm, fontWeight: designSystem.typography.fontWeight.semibold }}>
          弹窗布局组件演示
        </div>
      </Card>

      {/* 主内容区 - 可滚动 */}
      <Card
        size="small"
        style={{
          flex: 1,
          borderRadius: designSystem.borderRadius.lg,
          minHeight: 0,
        }}
        styles={{ body: { padding: designSystem.spacing[1], overflow: 'auto', height: '100%' } }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designSystem.spacing[2],
        }}>
          <Card title="弹窗布局组件演示" style={{ marginBottom: designSystem.spacing[2] }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <h3>StandardModalLayout - 标准三段式弹窗</h3>
                <p>适用场景：表单填写、数据查看、设置配置</p>
                <Button type="primary" onClick={() => setStandardOpen(true)}>
                  打开标准弹窗
                </Button>
              </div>

              <div>
                <h3>DrawerLayout - 侧边栏弹窗</h3>
                <p>适用场景：详情查看、表单填写、过滤器面板</p>
                <Button type="primary" onClick={() => setDrawerOpen(true)}>
                  打开侧边栏
                </Button>
              </div>

              <div>
                <h3>WizardModalLayout - 向导式弹窗</h3>
                <p>适用场景：多步骤表单、引导流程、复杂配置</p>
                <Button type="primary" onClick={() => setWizardOpen(true)}>
                  打开向导弹窗
                </Button>
              </div>
            </Space>
          </Card>

          <Card title="设计规范（严格遵循项目最紧凑布局标准）">
            <h4>双层间距设计系统（spacing[3] + spacing[1]）</h4>
            <ul style={{ fontSize: designSystem.typography.fontSize.sm }}>
              <li><strong>全局容器层:</strong> GlobalStyles 强制设置 .ant-modal-content / .ant-drawer-body padding = spacing[3] (16px)</li>
              <li><strong>Layout 框架层:</strong> Header/Footer/Steps 统一 padding = spacing[1] (8px 上下左右)</li>
              <li><strong>用户内容层:</strong> 用户自主构建 div，设置 padding = spacing[1] (8px)</li>
              <li><strong>总边距:</strong> 16px (容器) + 8px (框架/用户) = 24px 左右对齐</li>
              <li><strong>Content 区域:</strong> 默认 padding = 0，由用户 div 控制，灵活支持全宽内容（表格等）</li>
              <li><strong>统一原则:</strong> 所有框架层组件都使用完整的 spacing[1] 四周边距</li>
            </ul>

            <h4 style={{ marginTop: designSystem.spacing[5] }}>尺寸建议</h4>
            <ul style={{ fontSize: designSystem.typography.fontSize.sm }}>
              <li><strong>StandardModalLayout:</strong> 480px (小) / 720px (中) / 960px (大)</li>
              <li><strong>DrawerLayout:</strong> 480px (标准) / 720px (宽屏)</li>
              <li><strong>WizardModalLayout:</strong> 960px (大尺寸，向导需要更多空间)</li>
            </ul>

            <h4 style={{ marginTop: designSystem.spacing[5] }}>间距层次对比</h4>
            <ul style={{ fontSize: designSystem.typography.fontSize.sm }}>
              <li><strong>主页面：</strong>单层 spacing[1] (8px)，最紧凑</li>
              <li><strong>弹窗：</strong>双层 spacing[3]+spacing[1] (16px+8px=24px)，更舒适的呼吸感</li>
              <li><strong>设计原理：</strong>弹窗是焦点内容，需要更多留白突出重点</li>
            </ul>

            <h4 style={{ marginTop: designSystem.spacing[5] }}>使用示例</h4>
            <pre style={{
              backgroundColor: designSystem.colors.neutral[50],
              padding: designSystem.spacing[3],
              borderRadius: designSystem.borderRadius.md,
              overflow: 'auto',
              fontSize: designSystem.typography.fontSize.sm,
            }}>
{`// StandardModalLayout（spacing[3]+spacing[1] 设计）
// 容器层 16px 由 GlobalStyles 自动设置
<Modal width={720} footer={null}>
  <StandardModalLayout title="标题" footer={<>按钮</>}>
    <div style={{ padding: designSystem.spacing[1] }}>  {/* 用户层 8px */}
      <Form>...</Form>  {/* 总边距 16+8=24px */}
    </div>
  </StandardModalLayout>
</Modal>

// DrawerLayout（spacing[3]+spacing[1] 设计）
<Drawer width={480}>
  <DrawerLayout header={<>工具栏</>} footer={<>按钮</>}>
    <div style={{ padding: designSystem.spacing[1] }}>  {/* 用户层 8px */}
      内容区域  {/* 总边距 16+8=24px */}
    </div>
  </DrawerLayout>
</Drawer>

// WizardModalLayout（spacing[3]+spacing[1] 设计）
<Modal width={960} footer={null}>
  <WizardModalLayout
    title="向导"
    steps={[
      {
        key: 'step1',
        title: '步骤1',
        content: (
          <div style={{ padding: designSystem.spacing[1] }}>  {/* 用户层 8px */}
            <Form>...</Form>  {/* 总边距 16+8=24px */}
          </div>
        ),
      },
    ]}
    onFinish={async () => {}}
  />
</Modal>`}
            </pre>
          </Card>
        </div>
      </Card>

      {/* Modal 和 Drawer 渲染 */}
      {renderStandardModal()}
      {renderDrawer()}
      {renderWizardModal()}
    </div>
  );
}
