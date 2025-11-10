import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { designSystem } from './styles';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: designSystem.colors.primary[500],
          colorLink: designSystem.colors.primary[500],
          colorLinkHover: designSystem.colors.primary[600],
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
