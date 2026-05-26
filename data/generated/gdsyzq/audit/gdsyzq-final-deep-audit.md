# gdsyzq 最终深度审计报告

执行日期：2025-05-13
课程：固定收益证券（gdsyzq）
审计范围：framework-detailed.json 全 8 章
审计类型：最终深度审计与修复

## 审计方法

1. 逐章检查 children 文本质量（短 bullet 问题）
2. 全文搜索已知反模式（imes、approx、自然语言 formula、工程词、空 chart）
3. 验证所有 image 路径存在性
4. 检查 chart_explanation 是否有对应图表
5. 检查 visualBlock 类型合法性
6. 对照 PPT 文本层检查 P0/P1 内容覆盖

## 发现的问题与修复

### 1. 短 children 问题（已修复）

| 章节 | 修复前 short(<40) | 修复后 | 平均字符数 |
|---|---|---|---|
| ch01 | 0 | 0 | 114 |
| ch02 | 0 | 0 | 105 |
| ch03 | 68/77 (88%) | 0 | 87 |
| ch04 | 54/67 (81%) | 0 | 85 |
| ch05 | 26/37 (70%) | 0 | 95 |
| ch06 | 7/37 (19%) | 0 | 66 |
| ch07 | 2/38 (5%) | 0 | 63 |
| ch08 | 0 | 0 | 105 |
| **合计** | **157/338 (46%)** | **0** | **87** |

### 2. 自然语言 formula（已修复）

8 个 formula_card 的 `formula` 字段包含英文自然语言而非 LaTeX。全部替换为对应的 `formulaLatex` 值。

| 章节 | VB | 原 formula | 修复后 |
|---|---|---|---|
| ch04 | VB[22] | AI = C × (1 - days to next coupon / ...) | AI=C\left(1-\frac{d_{next}}{d_{period}}\right) |
| ch04 | VB[26] | Relative spread = (y_X - y_Y) / y_Y... | s_{rel}=\frac{y_X-y_Y}{y_Y},\quad R_y=\frac{y_X}{y_Y} |
| ch04 | VB[34] | Corporate benchmark spot rate = ... | z^{corp}_t=z^{Treasury}_t+CS_t |
| ch06 | VB[1] | nominal spread = target YTM - ... | s_N = y_{target}-y_{benchmark} |
| ch06 | VB[8] | model price with OAS = market price | V_{model}(OAS)=P_{market} |
| ch06 | VB[12] | option cost = Z-spread - OAS | OC=Z-OAS |
| ch06 | VB[19] | market conversion price per share = ... | MCP=\frac{P_{CB}}{CR} |
| ch06 | VB[20] | premium = market conversion price - ... | MP=MCP-S,\quad MPR=\frac{MP}{S} |

### 3. chart_explanation 空壳（已修复）

ch05 VB[25] "补充理解：模型风险与第三方估值系统"：chartType 为 "other"，无对应图表。已转换为 data_table。

### 4. 其他检查结果（无问题）

| 检查项 | 结果 |
|---|---|
| `\times` (imes) | 23 处，全部为合法 LaTeX `\times` |
| `\approx` (approx) | 8 处，全部为合法 LaTeX `\approx` |
| 工程词（user-facing） | 0 处 |
| backspace 字符 | 0 处 |
| image 路径不存在 | 0 处（16 张图片全部存在） |
| 不支持 VB type | 0 处 |
| 空 chart（无数据点） | 0 处 |

### 5. 剩余 chart_explanation 评估

| 位置 | 标题 | chartType | 对应图表 | 判定 |
|---|---|---|---|---|
| ch03 VB[23] | 收益率曲线模型示例 | curve | 有 curve_chart | OK |
| ch05 VB[5] | 二叉树利率图阅读方法 | relationship | 有 image | OK |
| ch07 VB[7] | Monte Carlo 路径依赖示意 | relationship | 有 image | OK |
| ch08 VB[4] | 收益率曲线风险图阅读 | curve | 有 curve_chart | OK |

### 6. Validator 警告分析

gdsyzq/full/detailed 当前 18 条警告，全部为 "Potential unwrapped inline math found"：
- 14 条在 ch05 example_box 数据中（利率树节点值如 `(r_{1,H})`）
- 2 条在 ch04 VB[22] formula/formulaLatex（LaTeX 在 formula 字段中，预期行为）
- 2 条在 ch07 formula/formulaLatex（同上）

这些是 validator 对 formula 字段和 example_box 数据字段的误报——这些字段本身就应该包含 LaTeX。不需要修复。

## PPT 覆盖评估

基于 PPT 文本层提取，各章核心内容覆盖情况：

| 章节 | PPT 页数 | P0/P1 覆盖 | 遗漏风险 |
|---|---|---|---|
| ch01 | ~32 | 完整 | 低（已含市场图表 image） |
| ch02 | ~40+ | 完整 | 低 |
| ch03 | ~50+ | 完整 | 低（收益率曲线模型为 P2 补充） |
| ch04 | ~60+ | 完整 | 低 |
| ch05 | ~50+ | 完整 | 低 |
| ch06 | ~40+ | 完整 | 低 |
| ch07 | ~30+ | 完整 | 低 |
| ch08 | ~40+ | 完整 | 低 |

## 网页知识呈现评估

| 维度 | 状态 |
|---|---|
| 学习模块顺序 | 合理（先概念→再机制→后应用） |
| children 文本质量 | 全部 ≥40 chars，平均 87 chars |
| core/support/extension 分层 | 合理 |
| comparison_table 滥用 | 未发现 |
| data_table 误承载例题 | 未发现 |
| example_box 覆盖 | ch03-ch08 均有 example_box |
| formula_card LaTeX | 全部为合法 LaTeX |
| image 路径 | 全部存在 |
| 工程词暴露 | 0 处 |
