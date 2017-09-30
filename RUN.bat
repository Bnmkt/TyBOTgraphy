:loop
node scripts.js
timeout 5 > NUL
echo ">pokecli exited... restarting...";
goto loop