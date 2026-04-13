# CatBTI（猫BTI）· 测一测你是什么猫

> **CatBTI（猫BTI）**：测一测你是什么猫。十五维「猫格」整活问卷，语境锁定在干饭、贴贴、跑酷、装睡、巡领地与人类腿边；**与 MBTI 完全无关**，仅供娱乐，与任何临床/动物行为鉴定无关。

开源数据驱动的小测验：改仓库里的题目与猫格数据即可定制，无需动核心代码。

## 在线体验

若已为仓库开启 GitHub Pages，将构建产物 `dist/` 发布后访问你的 Pages 地址即可（与 `vite.config.js` 中 `base` 一致）。

## 特性

- **27 种猫格** — 25 种标准类型 + 2 种隐藏/兜底类型
- **15 个评估维度** — 本喵自恋、贴贴独占、世界观、捕猎驱力、巡领地社交五大模型
- **曼哈顿距离匹配** — 基于 15 维向量的匹配与相似度
- **隐藏彩蛋** — 暹罗猫（猫薄荷上头版，代码 `SIAMNIP`）门控（`catnipGate`；兼容旧字段名 `drinkGate`）
- **分享图导出** — 结果页一键生成竖版分享图（Canvas）
- **移动端优先** — 响应式布局

## 项目结构

```
├── data/                    # 测试数据（修改这里来定制）
│   ├── questions.json # 题目和选项
│   ├── dimensions.json      # 15 个维度定义
│   ├── types.json           # 猫格类型和匹配模式
│   └── config.json          # 评分参数和显示配置
├── src/
│   ├── engine.js            # 评分算法（纯函数）
│   ├── quiz.js              # 答题流程控制
│   ├── result.js            # 结果页渲染
│   ├── share.js             # 分享图生成
│   ├── chart.js             # 雷达图（Canvas API）
│   ├── utils.js
│   ├── main.js
│   └── style.css
├── docs/
│   └── analysis.md          # 数据分析报告（与算法对齐）
└── index.html
```

## 快速开始

请使用 Vite 开发服务器（不要直接双击打开 `index.html`）。

```bash
git clone https://github.com/ut01/CatBTI.git
cd CatBTI

npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5180/`）。

```bash
npm run build
# 子路径部署示例：
npm run build:subdir
```

## 定制

- **题目**：编辑 `data/questions.json`（保持每维2 题、选项分值 1/2/3；门控题 ID 与触发值需与 `config.json` 的 `catnipGate` 一致）。
- **猫格**：编辑 `data/types.json` 的 `pattern`（15 个 L/M/H，按 `dimensions.json` 的 `order`）。
- **阈值**：`data/config.json` → `scoring`。

详见 [docs/analysis.md](docs/analysis.md)。

## 技术栈

- [Vite](https://vitejs.dev/)
- 原生 JavaScript + Canvas

## 声明

本测试仅供娱乐。真养宠问题请咨询兽医或认证行为师。

## License

[MIT](LICENSE)
