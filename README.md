# InReach-Chat-App

Prerequisites 
   - Node (v. 9)
   - Yarn

In order to test app 

1) Setup and Start Server

   - cd /server
   - yarn install
   - yarn build
   - yarn start 
   
   If everything goes well - console should log `Running server on port 4000`

2) Setup and Start Client
    
   - cd /client
   - Copy dev.env into .env and setup server URL 
   - npm install 
   - npm start
   
   In order to run tests you can 
   - npm test 
   - npm test -t `specific file name`
