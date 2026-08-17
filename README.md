# DSH 人格预设集 · DeepSeek Harness Agent Persona Presets

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)(DSH)用的自定义 Agent 人格预设,一库三只:

| 目录 | 人格 | 说明 |
| --- | --- | --- |
| [`gokou-ruri/`](./gokou-ruri) | 黑猫模式(五更瑠璃) | 忠实原作《我的妹妹哪有这么可爱!》的中二病哥特毒舌少女,网名「黑猫」;AU 设定:与京介分手后和用户在一起,称呼用户「哥哥」、自称「妾身」 |
| [`vamp/`](./vamp) | 傲娇吸血鬼模式 | 自称「本小姐」的白毛红瞳傲娇吸血鬼大小姐 |
| [`neko/`](./neko) | 猫娘模式 | 自称「本喵」的温柔猫娘 |

所有人格都是**表现层(presentation layer)人格**:编码能力、工具、插件实验、安全约束与 DSH 自带预设完全一致,只有说话风格变了。`vamp` 与 `gokou-ruri` 还内置 Pro→Flash 动态模型路由(简单任务自动分派给 deepseek-v4-flash,失败自动升级回 pro)。

## 安装

1. 准备一个 DeepSeek Harness 环境(预设引用的 `@deepseek-ai/dsh-*` 包随部署提供)。
2. 找到你的 DSH 配置根目录(通常是 `${DSH_HOME}`,或 `~/.dsh`)。
3. 把想要的预设目录整个复制进 `.agent-presets/`:

   ```powershell
   Copy-Item -Recurse ./gokou-ruri "$env:DSH_HOME/.agent-presets/gokou-ruri"
   ```

   ```bash
   cp -r ./gokou-ruri "${DSH_HOME:-$HOME/.dsh}/.agent-presets/gokou-ruri"
   ```

4. 重启会话,在预设选择器里选「黑猫模式」等即可。

## 目录结构

```
gokou-ruri/
├── agent.cordis.yml   # Cordis 组合:persona 行 + 全套工具行
├── preset.yml         # 展示元数据(名称 / 描述)
└── skills/            # 配套技能文档(组合编辑指南等)
```

## 自己捏一个新人格?

看 `skills/editing-cordis-compositions/`——从 DSH 自带的 `cordis` 预设复制一份,只改 `agent.cordis.yml` 里的 persona 行即可,其余组合不要动。

## 搭配外观插件

想连 Web GUI 一起换皮?配套仓库 **[dsh-appearance-plugins](https://github.com/MisakaZentai/dsh-appearance-plugins)** 提供与三个人格一一对应的外观插件:黑猫紫黑哥特主题、猫娘樱花粉主题、吸血鬼暗红哥特面板——零图片素材、吉祥物图自备,与本仓库可任意组合使用。

## 说明

- 预设本体从 DeepSeek Harness 自带 `cordis` 预设复制而来,只改动了 persona 行;`skills/` 内的文档源自 DeepSeek Harness 部署。
- 角色形象与台词梗出自轻小说《我的妹妹哪有这么可爱!》(伏见司 著,电击文库),版权归原作者与版权方所有;本仓库为**同人性质,非商用**。
- 使用前请遵守 DeepSeek Harness 与其依赖包各自的许可证。
