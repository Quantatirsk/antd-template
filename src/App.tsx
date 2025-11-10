import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { designSystem } from './styles';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // 品牌色配置
          colorPrimary: designSystem.colors.primary[500],
          colorLink: designSystem.colors.primary[500],
          colorLinkHover: designSystem.colors.primary[600],

          // 全局圆角（从 design-system 统一配置）
          borderRadius: parseInt(designSystem.borderRadius.md),      // 4px - 按钮、输入框、菜单
          borderRadiusLG: parseInt(designSystem.borderRadius.lg),    // 6px - 卡片
          borderRadiusSM: parseInt(designSystem.borderRadius.sm),    // 2px - 小元素

          // 字号（从 design-system 统一配置）
          fontSize: parseInt(designSystem.componentFontSize.global),  // 13px - 全局基础字号
          fontSizeHeading1: parseInt(designSystem.typography.fontSize['2xl']),  // 28px
          fontSizeHeading2: parseInt(designSystem.typography.fontSize.xl),      // 22px
          fontSizeHeading3: parseInt(designSystem.typography.fontSize.lg),      // 20px
        },
        // 所有组件样式通过 GlobalStyles 统一控制
      }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
