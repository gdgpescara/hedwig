FROM node:20-slim
COPY . /app
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node /app/dist/server/entry.mjs