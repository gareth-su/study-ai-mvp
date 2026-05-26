# gdsyzq 图片完整性复核与重裁报告

## Summary

本轮已为 `gdsyzq` 补齐 `.renders`，并对 `data/generated/gdsyzq/full/framework-detailed.json` 中 16 张图片引用做源页对照审计。

- 原始材料：8 个 PPTX，均存在。
- renders：8 个章节均已生成，页数与 PNG 数量全部匹配。
- 图片引用：16 张，路径全部存在，文件均可打开。
- confirmed P0：0 张。
- confirmed P1：1 张，已重裁修复。
- P2/OK：15 张，仅记录，不做无谓替换。
- 未修改课程正文、`framework-detailed.json`、`framework-concise.json`、`src/**`、Prisma、package/lockfile。

## Render Coverage

| Chapter | 原始文件 | 页数 | renders 数量 | 是否匹配 |
|---|---|---:|---:|---|
| ch01 | `source-materials/gdsyzq/1.概论(3).pptx` | 32 | 32 | Yes |
| ch02 | `source-materials/gdsyzq/2.债券基本概念与债券市场组成(2).pptx` | 47 | 47 | Yes |
| ch03 | `source-materials/gdsyzq/3.债券收益率(2).pptx` | 55 | 55 | Yes |
| ch04 | `source-materials/gdsyzq/更新版 4.债券定价 (一).pptx` | 54 | 54 | Yes |
| ch05 | `source-materials/gdsyzq/5.债券定价 (二)(4).pptx` | 46 | 46 | Yes |
| ch06 | `source-materials/gdsyzq/6.债券定价 (三) 更新版.pptx` | 55 | 55 | Yes |
| ch07 | `source-materials/gdsyzq/7.债券定价 (四)(3).pptx` | 30 | 30 | Yes |
| ch08 | `source-materials/gdsyzq/8.债券投资风险（一）(2).pptx` | 76 | 76 | Yes |

## Image Audit Result

| Image Path | Chapter | Source Render Page | Status | Issue | Action |
|---|---|---|---|---|---|
| `public/generated-assets/gdsyzq/ch01/image13.png` | ch01 | `source-materials/gdsyzq/.renders/ch01/page_12_screenshot.png` | OK | 与 PPT 内嵌图一致，饼图标签和图题完整 | 不修 |
| `public/generated-assets/gdsyzq/ch01/image23.png` | ch01 | `source-materials/gdsyzq/.renders/ch01/page_22_screenshot.png` | OK | 与 PPT 内嵌图一致，双轴、图例和数据标签完整 | 不修 |
| `public/generated-assets/gdsyzq/ch04/csi-yield-curve-example-01.png` | ch04 | `source-materials/gdsyzq/.renders/ch04/page_30_screenshot.png` | P1 fixed | 原图主体可见，但缺少底部图例，学生无法可靠区分即期利率、到期收益率、远期利率三条曲线 | 已从 render 页重裁，保留图题、坐标轴、三条曲线和底部图例 |
| `public/generated-assets/gdsyzq/ch04/credit-spread-economic-cycle-01.png` | ch04 | `source-materials/gdsyzq/.renders/ch04/page_46_screenshot.png` | OK | 与 PPT 内嵌图对应，标题、坐标轴、阴影衰退期和底部说明完整 | 不修 |
| `public/generated-assets/gdsyzq/ch04/corporate-bond-yield-curve-practice-01.png` | ch04 | `source-materials/gdsyzq/.renders/ch04/page_52_screenshot.png` | OK | 图表主体、坐标轴和图例完整；当前图比整页截图更聚焦曲线 | 不修 |
| `public/generated-assets/gdsyzq/ch05/interest-rate-tree-basic-4y.png` | ch05 | `source-materials/gdsyzq/.renders/ch05/page_12_screenshot.png` | OK | 与 PPT 内嵌利率树一致，时间列、节点和波动率说明完整 | 不修 |
| `public/generated-assets/gdsyzq/ch05/interest-rate-tree-calibrated-step2.png` | ch05 | related context: `source-materials/gdsyzq/.renders/ch05/page_34_screenshot.png`, `page_35_screenshot.png` | OK | 这是结构化重绘图，不是原课件截图；节点文字、箭头和数值完整 | 不修 |
| `public/generated-assets/gdsyzq/ch05/callable-bond-tree-example.png` | ch05 | `source-materials/gdsyzq/.renders/ch05/page_38_screenshot.png` | OK | 与 PPT 内嵌图一致，图题、节点、箭头、年份和计算框完整 | 不修 |
| `public/generated-assets/gdsyzq/ch05/putable-bond-tree-example.png` | ch05 | `source-materials/gdsyzq/.renders/ch05/page_42_screenshot.png` | OK | 与 PPT 内嵌图一致，回售树节点和底部年份完整 | 不修 |
| `public/generated-assets/gdsyzq/ch05/capped-floater-tree-example.png` | ch05 | `source-materials/gdsyzq/.renders/ch05/page_45_screenshot.png` | OK | 与 PPT 内嵌图一致，标题、节点、箭头和底部说明完整 | 不修 |
| `public/generated-assets/gdsyzq/ch06/z-spread-curve-fixed-spread-left.png` | ch06 | `source-materials/gdsyzq/.renders/ch06/page_9_screenshot.png` | OK | 与 PPT 左图一致，图题、坐标轴、标注箭头和曲线完整 | 不修 |
| `public/generated-assets/gdsyzq/ch06/z-spread-curve-fixed-spread-right.png` | ch06 | `source-materials/gdsyzq/.renders/ch06/page_9_screenshot.png` | OK | 与 PPT 右图一致，图例、坐标轴、Z 利差标注和曲线完整 | 不修 |
| `public/generated-assets/gdsyzq/ch06/oas-model-price-gap.png` | ch06 | `source-materials/gdsyzq/.renders/ch06/page_14_screenshot.png` | OK | 与 PPT 中 OAS 起点利率树一致，标题、节点利率和年份完整 | 不修 |
| `public/generated-assets/gdsyzq/ch06/oas-node-spread-35bp.png` | ch06 | `source-materials/gdsyzq/.renders/ch06/page_15_screenshot.png` | OK | 与 PPT 中 OAS 35bp 节点树一致，图题、说明框、节点和年份完整 | 不修 |
| `public/generated-assets/gdsyzq/ch07/refinancing-rate-paths.png` | ch07 | `source-materials/gdsyzq/.renders/ch07/page_14_screenshot.png` | OK | 与 PPT 内嵌 Table 12-2 对应，表题、行列、notation 区域完整 | 不修 |
| `public/generated-assets/gdsyzq/ch07/cashflow-matrix.png` | ch07 | `source-materials/gdsyzq/.renders/ch07/page_16_screenshot.png` | OK | 与 PPT 内嵌 Table 12-3 对应，表题、路径列和 notation 区域完整 | 不修 |

## Recrop Details

| Old Image Path | Source Render | 修复内容 | Path Changed | File Exists |
|---|---|---|---|---|
| `public/generated-assets/gdsyzq/ch04/csi-yield-curve-example-01.png` | `source-materials/gdsyzq/.renders/ch04/page_30_screenshot.png` | 从原 PPT render 页重裁完整中证收益率曲线图，补回底部图例，保留图题、坐标轴和三条曲线 | No | Yes |

## Modified Files

新增 renders：

- `source-materials/gdsyzq/.renders/ch01/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch02/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch03/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch04/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch05/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch06/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch07/page_*_screenshot.png`
- `source-materials/gdsyzq/.renders/ch08/page_*_screenshot.png`

替换图片：

- `public/generated-assets/gdsyzq/ch04/csi-yield-curve-example-01.png`

新增/更新审计文件：

- `data/generated/gdsyzq/audit/gdsyzq-image-integrity-review.md`
- `data/generated/gdsyzq/audit/gdsyzq-image-recrop-status.json`

未修改：

- `data/generated/gdsyzq/full/framework-detailed.json`
- `data/generated/gdsyzq/full/framework-concise.json`
- `data/generated/ysjrgj/**`
- `src/**`
- `package.json` / lockfile

## Page Check

- `/framework?course=gdsyzq`：可加载。
- `/admin/preview/generated?course=gdsyzq&variant=full&level=detailed`：可加载。
- 16 个 JSON 图片路径均存在，无 broken path。
- 自动化深层点击到 ch04 的 tab 文本不稳定，已完成页面入口级抽检；修复图本身已文件级目视确认，图例已补回。

## Validation

- `npm.cmd run validate:content`：通过。
- `npm.cmd run lint`：通过。
- `npm.cmd run build`：通过。

## Remaining Risks

- `interest-rate-tree-calibrated-step2.png` 是结构化重绘图，不是 PPT 原图；本轮判定为无裁切问题，但若需要“全部使用课件原图”，需另开内容策略任务。
- 页面自动化未稳定跳转到 ch04 深层图所在模块完成逐图 lightbox 目视点击；文件级与路径级已确认，建议人工在网页中点开 ch04 中证收益率曲线图做最终视觉确认。

## Final Status

FIXED_WITH_REMAINING_RISKS
