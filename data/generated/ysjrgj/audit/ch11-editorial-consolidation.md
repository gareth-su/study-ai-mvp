# ysjrgj 第 11 章 Editorial Consolidation

执行日期：2026-05-14
最终状态：**polished-near**（待后审确认是否 polished）

## 整合清单

### 1. Node 重组 ✓
6→9 nodes，模块顺序符合期权性质学习逻辑：
总览 → 六因素 → 上限 → 下限（含无套利推导）→ 平价 → 股息 → 提前行权 → 边界综合 → 易混点/复习

### 2. Children 扩写 ✓
31 children, avg 185 chars, 0 short。每段包含概念含义、适用条件、推导逻辑或与公式/图表/例题的关联。

### 3. Formula / JSON 修复 ✓
- 所有 `e^{-rT}` 的 `\r`→CR bug 已修复（4 formula_card + 3 example_box steps）
- 4 formula_card 全部含合法 LaTeX formula 和 formulaLatex
- 4 formula_card 全部含 priority 字段（P0×3, P1×1）

### 4. Example_box 标注 ✓
3 example_box 均补 sourceType="标准化复习例题" 和 sourceNote，说明参数来源。

### 5. 成组概念覆盖 ✓
- 看涨/看跌：正文、formula_card、curve_chart、example_box 均对称覆盖
- 欧式/美式：正文明确区分；上限卡独立标注欧式/美式差异
- 上限/下限：正文、formula_card、curve_chart 覆盖；看跌边界在看涨chart中说明
- 无股息/有股息：正文独立node + formula_card区分
- 六因素：正文全因素展开 + data_table矩阵 + chart示意

### 6. 工程词 ✓
用户可见内容无工程词暴露。

### 7. 已知可提升点（非阻断）
- curve_chart[1] 只展示看涨上下界，看跌上下界通过文字说明推导——如需完全对称可新增看跌上下界chart
- comparison_table[0]（影响因素方向）未添加priority——非阻断，data_table已提供完整矩阵
