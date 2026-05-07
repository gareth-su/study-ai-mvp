# AI Course Knowledge Framework

这是一个面向《衍生金融工具》课程的 AI/Agent 驱动学习网站。系统将教师提供的课程资料整理为固定知识库，学生打开网站后可以直接查看课程知识框架、速记提纲和练习内容。

## 已实现内容

- 预置课程知识框架
- 讲义版 / 提纲版切换
- 三个章节的结构化知识体系
  - 02 期货市场的运作机制
  - 03 利用期货的对冲策略
  - 04 利率
- 章节导航与核心概念地图
- 速记提纲
- 练习题与提交判分
- 维护者侧固定课程导入脚本

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

## 本地运行

```bash
npm install
npx prisma generate
npm run ingest:fixed
npm run dev
```

打开：

```text
http://localhost:3000/framework
```

## 部署说明

部署到 Vercel 时，需要在环境变量中配置：

```text
DATABASE_URL=file:./prisma/dev.db
```

本项目使用固定知识库演示模式，数据库文件位于 `prisma/dev.db`。学习端不需要用户上传资料，也不需要运行时 API Key。

## AI/Agent 构建成果

AI/Agent 参与了课程资料解析、知识结构设计、章节框架生成、讲义式页面呈现优化、速记提纲和练习内容生成。项目展示了从原始课程资料到结构化学习系统的完整构建流程。