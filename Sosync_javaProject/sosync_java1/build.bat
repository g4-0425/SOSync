@echo off
cd /d "C:\Users\Dell\OneDrive\Documents\Smart Emergence System\Sosync_javaProject\sosync_java1"
javac -cp "lib\mysql-connector-j-26.10.0.jar" -d bin src\com\sosync\app\Main.java src\com\sosync\dao\*.java src\com\sosync\model\*.java src\com\sosync\util\*.java src\com\sosync\thread\*.java src\com\sosync\exception\*.java