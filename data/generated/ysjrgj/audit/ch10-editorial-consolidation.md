# ysjrgj 第 10 章 Editorial Consolidation

执行日期：2025-05-14
最终状态：**polished-near**

## 整合清单

### 1. Node 重组 ✓
6→9 nodes，模块顺序符合期权学习逻辑：
总览 → 合约要素 → 看涨/看跌 → 头寸盈亏 → 价值构成 → 保证金/清算 → 市场参与者 → 期权型工具 → 易混点/复习

### 2. Children 扩写 ✓
31 children, avg 150 chars, 0 short。每个核心头寸包含构造方式、盈亏公式、BE推导、适用观点。

### 3. Payoff Chart 一致性 ✓
- 4 curves × 16 pts 数据未修改
- node[3] 文字中 BE=55 (call K+c=50+5) 和 BE=46 (put K-p=50-4) 与 chart 一致
- 新example_box使用不同参数(K=60)，已标注差异

### 4. Formula 修复 ✓
formula字段替换为formulaLatex值，不再含自然语言。

### 5. Example_box 标注 ✓
新增头寸盈亏example_box标注为"标准化复习例题"，包含sourceType和sourceNote字段。

### 6. 工程词 ✓
用户可见内容无工程词暴露。
