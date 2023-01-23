FROM node:16.17.0
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /index
CMD npm start
EXPOSE 3015