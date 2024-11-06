const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 默认路径
let targetDir = './shorts';
// 默认质量
let quality = 0;

// 常见的图片格式
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'];

// 检查命令行参数
if (process.argv.length > 2) {
    quality = parseInt(process.argv[2], 10);
    if (isNaN(quality) || quality < 0 || quality > 100) {
        console.error('质量参数必须是 0 到 100 之间的整数');
        process.exit(1);
    }
    if (process.argv.length > 3) {
        targetDir = process.argv[3];
    }
}

// 获取目标目录的父目录和目标目录名
const parentDir = path.dirname(targetDir);
const targetDirName = path.basename(targetDir);

// 创建目标目录名_after 目录
const outputDir = path.join(parentDir, `${targetDirName}_after`);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 获取目标目录下的所有图片文件
const files = fs.readdirSync(targetDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
});

files.forEach(file => {
    const inputFilePath = path.join(targetDir, file);
    const outputFileName = path.basename(file, path.extname(file)) + '.webp';
    const outputFilePath = path.join(outputDir, outputFileName);

    // 构建 cwebp 命令
    const command = `cwebp -q ${quality} "${inputFilePath}" -o "${outputFilePath}"`;

    try {
        // 执行命令
        execSync(command, { stdio: 'inherit' });
        console.log(`${file} 转换成功: ${outputFileName}`);
    } catch (error) {
        console.error(`执行命令时出错: ${error.message}`);
    }
});
