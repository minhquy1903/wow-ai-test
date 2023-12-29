FROM node:16

WORKDIR /usr/src/app

COPY api/package*.json ./

RUN npm install

COPY api/ .

COPY proto/*.proto /usr/src/app/proto/ 

CMD ["npm", "start"]
