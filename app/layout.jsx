import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: '生命时间卡片',
  description: '一个基于 React 的生命时间卡片生成器'
};

export default function RootLayout({ children }) {
  const GA_ID = 'G-PD2JWJHVEM'; // 请在此处替换您的 Google Analytics ID

  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
