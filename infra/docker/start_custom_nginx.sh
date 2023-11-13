#!/bin/bash

echo "Setting up REACT_APP_API_URL to " $REACT_APP_API_URL
# Replace occurances of __REACT_APP_API_URL__ in builed js app by $REACT_APP_API_URL env variable
find /usr/share/nginx/html -type f -name *.js -exec sed -i s+__REACT_APP_API_URL__+$REACT_APP_API_URL+g {} +

echo "Setting up REACT_APP_APP_KEY to " $REACT_APP_APP_KEY
# Replace occurances of __REACT_APP_APP_KEY__ in builed js app by $REACT_APP_APP_KEY env variable
find /usr/share/nginx/html -type f -name *.js -exec sed -i s+__REACT_APP_APP_KEY__+$REACT_APP_APP_KEY+g {} +

# Run Nginx in non deamon mode
nginx -g "daemon off;"