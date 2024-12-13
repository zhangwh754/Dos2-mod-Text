import json
import os

def process_json_file(json_file_path, output_folder):
    """处理单个JSON文件，将每个条目转换为.tra格式，并直接写入输出文件。"""
    # 确定输出文件路径
    output_file_path = os.path.join(output_folder, os.path.basename(json_file_path).replace('.json', '.tra'))
    
    # 打开输出文件准备写入
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        # 读取并解析JSON文件
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            # 遍历每个条目并写入转换后的格式
            for entry in data:
                key = entry["key"]
                translation = entry["translation"]
                # 处理转义字符，将\\n转换为实际的换行符\n
                translation = translation.replace('\\n', '\n')
                output_file.write(f"@{key} = ~{translation}~\n")

def process_all_json_files(input_folder, output_folder):
    """处理指定文件夹内的所有JSON文件。"""
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 遍历输入文件夹中的所有文件
    for file_name in os.listdir(input_folder):
        if file_name.endswith('.json'):
            json_file_path = os.path.join(input_folder, file_name)
            process_json_file(json_file_path, output_folder)

def main():
    input_folder = 'Chinese'
    output_folder = 'Output'
    process_all_json_files(input_folder, output_folder)

if __name__ == '__main__':
    main()
