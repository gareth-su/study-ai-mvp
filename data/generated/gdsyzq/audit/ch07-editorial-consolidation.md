# 第 7 章编辑整合纪要

日期：2026-05-13

## 1. 删除/压缩/降权清单

| 项目 | 原位置 | 处理 |
|---|---|---|
| case_card: 建行首只 MBS 定价思路 | visualBlocks | 删除（来源为 slide 6 外部链接） |
| timeline: MBS现金流估值时间线 | visualBlocks | 删除（被 process_flow + example_box 覆盖） |
| 外部阅读链接（建行定价/微信读书等） | slides 6/7/21 | audit-only |
| 讨论：对 ABS 市场理解 | slide 30 | audit-only |
| 原"复习路径"模块 | nodes | 整合进"估值方法总览与易混点" |

## 2. 正文编排检查

- A 类视觉对象检查：本章无 A 类对象。B 类对象均已在对应学习模块中。
- 图示-公式-例题链条：
  - 现金流结构：cashflow_diagram → 证券化流程 process_flow → 分层说明
  - Monte Carlo 估值：chart_explanation（路径依赖概念）→ process_flow（流程）→ formula_card（公式）→ image（Table 12-2, Table 12-3）→ example_box（例题链）
  - OAS：comparison_table（Z-spread vs OAS）→ formula_card（OAS 关系式）→ formula_card（OAS 校准条件）
- 编排顺序：遵循"图示 → 解释 → 公式 → 例题 → 复习要点"的学习链条。
- 先图后解释：chart_explanation 放在 Monte Carlo 模块前部，cashflow_diagram 放在基础结构模块。

## 3. 教学编排审计

| # | 检查项 | 结果 |
|---|---|---|
| 1 | A 类对象是否只出现在补充材料 | 不适用（无 A 类对象） |
| 2 | 图示说明与图片是否分离 | 否——2 张 image 紧邻对应 example_box，caption 直接说明表与例题的关系 |
| 3 | 是否先讲符号/公式后放关键图 | 否——chart_explanation 在 formula_card 之前 |
| 4 | 本应为例题的内容是否输出为孤立 formula_card | 否——slides 13-20 已转为 4 个 example_box |
| 5 | 流程图是否过早放在基础概念前 | 否——process_flow 在对应概念解释后 |
| 6 | formula_card 是否有缺少已知条件/问题/求解的 | 否——所有 formula_card 都是纯公式卡，不承担例题功能 |
| 7 | 同一知识链条的 visualBlock 是否被拆散 | 否——Monte Carlo 链条成组放置 |
| 8 | 资源索引是否重复正文内容 | 不适用（本章未生成资源索引） |
| 9 | 图示-公式-例题是否形成完整链条 | 是——每条主线都有完整链条 |
| 10 | formula 字段是否有自然语言而非数学表达式 | 否——所有 formula 字段都是数学表达式 |
| 11 | 是否有半 LaTeX（裸括号、裸变量） | 否——已检查清理 |

## 4. concise_sync 建议

本轮未修改 `framework-concise.json`。建议后续 concise 同步策略：

- 可以保留 1 个 cashflow_diagram、1 个 process_flow（Monte Carlo 五步）、3 个核心 formula_card（路径 PV、多路径平均、OAS 校准）、1 个 comparison_table（MBS/ABS/含权债对比）和 1 个 example_box（合并后的 Monte Carlo 例题）。
- 不需要复刻全部 19 个 visualBlock，但核心 P0 块（约 8-10 个）应保留。
- 模块可以压缩到 4 个顶层节点：导读、基础结构与路径依赖、Monte Carlo/OAS 估值、ABS 方法与易混点。
