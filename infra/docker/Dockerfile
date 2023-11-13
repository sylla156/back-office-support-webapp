# --- App Build ---
FROM node:14.18-slim as build
#FROM node:14.21.3-slim as assets
# set the workdir to /app
WORKDIR /app

ARG REACT_APP_API_URL
ARG REACT_APP_APP_KEY

COPY    package.json \
        package-lock.json \
        .eslintrc.js \
        /app/

# Install modules on container
RUN npm clean-install

# Copy required files to container
COPY --chown=node:node src/ /app/src/
COPY --chown=node:node public/ /app/public/

RUN chown -R node:node /app
USER node

RUN ["npx", "browserslist@latest", "--update-db"]
RUN ["npm", "run", "build"]

###############################################
# --- App hosting with NGINX ---
FROM nginx:latest as serve

COPY infra/docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html/.

# Copy custom script && add execution rights
COPY infra/docker/start_custom_nginx.sh /scripts/start_custom_nginx.sh
RUN ["chmod", "+x", "/scripts/start_custom_nginx.sh"]

CMD [ "/scripts/start_custom_nginx.sh" ]

# Expose port 80
EXPOSE 80
