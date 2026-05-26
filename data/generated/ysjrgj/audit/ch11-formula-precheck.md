# ysjrgj 第 11 章 Formula / LaTeX Precheck

执行日期：2026-05-14
对应：ch11-pre-audit.md §3

---

## 1. Summary

第 11 章共有 4 个 formula_card 和 3 个 example_box（含公式），覆盖：无股息欧式下限、看跌看涨平价、价格上限、含股息看跌看涨平价、下限套利示例、看跌下限套利示例、平价套利示例。

**核心发现**：
1. 所有 `e^{-rT}` 中的 `\r` 在 JSON 中被解析为回车符（CR），导致公式损坏。
2. 2 个 formula_card 的 formulaLatex 完全没有 LaTeX 格式。
3. 3 个 example_box 全部缺少 sourceType/sourceNote。
4. 仅 formula_card[1]（下限）的 LaTeX 命令使用了正确的 JSON 转义（`\\ge`、`\\max` 等）。

---

## 2. Formula Card Details

### Card 0 (VB[1])：无股息欧式期权下限

| 字段 | 当前值 | 问题 |
|---|---|---|
| formula | `c ≥ max{S_0 - K e^{-rT}, 0}; p ≥ max{K e^{-rT} - S_0, 0}` | Unicode `≥`；`max{}` 非 LaTeX；`\r`→CR |
| formulaLatex | `c \ge \max\left(S_0-Ke^{-rT},0\right);\quad p \ge \max\left(Ke^{-rT}-S_0,0\right)` | `\r`→CR 损坏指数；命令转义正确 |
| variables | 缺 c/p 分别含义、缺贴现意义 | 不够清晰 |
| pitfalls | "下限不能为负" + "有股息时调整" | 缺“无股息、欧式”前置条件 |

**增强时修复**：
- formula → 纯 LaTeX：`c \geq \max(S_0 - Ke^{-rT}, 0);\quad p \geq \max(Ke^{-rT} - S_0, 0)`（JSON 中双反斜杠）
- formulaLatex → 修复 `\r`：所有 `e^{-rT}` 改为 `e^{-rT}`（JSON 中为 `e^{-rT}`）
- pitfalls → "仅适用于无股息欧式期权。下限不能为负。有股息时需调整。"
- 添加 priority: "P0"

### Card 1 (VB[2])：看跌看涨平价

| 字段 | 当前值 | 问题 |
|---|---|---|
| formula | `c + K e^{-rT} = p + S_0` | `\r`→CR；无 LaTeX |
| formulaLatex | `c + K e^{-rT} = p + S_0` | `\r`→CR；完全无 LaTeX 命令 |
| variables | 4个参数含义正确 | 可接受 |
| pitfalls | 2 条均合理 | 可接受 |

**增强时修复**：
- formula → `c + Ke^{-rT} = p + S_0`（`e^{-rT}` 在 JSON 中为 `e^{-rT}` — 注意无 `\r`）
- formulaLatex → `c + Ke^{-rT} = p + S_0`
- usage → 现有已含“同一股票、同一执行价格、同一到期日的欧式”，可再强调“无股息”
- 添加 priority: "P0"

### Card 2 (VB[4])：期权价格上限

| 字段 | 当前值 | 问题 |
|---|---|---|
| formula | `c ≤ S_0; C ≤ S_0; p ≤ K e^{-rT}; P ≤ K` | `\r`→CR |
| formulaLatex | `c \le S_0;\quad C \le S_0;\quad p \le K e^{-rT};\quad P \le K` | `\r`→CR；`\\le`/`\\quad` 转义正确 |
| variables | 大小写 c/C p/P 的含义 | 可接受 |

**增强时修复**：
- formulaLatex 中 `e^{-rT}` 改为 `e^{-rT}`
- pitfalls → 补“欧式看跌上限为贴现值，美式看跌上限为执行价格本身”
- 添加 priority: "P0"

### Card 3 (VB[5])：含股息看跌看涨平价

| 字段 | 当前值 | 问题 |
|---|---|---|
| formula | `c + D + K e^{-rT} = p + S_0` | `\r`→CR；无 LaTeX |
| formulaLatex | `c + D + K e^{-rT} = p + S_0` | `\r`→CR；完全无 LaTeX 命令 |
| variables | 缺 D 的解释 | 不完整 |

**增强时修复**：
- formulaLaTeX → `c + D + Ke^{-rT} = p + S_0`
- variables → 补 D 含义“期权期限内股息现值”
- pitfalls → 已有“D 是股息现值”，可补“股息提高看跌价值、降低看涨价值”
- 添加 priority: "P1"

---

## 3. Example Box Formula Check

### Example 1：看涨下限套利
- 参数：c=3, S₀=20, K=18, T=1, r=10%
- 贴现执行价格：18e^{-0.1}≈16.29 ✓
- 下限：20-16.29=3.71 ✓
- 市场价格 3 < 3.71 → 存在套利 ✓
- `\r` 检查：steps[0] 中 `Ke^{-rT}` 有 `\r`→CR 风险

### Example 2：看跌下限套利
- 参数：p=1, S₀=37, K=40, T=0.5, r=5%
- 贴现执行价格：40e^{-0.025}≈39.01 ✓
- 下限：39.01-37=2.01 ✓
- 市场价格 1 < 2.01 → 存在套利 ✓

### Example 3：平价套利
- 参数：c=3, p=2.25, S₀=31, K=30, T=0.25, r=10%
- 左边：3+30e^{-0.025}≈32.26 ✓
- 右边：2.25+31=33.25 ✓
- 差价 0.99 → 存在套利 ✓

**所有三个例题的逻辑和数值均正确。**

---

## 4. LaTeX Risk Summary

| 攻击载体 | 受影响 count | 严重度 | 修复难度 |
|---|---|---|---|
| `e^{-rT}` 中 `\r`→CR | 4 formula_card + 3 example_box 正文 | **High** | 全局替换为 `e^{-rT}`（JSON 中写为 `e^{-rT}`） |
| formulaLatex 无 LaTeX 格式 | 2 cards（平价、含股息平价） | Medium | 重写 formulaLatex |
| Unicode ≥ in formula | 1 card（下限） | Low | 改为 `\geq` |
| max{} 非 LaTeX | 1 card（下限） | Low | 改为 `\max()` |
| example_box 缺来源标注 | 3 boxes | Medium | 补 sourceType/sourceNote |

---

## 5. 修复验证清单

增强后须验证：
- [ ] 所有 `e^{-rT}` 在 JSON 中不再含 `\r`（不存在裸反斜杠+r 序列）
- [ ] 所有 formulaLatex 字段通过 `\\(ge|le|max|left|right|quad|pi|sigma)` 模式正确使用双反斜杠
- [ ] formula_card 均含 priority 字段
- [ ] example_box 均含 sourceType 和 sourceNote
- [ ] JSON.parse 无误
- [ ] LaTeX 渲染预览无断行/乱码
