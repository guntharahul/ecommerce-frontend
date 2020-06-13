FROM node:alpine as ecommerce-frontend

WORKDIR /ecommerce-frontend

COPY package.json yarn.lock ./

RUN npm install --save

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_API_URL=http://localhost:8000/api

RUN npm run build

FROM nginx:latest

LABEL maintainer=Rahul-Guntha

COPY --from=ecommerce-frontend /ecommerce-frontend/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
