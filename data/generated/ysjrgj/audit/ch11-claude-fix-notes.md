# ysjrgj 第 11 章 Claude 小修记录

执行日期：2026-05-14
范围：仅 data/generated/ysjrgj/full/framework-detailed.json 第 11 章

## Fixed Issues

1. 修正“期权价格上限”node summary 中看跌上限的欧式/美式表述反置。
   - 修正前：看跌期权价值受执行价格（欧式）或执行价格贴现值（美式）约束。
   - 修正后：看跌期权价值受执行价格现值（欧式）或执行价格本身（美式）约束。

2. 修正“无股息欧式看涨期权价格上下限示意”curve_chart 的 metadata 符号混用。
   - description 中上限从 C=S0 改为 c=S0。
   - yAxis 从“看涨期权价格 C”改为“欧式看涨期权价格 c”。
   - curve name 从“上限：C = S_0”改为“上限：c = S_0”。
   - keyTakeaways 明确本图只画看涨边界，看跌边界由下一张图单独展示。

3. 补充无股息欧式期权下限 formula_card 的有股息调整提示。
   - 已知股息现值 D 时，欧式看涨下限 \(c\ge \max(S_0-D-Ke^{-rT},0)\)，欧式看跌下限 \(p\ge \max(D+Ke^{-rT}-S_0,0)\)。

4. 新增 formula_card：“含股息欧式期权上下限（P1）”。
   - 覆盖 PPT p21-p22 中有股息欧式看涨/看跌下限。
   - 明确 D 为期权期限内所有股息现值。
   - 明确该卡为欧式下限公式，区别于含股息平价公式卡。

5. 新增 curve_chart：“无股息欧式看跌期权价格上下限示意”。
   - 与已有看涨边界图成组。
   - 展示上限 p=PV(K) 和下限 max[PV(K)-S_0, 0]。
   - 补齐 PPT 中看跌边界图示的结构化呈现。

## Not Changed

- 未修改 concise。
- 未修改 ysjrgj 其他章节。
- 未修改 source-materials、src、Prisma、数据库、package.json 或 lockfile。
- 未修改 gdsyzq。

## Rationale

本轮目标是从 polished-near 提升到 polished，因此只补齐后审中识别出的两个剩余非阻断缺口：有股息上下限公式卡与看跌边界 chart。没有改变章节主结构，也没有引入新的 visualBlock 类型。
