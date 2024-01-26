FROM node:18-alpine AS build
LABEL authors="dmitrijbulatov"
WORKDIR /usr/src/app
COPY package.json package-lock.json nest-cli.json tsconfig.json tsconfig.build.json ./

RUN npm ci
COPY ../.. ./
RUN npm run build

### Stage 2: Final
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package-lock.json package-lock.json
COPY --from=build /usr/src/app/nest-cli.json nest-cli.json
COPY --from=build /usr/src/app/tsconfig.json tsconfig.json
COPY --from=build /usr/src/app/tsconfig.build.json tsconfig.build.json
COPY --from=build /usr/src/app/package.json package.json
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
