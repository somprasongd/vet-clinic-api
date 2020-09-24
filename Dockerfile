FROM node:12-alpine as base
# Define working directory and copy source
WORKDIR /app
RUN mkdir logs

FROM base as server
COPY ./.babelrc ./.babelrc
COPY ./package* ./
# Install dependencies
RUN npm ci
COPY ./src ./src
# build
RUN npm run build

FROM base
ENV NODE_ENV=production
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3001

# Install deps for production only
COPY ./package* ./
RUN npm ci && \
  npm cache clean --force
# Copy builded source from the upper builder stage
COPY --from=server /app/dist ./dist

# Start the app
CMD ["node", "dist/index.js"]