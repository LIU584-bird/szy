# 微信表白页面

这是一个适合部署后通过微信分享的静态单页。对方点击链接后，会先看到信封封面；点击“开启”后播放音乐，并依次展示表白文字、照片与结尾。

## 修改内容

所有姓名和文字都集中在 `love-config.js`：

- `recipient`：对方名字
- `sender`：你的名字
- `coverTitle` / `coverHint`：打开前的提示
- `heroTitle` / `heroSubtitle`：打开后的首屏文字
- `letter`：想说的话，每个引号是一段
- `photos`：照片路径和照片说明
- `finalTitle` / `finalMessage`：结尾文字
- `music`：背景音乐文件路径

## 替换照片和音乐

1. 将照片放入 `photos` 文件夹，默认文件名是 `photo-1.jpg` 至 `photo-4.jpg`。
2. 如果需要更多或更少照片，直接增删 `love-config.js` 的 `photos` 项。
3. 用新的 MP3 覆盖 `bgMusic.mp3`，或修改 `music` 路径。
4. 照片没有放好时，页面会显示清晰的照片占位框，不会出现破图图标。

## 本地预览

不能直接双击 HTML 测试全部功能，建议在项目目录运行：

```powershell
python -m http.server 8000
```

然后在浏览器打开 `http://localhost:8000`。

## 发到微信

微信不能直接打开你电脑上的文件，需要先把整个文件夹部署成公网 HTTPS 网站。可以使用 GitHub Pages、Cloudflare Pages、Vercel 或自己的服务器。部署后，把生成的网址发给对方即可。

微信和多数手机浏览器限制网页自动播放音乐，因此页面设计为点击“开启”时开始播放。顶部按钮可以暂停或继续音乐。
