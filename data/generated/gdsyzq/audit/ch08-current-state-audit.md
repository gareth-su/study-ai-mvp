# 第 8 章当前状态审计报告

审计日期：2026-05-13  
审计对象：`data/generated/gdsyzq/full/framework-detailed.json` ch08  
参考：`ch08-enhancement-report.md`、`ch08-enhancement-status-audit.md`、`ch08-slide-inventory.md`、`ch08-priority-map.md`、`ch08-example-application-audit.md`、`ch08-visual-critical-audit.md`、`ch08-enhancement-plan.md`  
对比基准：ch05（polished）、ch06（polished）、ch07（polished-near）  
本轮性质：只审计，不修改正文 JSON。

---

## Executive Summary

- **当前状态判断：`polished-near`**（接近 polished，略低于 ch06/ch07 标准）。
- 第 8 章已经历一轮整章增强（2026-05-12），从 7 nodes / 10 visualBlocks / 0 example_box 提升至 11 nodes / 23 visualBlocks / 1 example_box。
- 关键 P0 问题（自然语言 formula、CreditMetrics 例题链缺失、信用评级/4C/Altman 空白）已在增强中修复。
- 验证器对 ch08 零警告——是全书 8 章中唯一零警告的章节。
- 与 ch06/ch07 polished 标准相比，主要差距在：children 文本偏薄、example_box 偏少、无 image 类型、comparison_table 占比偏高。
- **建议下一步：局部增强**（非全章增强、非 post-review 直接通过）。

---

## 1. 内容覆盖检查

| 主题 | 状态 | 证据 | 缺口 |
|---|---|---|---|
| 利率风险 + 价格-收益率反向关系 | ✅ 已覆盖 | node[2] 风险类型总览 children[0]；VB comparison_table 风险对比表 | 机制说明以文字/表格为主，缺直观价格-收益率曲线图 |
| 收益率曲线风险（平行/非平行/斜率/曲率） | ✅ P0 视觉链条已修复 | node[3]；VB curve_chart + chart_explanation + comparison_table | 曲线为概念示意点，非 PPT 原图复刻（已记录、非阻塞） |
| 再投资/赎回/提前偿付风险 | ✅ 已覆盖 | node[2] children[2][3] | children 文本偏薄（59/62 chars） |
| 信用风险三分法 | ✅ 已覆盖 | node[4] children[0][1][2]；VB comparison_table | children 偏薄（32-38 chars） |
| 信用评级 + 评级信息 + 依赖评级风险 | ✅ 已覆盖 | node[4] children[3][4]；VB process_flow + comparison_table | — |
| 4C 分析（Capacity/Collateral/Covenants/Character） | ✅ 已覆盖 | node[5]；VB comparison_table | children 偏薄（23-35 chars） |
| 预期信用损失公式 | ✅ 已修复 | VB formula_card `EL=PD\times(1-RR)\times EAD` | 缺给定数值的计算小例题 |
| 相对 VaR 公式 | ✅ 已修复 | VB formula_card `VaR_{relative}=\bar{V}-V_q` | 与 CreditMetrics 例题已绑定 |
| CreditMetrics 完整链条 | ✅ 已补足 | node[7]；VB process_flow + data_table×2 + example_box | 均值数字需人工复核（已标注） |
| Altman Z 值 + ZETA + 局限性 | ✅ 已补足 | node[8]；VB formula_card + data_table + comparison_table×2 | Altman 精确系数需人工复核（已标注） |
| 泰禾案例 | ✅ 已增强 | VB case_card | — |
| 复习清单 + 易混点 + 复习路径 | ✅ 存在 | node[9][10][11]；VB data_table | 易混点 children 偏薄 |
| **久期 / 凸性 / 免疫策略** | ⚠️ 未覆盖但不应覆盖 | ch03 提及"为后续久期打基础"，PPT 本章无久期/凸性主线 | **非缺口**：本章范围不包含，不应补入 |

---

## 2. 提纲化 / 空泛化 / PPT 罗列化检查

### 2.1 Node children 文本深度

ch08 children 平均 39 chars，对比：

| 章节 | children 数 | 平均 chars/child | short (<40) child 数 | short 占比 |
|---|---|---|---|---|
| ch01 | 16 | 32 | 14 | 87% |
| ch02 | 20 | 27 | 18 | 90% |
| ch03 | 77 | 32 | 68 | 88% |
| ch04 | 67 | 34 | 54 | 81% |
| ch05 | 37 | 35 | 26 | 70% |
| **ch06** | **37** | **52** | **7** | **19%** |
| **ch07** | **38** | **58** | **2** | **5%** |
| **ch08** | **46** | **39** | **29** | **63%** |

**判断**：ch08 处于中间水平，优于 ch01-ch05 但明显低于 ch06-ch07 的 polished 标准。63% 的 children < 40 chars，属于"概念点有但解释不充分"的临界状态。

典型薄弱 child：
- `Character` 23 chars（"关注管理层治理、信息披露、履约意愿和历史行为。"）
- `第 1 步` 15 chars（"先背清主要风险类型和影响对象。"）
- `信用利差风险` 31 chars

### 2.2 提纲化风险点

ch08 不存在"一句话 nodes"问题——每个 node 都有 3-5 个 children，每个 child 有 summary。但 children 的 summary 普遍偏短，读起来更像 bullet point 而非展开学习段落。这是与 ch06/ch07 的主要差距：ch06/ch07 的 children 更接近"可独立阅读的理解段落"。

### 2.3 PPT 罗列化

不存在 PPT 逐页搬运问题。PPT 76 页中 P3 材料（外链、截图、机构页面）已被正确排除，仅保留机制和案例主线。

---

## 3. 公式规范性检查

| 公式 | formula 字段 | formulaLatex | 变量说明 | 易错点 | 状态 |
|---|---|---|---|---|---|
| 含权债券价格分解 | `P_{callable}=P_{straight}-C_{call}` | ✅ | ✅ | ✅ | ✅ 规范 |
| 预期信用损失 | `EL=PD\times(1-RR)\times EAD` | ✅ | ✅ | ✅ | ✅ 规范 |
| 相对 VaR | `VaR_{relative}=\bar{V}-V_q` | ✅ | ✅ | ✅ | ✅ 规范 |
| 信用评分线性判别 | `Z=\sum_{k=1}^{n}w_kX_k` | ✅ | ✅ | ✅ | ✅ 规范 |

**判断**：公式已全部规范化。零自然语言 formula、零半 LaTeX、零 `imes` typo（`\times` 是正确 LaTeX）。验证器零警告可佐证。

---

## 4. VisualBlock 可渲染性与类型分布

### 4.1 可渲染性

所有 23 个 visualBlock 均有必需的渲染字段（curve_chart 有 curves/points，formula_card 有 formula/variables，example_box 有 scenario/steps）。无空 chart、无残缺 block。

### 4.2 类型分布对比

| 类型 | ch05 | ch06 | ch07 | **ch08** | 评价 |
|---|---|---|---|---|---|
| example_box | 5 | 5 | 4 | **1** | ⚠️ 偏少 |
| formula_card | 4 | 11 | 4 | **4** | ✅ 合理 |
| data_table | 3 | 1 | 1 | **4** | ✅ 合理 |
| comparison_table | 5 | 5 | 3 | **8** | ⚠️ 占比过高 (35%) |
| curve_chart | 0 | 0 | 0 | **1** | ✅ 独有优势 |
| chart_explanation | 2 | 0 | 1 | **1** | ✅ 合理 |
| process_flow | 2 | 2 | 2 | **2** | ✅ 合理 |
| case_card | 0 | 0 | 1 | **1** | ✅ 合理 |
| concept_map | 0 | 0 | 0 | **1** | ✅ 独有优势 |
| image | **5** | **4** | **2** | **0** | ⚠️ 缺失 |
| cashflow_diagram | 0 | 0 | 1 | **0** | △ 可选 |
| decision_tree | 1 | 0 | 0 | **0** | △ 可选 |

**判断**：
- comparison_table 占比 35%（8/23）偏高。ch07 为 16%，ch06 为 18%。存在"把本可以用其他形式表达的内容塞进对比表"的风险。
- 零 image：所有 polished 章节都有 image（ch05=5, ch06=4, ch07=2）。PPT 中存在可安全裁切的图（如 Z 值模型公式图、迁移矩阵图、信用利差机制图），但尚未纳入。
- example_box 仅 1 个：PPT 中 CreditMetrics 是唯一完整计算链，已覆盖。但预期信用损失可作为一个小型数值算例（给定 PD/RR/EAD 求 EL）。

---

## 5. 例题链完整性

| PPT 页 | 候选例题 | 当前状态 | 建议 |
|---|---|---|---|
| 53-60 | CreditMetrics 相对 VaR 计算 | ✅ example_box 已存在 | 维持，人工复核均值数字 |
| 18 | 预期信用损失计算 | △ 仅有 formula_card，无数值例题 | 可选：补小型 example_box（给定 PD=2%, RR=40%, EAD=100 → EL=1.2） |
| 7-8 | 美债拍卖思考题 | P2，不适用 | 不补（非计算题） |

**判断**：例题链基本完整。CreditMetrics 已从 process_flow 升级为完整 example_box。预期信用损失的数值算例是锦上添花（P1），非阻塞。

---

## 6. 与 ch05/ch06/ch07 的差距

| 维度 | ch05 | ch06 | ch07 | ch08 | 差距评估 |
|---|---|---|---|---|---|
| 验证器警告 | 0 | 有 | 0 | **0** | 持平 |
| children 平均深度 | 35 | 52 | 58 | **39** | 低于 ch06/ch07 |
| short children 占比 | 70% | 19% | 5% | **63%** | 低于 ch06/ch07 |
| example_box 数 | 5 | 5 | 4 | **1** | 偏少（但 PPT 支撑有限） |
| image 数 | 5 | 4 | 2 | **0** | 缺口 |
| comparison_table 占比 | 19% | 18% | 16% | **35%** | 偏高 |
| 公式规范性 | ✅ | ⚠️ | ✅ | **✅** | 持平或更好 |
| 结构逻辑完整 | ✅ | ✅ | ✅ | **✅** | 持平 |

**总结**：ch08 在公式规范和结构完整性上已追平 polished 标准，但在文本深度和视觉多样性上仍有差距。

---

## 7. 当前状态判断

**`polished-near`**

理由：
- 结构完整、公式规范、验证器零警告——已超越 partial 状态。
- 但 children 文本深度（39 avg）、example_box 数（1）、image 数（0）、comparison_table 占比（35%）四项指标仍低于 ch06/ch07 的 polished 基准线。
- 不满足"可直接 post-review"条件（文本深度不够，学生端阅读体验偏 bullet-point 化）。

---

## 8. 建议下一步：局部增强

**不建议全章增强**：结构、公式、内容覆盖已到位，无需重做。

**不建议直接 post-review**：children 文本偏薄、comparison_table 过多、零 image 是实质品质问题。

**局部增强范围**：

### P1（应做）
1. **Children 文本充实**：将 29 个 < 40 chars 的 children 扩展到 50-80 chars，使其从 bullet point 升级为可独立阅读的理解句段。重点区域：信用风险三分法、4C 分析、易混点、复习路径。
2. **comparison_table 瘦身**：将 1-2 个 comparison_table 转换为其他类型（如将"依赖信用评级的风险"转为 process_flow，将"Altman/ZETA 对比"精简或合并）。
3. **新增 1-2 个 image**：从 PPT 中选取安全可裁切的图（如 Altman Z 值公式图、信用利差机制图），需确认无版权/部署风险。

### P2（可选）
4. **预期信用损失小型算例**：新增 example_box（给定 PD、RR、EAD 数值求 EL）。
5. **cashflow_diagram**：为再投资风险或提前偿付风险新增现金流示意图。
6. **久期/凸性引用修正**：当前 chart_explanation 和 comparison_table 中提到"久期和凸性之外"，但学生在本章未学。可改为"利率水平变动之外"或加注"久期/凸性详见后续章节"。

---

## 9. 风险点

| 风险 | 严重度 | 说明 |
|---|---|---|
| CreditMetrics 均值数字不一致 | 中 | PPT 59-60 页 `107.90` vs `107.09`，正文已标注需人工复核 |
| Altman Z 精确系数缺失 | 低 | 来自 PPT 图片对象，正文用线性判别通式替代，不阻塞学习 |
| 曲线图为概念示意点 | 低 | 非历史数据，已在 description 中声明 |
| 零 image 影响学习体验 | 中 | 纯文字+表格的信用风险章节可能枯燥，但当前 visualBlock 类型已较丰富 |
| children 偏薄导致学生端阅读偏提纲化 | 中 | 63% children < 40 chars，与 polished 标准差距明显 |

---

## 10. 修改文件列表（审计阶段不改）

本轮不修改以下文件：

- `data/generated/gdsyzq/full/framework-detailed.json`（不修改）
- `data/generated/gdsyzq/full/framework-concise.json`（不修改）
- `src/**`（不修改）
- `source-materials/**`（不修改）

仅输出本审计报告：
- `data/generated/gdsyzq/audit/ch08-current-state-audit.md`（新增/更新）

---

## 11. 验证

- `npm run validate:content`：通过，ch08 零警告。
- 本轮审计未修改任何 generated JSON、src 或 source-materials。
