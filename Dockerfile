# => Build container
FROM node:alpine as ecommerce-frontend

WORKDIR /ecommerce-frontend

COPY package.json yarn.lock ./

RUN npm install --save

RUN npm install react-scripts -g

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_API_URL=http://localhost:8000/api

RUN npm run build

# => Run container
FROM nginx:latest

LABEL maintainer=Rahul-Guntha

COPY --from=ecommerce-frontend /ecommerce-frontend/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

#start nginx
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
