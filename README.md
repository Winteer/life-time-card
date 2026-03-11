# 人生小票生成器 (Life Receipt Generator)

一个基于 Next.js 开发的纯前端人生小票生成工具。帮助你记录生活中的小确幸，生成精美的小票图片。

# 在线访问
[人生小票生成器](https://winteer.github.io/life-time-card/) 

## ✨ 特性

- **实时预览**：输入的事项会在右侧实时预览，所见即所得
- **自定义事项**：可以自由添加、删除和编辑人生小票的细项
- **随机小确幸**：每次生成小票时，会随机显示一句小确幸双语文字
- **一键导出**：点击"PRINT · 生成小票"按钮，可以将小票导出为 PNG 格式的图片
- **保存收据**：生成的小票会自动保存到"我的收据"部分
- **响应式设计**：完美适配 PC 与移动端

## 🛠 技术栈

- **框架**：[Next.js](https://nextjs.org/) (App Router)
- **样式**：原生 CSS (Global CSS)
- **导出功能**：[html2canvas](https://html2canvas.hertzen.com/)
- **字体**：Courier New + 得意黑

## 🚀 快速开始

### 本地开发

1. 克隆仓库：

   ```bash
   git clone https://github.com/winteer/life-time-card.git
   cd life-time-card
   ```
2. 安装依赖：

   ```bash
   npm install
   ```
3. 运行开发服务器：

   ```bash
   npm run dev
   ```

   访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建与部署

若要手动构建：

```bash
npm run build
```

静态文件将生成在 `out` 目录下。

## 📖 使用说明

1. **添加事项**：点击"+ 添加事项"按钮，添加新的人生细项
2. **编辑事项**：在输入框中输入或修改事项内容
3. **删除事项**：点击事项右侧的删除图标，移除该事项
4. **生成小票**：点击"PRINT · 生成小票"按钮，将小票导出为 PNG 图片
5. **查看收据**：生成的小票会自动保存到"我的收据"部分

## 🎨 设计风格

- **字体**：英文使用 Courier New，中文使用得意黑
- **配色**：白底黑字，简洁清爽
- **布局**：左侧输入区，右侧预览区，底部收据库

## 📝 示例

```
THE LIFE STORE
人生便利店
DAILY LIFE RECEIPT

DATE: 2026-03-09

1. 读书
2. 看电影
3. 放空自己

TOTAL: ONE DAY

Ordinary days, simple joy
日子一般般，快乐很简单
```

---

Made with ❤️ by winteer
