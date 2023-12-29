FROM node:16

WORKDIR /usr/src/app

COPY grpc-ml/package*.json ./

RUN npm install

COPY grpc-ml/ .

COPY proto/*.proto /usr/src/app/proto/ 

CMD ["npm", "start"]
