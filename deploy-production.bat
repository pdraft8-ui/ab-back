@echo off
REM Production Deployment Script for Insurance Backend (Windows)
setlocal enabledelayedexpansion

echo 🚀 Starting Production Deployment...

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [ERROR] This script should not be run as administrator
    pause
    exit /b 1
)

REM Check dependencies
echo [INFO] Checking dependencies...

where node >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Node.js is not installed
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)

echo [INFO] Dependencies check completed

REM Security audit
echo [INFO] Running security audit...
call npm audit --audit-level=moderate
if %errorLevel% neq 0 (
    echo [WARNING] Security audit found issues. Please review and fix before production deployment.
    set /p continue="Continue with deployment? (y/N): "
    if /i not "!continue!"=="y" (
        echo [ERROR] Deployment aborted due to security issues
        pause
        exit /b 1
    )
) else (
    echo [INFO] Security audit passed
)

REM Run tests
echo [INFO] Running tests...
call npm test
if %errorLevel% neq 0 (
    echo [ERROR] Tests failed. Please fix before production deployment.
    pause
    exit /b 1
)
echo [INFO] All tests passed

REM Build for production
echo [INFO] Building for production...

REM Clean previous builds
if exist dist rmdir /s /q dist

REM Set production environment and build
set NODE_ENV=production
call npm run build:prod
if %errorLevel% neq 0 (
    echo [ERROR] Production build failed
    pause
    exit /b 1
)
echo [INFO] Production build completed successfully

REM Deploy standalone
echo [INFO] Deploying standalone application...

REM Create production directories
if not exist logs mkdir logs
if not exist uploads mkdir uploads

REM Set production environment
set NODE_ENV=production
set PORT=3000

REM Start the application
echo [INFO] Starting production server...
start /B npm run start:prod > logs\app.log 2>&1

REM Wait for startup
timeout /t 10 /nobreak >nul

REM Health check
echo [INFO] Performing health check...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/v1/health' -UseBasicParsing; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if %errorLevel% equ 0 (
    echo [INFO] Standalone deployment completed successfully
    echo [INFO] Application is running on port 3000
    echo [INFO] Logs are available in logs\app.log
) else (
    echo [ERROR] Standalone deployment failed
    pause
    exit /b 1
)

echo [INFO] Production deployment completed successfully! 🎉

REM Display final information
echo.
echo 📋 Deployment Summary:
echo ======================
echo Environment: Production
echo Port: 3000
echo Health Check: http://localhost:3000/api/v1/health
echo Logs: logs\app.log
echo.
echo 🔒 Security Notes:
echo - Update JWT secrets in production.config.js
echo - Configure proper CORS origins
echo - Set up SSL certificates for HTTPS
echo - Configure firewall rules
echo - Set up monitoring and alerting
echo.
echo Press any key to exit...
pause >nul
