# Kill processes listening on port 8080
kill -9 $(lsof -i :8080 | grep LISTEN | awk '{print $2}')
# Kill processes with name 'npm run dev'
pkill -9 'npm run dev'

# Start Validator Service
cd validator
npm install
npm run dev &

# Start Frontend
cd ../frontend
npm install
npm start &