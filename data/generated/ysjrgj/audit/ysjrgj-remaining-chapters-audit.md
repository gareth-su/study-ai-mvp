# ysjrgj 剩余章节状态总览审计

审计日期：2026-05-14
审计范围：ch01, ch02, ch03, ch04, ch05, ch07
审计方式：只读诊断，不改 framework-detailed.json
参考基准：ch10/11/12 增强后的 polished 标准

## 1. Summary

6 个剩余章节全部处于不同程度的结构性缺陷状态。4 个章节（ch03/ch04/ch05/ch07）与 ch10/ch11 增强前的状态高度一致：100%（或近 100%）children 短于 40 chars，nodes 使用通用模板命名，所有 formula_card 缺少 priority 或使用自然语言公式，全部 example_box 缺少 sourceType/sourceNote。

ch01/ch02 略有改善——ch02 的章节总览和核心机制部分 children 已有部分扩写且平均长度稍长，但整体仍以模板 node 为主且 ~78% children 仍为提纲化。

**关键发现**：
- 20/20 formula_cards 全部缺少 `priority`。
- 10/20 formula_cards 使用自然语言公式（如 "F = S_0 e^{rT}" 写在 formula 字段中但无 LaTeX 转义）。
- 12/12 example_box 全部缺少 `sourceType` 和 `sourceNote`。
- 5/6 个章节使用 "核心机制/核心概念/关键公式与计算逻辑/易混点/复习路径" 通用模板。
- 无章节发现工程词暴露给用户（chunk/generated/filePath 等）。
- 无章节存在空 chart 或不支持的 VB 类型。

## 2. Chapter Status Table

| Chapter | Children | Short (<40) | Short % | Template Nodes | Formula Issues | Example Issues | Charts | Priority |
|---------|----------|------------|---------|----------------|---------------|----------------|--------|----------|
| ch01 导言 | 22 | 19 | 86% | 5/6 | 2/2 natural lang, 0/2 priority | 1/1 no source | 0 | C |
| ch02 期货运作 | 32 | 25 | 78% | 5/7 | 1/1 no priority | 1/1 no source | 0 | C |
| ch03 对冲策略 | 22 | 22 | **100%** | 5/6 | 4/4 natural lang, 0/4 priority | 4/4 no source | 1 | **D** |
| ch04 利率 | 23 | 21 | 91% | 5/6 | 4/6 natural lang, 0/6 priority | 2/2 no source | 1 | **D** |
| ch05 远期期货定价 | 24 | 24 | **100%** | 5/6 | 5/5 natural lang, 0/5 priority | 3/3 no source | 1 | **D** |
| ch07 互换 | 23 | 23 | **100%** | 5/6 | 1/2 natural lang, 0/2 priority | 1/1 no source | 0 | **D** |

### 处理等级定义

- **A (post-review)**: 内容完整，只需审计核对。无需修改。
- **B (minor fix)**: 文本 OK，但 formula/chart/example 有明确小问题可修。不需要 children 重写。
- **C (local enhancement)**: 大部分文本 OK 或章节性质允许较短内容（如导言），但 node 命名需去模板化、部分 children 需扩写、VB 需补 metadata。
- **D (full enhancement)**: 100% children 提纲化 + 通用模板 node + formula/example metadata 缺失。需要章节重组（同 ch10/ch11 增强前）。

## 3. Main Findings by Chapter

### ch01 导言 — Grade C

- **现状**：6 nodes, 22 children, 86% short。5/6 模板 node。10 个 VB。
- **特殊考量**：导言章本身不要求像定价章节那样深度展开，部分 children 较短属合理（"一句话定位"、"第一步" 等导览型内容）。
- **主要问题**：
  1. node 名为 "核心机制/核心概念/关键公式与计算逻辑/易混点/复习路径"，不反映导言实际教学模块。
  2. 2 个 formula_card 使用自然语言公式且缺 priority、formulaLatex 无 LaTeX 命令。
  3. 1 个 example_box 缺 sourceType/sourceNote。
- **推荐处理**：局部增强——去模板化改为 "衍生品市场总览/远期与期货/期权基础/课程框架"，children 适当扩写，修公式。

### ch02 期货市场的运作机制 — Grade C

- **现状**：7 nodes, 32 children, 78% short。5/7 模板 node。17 个 VB。
- **特殊考量**：已有 2 个非模板 node（章节总览、场外市场与制度扩展），章节总览 children 已扩写至 40+ chars。核心机制部分 children 也有一定展开（38-61 chars）。
- **主要问题**：
  1. 仍有 4 个模板 node 下的 children 100% short（核心概念、关键公式、易混点、复习路径）。
  2. 1 个 formula_card 缺 priority。
  3. 1 个 example_box 缺 sourceType/sourceNote。
- **推荐处理**：局部增强——相比 full enhancement 工作量少很多（约 30-40% children 已 OK）。重点修模板 node 和 VB metadata。

### ch03 利用期货的对冲策略 — Grade D

- **现状**：6 nodes, 22 children, **100% short**。5/6 模板 node。15 个 VB。
- **与 ch10 增强前对比**：ch10 增强前 21/21 short (100%), 6 nodes, 5/6 template。ch03 为 22/22 short (100%), 6 nodes, 5/6 template。状态完全一致。
- **VB 基础**：4 formula_cards + 4 example_boxes + 1 curve_chart + 2 comparison_tables + 2 process_flows + 1 case_card — 基础较强。
- **主要问题**：
  1. 100% children <40 chars，全部提纲化。
  2. 4 个 formula_card 全部自然语言公式，0/4 priority。
  3. 4 个 example_box 全部缺 sourceType/sourceNote。
  4. ch03 是对冲策略章，应当按 "多头对冲/空头对冲/交叉对冲/基差风险/最优比率/股指应用" 的教学模块重组。
- **推荐处理**：**Full Enhancement**。

### ch04 利率 — Grade D

- **现状**：6 nodes, 23 children, **91% short**。5/6 模板 node。15 个 VB。
- **特殊性**：有 2 个非自然语言公式（久期近似、凸性修正），但整体仍然是模板结构。
- **VB 基础**：6 formula_cards + 2 example_boxes + 1 curve_chart — 公式数量多，是增强的重点也是难点。
- **主要问题**：
  1. 91% children short，模板 node。
  2. 4/6 formula_cards 自然语言公式，0/6 priority。
  3. 2 example_boxes 缺 sourceType/sourceNote。
  4. ch04 应重组为 "复利与计息频率/零息利率与收益率曲线/远期利率/久期与凸性/FRA/利率期货" 的教学模块。
- **推荐处理**：**Full Enhancement**。理由：利率是远期定价和互换的前置章，公式密集，必须高质量。

### ch05 确定远期和期货价格 — Grade D

- **现状**：6 nodes, 24 children, **100% short**。5/6 模板 node。17 个 VB。
- **与 ch10 增强前对比**：ch10 增强前 21/21 short (100%), 6 nodes, 5/6 template, 12 VBs。ch05 为 24/24 short (100%), 6 nodes, 5/6 template, 17 VBs。VB 基础甚至更强。
- **VB 基础**：5 formula_cards + 3 example_boxes + 1 curve_chart — 核心定价章节，VB 数量多。
- **主要问题**：
  1. 100% children short，模板 node。
  2. 5 个 formula_cards 全部自然语言公式，0/5 priority。3/5 formulaLatex 无 LaTeX 命令。
  3. 3 example_boxes 缺 sourceType/sourceNote。
  4. 应重组为 "无收益资产/已知现金收益/已知收益率/货币远期/商品远期与便利收益/期货价格与预期即期价格" 的教学模块。
- **推荐处理**：**Full Enhancement**。

### ch07 互换 — Grade D

- **现状**：6 nodes, 23 children, **100% short**。5/6 模板 node。18 个 VB。
- **与 ch10 增强前对比**：ch10 增强前 21/21 short (100%), 6 nodes, 5/6 template, 12 VBs。ch07 为 23/23 short (100%), 6 nodes, 5/6 template, 18 VBs。VB 数量最多。
- **VB 基础**：最强——18 个 VB（2 formula_cards + 1 example_box + 3 process_flows + 3 cashflow_diagrams + 1 timeline + 1 case_card + 2 comparison_tables + 1 concept_map + 1 data_table）。
- **主要问题**：
  1. 100% children short，模板 node。
  2. 1/2 formula_cards 自然语言公式，0/2 priority。
  3. 1 example_box 缺 sourceType/sourceNote。
  4. 应重组为 "利率互换机制/互换利率与报价/比较优势/互换定价（债券法/FRA法）/货币互换/信用风险/CDS概述" 的教学模块。
- **推荐处理**：**Full Enhancement**。

## 4. Formula / Example / Visual Risks

### Formula Card 质量汇总

| Chapter | Formula Cards | Natural Lang | No Priority | Latex No Cmds |
|---------|-------------|-------------|-------------|---------------|
| ch01 | 2 | 2 | 2 | 1 |
| ch02 | 1 | 0 | 1 | 0 |
| ch03 | 4 | 4 | 4 | 0 |
| ch04 | 6 | 4 | 6 | 0 |
| ch05 | 5 | 5 | 5 | 3 |
| ch07 | 2 | 1 | 2 | 0 |
| **Total** | **20** | **16** | **20** | **4** |

- 20/20 formula_cards 缺少 priority。
- 16/20 使用自然语言公式（如 "F = S_0 e^{rT}" 写在 formula 字段）。
- 4/20 formulaLatex 无 LaTeX 命令（即 formulaLatex 也是纯文本）。

### Example Box 质量汇总

| Chapter | Example Boxes | Missing sourceType | Missing sourceNote |
|---------|-------------|--------------------|--------------------|
| ch01 | 1 | 1 | 1 |
| ch02 | 1 | 1 | 1 |
| ch03 | 4 | 4 | 4 |
| ch04 | 2 | 2 | 2 |
| ch05 | 3 | 3 | 3 |
| ch07 | 1 | 1 | 1 |
| **Total** | **12** | **12** | **12** |

12/12 example_box 全部缺 sourceType 和 sourceNote。

### Curve Chart 质量

- ch03：基差收敛示意，1 curve，5 points。points 合理。缺 description 和 keyTakeaways 需扩展。
- ch04：久期近似与凸性修正示意，2 curves，各 5 points。结构完整。
- ch05：期货价格与预期未来即期价格关系示意，1 curve，5 points。需补 description。
- ch01/ch02/ch07：无 curve_chart。非阻塞——这些章的核心不是图形定价关系。

### 工程词

所有 6 章的用户可见文本（summary、children、title 等）均未发现 chunk/generated/filePath/node id/fallback 等工程词。

## 5. Recommended Priority Order

| 顺序 | Chapter | 等级 | 理由 |
|------|---------|------|------|
| 1 | ch04 利率 | D | 利率是所有后续定价章（ch05 远期定价、ch07 互换）的前置基础。早做利率可避免后续章引用了未增强的利率内容。 |
| 2 | ch05 远期和期货价格 | D | 核心定价章，连接 ch04 利率和衍生品定价。公式密集（5 formula_cards），是课程核心。 |
| 3 | ch07 互换 | D | 应用定价章，用利率和远期定价结果。VB 基础最强（18），但 children 100% short。 |
| 4 | ch03 对冲策略 | D | 应用章，连接 ch02 期货运作和 ch05 定价。需用到基差、最优比率等概念。 |
| 5 | ch02 期货运作 | C | 已在 ch10/ch11 后做了部分展开，只需局部增强。排在 D 级章之后以避开高优先级章。 |
| 6 | ch01 导言 | C | 导言章内容量小、可接受较短 children。排在最后以最终串联各章。 |

**顺序逻辑**：先做前置/基础章（利率→远期定价），再做应用章（互换→对冲），最后做运作章和导言。

### 可行性变体

如果团队并行工作，可以将 4 个 D 级章分为两组并行：ch04+ch05（定价线）和 ch03+ch07（应用/策略线），然后 ch02+ch01 收尾。

## 6. Next Recommended Chapter

**ch04 利率**。

理由：
1. ch04 是 D 级章中公式最多（6 formula_cards）且 formula 质量最差的——4/6 自然语言。
2. 利率是远期定价（ch05）和互换（ch07）的计算基础。
3. ch04 有一个 curve_chart（久期近似与凸性修正示意）可复用并改进。
4. 做完 ch04 后，ch05 增强时可以直接引用 ch04 已增强的复利/贴现/远期利率内容。

## 7. Validation Result

待执行 npm --prefix "study-ai-mvp" run validate:content。

本次审计未修改 framework-detailed.json，因此校验结果应与此前 build 状态一致。
