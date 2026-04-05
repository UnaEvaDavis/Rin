import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'
import 'remixicon/fonts/remixicon.css'
import App from './App'
import './index.css'
import './components.css'
import { GlobalErrorBoundary } from './components/error-boundary.tsx'
import { bootstrapApp } from './app/bootstrap'

bootstrapApp()

// ✅ 新增 Root 组件
function Root() {

  useEffect(() => {
    const w = window as any;

    // 防止重复加载
    if (w.ChannelIOInitialized) return;
    w.ChannelIOInitialized = true;

    const script = document.createElement('script');
    script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    script.async = true;

    script.onload = () => {
      w.ChannelIO('boot', {
        pluginKey: '717dfe15-4b5c-407e-ae72-5003e6a9ecd6'
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  );
}

// ✅ 替换这里：App → Root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)

Modal.setAppElement('#root');
