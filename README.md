# Baldur-s-Gate-Text-
将博德之门MOD汉化转移到Paratranz的工具


# 翻译工具集 

本仓库包含用于转换翻译文件格式（从 `.tra` 格式到 `.json` 格式，反之亦然）的工具。

## 文件描述

### 1. `tra_to_json_with_Chinese.py`

该脚本从指定的目录读取原始文本、英文翻译和中文翻译的 `.tra` 文件，并输出将这些翻译并列比较的 JSON 文件。输出的 JSON 结构包括键、原始文本、翻译和上下文。

- **输入文件夹**：Original, English, Chinese
- **输出文件夹**：Output_Json
- **使用方法**：运行脚本前确保这些文件夹结构正确设置。

### 2. `tra_to_json_without_Chinese.py`

与 `tra_to_json_with_Chinese.py` 类似，该脚本处理 `.tra` 文件，但输出的 JSON 文件不包括中文翻译。当只需要原文和上下文时，此脚本非常有用。

- **输入文件夹**：Original, English
- **输出文件夹**：Output_Json
- **使用方法**：确保在运行前文件夹已正确设置。

### 3. `json_to_tra.py`

将 JSON 文件转换回 `.tra` 格式。该脚本处理每一个 JSON 条目，并生成 `.tra` 文件，保留 JSON 中 `translation` 字段的所有换行符（`\n`）和其他格式。

- **输入文件夹**：Chinese
- **输出文件夹**：Output
- **使用方法**：将 JSON 文件放在 'Chinese' 文件夹中，输出将被导向 'Output' 文件夹。

