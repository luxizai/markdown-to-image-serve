import requests
import base64
from pathlib import Path

def read_markdown_file(file_path):
    """
    读取 Markdown 文件内容
    
    Args:
        file_path (str): Markdown 文件路径
        
    Returns:
        str: Markdown 文件内容
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def convert_markdown_to_image(markdown_content):
    """
    将 Markdown 内容转换为图像
    
    Args:
        markdown_content (str): Markdown 内容
        
    Returns:
        dict: 图像的 Buffer 数据字典
    """
    api_url = "https://markdown-to-image-serve.jcommon.top/api/generatePoster"
    json_data = {"markdown": markdown_content}
    response = requests.post(api_url, json=json_data)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"请求失败，状态码: {response.status_code}")
        return None

def save_base64_image(base64_string, output_path):
    """将base64编码的图片保存为文件"""
    # 移除base64字符串中可能包含的header
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    # 解码base64并保存为图片文件
    image_data = base64.b64decode(base64_string)
    with open(output_path, 'wb') as f:
        f.write(image_data)

def save_image_from_buffer(buffer, file_path):
    """
    将 Buffer 数据保存为图像文件
    
    Args:
        buffer (bytes): 图像的 Buffer 数据
        file_path (str): 保存图像的文件路径
    """
    with open(file_path, 'wb') as f:
        f.write(buffer)

def save_image_from_dict(buffer_dict, file_path):
    """
    将字典格式的 Buffer 数据保存为图像文件
    
    Args:
        buffer_dict (dict): 图像的 Buffer 数据字典
        file_path (str): 保存图像的文件路径
    """
    buffer = bytearray(buffer_dict.values())
    with open(file_path, 'wb') as f:
        f.write(buffer)

def generate_poster(api_url, json_data, output_file):
    """
    调用 API 生成海报并保存为图像文件
    
    Args:
        api_url (str): API 的 URL
        json_data (dict): 发送到 API 的 JSON 数据
        output_file (str): 保存生成的图像文件路径
    """
    response = requests.post(api_url, json=json_data)
    
    if response.status_code == 200:
        buffer_dict = response.json()
        save_image_from_dict(buffer_dict, output_file)
        print(f"海报已保存到 {output_file}")
    else:
        print(f"请求失败，状态码: {response.status_code}")

def main():
    # 获取当前文件所在目录
    current_dir = Path(__file__).parent
    
    # 构建markdown文件路径
    # markdown_file = current_dir.parent / 'news_poster.md'
    markdown_file = current_dir / 'news_poster.md'
    
    # 构建输出图片路径
    output_dir = current_dir / 'output'
    output_dir.mkdir(exist_ok=True)
    output_file = output_dir / 'news_poster.png'
    
    try:
        # 读取markdown内容
        markdown_content = read_markdown_file(markdown_file)
        
        # 转换为图片
        result = convert_markdown_to_image(markdown_content)
        
        if result:
            print(result)
            
            # 保存图片
            save_image_from_dict(result, output_file)
            print(f"图片已保存到: {output_file}")
        else:
            print("API返回数据中没有找到图片内容")
            
    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    main()
