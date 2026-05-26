# gdsyzq 第 1 章局部增强报告

执行日期：2026-05-13
课程：固定收益证券
章节：第 1 章 概论
增强类型：局部增强（非全章重写）

## 增强目标

将第 1 章从偏提纲状态提升至 `polished-near`。增强概论章的课程导入功能、基础概念解释和学习可读性。

## 修改范围

- 修改：`data/generated/gdsyzq/full/framework-detailed.json` 第 1 章
- 新增：`data/generated/gdsyzq/audit/ch01-local-enhancement.md`
- 新增：`data/generated/gdsyzq/audit/ch01-priority-review.json`
- 新增：`data/generated/gdsyzq/audit/ch01-editorial-consolidation.md`
- 未修改：`framework-concise.json`、`src/**`、`source-materials/**`、Prisma、其他章节

## 增强内容

### 1. Children 文本充实

**增强前**：16 children，平均 27 chars，12 个 < 40 chars（75% bullet-point 化）。
**增强后**：16 children，平均 114 chars，0 个 < 40 chars。

覆盖全部 6 个 nodes 的薄弱 children：

| Node | 增强 children | 关键改进 |
|---|---|---|
| 章节总览 | 2 | 一句话定位从单句定义扩展为包含"固定收益不意味收益固定"的关键认知；课程作用展开为后续8章的学习地图和动因连接 |
| 核心概念 | 3 | 发行人与投资者展开为权利义务+契约关系；债务权证与优先股加入三类工具的章节分布；金融市场功能展开为资本配置+风险定价+流动性 |
| 核心机制 | 3 | 资金转移展开为跨期资源配置的经济逻辑；市场配置展开为多层次风险-收益谱系；风险传导展开为四类风险的独立性与叠加性 |
| 公式与计算逻辑 | 1 | 从"本章不硬造公式"扩展为第2-8章公式体系的完整预告 |
| 易混点 | 2 | 固收证券vs债券展开为三类工具的边界+考试易错点；承诺vs无风险展开为"有承诺≠无风险"的认知+第8章连接 |
| 复习路径 | 3 | 三步法每步扩展为结合具体工具、章节分布和案例的完整操作指南 |

### 2. Node 摘要增强

6 个 node summaries 从 15-22 chars 扩展为 60-120 chars。

### 3. Chapter Summary 增强

从 58 chars 扩展为包含参与方、案例和后续学习地图的结构化概述。

### 4. VisualBlocks（含 post-review 修复）

6 → 8 个 visualBlocks。初版增强保留了原有的 chart_explanation，但用户验收时发现其为空壳——chartType 为 "other"、无对应图表、仅有笼统文字。已修复：

- **移除**：chart_explanation "中国债券市场规模与违约观察"（空壳，无对应图表）
- **新增 data_table**：中美债券市场对比（数据来自课件第14页文字）
- **新增 image ×2**：我国债券市场存量规模及结构（slide 12 image13.png）、中国债券违约观察（slide 22 image23.png），均裁切自 PPT 原始图表

当前 VB 类型分布：
- concept_map ×1：课程地图
- comparison_table ×1：固收证券类型对比
- process_flow ×1：资金流动机制
- data_table ×2：课程内容模块 + 中美债券市场对比
- case_card ×1：硅谷银行案例
- image ×2：市场存量规模图表 + 违约观察图表

### 5. 未新增内容

- 未新增 example_box（概论章无计算链）
- 未新增 formula_card（正确，概论章不应硬造公式）
- 未引入P3外链、截图

## 增强前后对比

| 指标 | 增强前 | 增强后 | post-review |
|---|---|---|---|
| nodes | 6 | 6 | 6 |
| visualBlocks | 6 | 6 | 8 |
| children avg chars | 27 | 114 | 114 |
| short children (<40) | 12 (75%) | 0 (0%) | 0 (0%) |
| 自然语言 formula | 0 | 0 | 0 |
| 空 chart_explanation | 1 | 1 | 0 |
| image | 0 | 0 | 2 |

## 验证结果

- `npm run validate:content`：通过。ch01 零警告
- `npm run build`：通过（Prisma + Next.js + TypeScript 编译成功）
- 零 backspace、零半 LaTeX、零空 chart
