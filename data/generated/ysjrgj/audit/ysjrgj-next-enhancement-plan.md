# ysjrgj 剩余章节增强计划

制定日期：2026-05-14
参考：ch10/ch11/ch12 full enhancement 经验

## 概述

6 个剩余章节中 4 个需要 full enhancement（ch03/ch04/ch05/ch07），2 个需要局部增强（ch01/ch02）。推荐优先处理定价前置链（ch04 → ch05），再处理应用链（ch07 → ch03 → ch02 → ch01）。

## 增强顺序与预估

| 顺序 | Chapter | 等级 | 预估 VB 复用 | 新增 VB 预估 | 关键挑战 |
|------|---------|------|------------|------------|---------|
| 1 | ch04 利率 | D | 6 formula → 重写 LaTeX 并补 priority | 可能 +2 formula (剥离法, 债券定价) | 6 个公式全部自然语言，重写量大 |
| 2 | ch05 远期和期货价格 | D | 5 formula → 重写 | 可能 +1 curve_chart (持有成本) | 5 个公式重写，需对接 ch04 利率 |
| 3 | ch07 互换 | D | 18 VB 全复用 | 可能 +2 formula (互换定价, 估值) | VB 最多但 children 全空 |
| 4 | ch03 对冲策略 | D | 15 VB 全复用 | 可能 +1 curve_chart (最优比率) | 4 个 formula + 4 个 example 重写 |
| 5 | ch02 期货运作 | C | 17 VB，修 metadata | 少量 | 局部修模板 node 和 VB 标注 |
| 6 | ch01 导言 | C | 10 VB，修 formula + source | 少量 | 去模板化，确保课程全貌 |

## ch04 利率增强目标（下章优先）

### 现状诊断
- 6 nodes, 23 children, 91% short
- 模板 node (5/6)
- 6 formula_cards: 全部缺 priority, 4 个自然语言
- 2 example_boxes: 全部缺 sourceType/sourceNote
- 1 curve_chart: 久期近似与凸性修正示意

### 推荐模块重组 (6→8 nodes)
```
[0] 章节总览：利率的度量、结构与定价
[1] 计息频率与连续复利
[2] 零息利率与收益率曲线
[3] 远期利率
[4] 久期与凸性
[5] 远期利率协议 (FRA)
[6] 利率期货
[7] 易混点与复习路径
```

### Formula 修补清单
- formula_card[0]：复利与连续复利换算 → 用 LaTeX 重写
- formula_card[1]：远期利率 → 用 LaTeX 重写
- formula_card[2]：久期近似 → 已有 LaTeX，补 priority
- formula_card[3]：债券定价 → 用 LaTeX 重写
- formula_card[4]：FRA价值 → 用 LaTeX 重写
- formula_card[5]：凸性修正 → 已有 LaTeX，补 priority

### 成组关系需覆盖
- 离散复利 / 连续复利
- 零息利率 / 债券收益率 (par yield)
- 久期 / 凸性
- 远期利率 / 未来即期利率
- 利率互换定价中的利率输入

## 全局 VB Metadata 修复清单

以下可批量补（不涉及 children 重写，明确小修）：

1. 全部 20 个 formula_card 补 `priority`（P0/P1/P2 分级）。
2. 全部 12 个 example_box 补 `sourceType`（"标准化复习例题"）和 `sourceNote`。
3. 16 个自然语言 formula 在 full enhancement 过程中重写为合法 LaTeX。

## 验证要求

每章增强完成后运行：
- npm --prefix "study-ai-mvp" run validate:content
- npm --prefix "study-ai-mvp" run lint
- npm --prefix "study-ai-mvp" run build

禁止修改：
- framework-concise.json
- gdsyzq/**
- source-materials/**
- src/**
- 包管理文件
