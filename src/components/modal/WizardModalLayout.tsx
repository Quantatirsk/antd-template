/**
 * WizardModalLayout - 向导式弹窗布局
 *
 * 结构：Header + Steps + Content + Footer (带导航按钮)
 * 内置步骤管理逻辑
 */

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Steps, Button } from 'antd';
import { designSystem } from '@/styles/DesignSystem';

interface WizardStep {
  key: string;
  title: string;
  description?: string;
  content: ReactNode;
}

interface WizardModalLayoutProps {
  // Header
  title?: ReactNode;

  // Steps
  steps: WizardStep[];
  initialStep?: number;
  onStepChange?: (current: number) => void;

  // Content
  contentPadding?: string;
  maxHeight?: string;

  // Footer
  onCancel?: () => void;
  onFinish?: () => Promise<void> | void;
  onStepValidate?: (step: number) => Promise<boolean> | boolean;  // 步骤验证

  // 按钮文案
  cancelText?: string;
  prevText?: string;
  nextText?: string;
  finishText?: string;

  // 控制
  loading?: boolean;
}

export default function WizardModalLayout({
  title,
  steps,
  initialStep = 0,
  onStepChange,
  contentPadding = '0',  // 默认无 padding，由用户自主构建 div 设置 spacing[1]
  maxHeight = '70vh',  // 向导式需要更大空间
  onCancel,
  onFinish,
  onStepValidate,
  cancelText = '取消',
  prevText = '上一步',
  nextText = '下一步',
  finishText = '完成',
  loading = false,
}: WizardModalLayoutProps) {
  const [current, setCurrent] = useState(initialStep);
  const [validating, setValidating] = useState(false);

  const handleNext = async () => {
    // 验证当前步骤
    if (onStepValidate) {
      setValidating(true);
      const isValid = await onStepValidate(current);
      setValidating(false);
      if (!isValid) return;
    }

    const nextStep = current + 1;
    setCurrent(nextStep);
    onStepChange?.(nextStep);
  };

  const handlePrev = () => {
    const prevStep = current - 1;
    setCurrent(prevStep);
    onStepChange?.(prevStep);
  };

  const handleFinish = async () => {
    // 最后一步验证
    if (onStepValidate) {
      setValidating(true);
      const isValid = await onStepValidate(current);
      setValidating(false);
      if (!isValid) return;
    }

    await onFinish?.();
  };

  const isLastStep = current === steps.length - 1;
  const currentStep = steps[current];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Header */}
      {title && (
        <div
          style={{
            height: designSystem.heights.header,
            padding: `0 ${designSystem.spacing[1]}`,  // 左右 8px
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: designSystem.typography.fontSize.lg,
              fontWeight: designSystem.typography.fontWeight.semibold,
              color: designSystem.semantic.text.primary,
            }}
          >
            {title}
          </div>
        </div>
      )}

      {/* Steps 步骤条 */}
      <div
        style={{
          padding: `${designSystem.spacing[1]} ${designSystem.spacing[1]}`,  // 上下左右 8px
          flexShrink: 0,
        }}
      >
        <Steps
          current={current}
          items={steps.map(step => ({
            title: step.title,
            description: step.description,
          }))}
        />
      </div>

      {/* Content - 当前步骤内容 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: contentPadding,
          maxHeight,
          minHeight: 0,
        }}
      >
        {currentStep?.content}
      </div>

      {/* Footer - 导航按钮 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: designSystem.spacing[1],  // 上下左右全部 8px
          flexShrink: 0,
        }}
      >
        {/* 左侧：取消按钮 */}
        <Button onClick={onCancel} disabled={loading || validating}>
          {cancelText}
        </Button>

        {/* 右侧：上一步/下一步/完成 */}
        <div style={{ display: 'flex', gap: designSystem.spacing[2] }}>
          {current > 0 && (
            <Button onClick={handlePrev} disabled={loading || validating}>
              {prevText}
            </Button>
          )}

          {!isLastStep ? (
            <Button type="primary" onClick={handleNext} loading={validating}>
              {nextText}
            </Button>
          ) : (
            <Button type="primary" onClick={handleFinish} loading={loading || validating}>
              {finishText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
