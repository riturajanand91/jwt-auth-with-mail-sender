## Node JWT Auth Token based Login Register with Email Sender.
This project was generated with [NPM](https://www.npmjs.com/).

## Functionalities


1.  JWT Auth - Token based Authentication.
2.  Bearer Token when using Postman for API Test with Authorization as Header.
3.  Try Catch with async-await.
4.  Email integration for user signup and user deletion. 
5.  CREATE/READ/UPDATE/DELETE.
6.  Body Parser for parsing incoming body requests.
7.  dot env & test env for environment variables.
8.  Mongoose Cloud Database for storing data.
9.  DB URL and SERVER Port numbers are served from config/dev.env file...

# Installation

1.  NODE JS
    - [Download Nodejs](https://nodejs.org/en/download/)

2.  Package Manager - NPM / Yarn
3.  Clone the repository and run `npm install` if you use **npm** as package manager or `yarn install` if you use **yarn** as package manager.

4.  Configure your database and server port configuration `config/dev.env`

    ```
    PORT=5000
    JWT_SECRET_KEY=here_goes_your_api_token
    MONGO_DB_URL='PASTE YOUR MONGO CLOUD LINK HERE'

    ## Email sender configuration
    EMAIL_SENDER_PORT=
    EMAIL_SENDER_SERVER=
    EMAIL_SENDER_MAIL_ID=
    EMAIL_SENDER_PASSWORD=
    ```
5.  Run the Server.    

## Development server

Run `node app.js` for a dev server. Navigate to `http://localhost:"YOUR PORT NUMBER"/`. The app will automatically reload if you change any of the source files.

## Somethings wrong!!

- If you find that something's wrong with this package, you can let me know by raising an issue on the GitHub issue tracker
