FROM node:10.16.1-alpine AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /app/dist/fuse/ /usr/share/nginx/html