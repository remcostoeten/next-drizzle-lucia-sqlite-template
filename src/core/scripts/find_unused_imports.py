import os
import re
from typing import List, Dict, Set

# Configuration variables
ROOT_DIR = 'src'
FILE_EXTENSIONS = ('.ts', '.tsx')
OUTPUT_LOG_FILE = 'unused_imports.log'

def find_typescript_files(root_dir: str) -> List[str]:
    typescript_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(FILE_EXTENSIONS):
                typescript_files.append(os.path.join(dirpath, filename))
    return typescript_files

def extract_imports(content: str) -> Dict[str, Set[str]]:
    # This regex pattern matches various import styles
    import_pattern = r'import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+[\'"]([^\'"]+)[\'"]'
    matches = re.findall(import_pattern, content)
    imports = {}
    for match in matches:
        imported_items = re.findall(r'\b\w+\b', match[0])
        imports[match[1]] = set(imported_items)
    return imports

def find_unused_imports(file_path: str) -> Dict[str, Set[str]]:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    imports = extract_imports(content)
    unused_imports = {}

    for module, items in imports.items():
        unused_items = set()
        for item in items:
            # Check if the import is used in the file content (excluding import statements)
            if not re.search(r'\b' + re.escape(item) + r'\b', content.split('import')[-1]):
                unused_items.add(item)
        if unused_items:
            unused_imports[module] = unused_items
    
    return unused_imports

def analyze_files(typescript_files: List[str]) -> Dict[str, Dict[str, Set[str]]]:
    unused_imports_by_file = {}
    for file_path in typescript_files:
        unused_imports = find_unused_imports(file_path)
        if unused_imports:
            unused_imports_by_file[file_path] = unused_imports
    return unused_imports_by_file

def write_to_log(unused_imports_by_file: Dict[str, Dict[str, Set[str]]], log_file: str) -> None:
    with open(log_file, 'w', encoding='utf-8') as f:
        f.write("Unused imports:\n")
        for file, imports in unused_imports_by_file.items():
            f.write(f"\n{file}:\n")
            for module, items in imports.items():
                f.write(f"  From '{module}':\n")
                for item in sorted(items):
                    f.write(f"    - {item}\n")

def print_results(unused_imports_by_file: Dict[str, Dict[str, Set[str]]]) -> None:
    if unused_imports_by_file:
        print("Files with unused imports:")
        for file, imports in unused_imports_by_file.items():
            print(f"\n{file}:")
            for module, items in imports.items():
                print(f"  From '{module}':")
                for item in sorted(items):
                    print(f"    - {item}")
    else:
        print("No unused imports found.")

def main():
    typescript_files = find_typescript_files(ROOT_DIR)
    unused_imports_by_file = analyze_files(typescript_files)
    print_results(unused_imports_by_file)
    write_to_log(unused_imports_by_file, OUTPUT_LOG_FILE)

if __name__ == "__main__":
    main()
