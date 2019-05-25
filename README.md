# Arctouch's code challenge

# Server

The server's side of the app is simple, so I tried to keep like that and choose Node because I think is easier to deploy. Added some tests to ensure controlled growth(chai and nock were added with this in mind). The movie api is a separated module, with axios doing the calls to the TMDb api.   

I maintained the commits to keep the evolution of the code, but some things I would done a rebase to ommit.  

To run
```
 git checkout dev
 add the api key to .env
 npm install
 npm start
```
