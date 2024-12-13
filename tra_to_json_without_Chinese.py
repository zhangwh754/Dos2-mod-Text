import os
import json
import re

def read_tra_files(folder_path):
    """读取指定文件夹中的所有.tra文件，并返回其内容的字典。"""
    content_dict = {}
    for file_name in os.listdir(folder_path):
        if file_name.endswith('.tra'):
            file_path = os.path.join(folder_path, file_name)
            with open(file_path, 'r', encoding='utf-8') as file:
                content_dict[file_name] = file.read()
    return content_dict

def parse_tra_contents(contents):
    """解析.tra文件内容，返回解析后的字典。保持文本格式。"""
    pattern = r'@([^=]+)=\s*~([\s\S]*?)~(?:\[\S*?\])?'
    return {match.group(1): match.group(2).strip() for match in re.finditer(pattern, contents)}

def create_json_output(original_data, english_data, chinese_data, output_folder):
    """创建JSON输出文件，包含翻译的对比结果。"""
    for file_name, orig_content in original_data.items():
        eng_content = english_data.get(file_name, '')
        chi_content = chinese_data.get(file_name, '')
        orig_dict = parse_tra_contents(orig_content)
        eng_dict = parse_tra_contents(eng_content)
        chi_dict = parse_tra_contents(chi_content)
        json_data = []
        for key, orig_text in orig_dict.items():
            json_data.append({
                "key": key,
                "original": eng_dict.get(key, orig_text),
                "translation": "",
                "context": orig_text
            })
        output_file_path = os.path.join(output_folder, file_name.replace('.tra', '.json'))
        with open(output_file_path, 'w', encoding='utf-8') as json_file:
            json.dump(json_data, json_file, indent=4, ensure_ascii=False)

def main():
    original_folder = 'Original'
    english_folder = 'English'
    chinese_folder = 'Chinese'
    output_folder = 'Output_Json'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)  # 创建输出文件夹如果不存在
    original_data = read_tra_files(original_folder)
    english_data = read_tra_files(english_folder)
    chinese_data = read_tra_files(chinese_folder)
    create_json_output(original_data, english_data, chinese_data, output_folder)

if __name__ == '__main__':
    main()
