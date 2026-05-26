# gdsyzq 第 8 章局部增强报告

执行日期：2026-05-13
课程：固定收益证券
章节：第 8 章 债券投资风险（一）
增强类型：局部增强（非全章重写）
前置审计：`ch08-current-state-audit.md` → 判定 `polished-near`

## 增强目标

将第 8 章从 `polished-near` 提升至 `polished`，针对 4 个缺口做精准修复。

## 修改范围

- 修改：`data/generated/gdsyzq/full/framework-detailed.json` 第 8 章
- 新增：`data/generated/gdsyzq/audit/ch08-local-enhancement.md`
- 新增：`data/generated/gdsyzq/audit/ch08-editorial-consolidation.md`
- 新增：`data/generated/gdsyzq/audit/ch08-priority-review.json`
- 未修改：`framework-concise.json`、`src/**`、`source-materials/**`、Prisma、其他章节

## 增强内容

### 1. Children 文本充实

**增强前**：46 children，平均 39 chars，63%（29个）< 40 chars。
**增强后**：46 children，平均 105 chars，0%（0个）< 40 chars。

覆盖全部 11 个 nodes 的薄弱 children，重点区域：

| Node | 增强 children 数 | 示例：增强前 → 增强后 |
|---|---|---|
| 收益率曲线风险 | 3 | "所有期限收益率大致同幅度上升或下降" → 加入考试判断策略和逐期限匹配方法 |
| 信用风险与信用评级 | 5 | "发行人不能按约定支付利息或本金" → 扩展为包含风险维度定位和与其他风险关系 |
| 4C信用分析 | 4 | "关注企业所在行业..." → 扩展为包含核心问题、评估关键和压力情境考量 |
| 预期信用损失与VaR | 2 | "把违约概率、损失率和违约暴露结合" → 扩展为包含巴塞尔/IFRS 9 背景和应用场景 |
| CreditMetrics | 4 | "衡量信用评级变化和违约状态..." → 扩展为包含模型思路、输入细节和与简单模型区别 |
| Altman/ZETA | 1 | 吸收原 VB[19] 五方面局限性内容 |
| 案例与整合复习 | 3 | 扩展为包含传导链、四步法和行业背景提炼方法 |
| 易混点 | 5 | 从单句对比扩展为包含驱动因素、应用场景和实际含义的多维度辨析 |
| 复习路径 | 5 | 从单句步骤扩展为包含具体操作指南和工具名称的完整复习路线图 |

### 2. comparison_table 优化（8 → 6）

移除 2 个非真正对比型 comparison_table，内容吸收进 node children：

| 移除的 VB | 原类型 | 内容去向 |
|---|---|---|
| 信用风险与信用评级：依赖信用评级的风险 | comparison_table | 吸收进 node[4].children[4]（扩展为包含五个风险方面的段落） |
| Altman/ZETA模型：信用评分模型局限性 | comparison_table | 吸收进 node[8].children[3]（扩展为包含五方面局限的结构化段落） |

保留的 6 个 comparison_table 均为真正对比型（风险类型对比、曲线变化对比、信用风险三分法、4C框架、EL vs VaR、Altman vs ZETA vs CreditMetrics）。

### 3. example_box 新增（1 → 2）

新增 `预期信用损失数值算例`（P1）：
- 场景：AA级债券，面值100万，PD=2%，RR=40%，EAD=100万
- 5步计算链含敏感性分析（RR变化对EL的影响）
- 插入位置：EL vs VaR comparison_table 之后、CreditMetrics 之前

### 4. 久期引用修正

修正 2 处前向引用，避免学生在未学久期/凸性时产生困惑：
- chart_explanation keyTakeaways：`久期和凸性之外` → `利率水平变动之外`
- comparison_table 斜率变化复习判断：`组合久期分布不均时` → `组合中短端和长端头寸分布不均时`

### 5. Image 决策

**未新增 image**。理由：
- 收益率曲线风险已由 `curve_chart` 覆盖（含可绘制数据点）
- CreditMetrics 迁移矩阵已由 `data_table` 表达
- Altman 精确公式系数来自 PPT 图片对象，未经人工复核，不宜裁切
- PPT P3 材料（截图、外链）不进入正文
- 当前 concept_map（风险地图）、process_flow（评级流程 + CreditMetrics 流程）、curve_chart 组合已满足核心视觉需求

## 增强前后对比

| 指标 | 增强前 | 增强后 | 变化 |
|---|---|---|---|
| nodes | 11 | 11 | — |
| visualBlocks | 23 | 22 | -1 |
| comparison_table | 8 | 6 | -2 |
| example_box | 1 | 2 | +1 |
| children 平均 chars | 39 | 105 | +66 |
| short children (<40) | 29 (63%) | 0 (0%) | -29 |
| 验证器警告（ch08） | 0 | 0 | — |
| formula 自然语言 | 0 | 0 | — |
| image | 0 | 0 | 已记录理由 |

## 验证结果

- `npm run validate:content`：通过，ch08 零警告
- `npm run build`：通过（Prisma + Next.js 编译成功）
- `npm run lint`：通过（仅 scripts/ch08-enhance.js 有 require() 风格警告，非生成内容问题）

## 修改边界确认

- 仅修改 `data/generated/gdsyzq/full/framework-detailed.json` 第 8 章
- 未修改 `framework-concise.json`
- 未修改 `src/**`、Prisma schema、loader、VisualBlockRenderer、MathText、package.json
- 未修改 `source-materials/**`
- 未修改 `ysjrgj/**`
- 未修改 gdsyzq 其他章节
- 未新增图片资源
