# ysjrgj 第 10 章 Claude 小修记录

执行日期：2026-05-14

## Modified Files

- `data/generated/ysjrgj/full/framework-detailed.json`
- `data/generated/ysjrgj/audit/ch10-claude-review.md`
- `data/generated/ysjrgj/audit/ch10-claude-fix-notes.md`
- `data/generated/ysjrgj/audit/ch10-final-status.json`

## Fixes Applied

### 1. example_box 参数来源说明补强

位置：第 10 章第二个 example_box `期权头寸到期盈亏计算（标准化复习例题）`

原状态：

- 已说明本例使用通用教学参数 K=60, c=6, p=5。
- 已说明 payoff_chart 参数为 K=50, c=5, p=4。
- 但未逐字包含审计要求中的“该例题使用另一组标准化参数，不对应上方 payoff_chart”。

修复后：

- sourceNote 明确写为：该例题使用另一组标准化参数，不对应上方 payoff_chart：本例为 K=60, c=6, p=5；payoff_chart 为 K=50, c=5, p=4。两个版本均可用于理解头寸盈亏计算逻辑。

### 2. formula_card 扩为四类头寸利润公式

位置：第 10 章 visualBlocks[0] `四类期权头寸到期收益公式（P0）`

原状态：

- formula_card 只展示 Long Call 与 Long Put 的基础公式。
- Short Call 与 Short Put 公式已在正文和 example_box 中出现，但未集中展示在 formula_card。

修复后：

- formula 与 formulaLatex 均更新为四类头寸利润公式：Long Call、Short Call、Long Put、Short Put。

### 3. payoff_chart breakEvenPoints 补齐空头头寸

位置：第 10 章 payoff_chart `四类期权头寸到期收益图`

原状态：

- breakEvenPoints 只列 Long Call 与 Long Put，正文已说明 Short Call 与 Short Put 的 BE。

修复后：

- breakEvenPoints 补齐 Short Call 与 Short Put：看涨头寸均为 K+c=55，看跌头寸均为 K-p=46。

## No Large Rewrite Performed

未进行大规模重组。原因：当前第 10 章已经满足 polished：结构、头寸逻辑、payoff_chart、公式、example_box、PPT 覆盖和网页呈现风险均未发现阻断性问题。

## Not Changed

- 未修改 concise。
- 未修改 ysjrgj 其他章节。
- 未修改 gdsyzq。
- 未修改 source-materials。
- 未修改 src、Prisma、数据库、package.json 或 lockfile。
