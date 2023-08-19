@echo off

rem Terminate processes listening on port 8080
for /f "tokens=2" %%a in ('netstat -ano ^| find ":8080"') do (
    taskkill /F /PID %%a
)

rem Terminate processes with 'npm run dev' in the command line
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq npm run dev*"

rem Validator Service
cd validator
npm install
start "" npm run dev

rem Frontend
cd ../frontend
npm install
start "" npm start

exit