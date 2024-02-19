FROM node:20-slim
COPY ./dist /app
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node /app/server/entry.mjs