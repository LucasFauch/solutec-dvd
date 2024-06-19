FROM node AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npx ng build

FROM nginx

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html/