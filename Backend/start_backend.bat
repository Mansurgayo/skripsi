@echo off
echo ========================================
echo  Starting Stress Detection Backend
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking dependencies...
python -m pip show flask >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies are installed
)

echo.
echo Starting Flask server...
echo Server will run at http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py

pause

