@echo off
echo ========================================
echo JOBORBIT - Installation Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed: 
node --version
echo.

echo [2/4] Installing dependencies...
echo This may take a few minutes...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo [3/4] Verifying installation...
if not exist "node_modules" (
    echo ERROR: node_modules folder not created!
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Run 'npm run dev' to start the development server
echo 2. Open http://localhost:3000 in your browser
echo 3. Check SETUP.md for detailed instructions
echo ========================================
echo.
pause
