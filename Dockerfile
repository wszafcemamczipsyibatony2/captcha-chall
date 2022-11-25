FROM node:16
RUN apt-get install git
RUN git clone https://github.com/wszafcemamczipsyibatony2/captcha-chall.git
# Create app directory
RUN mkdir /usr/src/app
RUN cp -a captcha-chall/* /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .

EXPOSE 80
CMD [ "node", "server.js" ]
