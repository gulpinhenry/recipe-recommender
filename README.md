# recipe-recommender

## Workflow

pull from master, checkout branch, make changes and commits, push to branch, submit pr, let other ppl know, others will review and merge it for you

## Branch and Commit Naming Conventions

For CI/CD/Versioning: use title INIT-your_change_here_in_underscores

For any Frontend changes: use title FE-your_change_here_in_underscores

For any backend change: use title BE-your_change_here_in_underscores

To commit files: use commit message "YOUR BRANCH NAME then your commit message"

Ex: "FE-make_share_button created some button"

## For running
### Mac User

[Install NVM](https://github.com/nvm-sh/nvm#installing-and-updating)

restart terminal

nvm install

```
nvm install 20.10.0
nvm use 20.10.0
```
### Windows User
either install node version 20.10.0
or install [NVM for windows](https://github.com/coreybutler/nvm-windows)

install docker desktop

open it when running this application

TODO: replace mongodb url in docker-compose later

For production:

npm run build

deploy contents of build directory to web server

to run:

```
docker-compose up
```

Frontend is at localhost:3000

Backend is at localhost:8000

add .env file inside backend folder:
add your openai api key

In your .env file
```
DB_USERNAME=myusername
DB_PASSWORD=mypassword
API_PASSWORD=mypassword
```