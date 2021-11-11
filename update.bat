for /f "tokens=1 delims=." %%a in (list.txt) do node --max-old-space-size=8192 "update.js" "update" "%%a"
node --max-old-space-size=8192 "update.js" "short list"
