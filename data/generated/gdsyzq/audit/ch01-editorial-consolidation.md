# gdsyzq 第 1 章 editorial consolidation

执行日期：2026-05-13（含同日 post-review 修复）
性质：局部增强 + chart_explanation 空壳修复后的编辑整合检查
最终状态：**polished**

## 整合项

### 0. chart_explanation 空壳修复（post-review）

原 VB[5] "中国债券市场规模与违约观察" 为 chart_explanation 类型，chartType 为 "other"，仅有 keyTakeaways 文字无对应图表。用户验收时指出后已修复：
- 删除 chart_explanation
- 新增 data_table "中美债券市场对比"（数据来自 PPT slide 14 文字）
- 新增 image "我国债券市场存量规模及结构"（/generated-assets/gdsyzq/ch01/image13.png，裁自 slide 12）
- 新增 image "中国债券违约观察"（/generated-assets/gdsyzq/ch01/image23.png，裁自 slide 22）
- VB 6→8，image 0→2，chart_explanation 1→0

### 1. 课程导入功能

第 1 章现在能作为固定收益证券课程的完整导入：
- 一句话定位包含了"固定收益不意味收益固定"的关键认知
- 课程作用连接了后续第2-8章的学习动因
- 课程内容模块 data_table 提供了可视化学习地图
- 硅谷银行案例展示了风险分析的实际意义

### 2. 后续章节连接

所有增强文本中明确建立了与后续章节的连接：
- node[3] 公式预告：第2章息票公式 → 第3章收益率 → 第4-7章定价 → 第8章风险度量
- node[1].children[2]：明确三类工具分别对应哪些章节
- node[2].children[2]：四类风险引出第8章信用风险分析
- node[4].children[1]："有承诺≠无风险"连接第8章信用风险核心出发点

### 3. Cross-reference 一致性

- chapterTitle 和 keyConcepts 未修改
- VB titles 与 node names 对齐
- case_card relatedConcepts 与 keyConcepts 交叉验证通过

### 4. 工程词暴露检查

全文搜索未发现 `source`、`chunk`、`generated`、`JSON`、`node id` 等工程词。

### 5. 未修改项确认

- framework-concise.json：未修改
- 其他章节：未修改
- source-materials：未修改
- src/：未修改
- Prisma schema / package.json：未修改
- 未新增图片资源
