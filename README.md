# DOS2-MOD-TEXT

将神界原罪 2 MOD 汉化转移到 Paratranz 的工具

## 翻译工具集

1. 本仓库包含用于转换翻译文件格式（从 `.lsx` 格式到 `.xml` 格式，反之亦然）的工具。
2. 因为 `Paratranz` 网站不支持直接读取 `dos2` 的 `mod` 格式 lsx、lsb，所以把 lsx 简单转换为可读的 xml
3. 因为 `mod` 文件还包含样式，所以转换为 `xml` 还方便预览效果

## 文件夹描述

1. `Original`: 包含 lsx 英文文件的文件夹
2. `English`: 包含 lsx 英文文件转换为 xml 文件的文件夹
3. `Chinese`: 包含 xml 中文文件的文件夹
4. `Output`: 包含翻译后的 lsx 中文文件的文件夹

## 使用流程

1. 把转换工具转换后的所有 `lsx` 文件放在 `Original` 文件夹中。
2. node lsx_to_xml.js
3. 把 `English` 文件夹中的所有 `xml` 文件上传 `Paratranz`
4. 翻译完成后，把 `Paratranz` 的所有文件放到 `Chinese` 文件夹中。
5. node xml_to_lsx.js
6. 把 `Output` 文件夹中的所有 `lsx` 文件转回 `lsb` 文件

## 已有旧版本译文，倒回翻译文本

1. 把转换工具转换后的所有 `lsx` 文件放在 `Output` 文件夹中。
2. node lsx_to_xml_chinese.js
3. 把 `Chinese` 文件夹中的所有 `xml` 文件上传 `Paratranz`

## 文件描述

### 1. `lsx_to_xml.js`

该脚本从指定的目录读取原始文本、英文翻译和中文翻译的 `.lsx` 文件，并转换为 Paratranz 可读的 XML 文件。输出的 XML 结构包括键、原始文本。

- **输入文件夹**: Original
- **输出文件夹**: Output
- **使用方法**: 运行脚本前确保这些文件夹已创建

<!-- ### 2. `tra_to_json_without_Chinese.py`

与 `tra_to_json_with_Chinese.py` 类似，该脚本处理 `.tra` 文件，但输出的 JSON 文件不包括中文翻译。当只需要原文和上下文时，此脚本非常有用。

- **输入文件夹**：Original, English
- **输出文件夹**：Output_Json
- **使用方法**：确保在运行前文件夹已正确设置。

### 3. `json_to_tra.py`

将 JSON 文件转换回 `.tra` 格式。该脚本处理每一个 JSON 条目，并生成 `.tra` 文件，保留 JSON 中 `translation` 字段的所有换行符（`\n`）和其他格式。

- **输入文件夹**：Chinese
- **输出文件夹**：Output
- **使用方法**：将 JSON 文件放在 'Chinese' 文件夹中，输出将被导向 'Output' 文件夹。 -->
