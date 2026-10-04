@echo off
cd /d "%~dp0"
java @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.253/win_args.txt nogui %*
