
import os
import re
from typing import List, Set

ROOT_DIR = 'src'
FILE_EXTENSIONS = ('.ts', '.tsx')
OUTPUT_LOG_FILE = 'DEV-NOTRACK/unused_files.log'

def find_typescript_files(root_dir: str) -> List[str]:
    typescript_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(FILE_EXTENSIONS):
                typescript_files.append(os.path.join(dirpath, filename))
    return typescript_files

def get_file_name_without_extension(file_path: str) -> str:
    return os.path.splitext(os.path.basename(file_path))[0]

def find_unused_files(root_dir: str) -> Set[str]:
    typescript_files = find_typescript_files(root_dir)
    used_files = set()
    
    for file_path in typescript_files:
        file_name = get_file_name_without_extension(file_path)
        
        for other_file in typescript_files:
            if other_file == file_path:
                continue
            
            with open(other_file, 'r', encoding='utf-8') as f:
                other_content = f.read()
            
            # Check if the file name (without extension) is mentioned in other files
            if re.search(r'\b' + re.escape(file_name) + r'\b', other_content):
                used_files.add(file_path)
                break
    
    unused_files = set(typescript_files) - used_files
    return unused_files

def write_to_log(unused_files: Set[str], log_file: str) -> None:
    with open(log_file, 'w', encoding='utf-8') as f:
        f.write("Unused files:\n")
        for file in sorted(unused_files):
            f.write(f"- {file}\n")

def print_results(unused_files: Set[str]) -> None:
    if unused_files:
        print("Unused files:")
        for file in sorted(unused_files):
            print(f"- {file}")
    else:
        print("No unused files found.")

def main():
    unused_files = find_unused_files(ROOT_DIR)
    print_results(unused_files)
    write_to_log(unused_files, OUTPUT_LOG_FILE)

if __name__ == "__main__":
    main()
