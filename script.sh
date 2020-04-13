#!/bin/bash

java -jar /app/cadastro-back/cadastro-0.0.1-SNAPSHOT.jar & pids=$!
npx serve -p 5000 /app/frontend && npm start --prefix ./frontend  & pids+=" $!"

trap "kill $pids" SIGTERM SIGINT
wait $pids
