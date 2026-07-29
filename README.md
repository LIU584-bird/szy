# 微信表白页面

一个适合手机浏览和微信分享的静态表白页面。访问者点击信封后，会依次看到开场文字、表白信、照片回忆和结尾告白，同时可以播放背景音乐。

## 在线演示

- 页面地址：https://liu584-bird.github.io/szy/
- 项目仓库：https://github.com/LIU584-bird/szy

> 部分国内网络访问 `github.io` 可能不稳定。如果微信内无法打开，可以选择“在浏览器打开”，或将项目部署到国内服务器。

## 功能

- 适配微信和手机浏览器
- 点击信封后进入完整展示
- 点击后播放背景音乐，支持暂停和继续
- 姓名、文案和照片集中配置
- 照片未上传时显示友好占位框
- 滚动进度、内容入场和照片展示动画
- 支持 GitHub Pages 免费部署

## 自定义内容

所有姓名和文字都集中在 [`love-config.js`](./love-config.js)：

| 配置项 | 用途 |
| --- | --- |
| `recipient` | 对方名字 |
| `sender` | 你的名字 |
| `coverTitle` / `coverHint` | 打开信封前的提示 |
| `heroTitle` / `heroSubtitle` | 打开后的首屏文字 |
| `letter` | 想说的话，每个字符串显示为一段 |
| `photos` | 照片路径和照片说明 |
| `finalTitle` / `finalMessage` | 结尾文字 |
| `music` | 背景音乐路径 |

配置示例：

```js
window.LOVE_CONFIG = {
  recipient: "对方的名字",
  sender: "你的名字",
  letter: [
    "这里写第一段想说的话。",
    "这里写第二段想说的话。"
  ],
  photos: [
    { src: "photos/photo-1.jpg", caption: "照片说明" }
  ],
  music: "bgMusic.mp3"
};
```

## 替换照片和音乐

1. 将照片放入 `photos` 文件夹。
2. 默认照片名为 `photo-1.jpg` 至 `photo-4.jpg`。
3. 需要增减照片时，修改 `love-config.js` 中的 `photos` 数组。
4. 使用新的 MP3 覆盖 `bgMusic.mp3`，或修改 `music` 的文件路径。
5. 建议将单张照片压缩到 1 MB 以内，以提升微信内加载速度。

## 本地预览

在项目目录运行：

```powershell
python -m http.server 8000
```

然后打开 http://localhost:8000/ 。

## GitHub Pages 部署

1. 将项目推送到 GitHub 仓库的 `main` 分支。
2. 打开仓库的 `Settings > Pages`。
3. 在 `Build and deployment` 中选择 `Deploy from a branch`。
4. 分支选择 `main`，目录选择 `/ (root)`。
5. 保存并等待构建完成。

当前仓库已经启用 GitHub Pages，推送到 `main` 后会自动更新在线页面。

## 项目结构

```text
.
├── index.html          # 页面结构
├── love.css            # 移动端样式与动画
├── love.js             # 页面交互逻辑
├── love-config.js      # 姓名、文字、照片和音乐配置
├── bgMusic.mp3         # 背景音乐
└── photos/             # 照片目录
```

## 使用提示

- 微信和多数手机浏览器不允许网页无操作自动播放音乐，因此音乐会在点击“开启”后播放。
- 分享前建议分别使用微信、手机系统浏览器和移动网络测试一次。
- 不要在公开仓库中上传不希望公开的私人照片或敏感信息。
