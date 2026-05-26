# 第 8 章内容增强状态审计

审计日期：2026-05-12  
审计对象：`data/generated/gdsyzq/full/framework-detailed.json` 第 8 章  
参考材料：`source-materials/gdsyzq/8.债券投资风险（一）(2).pptx`、`ch08-visual-critical-audit.md`、`teaching-sequence-audit.md`、`docs/content-generation-standard.md`  
本轮性质：只审计，不修改正文 JSON。

## Post-Enhancement Update（2026-05-12）

本文件原结论为：第 8 章处于“混合状态 / 局部增强”，建议执行 C：整章增强。

本轮整章增强已执行，详见：

- `ch08-slide-inventory.md`
- `ch08-priority-map.md`
- `ch08-example-application-audit.md`
- `ch08-enhancement-plan.md`
- `ch08-enhancement-report.md`

增强后状态：

- 第 8 章已从 7 个 nodes / 10 个 visualBlocks / 0 个 `example_box` 提升为 11 个 nodes / 23 个 visualBlocks / 1 个 `example_box`。
- 收益率曲线风险 P0 视觉链条继续保留为 `curve_chart → chart_explanation → comparison_table`。
- 信用评级、4C 分析、预期信用损失 / VaR、CreditMetrics、Altman/ZETA 和泰禾案例已补入主学习模块。
- “预期信用损失”“相对 VaR”的自然语言 `formula` 字段已修复为数学表达式。
- 仍需人工复核：Altman 精确系数、CreditMetrics 均值数字口径。

因此，本状态审计的行动建议已由“需要整章增强”更新为：**已完成整章增强，建议下一步进行页面人工验收与数值复核**。

## Executive Summary

- 第 8 章当前状态：**混合状态 / 局部增强**。
- 当前已经修复的部分：收益率曲线风险 P0 视觉链条已进入正文主线，形成 `curve_chart → chart_explanation → comparison_table`。
- 仍未达到完整内容增强标准：第 8 章 PPT 共 76 页，当前正文只有 7 个 nodes、10 个 visualBlocks、0 个 `example_box`、1 个 `case_card`。大量信用评级、4C、Altman、CreditMetrics 例题链和房地产信用风险材料仍被高度压缩。
- 是否建议下一轮做整章增强：**建议 C：需要整章增强，按完整章节增强流程重做第 8 章**。
- 最高优先级问题：
  1. CreditMetrics 连续例题链未完整建模为 `example_box` / 数据表 / 计算链。
  2. 预期信用损失和相对 VaR 的 `formula` 字段仍是英文自然语言。
  3. Altman Z 值只有风险区间表，缺少公式、变量解释、ZETA 和局限性整理。
  4. 信用评级、4C 分析和信用风险衡量方法整体仍偏提纲化。

## Coverage Check

| Topic | Present? | Quality | Evidence | Gap |
|---|---|---|---|---|
| 收益率曲线风险 | Yes | Good after local P0 fix | 第 8 章新增“收益率曲线风险”模块，含 `curve_chart`、`chart_explanation`、判断表；对应 PPT 10-12 页。 | 概念点需人工确认是否符合 PPT 原图意图。 |
| 利率风险 / 市场风险 | Partial | Thin | `核心概念`有利率风险；风险地图和风险对比表有一行。PPT 7-9 页包含新闻式问题、解答和影响因素。 | 缺少价格-收益率反向关系图示或机制说明；美债拍卖例子未形成 `case_card`。 |
| 平行移动与非平行移动 | Yes | Good | `curve_chart` 展示平行上移 25bp 与非平行移动，说明紧贴图示。 | 仍是结构化概念重绘，不是 PPT 原图裁切。 |
| 久期 / 凸性或相关风险度量 | Not evident | Not assessed as required content | PPT 本章抽取文本中未明显出现久期/凸性主线；当前 JSON 也没有。 | 需人工确认本章是否本来不讲久期/凸性，避免错误补入课件不存在内容。 |
| 信用风险 | Yes | Basic | `核心概念`、风险地图、风险对比表、case_card 都覆盖信用风险。PPT 16-28 页有信用利差、违约、降级、流动性等内容。 | 信用风险分类、违约/降级/利差风险之间的传导关系仍偏概括。 |
| 信用损失 | Yes | Needs fix | 有“预期信用损失” `formula_card`，变量说明基本存在。 | `formula` 字段是英文自然语言；缺少给定违约率/回收率的计算例题。 |
| VaR | Yes | Needs major enhancement | 有“相对VaR” `formula_card`，CreditMetrics 流程中提到 VaR。 | PPT 58-60 页有价值分布和相对 VaR 计算链，当前未形成完整例题。 |
| CreditMetrics | Partial | Weak | 当前只有 `process_flow` 和相对 VaR 公式；PPT 52-60 页是连续模型说明和例题链。 | 缺迁移矩阵、评级状态价值表、价值分布、均值/方差/VaR 计算例题。 |
| Altman 模型 | Partial | Weak | 有“Altman Z值风险区间” `data_table`。PPT 48-51 页还涉及模型形式、ZETA 和局限性。 | 缺 Z 值公式、变量说明、ZETA 模型、模型缺陷和适用边界。 |
| 信用评级 | Partial | Thin | `核心机制`有“评级信息”一句。PPT 31-38 页有评级定义、评级观察/展望、机构发展、依赖评级风险。 | 缺评级信息用途、评级观察/展望对比、评级滞后和利益冲突风险。 |
| 4C 分析 | Partial | Thin | `核心机制`有“传统4C分析”一句。PPT 40-42 页展开能力、担保品、条款、品格及中诚信方法链接。 | 缺 `comparison_table` 或 `concept_map` 展开 4C，外部链接应 audit-only。 |
| 信用风险案例或应用 | Yes | Partial | 有泰禾房地产信用债违约 `case_card`；PPT 32、45-47、61-76 含大量房地产债背景和案例材料。 | 当前案例可用，但房地产市场发展和行业截图大多应 P2/P3 审计化，不宜逐页搬入正文。 |
| 章节复习要点 | Yes | Basic | 有“易混点”和“复习路径”。 | 复习路径仍偏总览式，没有把 CreditMetrics、Altman、评级、4C 的主复习顺序细化。 |

## Module Quality Check

| Module | Quality | Main Problems | Recommended Fix |
|---|---|---|---|
| 章节总览 | Basic | 总览清楚，但仍沿用“先识别风险类型，再聚焦信用风险”的高层描述。 | 整章增强时同步更新为“风险概览 → 利率/曲线风险 → 信用评级与分析 → 信用风险量化 → 案例”的路径。 |
| 收益率曲线风险 | Good | P0 视觉链条已修复；概念点为结构化重绘。 | 人工核对曲线方向即可，不必优先重修。 |
| 核心概念 | Thin | 只列出利率风险、信用风险、流动性风险、事件风险；再投资、赎回、提前偿付、汇率、通胀等未进入概念层。 | 补足风险类型对比，P0/P1 保留正文，P2/P3 压缩。 |
| 核心机制 | Thin | 评级信息、4C、CreditMetrics 各一句，缺机制展开。 | 拆成“信用评级与评级风险”“传统4C分析”“CreditMetrics建模逻辑”等模块或子链条。 |
| 公式与计算逻辑 | Weak | 有公式卡和 Z 值表，但公式自然语言化，CreditMetrics 例题链缺失。 | 修复公式字段；补 `example_box`：预期损失小算例、CreditMetrics VaR 例题链。 |
| 易混点 | Basic | 仅有违约/降级、信用利差/利率风险两组。 | 增加信用利差风险 vs 流动性风险、评级下调 vs 市场先行定价、Z 值模型 vs 现代信用模型等。 |
| 复习路径 | Basic | 步骤存在，但过于简短，未覆盖收益率曲线风险和量化模型例题。 | 增强后重写为章节复习清单，按主线和优先级列出。 |

## Formula / Calculation Issues

| Priority | Location | Issue | Evidence | Recommended Fix |
|---|---|---|---|---|
| P0 | `visualBlocks[5].formula` | `formula` 字段是英文自然语言，不是数学公式。 | `expected loss = PD × (1 - recovery rate) × exposure` | 改为规范公式；解释移入 `usage` / `description`。 |
| P0 | `visualBlocks[6].formula` | `formula` 字段是英文自然语言，不是数学公式。 | `relative VaR = expected value - lower percentile value` | 改为规范公式；结合 CreditMetrics 价值分布例题解释。 |
| P0 | CreditMetrics | PPT 连续例题链未建模。 | PPT 53-60 页包含数据、步骤、价值分布和 VaR 计算链；当前只有 `process_flow` + VaR 公式。 | 建议新增 `data_table` + `example_box`，保留条件、步骤、结果和复习提示。 |
| P1 | Altman Z 值 | 只有 Z 值区间表，没有公式和变量含义。 | 当前 `data_table` note 提到“模型系数需人工核对”。PPT 48-51 页存在模型形式和局限性。 | 核对公式对象后补 `formula_card`，并将局限性做成 comparison 或 notes。 |
| P1 | 预期信用损失 | 公式有变量说明，但缺应用题。 | 当前只有公式框架，无给定违约率/回收率的计算题。 | 若 PPT 有数值条件，补 `example_box`；没有则保留公式卡并加复习提示。 |
| P2 | 半 LaTeX | 本章当前未发现明显半 LaTeX。 | 本次扫描第 8 章未发现 `(sigma=...)`、`(r_{...})` 类候选。 | 保持检查；下一轮修公式时继续扫一遍。 |

## Visual / Chart Issues

| Priority | Item | Current Status | Gap / Risk | Recommended Fix |
|---|---|---|---|---|
| P0 fixed | 收益率曲线风险图 | 已有 `curve_chart`，且紧贴 `chart_explanation`。 | 曲线点是概念示意，不是 PPT 原图精确复刻。 | 人工复核即可。 |
| P1 | 利率风险与价格-收益率反向关系 | 当前仅文字/对比表表达。 | PPT 7-9 页有利率风险机制和新闻式问题，缺价格-收益率直观图。 | 后续可补 `chart_explanation` 或概念 `curve_chart`。 |
| P1 | CreditMetrics 数据链 | 当前是 `process_flow`。 | PPT 53-60 页涉及迁移矩阵、估值、价值分布和 VaR，流程图不能替代数据/例题。 | 补 `data_table` / `example_box`；若矩阵难结构化，可考虑局部图片候选。 |
| P1 | Altman / ZETA | 当前只有 Z 区间表。 | 缺模型公式和局限性结构。 | 补公式卡、变量说明、模型局限表。 |
| P2 | 事件风险、房地产债截图、外部链接 | 当前主要 audit-only 或案例化。 | 大量截图和链接不应进入正文，但可提炼机制。 | 保持克制；只把信用风险传导机制纳入正文。 |

## Teaching Sequence Check

当前第 8 章顺序局部改善，但整章仍不够完整：

1. `收益率曲线风险` 模块现在符合“图示 → 读图说明 → 判断表”的依赖顺序。
2. 之后进入 `核心概念` 和 `核心机制`，但这些模块仍是概念点堆叠，缺少展开说明和例题绑定。
3. `公式与计算逻辑` 中公式卡、CreditMetrics 流程、Altman 表和案例之间没有形成完整“公式 → 数据条件 → 计算例题 → 复习要点”的链条。
4. 当前章节更像“风险目录 + 少量结构化卡片 + 一个案例”，不是完整章节增强版。

## Recommended Next Step

选择：**C. 需要整章增强，按完整章节增强流程重做第 8 章。**

理由：

- PPT 覆盖 76 页，当前正文只有 10 个 visualBlocks，且 `example_box` 为 0。
- 信用评级、4C、Altman、CreditMetrics 等主内容均被压缩成一句节点或单个流程/表格。
- 公式字段仍有自然语言警告，且 CreditMetrics 例题链缺失，属于核心量化内容缺口。
- 第 8 章现在已经修好收益率曲线 P0 视觉链条，但这只是局部增强，不代表整章达到第 3、4、5 章标准。

下一轮建议修复范围：

1. 生成或更新 `slide-inventory-ch08.json`、`ch08-priority-map.md`、`ch08-example-application-audit.md/json`、`ch08-enhancement-plan.md`、`ch08-priority-review.json`、`ch08-editorial-consolidation.md`。
2. 重点补足 CreditMetrics 连续例题链。
3. 修复预期信用损失和相对 VaR 公式字段。
4. 补齐信用评级、评级风险、4C、Altman/ZETA、CreditMetrics 的主学习模块。
5. 对 61-76 页房地产市场和外部链接材料执行 P2/P3 取舍，保留机制和核心案例，不逐页搬运截图/链接。

## Priority List

### P0

- CreditMetrics 例题链缺失：PPT 53-60 页的模型步骤、价值分布和 VaR 计算未形成完整 `example_box`。
- 预期信用损失和相对 VaR 的 `formula` 字段仍是英文自然语言。

### P1

- 信用评级和依赖评级风险过度压缩。
- 4C 分析只有一句概念，缺少结构化展开。
- Altman Z 值缺公式、变量、ZETA 和局限性。
- 利率风险/价格-收益率反向关系仍缺直观机制图或案例卡。
- 复习路径未覆盖量化模型和案例链条。

### P2

- 再投资、赎回、提前偿付、汇率、通胀、事件风险等风险类型可压缩补充，但不应完全缺席。
- 房地产市场发展、机构链接、外部阅读和市场截图应继续以 audit 为主，只提炼为信用风险机制。

## Do Not Change Confirmation

- 本轮审计未修改 `data/generated/gdsyzq/full/framework-detailed.json`。
- 本轮审计未修改 `data/generated/gdsyzq/full/framework-concise.json`。
- 本轮审计未修改 `data/generated/gdsyzq/sample/**`。
- 本轮审计未修改 `data/generated/ysjrgj/**`。
- 本轮审计未修改 `source-materials/**`。
- 本轮审计未修改 `src/**`、Prisma schema、loader、`VisualBlockRenderer`、`MathText` 或 `package.json`。

## Validation

- `npm run validate:content`：通过；仍有既有内容质量 warning，其中第 8 章包含预期信用损失、相对 VaR 两个自然语言公式 warning。
- `npm run lint`：通过。
- `npm run build`：通过。
