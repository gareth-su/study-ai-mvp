# ysjrgj 第 11 章增强计划

执行日期：2026-05-14
前置审计：ch11-pre-audit.md（D 级）
计划性质：增强执行清单，不做正文修改

---

## 1. 结论

**分级：D — Full Enhancement**

理由：23/23 children 100% <40 chars（avg 26），与第 10 章增强前完全一致。VB 基础强于第 10 章增强前（4 formula_card + 3 example_box + 2 curve_chart），增强重点在 children 全部重写 + formula 修复。

---

## 2. 增强范围

### 2.1 Node 重组：6→9

```
[0] 章节总览：期权价格的决定因素与无套利边界
    - 一句话定位：股票期权价格由什么决定
    - 课程作用：第10章→第12章的中间桥梁
    - 学习主线：影响因素→上下限→平价→提前行权
[1] 影响期权价格的六个因素
    - 股票价格、执行价格：方向 + 看涨vs看跌差异
    - 到期期限：欧式不确定、美式正向
    - 波动率：看涨看跌同向
    - 无风险利率：对看涨正向、看跌负向（贴现与持有成本逻辑）
    - 股息：降低看涨、提高看跌
    - 总结表 + 经济直觉
[2] 期权价格上限
    - 看涨上限 ≤ 股票价格（欧式=美式）
    - 看跌上限 ≤ 执行价格贴现值（欧式）或执行价格（美式）
    - 违反上限时无风险套利
[3] 期权价格下限与无套利证明
    - 欧式看涨下限：c ≥ max(S₀-Ke^{-rT}, 0)
    - 欧式看跌下限：p ≥ max(Ke^{-rT}-S₀, 0)
    - 复制组合推导
    - 套利例题映射
[4] 看跌看涨平价
    - 无股息：c + Ke^{-rT} = p + S₀
    - 等价组合现金流对比
    - 公司资本结构解释
    - 平价套利例题
[5] 股息对期权价格的影响
    - 含股息平价公式：c + D + Ke^{-rT} = p + S₀
    - 股息降低看涨价值、提高看跌价值的原因
[6] 提前行权判断
    - 无股息美式看涨：通常不应提前行权
    - 看跌深度实值：可能提前行权
    - 股息触发看涨提前行权条件
    - 决策表
[7] 期权价值走势图综合解读
    - 看涨价值随股价的变化（S型/上限下限区间）
    - 看跌价值随股价的变化
    - 时间价值随到期日临近衰减
[8] 易混点与复习路径
    - 上限下限 vs 平价
    - 欧式 vs 美式
    - 无股息 vs 有股息
    - 影响因素方向 vs 强度
    - 复习路径
```

### 2.2 Children 重写

| 指标 | 增强前 | 增强后目标 |
|---|---|---|
| Children | 23 | 28-32 |
| Avg chars | 26 | 100-160 |
| Short (<40) | 23 (100%) | 0 |

### 2.3 Formula 修复清单

1. **全局**：所有 `e^{-rT}` 改为正确 JSON 格式（`e^{-rT}` 在 JSON 中为 `e^{-rT}`）
2. **下限卡**：formula → 纯 LaTeX；formulaLatex 修复 `\r`
3. **平价卡**：formulaLatex 重写为 `c + Ke^{-rT} = p + S_0`
4. **上限卡**：formulaLatex 修复 `\r`；补看跌上下限区分
5. **含股息平价卡**：formulaLatex 重写
6. **所有 formula_card**：添加 priority（P0/P1）

### 2.4 Example Box 修补

- 3 个例题补 sourceType 和 sourceNote
- 判定：例题 1、2 参数与 PPT 常见教学参数匹配，标注“PPT 图示参数转化”
- 例题 3 参数与课程习题特征一致，标注“标准化复习例题”
- 3 个例题 steps 中 `e^{-rT}` 同样需要修复

### 2.5 Visual Block 调整

- 保留全部 13 个 VB
- curve_chart[1]（看涨上下限）→ 考虑增补看跌上下限 chart 或在 description 中声明只展示看涨
- formula_card 数量不变，内容修复
- comparison_table / data_table / process_flow 不动

---

## 3. 不需要做的事

- 不需要新增 payoff_chart（本章核心是价格性质，非头寸损益）
- 不需要新增 example_box（3 个已覆盖下限+看跌下限+平价）
- 不需要改 concise
- 不需要改其他章节、gdsyzq、source-materials、src、Prisma、lockfile

---

## 4. 验证清单

增强完成后运行：
- [ ] npm run validate:content（ysjrgj 通过，无新增 warning）
- [ ] npm run lint
- [ ] npm run build

---

## 5. 产出文件（增强阶段）

- data/generated/ysjrgj/full/framework-detailed.json（第 11 章）
- data/generated/ysjrgj/audit/ch11-enhancement-plan.md
- data/generated/ysjrgj/audit/ch11-enhancement-report.md
- data/generated/ysjrgj/audit/ch11-editorial-consolidation.md
