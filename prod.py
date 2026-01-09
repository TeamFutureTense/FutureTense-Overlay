#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Production build script
Runs npm build, then copies the output folder to parent directory
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path


def run_npm_build():
    """运行 npm build 命令"""
    print("正在运行 npm build...")
    try:
        result = subprocess.run(
            "npm run build",
            shell=True,
            check=True,
            capture_output=True,
            text=True
        )
        print(result.stdout)
        print("✓ npm build 完成")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ npm build 失败: {e}")
        print(e.stderr)
        return False


def copy_to_parent():
    """将构建输出复制到父级目录"""
    # 获取当前目录和父级目录
    current_dir = Path(__file__).parent.resolve()
    parent_dir = current_dir.parent
    
    # 源文件夹和目标文件夹
    source_folder = current_dir / "future-tense-overlay-kimsseTheWolf"
    target_folder = parent_dir / "future-tense-overlay-kimsseTheWolf"
    
    # 检查源文件夹是否存在
    if not source_folder.exists():
        print(f"✗ 错误: 源文件夹不存在: {source_folder}")
        return False
    
    print(f"正在复制文件夹到父级目录...")
    print(f"  源: {source_folder}")
    print(f"  目标: {target_folder}")
    
    try:
        # 如果目标文件夹存在，先删除
        if target_folder.exists():
            print(f"  删除已存在的目标文件夹...")
            shutil.rmtree(target_folder)
        
        # 复制文件夹
        shutil.copytree(source_folder, target_folder)
        print("✓ 文件夹复制完成")
        return True
    except Exception as e:
        print(f"✗ 复制文件夹失败: {e}")
        return False


def copy_metadata():
    """复制 metadata.txt 到父级目录的目标文件夹"""
    current_dir = Path(__file__).parent.resolve()
    parent_dir = current_dir.parent
    
    # 源文件和目标路径
    source_file = current_dir / "metadata.txt"
    target_folder = parent_dir / "future-tense-overlay-kimsseTheWolf"
    target_file = target_folder / "metadata.txt"
    
    # 检查源文件是否存在
    if not source_file.exists():
        print(f"✗ 警告: metadata.txt 不存在: {source_file}")
        return False
    
    # 检查目标文件夹是否存在
    if not target_folder.exists():
        print(f"✗ 错误: 目标文件夹不存在: {target_folder}")
        return False
    
    print(f"正在复制 metadata.txt...")
    print(f"  源: {source_file}")
    print(f"  目标: {target_file}")
    
    try:
        shutil.copy2(source_file, target_file)
        print("✓ metadata.txt 复制完成")
        return True
    except Exception as e:
        print(f"✗ 复制 metadata.txt 失败: {e}")
        return False


def cleanup_local_folder():
    """删除本地的 future-tense-overlay-kimsseTheWolf 文件夹"""
    current_dir = Path(__file__).parent.resolve()
    local_folder = current_dir / "future-tense-overlay-kimsseTheWolf"
    
    if not local_folder.exists():
        print(f"✗ 本地文件夹不存在，无需删除: {local_folder}")
        return True
    
    print(f"正在删除本地文件夹...")
    print(f"  路径: {local_folder}")
    
    try:
        shutil.rmtree(local_folder)
        print("✓ 本地文件夹删除完成")
        return True
    except Exception as e:
        print(f"✗ 删除本地文件夹失败: {e}")
        return False


def main():
    """主函数"""
    print("=" * 60)
    print("Production Build Script")
    print("=" * 60)
    print()
    
    print()
    
    # 步骤 1: 运行 npm build
    if not run_npm_build():
        print("\n构建失败，停止执行")
        sys.exit(1)
    
    print()
    
    # 步骤 2: 复制文件夹到父级目录
    if not copy_to_parent():
        print("\n复制文件夹失败，停止执行")
        sys.exit(1)
    
    print()
    
    # 步骤 3: 复制 metadata.txt
    if not copy_metadata():
        print("\n复制 metadata.txt 失败")
        # 这里不退出，因为主要任务已完成

    # 步骤 4: 删除本地文件夹
    if not cleanup_local_folder():
        print("\n删除本地文件夹失败")
        # 这里不退出，因为主要任务已完成
    
    print()
    print("=" * 60)
    print("✓ 所有任务完成!")
    print("=" * 60)


if __name__ == "__main__":
    main()
