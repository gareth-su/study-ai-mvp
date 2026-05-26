# 第 3 章公式清理报告

日期：2026-05-13
范围：`data/generated/gdsyzq/full/framework-detailed.json` 第 3 章所有 `formula_card.formula` 字段

## 清理摘要

共修复 9 个 `formula_card` 的 `formula` 字段，从自然语言/半数学文本统一改为规范 LaTeX。

## 逐项修复记录

### 1. 当期收益率计算公式 (visualBlocks[1])

| 项目 | Before | After |
|---|---|---|
| formula | `CY = annual coupon / bond price` | `CY=\frac{C_{annual}}{P}` |
| usage | (无) | `用于快速衡量债券当前票息收入相对价格的比例。` |

### 2. 到期收益率的现金流折现方程 (visualBlocks[3])

| 项目 | Before | After |
|---|---|---|
| formula | `Dirty price = present value of all bond cash flows discounted at YTM` | `P_{dirty}=\sum_{t=1}^{T}\frac{CF_t}{(1+y)^t}` |

### 3. 债券等值收益率 BEY (visualBlocks[4])

| 项目 | Before | After |
|---|---|---|
| formula | `BEY = semiannual YTM × 2` | `BEY=2y_{semi}` |

### 4. 再投资收益求和公式 (visualBlocks[8])

| 项目 | Before | After |
|---|---|---|
| formula | `RI = sum of future value gain from reinvested coupons` | `RI=\sum_{t=1}^{n}C\left[(1+r)^{n-t}-1\right]` |

### 5. 零息债券即期收益率公式 (visualBlocks[12])

| 项目 | Before | After |
|---|---|---|
| formula | `P = F / (1 + z_T)^T` | `P=\frac{F}{(1+z_T)^T}` |

### 6. 自展法例题关键价格方程 (原 visualBlocks[16]，现 visualBlocks[17])

| 项目 | Before | After |
|---|---|---|
| title | `1.5 年即期利率自展方程` | `自展法例题关键价格方程` |
| formula | `100 = 1.75/(1+3%/2) + 1.75/(1+3.3%/2)^2 + 101.75/(1+z/2)^3` | `100=\frac{1.75}{1+3\%/2}+\frac{1.75}{(1+3.3\%/2)^2}+\frac{101.75}{(1+z/2)^3}` |
| usage | (原无) | `配套"利率期限结构构造例子：1.5 年期即期收益率自展"使用...` |
| position | 在 example_box 之前 | 移到 example_box 之后，作为步骤辅助公式 |

### 7. 两期远期利率与即期利率关系 (visualBlocks[19])

| 项目 | Before | After |
|---|---|---|
| formula | `f = (1 + z_2)^2 / (1 + z_1) - 1` | `f=\frac{(1+z_2)^2}{1+z_1}-1` |

### 8. 多期远期利率推广公式 (visualBlocks[20])

| 项目 | Before | After |
|---|---|---|
| formula | `f_m = (1 + z_{m+1})^{m+1} / (1 + z_m)^m - 1` | `f_m=\frac{(1+z_{m+1})^{m+1}}{(1+z_m)^m}-1` |

### 9. 利率期限结构理论：纯预期理论长期即期利率公式 (visualBlocks[24])

| 项目 | Before | After |
|---|---|---|
| formula | `z_T = [(1+z_1)(1+f_1)...(1+f_{T-1})]^{1/T} - 1` | `z_T=\left[(1+z_1)(1+f_1)(1+f_2)\cdots(1+f_{T-1})\right]^{1/T}-1` |

## 自展法链条重新绑定

原顺序：process_flow(15) → formula_card 孤立(16) → example_box(17) → data_table(18)

修复后顺序：process_flow(15) → example_box(16) → 辅助 formula_card(17) → data_table(18)

example_box(16) 新增 steps：
1. 列出 1.5 年期国债现金流
2. 查看现金流贴现表确认已知贴现率
3. 写出价格方程（引用公式卡）
4. 说明方程中只有最后一期折现率未知
5. 求解得到 `z=3.5053%`

## 第 41 页例题增强

`例子 4：由远期利率反推 3 年期即期利率` 新增字段：
- `scenario`：已知 1 年期利率 3%，1 年后和 2 年后的 1 年期远期利率 5% 和 7%，求 3 年期即期利率。
- `steps`：5 步求解链（拆解投资路径 → 设定未知 → 无套利等式 → 求解式 → 计算得 4.99%）
- `takeaway`：远期利率反推核心是"总收益因子相等"
- `note`：答案保留人工复核标记

## 第 39 页扩展表处理

按人工审核意见，`远期利率示例表：即期利率与远期利率` 已从 visualBlocks 删除。

## 验证状态

- `formula` 字段无自然语言残留
- `formula` 与 `formulaLatex` 对齐
- 自展法公式卡不再孤立
- validate:content / lint / build 待运行
