FROM node:12-alpine as base
LABEL org.opencontainers.image.source https://github.com/somprasongd/vet-clinic-api
ENV NODE_ENV=production
# Define working directory and copy source
WORKDIR /app
RUN mkdir logs &&\
    mkdir -p media/avatar &&\
    mkdir -p media/file &&\
    mkdir -p media/image &&\
    mkdir -p media/default
COPY ./media/default ./media/default
COPY ./package* ./
RUN npm ci && \
    npm cache clean --force

FROM base as builder
COPY ./.babelrc ./.babelrc
# Install dependencies
RUN npm install --only=dev
COPY ./src ./src
# build
RUN npm run build

FROM base
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3001
# Copy builded source from the upper builder stage
COPY --from=builder /app/dist ./dist
# Start the app
CMD ["node", "dist/index.js"]