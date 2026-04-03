#!/bin/bash

echo "========================================"
echo " Starting Stress Detection Backend"
echo "========================================"
echo ""

# Navigate to script directory
cd "$(dirname "$0")"

# Check Python installation
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    exit 1
fi

python3 --version

# Check dependencies
echo ""
echo "Checking dependencies..."
if ! pip3 show flask &> /dev/null; then
    echo "Installing dependencies..."
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies"
        exit 1
    fi
else
    echo "Dependencies are installed"
fi

echo ""
echo "Starting Flask server..."
echo "Server will run at http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo ""

python3 app.py



