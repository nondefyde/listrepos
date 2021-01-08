## Stage 1. Compile TS sources to JS
FROM node:14.0.0 as builder

# Set build directory
WORKDIR /

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json *.lock tsconfig.json ./

# Install dev dependencies
RUN yarn install

# Copy sources
COPY ./src ./src

COPY ./tsconfig.json ./

COPY ./server.js ./

COPY ./public ./public

#COPY ./_env/ ./_env/

# Build app
RUN yarn run build


## Stage 2. Run built app
# Note: node:12-alpine could not be used here due to weak bcrypt support:
# https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images
FROM node:14.0.0

# Set app directory
WORKDIR /

# Install app dependencies
COPY package.json tsconfig.json ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder ./server.js ./

COPY --from=builder /build/ ./build/

CMD ["node", "server.js", ">", "/dev/null"]

