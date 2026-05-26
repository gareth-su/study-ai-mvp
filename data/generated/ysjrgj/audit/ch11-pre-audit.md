# ysjrgj 第 11 章预审计

执行日期：2026-05-14
章节：第十一章 股票期权的性质
文件：data/generated/ysjrgj/full/framework-detailed.json chapters[7]
性质：只读诊断，不修改正文

---

## 1. Summary

第 11 章当前为**纯提纲状态**：23/23 children 全部 <40 chars（avg 26 chars），6 nodes 使用通用模板命名（核心机制、核心概念、关键公式与计算逻辑、易混点、复习路径），而非按期权性质的实际教学模块组织。

VB 层面比增强前第 10 章更强：4 个 formula_card、3 个 example_box、2 个 curve_chart、2 个 comparison_table、1 个 data_table、1 个 process_flow。但存在隐蔽的 JSON 转义/渲染风险（详见 §3）。

**结论：D 级 — Full Enhancement。** 与第 10 章增强前状态高度相似（ch10: 21/21 short, avg 24 chars → ch11: 23/23 short, avg 26 chars）。VB 基础可复用，children 必须全部重写。

---

## 2. Current Structure Diagnosis

### 2.1 Node 结构

| Node | 名称 | Children | Avg chars | 问题 |
|---|---|---|---|---|
| 0 | 章节总览 | 3 | 30 | 全部 <40 |
| 1 | 核心机制 | 6 | 32 | 全部 <40，6个不相关内容挤在一起 |
| 2 | 核心概念 | 3 | 22 | 全部 <40 |
| 3 | 关键公式与计算逻辑 | 4 | 26 | 全部 <40 |
| 4 | 易混点 | 4 | 24 | 全部 <40 |
| 5 | 复习路径 | 3 | 15 | 全部 <40 |

**诊断**：23/23 children 100% 提纲化。Node 命名使用通用模板（核心机制/核心概念/公式逻辑/易混点/复习路径），而不是按期权性质的实际教学模块组织。

### 2.2 学习模块化评估

当前未按期权性质学习逻辑组织模块。应有的结构：

```
总览 → 影响因素（六个因素 × 方向性影响 + 经济直觉）→ 期权价格上下限（看涨+看跌+欧式vs美式）→
看跌看涨平价（无股息→有股息→公司资本结构解释）→ 提前行权判断（看涨vs看跌+股息触发条件）→
价格边界综合图示 → 套利例题链 → 易混点与复习路径
```

### 2.3 与第 10 章增强前对比

| 指标 | Ch10 增强前 | Ch11 当前 |
|---|---|---|
| Nodes | 6 | 6 |
| Children | 21 | 23 |
| Avg chars | 24 | 26 |
| Short (<40) | 21 (100%) | 23 (100%) |
| VBs | 12 | 13 |
| formula_card | 1 (含自然语言) | 4 |
| example_box | 1 | 3 |
| payoff_chart | 1 | 0 (但有2个 curve_chart) |

**关键差异**：第 11 章 VB 基础明显更强（4 个 formula_card + 3 个 example_box vs Ch10 的 1+1），但 children 同样 100% 短。意味着增强重点在 children 扩写，VB 只需修补而非重建。

---

## 3. Formula / Parity Precheck

### 3.1 Formula Card 逐卡审计

#### Card 0：无股息欧式期权下限
- **formula**：`c ≥ max{S_0 - K e^{-rT}, 0}; p ≥ max{K e^{-rT} - S_0, 0}`
  - 问题 1：使用 Unicode `≥` 和 `max{}`，非 LaTeX 格式
  - 问题 2：`e^{-rT}` 中 `\r` 在 JSON 解析时变成回车符（CR），破坏公式
- **formulaLatex**：`c \ge \max\left(S_0-Ke^{-rT},0\right);\quad p \ge \max\left(Ke^{-rT}-S_0,0\right)`
  - LaTeX 命令的 `\\` 转义正确（`\\ge`→`\ge`，`\\max`→`\max`，`\\left`→`\left`，`\\right`→`\right`，`\\quad`→`\quad`）
  - **但** `e^{-rT}` 中 `\r` 未使用 `\\r` 转义 → JSON 解析变为 CR → 公式渲染异常
- **变量表**：缺 `c`/`p` 分别说明、缺 `Ke^{-rT}` 的贴现含义说明
- **适用条件**：未明确写“无股息、欧式”

#### Card 1：看跌看涨平价
- **formula**：`c + K e^{-rT} = p + S_0`
  - **问题**：`e^{-rT}` 中 `\r` 变为 CR；无 LaTeX 格式
- **formulaLatex**：`c + K e^{-rT} = p + S_0`
  - **问题**：完全没有 LaTeX 命令包装，仅纯文本
  - **缺少**：未使用 `\\quad` 或任何 LaTeX 格式
- **适用条件**：usage 写了“同一股票、同一执行价格、同一到期日的欧式看涨和看跌”，但未强调“无股息”
- **缺少**：未展示等价复制组合的现金流逻辑

#### Card 2：期权价格上限
- **formula**：`c ≤ S_0; C ≤ S_0; p ≤ K e^{-rT}; P ≤ K`
  - 问题：`e^{-rT}` 中 `\r` 变为 CR
- **formulaLatex**：`c \le S_0;\quad C \le S_0;\quad p \le K e^{-rT};\quad P \le K`
  - `\\le` 和 `\\quad` 转义正确
  - `e^{-rT}` 中 `\r` 变为 CR（同 Card 0）
- **适用条件**：未说明欧式看跌上限为执行价格现值、美式看跌上限为执行价格

#### Card 3：含股息看跌看涨平价
- **formula**：`c + D + K e^{-rT} = p + S_0`
  - 问题：`e^{-rT}` 中 `\r` 变为 CR
- **formulaLatex**：`c + D + K e^{-rT} = p + S_0`
  - **问题**：完全没有 LaTeX 格式
- **适用条件**：需说明 D 是期权期限内股息现值

### 3.2 `\r` 转义 Bug 汇总

| 受影响字段 | 文本片段 | JSON 解析结果 | 风险 |
|---|---|---|---|
| VB[1].formula | `e^{-rT}` | `e^{-` + CR + `T}` | 公式损坏 |
| VB[1].formulaLatex | `e^{-rT}` | `e^{-` + CR + `T}` | LaTeX 渲染异常 |
| VB[2].formula | `e^{-rT}` | `e^{-` + CR + `T}` | 公式损坏 |
| VB[2].formulaLatex | `e^{-rT}` | `e^{-` + CR + `T}` | LaTeX 渲染异常 |
| VB[4].formula | `e^{-rT}` | `e^{-` + CR + `T}` | 公式损坏 |
| VB[4].formulaLatex | `e^{-rT}` | `e^{-` + CR + `T}` | LaTeX 渲染异常 |
| VB[5].formula | `e^{-rT}` | `e^{-` + CR + `T}` | 公式损坏 |
| VB[5].formulaLatex | `e^{-rT}` | `e^{-` + CR + `T}` | LaTeX 渲染异常 |

**修复方案**：所有 `e^{-rT}` 改为 `e^{-rT}`（即 `e^{-rT}` 在 JSON 中需写为 `e^{-rT}`，其中 `\r` 在 JSON 文件中对应字节序列 `\` `\` `r` → JSON 解析 → `\` + `r` → 在 LaTeX 上下文中被解释为给 r 的负号… 不，实际上应该是 `6^{-rT}` 在 LaTeX 中 `^` 后面的指数是 `{-rT}`，所以公式中的 `\r` 根本不应该存在。正确的 LaTeX 是 `e^{-rT}` 而 JSON 中应写为 `e^{-rT}`，这不会有转义问题，因为 `{`, `-`, `r`, `T`, `}` 都不需要 JSON 转义。在 formula 字段中更应写成纯 ASCII 数学表达式。

**但**：当前文件中存的 `e^{-rT}` 里的 `\r` 是 JSON 标准转义序列，必须用 `\\r` 才能得到字面 `\r`。在 LaTeX 公式中，`e^{-rT}` 不需要反斜杠——指数 `{-rT}` 是普通字符。所以正确的 JSON 写法是 `e^{-rT}`，没有反斜杠。当前在 formula/LaTeX 上下文中写 `e^{-rT}`（带反斜杠）本身就是不正确的，应该修正为 `e^{-rT}`。

### 3.3 公式完整性检查

| 核心公式 | 在 formula_card 中 | 在 children 中 | 状态 |
|---|---|---|---|
| 6 因素影响方向 | ✓ (data_table) | ✓ (简略) | 有但 children 太短 |
| 看涨价格上限 | ✓ | ✗ | Card 有但 children 未展开 |
| 看跌价格上限 | ✓ | ✗ | 同上 |
| 欧式看涨下限 | ✓ | ✗ | 同上 |
| 欧式看跌下限 | ✓ | ✗ | 同上 |
| 无股息看涨-看跌平价 | ✓ | ✗ | Card 有但 LaTeX 缺失 |
| 有股息看涨-看跌平价 | ✓ | ✗ | Card 有但 LaTeX 缺失 |
| 提前行权条件 | ✗ (comparison_table) | ✓ (简略) | 有概念描述但无公式化 |

**缺失**：看涨、看跌下限公式需独立为两个 formula_card 或在同一个中清晰分段；提前行权条件可用 formula_card 中的不等式表达。

---

## 4. Example / Table / Visual Risks

### 4.1 Example_box 审计

| # | 标题 | 参数 | 逻辑 | sourceType | sourceNote |
|---|---|---|---|---|---|
| 1 | 欧式看涨下限套利 | c=3, S₀=20, K=18, T=1, r=10% | ✓ 下限=3.71>3，存在套利 | **缺失** | **缺失** |
| 2 | 欧式看跌下限套利 | p=1, S₀=37, K=40, T=0.5, r=5% | ✓ 下限=2.01>1，存在套利 | **缺失** | **缺失** |
| 3 | 看跌看涨平价套利 | c=3, p=2.25, S₀=31, K=30, T=0.25, r=10% | ✓ 左右差 0.99，存在套利 | **缺失** | **缺失** |

三个例题数值和逻辑均正确，覆盖了下限、看跌下限、平价三个核心套利应用。但：
- **全部缺少 sourceType 和 sourceNote**。
- 无法判断是 PPT 原题复原、PPT 参数转化，还是标准化复习例题。
- 增强时需补上来源标注。

### 4.2 Visual Block 类型检查

| 检查项 | 结果 |
|---|---|
| 空 chart | 0（2 个 curve_chart 均有数据点） |
| 不支持的 VB type | 0 |
| comparison_table 滥用 | 否（2 个均为真正对比型） |
| data_table 误承载例题 | 否 |
| payoff_chart 缺失 | 是（本章无 payoff_chart，暂不需要——核心是性质而非头寸盈亏） |

### 4.3 Curve_chart 审计

**Chart 0：股票价格对看涨与看跌期权价值的影响示意**
- 5 points × 2 curves，看涨递增、看跌递减
- shape 字段明确标注（"increasing" / "decreasing"）
- 数据点合理：看涨 (20→1, 80→42)，看跌 (20→32, 80→1)
- ⚠ 缺少 K 和到期时间或波动率等固定条件的说明
- ⚠ yAxis 标签为“示意”，精度足够

**Chart 1：无股息看涨期权价格上下限示意**
- PV(K)=45，上限 C=S₀（5 points），下限 max(S₀-PV(K),0)（5 points）
- 数据点正确：下限在 x≤45 时为 0，x=75 时为 30，x=100 时为 55
- ⚠ 只展示看涨上下限，未展示看跌上下限（不成组）

---

## 5. PPT Coverage Risks

PPT p01-p24 分 5 个 chunk：

| PPT 页 | 内容 | 当前覆盖 | 优先级 | 风险 |
|---|---|---|---|---|
| p01-p05 | 影响因素、假设与记号 | comparison_table + data_table + node[1].children[0] | P0 | children 需扩写为6因素×方向×理由 |
| p06-p10 | 期权价格上下限、无股息欧式看涨/看跌下限 | formula_card ×2 + curve_chart + node[1].children[1] | P0 | formula 字段需修；children 需展开无套利推导 |
| p11-p15 | 看跌看涨平价、公司资本结构解释、美式期权关系 | formula_card ×2 + node[1].children[2-4] | P0 | formulaLatex 缺失；children 需扩写组合复制逻辑 |
| p16-p20 | 看涨/看跌上下界图示、提前行权 | curve_chart + comparison_table + node[1].children[1,3] | P0 | 缺看跌上下界图示；需独立提前行权模块 |
| p21-p24 | 股息影响、提前行权、含股息平价 | formula_card + node[1].children[5] + node[2].children[1] | P1 | 有股息公式已覆盖但 children 太短 |

**主要遗漏**：
1. PPT 中的上下界图可能包含看跌部分，但当前只生成了看涨上下界 chart——需补看跌上下界或说明原因。
2. 公司资本结构解释平价仅 34 chars 提及——这是经典的教学关联，应展开。
3. 提前行权的具体数值判断条件未形成清晰的 formula_card 或决策流程图。

---

## 6. Recommended Treatment: D — Full Enhancement

### 理由

- **100% children <40 chars** — 不是“部分短”而是“全部短”，与第 10 章增强前完全一致
- **6 nodes 使用通用模板名** — “核心机制/核心概念/公式逻辑”无法反映期权性质的实际教学模块
- **children 内容必须全部重写** — 无法通过“局部修”解决
- **VB 基础较强可复用** — 4 个 formula_card（需修 `\r` 转义 + 补 LaTeX）、3 个 example_box（逻辑正确但缺来源标注）、2 个 curve_chart、comparison_tables、data_table 均保留
- **与 Ch10 增强前高度相似** — Ch10 被判定 D 级后经 full enhancement 提升到 polished

### 为什么不是 C（局部增强）

C 适用于“大部分内容 OK，少数模块需要重写”。本章 0% children 达到可接受长度——不存在“大部分内容 OK”。

### 为什么不是 B

B 适用于“文本 OK 但视觉有问题”。本章核心问题是文本不存在（只有 bullet），不是视觉问题。且 VB 实际上比文本更强。

---

## 7. Proposed Module Structure

建议重组为 8-10 nodes：

```
[0] 章节总览：期权价格的决定因素与无套利边界
[1] 影响期权价格的六个因素（方向 + 经济直觉 + 看涨vs看跌差异 + 欧式vs美式差异）
[2] 期权价格上限（看涨≤股票价格；看跌≤执行价格或贴现值）
[3] 期权价格下限与无套利证明（看涨下限 + 看跌下限 + 复制组合推导）
[4] 看跌看涨平价（无股息情形 + 等价组合现金流 + 公司资本结构解释）
[5] 股息对期权价格的影响（降低看涨、提高看跌 + 含股息平价公式）
[6] 提前行权（看涨：无股息通常不提前 + 看跌：深度实值时可能提前 + 股息触发条件）
[7] 期权型工具：认股权证、可转债与雇员期权
[8] 易混点与复习路径
```

需要修补的 VB：
- formula_card ×4：修复所有 `\r` 转义、补全 LaTeX 格式、添加优先级标记
- curve_chart ×2：保留；若可能补看跌上下界 chart
- example_box ×3：补 sourceType + sourceNote
- 不需要新增 payoff_chart（本章核心是价格性质而非头寸盈亏）

---

## 8. Files to Modify in Next Round

增强阶段允许修改：
- `data/generated/ysjrgj/full/framework-detailed.json`（第 11 章）
- `data/generated/ysjrgj/audit/ch11-enhancement-plan.md`
- `data/generated/ysjrgj/audit/ch11-enhancement-report.md`
- `data/generated/ysjrgj/audit/ch11-editorial-consolidation.md`
- `data/generated/ysjrgj/audit/ch11-priority-review.md`

禁止修改：
- `data/generated/ysjrgj/full/framework-concise.json`
- `data/generated/gdsyzq/**`
- `source-materials/**`
- `src/**`
- `Prisma / 数据库 / package.json / lockfile`
- 第 10 章、第 12 章内容

---

## 9. Validation Result

待下一轮执行时运行。
