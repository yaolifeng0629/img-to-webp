## 批量图片压缩转换工具

### 介绍

Webp 格式的图片压缩工具，基于 [Google Webp](https://developers.google.cn/speed/webp?hl=zh-cn) 的库实现。

### 使用方法

1. [下载](https://developers.google.cn/speed/webp/download?hl=zh-cn)
2. 解压压缩包，将文件夹放到个人某个盘的目录下
3. 复制粘贴后的文件夹路径，添加到系统环境变量中
4. 打开 cmd，运行 cwebp 命令，查看是否安装成功
5. 批量压缩命令

```sh
node index.js [转换的质量(0-100)] [需要压缩的路径(绝对路径)]
```
