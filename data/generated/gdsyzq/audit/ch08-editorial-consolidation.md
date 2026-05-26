# gdsyzq 第 8 章 editorial consolidation

执行日期：2026-05-13（更新于同日 post-review）
性质：局部增强 + post-review 后的编辑整合检查
最终状态：**polished**

## 整合项

### 1. 信用评级依赖风险 → node children 整合

**原 VB**：`comparison_table` "信用风险与信用评级：依赖信用评级的风险"（5 rows × 3 columns）
**去向**：node[4].children[4] "依赖评级的风险" summary 从 39 chars 扩展为 150+ chars，包含全部五个风险方面。
**检查**：五个风险方面（评级会变化、评级可能滞后、评级可能出错、难以捕捉特殊事件、利益冲突与信息披露）均已纳入 child summary，课堂结论"评级是重要参考但不能机械依赖"保留。

### 2. 信用评分模型局限性 → node children 整合

**原 VB**：`comparison_table` "Altman/ZETA模型：信用评分模型局限性"（5 rows × 3 columns）
**去向**：node[8].children[3] "局限性" summary 从 37 chars 扩展为 180+ chars，包含全部五方面局限。
**检查**：五方面局限（依赖会计数据、理论基础有限、线性假设、表外风险、行业适用性）均已纳入 child summary，结尾"模型是辅助筛查工具而非绝对判据"保留。

### 3. 预期信用损失数值算例新增

**新增 VB**：`example_box` "预期信用损失与VaR：预期信用损失数值算例"（P1）
**位置**：插入在 EL vs VaR comparison_table（VB index 11）和 CreditMetrics 流程（VB index 13）之间
**检查**：
- 场景数值（PD=2%, RR=40%, EAD=100万）为教学典型值，不与 PPT 冲突
- 5 步计算链完整：提取条件 → 计算 LGD → 代入公式 → 计算结果 → 敏感性分析
- pitfalls 覆盖 RR vs LGD 混淆和平均值 vs 实际值差异

### 4. 久期引用修正

| 位置 | 原文本 | 新文本 |
|---|---|---|
| chart_explanation keyTakeaways[2] | 曲线风险是久期和凸性之外，组合层面必须关注的期限结构风险。 | 曲线风险是利率水平变动之外，组合层面必须关注的期限结构风险：即使整体利率水平不变，曲线形状的变化（变陡、变平、弯曲）也会导致不同期限债券的相对价格变化... |
| comparison_table 斜率变化复习判断 | 组合久期分布不均时风险更明显。 | 组合中短端和长端头寸分布不均时风险更明显，因为曲线变陡或变平对不同期限债券的价格影响方向和幅度不同。 |

### 5. Cross-reference 一致性

- chapterTitle：`第八章：债券投资风险（一）：信用风险与风险衡量`（未修改）
- summary：未修改（仍准确概括增强后主线）
- keyConcepts：未修改（21 个概念覆盖全面）
- 所有 VB titles 与所属 node name 对齐
- EL example_box 引用 formula_card 中的公式（EL = PD × LGD × EAD），保持一致

### 6. Post-Review 收口复核（2026-05-13）

#### CreditMetrics 均值数字（107.09 vs 107.90）
- 课件第59-60页均值文字处出现107.90，同页计算式使用107.09。
- 正文跟随计算式链条（107.09−83.64=23.45），data_table note 和 example_box pitfall 均已明确标注两处数字不一致。
- **决策**：无法确认正确值，保留计算式107.09，标注"以教师口径为准"。

#### EL 算例（教学示例 vs 课件原题）
- PPT 第18页给出了预期信用损失公式框架但未提供具体数值算例。
- 已在 scenario 前加注"（教学示例，用于理解预期信用损失公式的计算方法，非课件原题。）"
- 已新增 note 字段说明 PD=2%、RR=40% 为通用教学假设。
- **决策**：保留算例，明确标注为教学示例。

#### Altman Z 精确系数
- PPT 第48-49页 Altman 公式来自图片对象，精确系数未经人工复核。
- 正文使用线性判别通式 Z=∑w_k X_k 表达模型结构，pitfalls 标注"具体系数需人工核对"。
- **决策**：不伪造系数，保持现有表达。

### 7. 未修改项确认

- framework-concise.json：未修改（其 ch08 自然语言 formula 警告属独立文件，不在本轮范围）
- 其他章节：未修改
- source-materials：未修改
- src/：未修改
- Prisma schema / package.json：未修改
